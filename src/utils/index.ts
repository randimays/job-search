import { ROLE_EXCLUSIONS, ROLE_MATCHERS } from '../constants';
import type { GreenhouseJobApiFormat, Job } from '../types';
import { useJobs } from '../store';

// -------- Data formatting

export const formatDate = (date: Date = new Date()): string => {
  if (Number.isNaN(date?.getTime())) {
    console.error('formatDate: invalid date given');
    return 'Invalid date';
  }

  return new Date(date).toLocaleDateString();
};

export const toTitleCase = (value: string): string => {
  if (!value || typeof value !== 'string' || value.length === 1) {
    return value;
  }

  return value
    .toLowerCase()
    .split(' ')
    .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

// -------- Job formatting (from API, for display)

export const cleanUpAPIString = (value?: string | null): string => {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return value.trim();
};

// Used to map an API response to a Job type for easy formatting
export const greenhouseMapper = (job: GreenhouseJobApiFormat): Job => {
  return {
    companyName: cleanUpAPIString(job.company_name),
    deadline: job?.application_deadline ? new Date(job.application_deadline) : null,
    id: job?.id || null,
    published: new Date(job.first_published),
    title: cleanUpAPIString(job.title),
    updated: new Date(job?.updated_at),
    url: cleanUpAPIString(job.absolute_url),
  }
};

// -------- Job filtering

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Matches keywords that may or may not have spaces and hyphens
// e.g. front[\s-]*end, which matches "front end", "front-end", "frontend"
const keywordToPattern = (keyword: string): string =>
  keyword
    .trim()
    .split(/[\s-]+/)
    .map(escapeRegExp)
    .join('[\\s-]*');

// Builds the regex for matching job titles against desired keywords
const buildRegexMatcher = (keywords: string[], wholeWord = false): RegExp =>
    new RegExp(
    `\\b(?:${keywords.map(keywordToPattern).join('|')})${wholeWord ? '\\b' : ''}`,
    'i',
  );

const matches = buildRegexMatcher(ROLE_MATCHERS);
const exclusions = buildRegexMatcher(ROLE_EXCLUSIONS, true);
const omittedTitles: string[] = [];

export const flushOmittedTitles = (): void => {
  if (!omittedTitles.length) {
    return;
  }

  useJobs.getState().addOmittedTitles(omittedTitles);
};

// Checks against the ROLE_MATCHERS and ROLE_EXCLUSIONS lists (in constants.ts)
// to filter for potential matches by keywords
export const isPotentialJobMatch = (title: string): boolean => {
  if (!title || typeof title !== 'string') {
    console.error('isPotentialJobMatch: invalid or missing job title');
    return true;
  }

  const normalized = title.trim();

  if (!matches.test(normalized) || exclusions.test(normalized)) {
    omittedTitles.push(normalized);
  }

  return matches.test(normalized) && !exclusions.test(normalized);
};

export const isExplicitlyRemoteOrVirtual = (location: string): boolean => {
  if (location && typeof location === 'string') {
    return location.toLowerCase().includes('remote') || location.toLowerCase().includes('virtual');
  }

  // Keep the net wide; we can really only filter out on-site and hybrid
  return true;
}

export const greenhouseJobsHandler = (jobs: GreenhouseJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => isExplicitlyRemoteOrVirtual(job?.location?.name))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => greenhouseMapper(filteredJob));
  }

  return [];
};

// -------- CSV parsing

export const parseCsv = (fileContents: string): any => {
  return fileContents
    .split(/\r?\n/)
    .map((row: string): string[] => {
      return row.split(',');
    });
};