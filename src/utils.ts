import { ROLE_EXCLUSIONS, ROLE_MATCHERS } from './constants';
import type { Job } from './types';

// -------- Data formatting

export const formatDate = (date: Date = new Date()): string => {
  if (Number.isNaN(date?.getTime())) {
    return 'Invalid date';
  }

  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric'});
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
  const normalized = title.trim();
  return matches.test(normalized) && !exclusions.test(normalized);
};

export const isExplicitlyRemoteOrVirtual = (location: string): boolean => {
  return location.toLowerCase().includes('remote') || location.toLowerCase().includes('virtual');
}

export const isRemoteGreenhouseJob = (location: string): boolean => {
  return isExplicitlyRemoteOrVirtual(location);
}

export const isJobMatch = (title: string): boolean => {
  if (!title || typeof title !== 'string') {
    return false;
  }

  // return title.
};

export const greenhouseJobsHandler = (jobs: GreenhouseJobApiFormat[]): Job[] | null => {
  console.log("🚀 ~ greenhouseJobsHandler ~ jobs:", jobs)
  if (!jobs || !jobs.length) {
    console.error('greenhouseJobsHandler: invalid job array given');
    return null;
  }

  return jobs
    .filter(job => job.isRemoteGreenhouseJob())


  // Filter out unsuitable jobs
};