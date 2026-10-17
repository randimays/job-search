import { GreenhouseMock } from '../mock/greenhouse';
import type { Job } from '../types';
import { flushOmittedTitles, greenhouseJobsHandler, toTitleCase } from '../utils';

interface BoardConfig {
  handler: (jobs: any[]) => Job[] | null, // TODO finish typing this properly to cover all types of API responses
  name: string,
  url: (board_token: string) => string,
}

type Batches = Record<string, string[][]>;

const BOARD_CONFIGS: BoardConfig[] = [
  {
    handler: greenhouseJobsHandler,
    name: 'Greenhouse',
    url: (board_token: string): string => `https://boards-api.greenhouse.io/v1/boards/${board_token}/jobs`
  }
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
      const [, companyIdentifier] = companiesToFetch[index];

      try {
        results[index] = { status: 'fulfilled', value: await fetchJobs(provider, companyIdentifier) };
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
  jobs: any[], // fix this later
  failures: any[]
}

export const prepareForApiCalls = async (csvData: string[][]): Promise<Response> => {
  let batches: Batches = {};
  let jobs: any[] = []; // fix this when we have a grouping type for all API job types
  let failures: any[] = []; // fix this when we have a grouping type for all API job types
  
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

    const results = await settleWithLimit<any>( // Fix the type here when fetchJobs is fixed
      rows,
      provider,
      5,
    );

    jobs.push(...results
      .flatMap(result => result.status === 'fulfilled' ? [result.value] : [])
      .filter(arr => arr.length > 0));

    failures.push(...results.flatMap((result, index) => 
      result.status === 'rejected' ? [{ row: rows[index], reason: result.reason }] : []
    ));
  }

  return {
    jobs,
    failures
  };
};

export const fetchJobs = async (
  boardName: string,
  companyIdentifier: string,
): Promise<any> => { // Fix the any type here
  const config = BOARD_CONFIGS.filter(board => board.name === boardName)?.[0];

  if (!config || !config.url) {
    console.error('fetchJobs: invalid or unsupported boardName');
  }

  try {
    const response = await fetch(config.url(companyIdentifier));

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} for ${companyIdentifier}`);
    }

    const json = await response.json();

    return config.handler(json.jobs);
  } catch (error) {
    throw new Error(`Service call failed: ${error}`);
  }

  // Uncomment the below to use a mock response instead of real API calls
  // let response = GreenhouseMock;
  // const formattedJobs = config.handler(response);
  // return formattedJobs;
}