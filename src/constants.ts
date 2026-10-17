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

// This represents keywords that would eliminate a match 
// if it was captured by ROLE_MATCHERS. 
// Example: I want "Software Engineer," 
// but I don't want "Data Engineer"
export const ROLE_EXCLUSIONS = [
  // seniority levels or types that aren't a match
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
  // Domains or role types that aren't a match
  'analyst',
  'automation',
  'azure',
  'back end',
  'data',
  'designer',
  'devops',
  'devsecops',
  'fuel performance',
  'help desk',
  'java',
  'machine learning',
  'mechanical design',
  'ml',
  'network', // also doubles for resume drop
  'pki',
  'python',
  'qa',
  'release',
  'reliability',
  'salesforce',
  'security engineer',
  'support engineer',
  'systems',
  'wordpress',
  'writer',
  // Resume drop links
  'evergreen',
  'future',
  'interest',
  'pool',
  'resume',
  'talent',
];
