// -------- API types
export interface AshbyJobApiFormat {
  id: string,
  title: string,
  department: string,
  team: string,
  employmentType: string,
  location: string,
  shouldDisplayCompensationOnJobPostings: string,
  secondaryLocations: string[],
  publishedAt: string,
  isListed: boolean,
  isRemote: boolean,
  workplaceType: string,
  address: {
    postalAddress: {
      addressRegion: string,
      addressCountry: string,
      addressLocality: string
    }
  },
  jobUrl: string,
  applyUrl: string,
  descriptionHtml: string,
  descriptionPlain: string,
  compensation: {
    compensationTierSummary: string | null,
    scrapeableCompensationSalarySummary: string | null,
    compensationTiers: string[],
    summaryComponents: string[]
  }
}

export interface GreenhouseJobApiFormat {
  absolute_url: string,
  application_deadline: string | null,
  company_name: string,
  data_compliance: any[],
  first_published: string,
  id: number,
  internal_job_id: number,
  language: string,
  location: {
    name: string
  },
  metadata: any,
  requisition_id: string,
  title: string,
  updated_at: string
}

export interface LeverJobApiFormat {
  title: string,
  postings: {
    additionalPlain: string,
    additional: string,
    categories: {
      commitment: string,
      department: string,
      location: string,
      team: string,
      allLocations: string[]
    },
    createdAt: number,
    descriptionPlain: string,
    description: string,
    id: string,
    lists: {
      text: string,
      content: string
    }[],
    salaryRange: {
      max: number,
      currency: string,
      interval: string,
      min: number
    },
    text: string,
    country: string,
    workplaceType: string,
    opening: string,
    openingPlain: string,
    descriptionBody: string,
    descriptionBodyPlain: string,
    hostedUrl: string,
    applyUrl: string
  }[]
}

export type LeverJobPosting = LeverJobApiFormat['postings'][number];

export interface PaylocityJobApiFormat {
  JobId: number,
  JobTitle: string,
  LocationName: string,
  ShouldDisplayLocation: boolean,
  PublishedDate: string,
  Description: string,
  IsInternal: boolean,
  HiringDepartment: string | null,
  JobLocation: {
    LocationId: number,
    ModuleId: number,
    Name: string | null,
    Address: string | null,
    Address2: string | null,
    Metro: string | null,
    City: string | null,
    State: string,
    Zip: string | null,
    Country: string,
    County: string | null,
    SmartyAddressId: string
  },
  IsRemote: boolean,
  IndeedRemoteType: number
}

export interface WorkableJobApiFormat {
  title: string,
  shortcode: string,
  code: string,
  employment_type: string,
  telecommuting: boolean,
  department: string | null,
  url: string,
  shortlink: string,
  application_url: string,
  published_on: string,
  created_at: string,
  country: string,
  city: string,
  state: string,
  education: string,
  experience: string,
  function: string,
  industry: string,
  locations: {
    country: string,
    countryCode: string,
    city: string,
    region: string | null,
    hidden: boolean
  }[],
  description: string
}

// -------- App types

export interface Job {
  companyName: string,
  id: string | null,
  published: Date,
  title: string,
  updated: Date,
  url: string
}

export interface Failure {
  reason: {
    message: string,
    stack: string
  },
  row: string[]
}