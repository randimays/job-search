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
    'appian',
    'aws connect',
    'business value',
    'capture',
    'clinical',
    'cloud',
    'cloud operations',
    'cloud security software',
    'containerization',
    'controls',
    'core design',
    'cuda',
    'customer',
    'customer success',
    'cybersecurity',
    'dashboard',
    'database',
    'database platform',
    'detection',
    'distribution',
    'electrical',
    'forecasting and optimization',
    'gemini enterprise',
    'geospatial',
    'hot cell design',
    'imaging',
    'imaging equipment',
    'imaging service',
    'infrastructure',
    'infrastructure and cluster',
    'infrastructure & cluster',
    'mechanical',
    'mechatronics',
    'neutronics',
    'oracle',
    'power platform',
    'power platform application',
    'presales',
    'process',
    'professional services',
    'regulatory',
    'safety',
    'sap abap',
    'security',
    'security risk',
    'servicenow',
    'sharepoint',
    'solutions',
    'strike',
    'system',
    'support',
    'vulnerability management',
  ];

  return [
    ...types.map(type => `${type} engineer`),
    ...types.map(type => `${type} developer`),
  ];
}

// Domains or role types that aren't a match
const DOMAIN_OR_ROLE_EXCLUSIONS = [
  '(cleared)',
  'ai inference',
  'ai platform',
  'analyst',
  'android',
  'applied AI',
  'automation',
  'azure',
  'business development representative',
  'c#',
  'computation',
  'data',
  'designer',
  'devsecops',
  'enterprise development',
  'fuel performance',
  'help desk',
  'iOS',
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
  'rcdd',
  'release',
  'reliability',
  'rust',
  'salesforce',
  'spectrum',
  'systems',
  'technician',
  'ts/sci',
  'vdi',
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

export const NON_US_LOCATIONS = [
  'Argentina',
  'Canada',
  'Germany',
  'India',
  'Ireland',
  'LATAM',
  'Mexico',
  'Poland',
  'Romania',
  'Spain',
  'Sweden',
  'UK',
  'United Kingdom',
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
  ...DOMAIN_OR_ROLE_EXCLUSIONS,
  ...RESUME_DROP_KEYWORDS,
  ...ROLE_LOCATION_KEYWORDS
];
