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
  'vice president',
  'volunteer',
  'vp',
];

const IRRELEVANT_TYPES_OF_ENGINEERS = () => {
  const types = [
    'algorithm',
    'analysis',
    'analytics',
    'business value',
    'capture',
    'cloud operations',
    'cloud security software',
    'controls',
    'core design',
    'cuda',
    'customer',
    'customer success',
    'cybersecurity',
    'database',
    'detection',
    'distribution',
    'electrical',
    'forecasting and optimization',
    'hot cell design',
    'mechanical',
    'neutronics',
    'presales',
    'process',
    'professional services',
    'regulatory',
    'safety',
    'security',
    'security risk',
    'solutions',
    'strike',
    'support',
  ];

  return types.map(type => `${type} engineer`);
}

// Domains or role types that aren't a match
const DOMAIN_OR_ROLE_EXCLUSIONS = [
  'ai inference',
  'ai platform',
  'analyst',
  'applied AI',
  'automation',
  'azure',
  'back end',
  'business development representative',
  'computation',
  'data',
  'designer',
  'devops',
  'devsecops',
  'fuel performance',
  'help desk',
  'java',
  'machine learning',
  'manager, ',
  'mechanical design',
  'ml',
  'netsuite',
  'network', // also doubles for resume drop
  'pki',
  'product manager',
  'program manager',
  'project manager',
  'python',
  'qa',
  'release',
  'reliability',
  'rust',
  'salesforce',
  'systems',
  'wordpress',
  'writer',
  ...IRRELEVANT_TYPES_OF_ENGINEERS()
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
