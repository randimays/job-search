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

export interface BambooHrJobApiFormat {
  id: string,
  jobOpeningName: string,
  departmentId: string,
  departmentLabel: string,
  employmentStatusLabel: string,
  employmentType: string | null,
  location: {
    city: string | null,
    state: string | null
  },
  atsLocation: {
    country: string | null,
    state: string | null,
    province: string | null,
    city: string | null,
  },
  isRemote: boolean | null,
  locationType: string
}

export interface GemJobsApiFormat {
  absolute_url: string,
  content: string,
  content_plain: string,
  created_at: Date,
  departments: {
    child_ids: string[],
    id: string,
    name: string,
    parent_id: string | null
  }[],
  employment_type: string,
  first_published_at: Date,
  id: string,
  internal_job_id: string,
  location: {
    name: string,
  },
  location_type: string,
  offices: {
    child_ids: string[],
    child_office_external_ids: string[],
    id: string,
    location: {
      name: string
    },
    name: string,
    parent_id: string | null,
    parent_office_external_id: string | null
  }[],
  requisition_id: string,
  title: string,
  updated_at: Date
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

export interface RipplingJobApiFormat {
  uuid: string,
  name: string,
  department: {
    id: string,
    label: string
  },
  url: string,
  workLocation: {
    label: string,
    id: string
  }
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

export interface WorkdayJobApiFormat {
  title: string,
  externalPath: string,
  locationsText: string,
  postedOn: string,
  bulletFields: string[],
  url: string
}