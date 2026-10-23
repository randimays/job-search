import type { Failure, Job } from '../types';
import { flushOmittedTitles, toTitleCase } from '../utils';
import { useJobs } from '../store';
import { BOARD_CONFIGS } from './board-configs';

type Batches = Record<string, string[][]>;

interface JobsResponse {
  jobs: Job[],
  failures: Failure[],
  noResults: string[]
}

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

export const prepareForApiCalls = async (csvData: string[][]): Promise<JobsResponse> => {
  let batches: Batches = {};
  let jobs: Job[] = [];
  let failures: Failure[] = [];
  let noResults: string[] = [];

  useJobs.getState().setFetchingJobs(true);

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
  // then call the API in batches to prevent rate-limiting. Return job results and failed calls
  for (const provider in batches) {
    const rows = batches[provider];
    const config = BOARD_CONFIGS.find(c => c.name === provider)!;
    const results = await settleWithLimit<any>(rows, provider, config.concurrency ?? 5);  // Fix the type here when fetchJobs is fixed

    jobs.push(...results
      .flatMap(result => result.status === 'fulfilled' ? [result.value] : []));

    noResults.push(...results.flatMap((result, index) =>
      result.status === 'fulfilled' && !result.value?.length ? [rows[index][2]] : []
    ));

    failures.push(...results.flatMap((result, index) => 
      result.status === 'rejected' ? [{ row: rows[index], reason: result.reason }] : []
    ));
  }

  useJobs.getState().setFetchingJobs(false);

  return {
    jobs,
    failures,
    noResults,
  };
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries = 3, options = {}): Promise<globalThis.Response> => {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url, { ...options });

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
}

export const fetchWorkdayJobs = async (rowData: string, companyName: string): Promise<any> => {
  const config = BOARD_CONFIGS.filter(board => board.name === 'Workday')?.[0];
  const companyUrl = config.url(rowData);
  const limit = 20;
  const postings: any[] = [];
  let total = Infinity;

  for (let offset = 0; offset < total; offset += limit) {
    const response = await fetchWithRetry(`/api/workday?url=${encodeURIComponent(companyUrl)}`, 3, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appliedFacets: {}, limit, offset, searchText: '' })
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} for ${companyUrl}`);
    }

    const data = await response.json();

    if (offset === 0) {
      total = data.total; // total is reliable on the first page only
    }

    if (!data.jobPostings?.length) {
      break;
    }

    postings.push(...data.jobPostings);
  }

  const { origin } = new URL(companyUrl);
  const site = companyUrl.split('/')[6]; // https:, '', host, wday, cxs, tenant, site

  return config.handler(
    postings.map(p => ({ ...p, url: `${origin}/${site}${p.externalPath}` })),
    companyName,
  );
};

export const fetchJobs = (boardName: string, companyIdentifier: string, companyName: string): Promise<any> => {
  const key = `${boardName}:${companyIdentifier}`;

  if (!cache.has(key)) {
    const request = (boardName === 'Workday'
      ? fetchWorkdayJobs(companyIdentifier, companyName)
      : fetchJobsUncached(boardName, companyIdentifier, companyName)
    ).catch(error => {
      cache.delete(key); // allow a retry after failures
      throw error;
    });

    cache.set(key, request);
  }

  return cache.get(key)!;
};