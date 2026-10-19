export const BOARDS = ['Greenhouse'];

// This represents all of the keywords 
// I would want to see matches for
export const ROLE_MATCHERS = [
  'develop', // captures "developer and development"
  'engineer',
  'front end',
  'full stack',
  'javascript',
  'mid-level',
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

const IRRELEVANT_TYPES_OF_ENGINEERS = () => {
  const types = [
    'algorithm',
    'analysis',
    'analytics',
    'aws connect',
    'business value',
    'capture',
    'clinical',
    'cloud operations',
    'cloud security software',
    'controls',
    'core design',
    'cuda',
    'customer',
    'customer success',
    'cybersecurity',
    'database',
    'database platform',
    'detection',
    'distribution',
    'electrical',
    'forecasting and optimization',
    'gemini enterprise',
    'hot cell design',
    'imaging',
    'imaging service',
    'infrastructure',
    'mechanical',
    'neutronics',
    'power platform',
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
    'vulnerability management',
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
  'enterprise development',
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
  'technician',
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

export const COMMON_HIRING_COUNTRIES = [
  'UK',
  'United Kingdom',
  'Canada',
  'Ireland',
  'India',
  'Mexico',
  'Argentina',
  'Poland',
  'Spain',
];

const ROLE_LOCATION_KEYWORDS = [
  'hybrid',
  'onsite',
  ...COMMON_HIRING_COUNTRIES,
];

// This represents keywords that would eliminate a match 
// if it was captured by ROLE_MATCHERS. 
// Example: I want "Software Engineer," 
// but I don't want "Data Engineer"
export const ROLE_EXCLUSIONS = [
  ...SENIORITY_EXCLUSIONS,
  ...DOMAIN_OR_ROLE_EXCLUSIONS,
  ...RESUME_DROP_KEYWORDS,
  ...ROLE_LOCATION_KEYWORDS
];
