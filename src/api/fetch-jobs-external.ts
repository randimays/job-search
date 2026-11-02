import type { Failure, Job } from '../types';
import { flushOmittedTitles } from '../utils';
import { useJobs } from '../store';
import { BOARD_CONFIGS } from './board-configs';
import { batchCompaniesByProvider } from '../utils/api-prep';
import type { CompanyRow, JobsResponse } from '../types';

type Batches = Record<string, CompanyRow[]>;

const settleWithLimit = async (
  companiesToFetch: CompanyRow[],
  provider: string,
  limit = 5,
): Promise<PromiseSettledResult<Job[]>[]> => {
  const results = new Array<PromiseSettledResult<Job[]>>(companiesToFetch.length);
  let nextIndex = 0;

  const worker = async (): Promise<void> => {
    while (nextIndex < companiesToFetch.length) {
      const index = nextIndex++;
      const company = companiesToFetch[index];

      if (!company) {
        results[index] = { status: 'rejected', reason: new Error(`No company at index ${index}`) };

        continue;
      }

      try {
        results[index] = {
          status: 'fulfilled',
          value: await fetchJobs(provider, company.boardToken, company.companyName),
        };
      } catch (reason) {
        results[index] = { status: 'rejected', reason };
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, companiesToFetch.length) }, worker));

  flushOmittedTitles();

  return results;
};

export const prepareForApiCalls = async (csvData: CompanyRow[]): Promise<JobsResponse> => {
  const batches: Batches = batchCompaniesByProvider(csvData);
  const jobs: Job[] = [];
  const failures: Failure[] = [];
  const noResults: string[] = [];

  useJobs.getState().setFetchingJobs(true);

  if (Object.keys(batches).length) {
    // Loop through each of the providers from the above object and create Promises for each,
    // then call the API in batches to prevent rate-limiting. Return job results and failed calls
    const providerResults = await Promise.all(
      Object.entries(batches).map(async ([provider, rows]) => {
        const config = BOARD_CONFIGS.find(c => c.name === provider)!;
        const results = await settleWithLimit(rows, provider, config.concurrency ?? 5);

        return { rows, results};
      })
    );

    for (const { rows, results } of providerResults) {
      results.forEach((result, index) => {
        const row = rows[index];

        if (!row) {
          return;
        }

        if (result.status === 'fulfilled') {
          jobs.push(...result.value);

          if (!result.value.length) {
            noResults.push(row.companyName ?? '');
          }

          return;
        }

        const reason = result.reason instanceof Error ? result.reason.message : String(result.reason);

        failures.push({ row, reason });
      });
    }
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

const cache = new Map<string, Promise<Job[]>>();

const fetchJobsUncached = async (
  boardName: string,
  companyIdentifier: string,
  companyName: string
): Promise<Job[]> => {
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
    // const reason = error instanceof Error ? error.message : String(error);

    // results[index] = { status: 'rejected', reason };
    throw new Error(`Service call failed: ${error}`);
  }
}

export const fetchWorkdayJobs = async (rowData: string, companyName: string): Promise<Job[]> => {
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

export const fetchJobs = (boardName: string, companyIdentifier: string, companyName: string): Promise<Job[]> => {
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