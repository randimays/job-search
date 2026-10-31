import COMMON_NON_US_CITIES from './common-non-us-cities';
import DOMAIN_ROLE_EXCLUSIONS from './domain-role-exclusions';
import ENG_TYPES_TO_IGNORE from './eng-ignore-types';

// This represents all of the keywords 
// I would want to see matches for
export const ROLE_MATCHERS = [
  'develop', // captures "developer and development"
  'engineer',
  'front end',
  'full stack',
  'javascript',
  'programmer',
  'react',
  'software',
  'typescript',
  'web',
];

// seniority levels or types that aren't a match
const SENIORITY_EXCLUSIONS = [
  'apprentice',
  'architect',
  // 'associate',
  'director',
  // 'early career',
  'founding',
  'head',
  // 'intern',
  // 'internship',
  // 'junior',
  'lead',
  'leader',
  'manager',
  'principal',
  'sales',
  'staff',
  'supervisor',
  'vice president',
  'volunteer',
  'vp',
];

const RESUME_DROP_KEYWORDS = [
  'evergreen',
  'future',
  'interest',
  'pool',
  'resume',
  'talent',
];

export const NON_US_LOCATIONS = [
  'Argentina',
  'Brazil',
  'Canada',
  'Chile',
  'China',
  'Colombia',
  'Finland',
  'France',
  'Germany',
  'Great Britain',
  'Hungary',
  'India',
  'Indonesia',
  'Ireland',
  'Israel',
  'Japan',
  'LATAM',
  'Mexico',
  'Netherlands',
  'New Zealand',
  'Philippines',
  'Poland',
  'Portugal',
  'Romania',
  'Slovenia',
  'South Africa',
  'Spain',
  'Sweden',
  'Switzerland',
  'Taiwan',
  'Turkey',
  'UAE',
  'UK',
  'United Arab Emirates',
  'United Kingdom',
  ...COMMON_NON_US_CITIES,
];

const ROLE_LOCATION_KEYWORDS = [
  'hybrid',
  'onsite',
  ...NON_US_LOCATIONS,
];

// This represents keywords that would eliminate a match 
// if it was captured by ROLE_MATCHERS. 
// Example: I want "Software Engineer," 
// but I don't want "Data Engineer"
export const ROLE_EXCLUSIONS = [
  ...SENIORITY_EXCLUSIONS,
  ...DOMAIN_ROLE_EXCLUSIONS,
  ...ENG_TYPES_TO_IGNORE(),
  ...RESUME_DROP_KEYWORDS,
  ...ROLE_LOCATION_KEYWORDS
];
