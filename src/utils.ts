import { ROLE_EXCLUSIONS, ROLE_MATCHERS } from './constants';
import type { GreenhouseJobApiFormat, Job } from './types';

// -------- Data formatting

export const formatDate = (date: Date = new Date()): string => {
  if (Number.isNaN(date?.getTime())) {
    console.error('formatDate: invalid date given');
    return 'Invalid date';
  }

  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric'});
};

// -------- Job formatting (from API, for display)

export const convertAPIDate = (date: string | null): Date | null => {
  if (!date || typeof date !== 'string') {
    return null;
  }

  return new Date(date);
};

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
    deadline: convertAPIDate(job.application_deadline),
    id: job?.id || null,
    published: convertAPIDate(job.first_published),
    title: cleanUpAPIString(job.title),
    updated: convertAPIDate(job?.updated_at),
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
const buildRegexMatcher = (keywords: string[]): RegExp =>
  new RegExp(`\\b(?:${keywords.map(keywordToPattern).join('|')})`, 'i');

const matches = buildRegexMatcher(ROLE_MATCHERS);
const exclusions = buildRegexMatcher(ROLE_EXCLUSIONS);

// Checks against the ROLE_MATCHERS and ROLE_EXCLUSIONS lists (in constants.ts)
// to filter for potential matches by keywords
export const isPotentialJobMatch = (title: string): boolean => {
  if (!title || typeof title !== 'string') {
    console.error('isPotentialJobMatch: invalid or missing job title');
    return true;
  }

  const normalized = title.trim();
  return matches.test(normalized) && !exclusions.test(normalized);
};

export const isExplicitlyRemoteOrVirtual = (location: string): boolean => {
  if (location && typeof location === 'string') {
    return location.toLowerCase().includes('remote') || location.toLowerCase().includes('virtual');
  }

  // Keep the net wide; we can really only filter out on-site and hybrid
  return true;
}


export const greenhouseJobsHandler = (jobs: GreenhouseJobApiFormat[]): Job[] | null => {
  if (!jobs || !jobs.length) {
    console.error('greenhouseJobsHandler: invalid job array given');
    return null;
  }

  const filteredJobs = jobs
    .filter(job => isExplicitlyRemoteOrVirtual(job?.location?.name))
    .filter(remoteJob => isPotentialJobMatch(remoteJob?.title));
  
  if (!filteredJobs || !filteredJobs.length) {
    return [];
  }

  return filteredJobs.map(filteredJob => greenhouseMapper(filteredJob));
};