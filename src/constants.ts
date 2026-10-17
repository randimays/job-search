export const BOARDS = ['Greenhouse'];

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
  'associate',
  'director',
  'early career',
  'founding',
  'head',
  'intern',
  'internship',
  'junior',
  'engineering manager',
  'lead',
  'manager, software',
  'principal',
  'sales',
  'staff',
  'volunteer',
  'vp',
];

// Domains or role types that aren't a match
const DOMAIN_OR_ROLE_EXCLUSIONS = [
  'algorithm engineer',
  'analyst',
  'analysis engineer',
  'analytics engineer',
  'automation',
  'azure',
  'back end',
  'business development representative',
  'capture engineer',
  'controls engineer',
  'cybersecurity engineer',
  'data',
  'designer',
  'detection engineer',
  'devops',
  'devsecops',
  'distribution engineer',
  'electrical engineer',
  'fuel performance',
  'help desk',
  'java',
  'machine learning',
  'mechanical design',
  'mechanical engineer',
  'ml',
  'network', // also doubles for resume drop
  'pki',
  'presales engineer',
  'process engineer',
  'product manager',
  'project manager',
  'professional services engineer',
  'python',
  'qa',
  'release',
  'reliability',
  'safety engineer',
  'salesforce',
  'security engineer',
  'solutions engineer',
  'support engineer',
  'systems',
  'wordpress',
  'writer',
];

const RESUME_DROP_KEYWORDS = [
  'evergreen',
  'future',
  'interest',
  'pool',
  'resume',
  'talent',
];

// This represents keywords that would eliminate a match 
// if it was captured by ROLE_MATCHERS. 
// Example: I want "Software Engineer," 
// but I don't want "Data Engineer"
export const ROLE_EXCLUSIONS = [
  ...SENIORITY_EXCLUSIONS,
  ...DOMAIN_OR_ROLE_EXCLUSIONS,
  ...RESUME_DROP_KEYWORDS
];
