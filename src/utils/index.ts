import { ROLE_EXCLUSIONS, ROLE_MATCHERS } from '../constants';
import { useJobs } from '../store';
import { NON_US_LOCATIONS } from '../constants';

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
    console.error(`isPotentialJobMatch: invalid or missing job title: ${title}`);
    return false;
  }

  const normalized = title.trim();

  if (!matches.test(normalized) || exclusions.test(normalized)) {
    omittedTitles.push(normalized);
  }

  return matches.test(normalized) && !exclusions.test(normalized);
};

export const isUnitedStates = (location: string): boolean => {
  if (!location || typeof location !== 'string') {
    console.error(`isUnitedStates: invalid or missing job location: ${location}`);
    return true;
  }

  for (const country of NON_US_LOCATIONS) {
    if (location.toLowerCase().includes(country.toLowerCase())) {
      return false;
    }
  }

  return true;
};

export const isUnitedStatesWorkday = (location: string[]): boolean => {
  if (!location.length) {
    return true;
  }

  return !NON_US_LOCATIONS.some(country =>
    location.some(part => part.includes(country))
  );
};

export const isRemoteOrVirtualUS = (location: string): boolean => {
  if (location && typeof location === 'string') {
    return (location.toLowerCase().includes('remote') || location.toLowerCase().includes('virtual')) && isUnitedStates(location);
  }

  // Keep the net wide; we can really only filter out on-site and hybrid
  return true;
}

// -------- CSV parsing

export const parseCsv = (fileContents: string): any => {
  return fileContents
    .split(/\r?\n/)
    .map((row: string): string[] => {
      return row.split(',');
    });
};

// Job mapping

export const determinePublishDateForWorkday = (postedOn: string, companyName: string): Date => {
  const today = new Date();

  if (!postedOn || postedOn === 'Posted Today') {
    return today;
  }

  if (postedOn.startsWith('Posted')) {
    const parts = postedOn.split(' ');
    const numberInString = parts?.[1];
    let numberOfDaysAgo: number;

    if (numberInString.includes('+')) { // It says 'Posted 30+ Days Ago'
      numberOfDaysAgo = 30;
    } else if (numberInString === 'Yesterday') {
      numberOfDaysAgo = 1;
    } else {
      numberOfDaysAgo = +numberInString;
    }
    
    if (isNaN(numberOfDaysAgo)) {
      console.error(`determinePublishDateForWorkday: ${numberOfDaysAgo} for ${companyName} is NaN`);
      return today;
    }

    const pastDate = new Date(today);
    pastDate.setDate(pastDate.getDate() - numberOfDaysAgo);

    return pastDate; 
  }

  return today;
};