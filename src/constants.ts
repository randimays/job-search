export const BOARDS = ['Greenhouse'];

// This represents all of the keywords that I would want to see matches for
export const ROLE_MATCHERS = [
  'developer',
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
// Example: I want "Software Engineer," but I don't want "Data Engineer"
export const ROLE_EXCLUSIONS = [
  // Roles that aren't a match
  'analyst',
  'architect',
  'director',
  'founding',
  'head',
  'intern',
  'junior',
  'manager',
  'lead',
  'principal',
  'sales',
  'staff',
  'volunteer',
  'vp',
  'writer',
  // Domains that aren't a match
  'back end',
  'data',
  'designer',
  'java',
  'operations',
  'python',
  'qa',
  'release',
  // Resume drop links
  'talent',
  'future',
  'resume',
  'pool',
  'network',
  'interest'
];
