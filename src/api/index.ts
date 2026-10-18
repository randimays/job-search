import { GreenhouseMock } from '../mock/greenhouse';
import type { Failure, Job } from '../types';
import { flushOmittedTitles, toTitleCase } from '../utils';
import { ashbyJobsHandler, greenhouseJobsHandler, leverJobsHandler, paylocityJobsHandler, workableJobsHandler } from '../utils/ats-specific-handlers';

interface BoardConfig {
  handler: (jobs: any[], params?: any) => Job[] | null, // TODO finish typing this properly to cover all types of API responses
  name: string,
  url: (board_token: string) => string,
  parse?: (response: Response) => Promise<any[]>, // defaults to JSON .jobs
  concurrency?: number
}

type Batches = Record<string, string[][]>;

// Comment out various sections to speed up local API calls while dev'ing
const BOARD_CONFIGS: BoardConfig[] = [
//   {
//     handler: greenhouseJobsHandler,
//     name: 'Greenhouse',
//     url: (board_token: string): string => `https://boards-api.greenhouse.io/v1/boards/${board_token}/jobs`
//   },
//   {
//     handler: leverJobsHandler,
//     name: 'Lever',
//     url: (board_token: string): string => `https://api.lever.co/v0/postings/${board_token}?group=team&mode=json`
//   },
//   {
//     handler: ashbyJobsHandler,
//     name: 'Ashby',
//     url: (board_token: string): string => `https://api.ashbyhq.com/posting-api/job-board/${board_token}?includeCompensation=true`
//   },
  // {
  //   handler: workableJobsHandler,
  //   name: 'Workable',
  //   url: (board_token: string): string => `https://apply.workable.com/api/v1/widget/accounts/${board_token}?details=true`
  // },
  {
    handler: paylocityJobsHandler,
    name: 'Paylocity',
    url: (board_token: string): string => `/paylocity/Recruiting/Jobs/All/${board_token}`,
    parse: async (response) => {
      const html = await response.text();
      const match = html.match(/window\.pageData\s*=\s*(\{[\s\S]*?\});?\s*<\/script>/);

      if (!match) {
        throw new Error('Paylocity pageData not found in response');
      }

      const pageData = JSON.parse(match[1]);
      
      return (pageData.Jobs ?? []).filter((job: any) => !job.IsInternal);
    },
    concurrency: 2
  },
  // {
  //   handler: () => {}, // TODO
  //   name: 'Workday',
  //   url: (board_token: string): string => `https://${board_token}.com/workday-jobs.json`
  // },
  // {
  //   handler: () => {}, // TODO
  //   name: 'Rippling',
  //   url: (board_token: string): string => `https://ats.rippling.com/en-US/${board_token}/jobs`
  // },
  // {
  //   handler: () => {}, // TODO
  //   name: 'Jobvite',
  //   url: (board_token: string): string => `https://jobs.jobvite.com/${board_token}`
  
  // }
];

const settleWithLimit = async <R>(
  companiesToFetch: string[][],
  provider: string,
  limit = 5,
): Promise<PromiseSettledResult<R>[]> => {
  const results: PromiseSettledResult<R>[] = new Array(companiesToFetch.length);
  let nextIndex = 0;

  const worker = async (): Promise<void> => {
    while (nextIndex < companiesToFetch.length) {
      const index = nextIndex++;
      const [, companyIdentifier, companyName] = companiesToFetch[index];

      try {
        results[index] = { status: 'fulfilled', value: await fetchJobs(provider, companyIdentifier, companyName) };
      } catch (reason) {
        results[index] = { status: 'rejected', reason };
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, companiesToFetch.length) }, worker));

  flushOmittedTitles();

  return results;
};

interface Response {
  jobs: Job[],
  failures: Failure[]
}

export const prepareForApiCalls = async (csvData: string[][]): Promise<Response> => {
  let batches: Batches = {};
  let jobs: Job[] = [];
  let failures: Failure[] = [];
  
  // Create an object with key:value pairs where the key is a provider (e.g. Greenhouse)
  // and the value is all of the rows in the spreadsheet for companies that use that provider
  // e.g. { Greenhouse: [['Greenhouse', 'capitaltg', 'Capital Technology Group']]}
  for (const config of BOARD_CONFIGS) {
    const companiesForThisBatch = csvData.filter(row => {
      const boardName = row[0];

      return toTitleCase(boardName) === config.name;
    });

    if (companiesForThisBatch.length) {
      batches[config.name] = companiesForThisBatch;
    }
  }

  // Loop through each of the providers from the above object and create Promises for each,
  // then call the API in batches of 5 to prevent rate-limiting. Return job results and failed
  for (const provider in batches) {
    const rows = batches[provider];

    const config = BOARD_CONFIGS.find(c => c.name === provider)!;
    const results = await settleWithLimit<any>(rows, provider, config.concurrency ?? 5);  // Fix the type here when fetchJobs is fixed

    jobs.push(...results
      .flatMap(result => result.status === 'fulfilled' ? [result.value] : []));

    failures.push(...results.flatMap((result, index) => 
      result.status === 'rejected' ? [{ row: rows[index], reason: result.reason }] : []
    ));
  }

  return {
    jobs,
    failures
  };
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries = 3): Promise<globalThis.Response> => {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url);

    if (response.status !== 429 || attempt >= retries) return response;

    const retryAfter = Number(response.headers.get('Retry-After'));
    const delay = retryAfter > 0
      ? retryAfter * 1000
      : 1000 * 2 ** attempt + Math.random() * 250;

    await sleep(delay);
  }
};

const cache = new Map<string, Promise<any>>();

const fetchJobsUncached = async (
  boardName: string,
  companyIdentifier: string,
  companyName: string
): Promise<any> => { // Fix the any type here
  const config = BOARD_CONFIGS.filter(board => board.name === boardName)?.[0];

  if (!config || !config.url) {
    console.error('fetchJobs: invalid or unsupported boardName');
  }

  try {
    const response = await fetchWithRetry(config.url(companyIdentifier));

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} for ${companyIdentifier}`);
    }

    const jobs = config.parse
      ? await config.parse(response)
      : (await response.json()).jobs;

    return config.handler(jobs, companyName);
  } catch (error) {
    throw new Error(`Service call failed: ${error}`);
  }

  // Uncomment the below to use a mock response instead of real API calls
  // let response = GreenhouseMock;
  // const formattedJobs = config.handler(response);
  // return formattedJobs;
}

export const fetchJobs = (boardName: string, companyIdentifier: string, companyName: string): Promise<any> => {
  const key = `${boardName}:${companyIdentifier}`;

  if (!cache.has(key)) {
    const request = fetchJobsUncached(boardName, companyIdentifier, companyName)
      .catch(error => {
        cache.delete(key); // allow a retry after failures
        throw error;
      });

    cache.set(key, request);
  }

  return cache.get(key)!;
};