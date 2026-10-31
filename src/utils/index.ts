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

// -------- Job formatting (from API, for display)

export const cleanUpAPIString = (value?: string | null): string => {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return value.trim();
};

// If something doesn't have a date, we add yesterday's date so it doesn't
// clutter up today's job listings, and still shows up as recent for review
export const handleEmptyDate = () => {
  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday;
}

export const createAPIDate = (value?: string | undefined): Date => {
  if (!value || typeof value !== 'string') {
    return handleEmptyDate(); 
  }

  return new Date(value);
}

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

// We can't say for certain that a listing is in the United States without
// calling other API endpoints in certain cases. But here we just check that we
// aren't finding non-US countries in the title or location
export const isUnitedStates = (titleOrLocation: string | null | undefined): boolean => {
  if (!titleOrLocation || typeof titleOrLocation !== 'string') {
    return true;
  }

  const US_ABBREV = /\b(?:USA|US)\b|U\.S\./;
  const US_NAME = /united states/i;
  const NEW_MEXICO = /\bnew mexico\b/gi;
  const NON_US_PATTERNS = NON_US_LOCATIONS.map(
    country => new RegExp(`\\b${escapeRegExp(country)}\\b`, 'i')
  );

  const mentionsNonUSLocation = (text: string): boolean => {
    const withoutNewMexico = text.replace(NEW_MEXICO, '');

    return NON_US_PATTERNS.some(pattern => pattern.test(withoutNewMexico));
  };

  // Any explicit US mention wins, so "Remote - US or Canada" is kept
  if (US_ABBREV.test(titleOrLocation) || US_NAME.test(titleOrLocation)) {
    return true;
  }

  return !mentionsNonUSLocation(titleOrLocation);
};

// Checks against the ROLE_MATCHERS and ROLE_EXCLUSIONS lists (in constants.ts)
// to filter for potential matches by keywords
export const isPotentialJobMatch = (title: string): boolean => {
  if (!title || typeof title !== 'string') {
    console.error(`isPotentialJobMatch: invalid or missing job title: ${title}`);
    return false;
  }

  const normalized = title.trim();

  if (!isUnitedStates(title)) {
    return false;
  }

  if (!matches.test(normalized) || exclusions.test(normalized)) {
    omittedTitles.push(normalized);
  }

  return matches.test(normalized) && !exclusions.test(normalized);
};

export const isHybridOrOnsite = (value?: string | null): boolean => {
  if (!value || typeof value !== 'string') {
    return false;
  }

  const text = value.toLowerCase();

  if (text.includes('remote')) {
    return false;
  }
  
  return /\b(hybrid|on[\s_-]?site|in[\s_-]?office)\b/.test(text);
};

// Job mapping

export const determinePublishDateForWorkday = (postedOn: string, companyName: string): Date => {
  if (!postedOn || postedOn === 'Posted Today') {
    return handleEmptyDate(); 
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
      return handleEmptyDate(); 
    }

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - numberOfDaysAgo);

    return pastDate; 
  }

  return handleEmptyDate(); 
};