// -------- API types
export interface AshbyJobApiFormat {
  id: string,
  title: string,
  department: string,
  team: string,
  employmentType: string,
  location: string,
  shouldDisplayCompensationOnJobPostings: boolean,
  secondaryLocations: string[],
  publishedAt: string,
  isListed: boolean,
  isRemote: boolean,
  workplaceType: string,
  address: {
    postalAddress: {
      addressRegion?: string,
      addressCountry: string,
      addressLocality?: string
    }
  },
  jobUrl: string,
  applyUrl: string,
  descriptionHtml: string,
  descriptionPlain: string,
  compensation: {
    compensationTierSummary: string | null,
    scrapeableCompensationSalarySummary: string | null,
    compensationTiers: {
      id: string,
      tierSummary: string,
      title: string | null,
      additionalInformation: string | null,
      components: {
        id: string,
        summary: string,
        compensationType: string,
        interval: string,
        currencyCode: string | null,
        minValue: number | null,
        maxValue: number | null
      }[]
    }[],
    summaryComponents: {
      compensationType: string,
      interval: string,
      currencyCode: string | null,
      minValue: number | null,
      maxValue: number | null
    }[]
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
  created_at: string,
  departments: {
    child_ids: string[],
    id: string,
    name: string,
    parent_id: string | null
  }[],
  employment_type: string,
  first_published_at: string,
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
  updated_at: string
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

export interface KulaJobApiFormat {
  id: number,
  account_id: number,
  title: string,
  listed: boolean,
  kind: string,
  is_confidential: boolean,
  launch_at: string,
  end_at: string | null,
  eeoc: {
    enabled: boolean
  },
  coordinator_enabled: string | null,
  jobs_cbv_settings_enabled: boolean,
  ats_job: {
    job_description: string,
    workplace: string,
    employment_type: string,
    work_type_name: string,
    ats_department: {
      id: number,
      name: string,
      depth: number
    },
    offices: {
      id: number,
      name: string,
      location: string,
      location_key: string,
      country: string,
      country_code: string,
      state: string | null,
      city: string | null,
      remote: boolean,
      workplace: string
    }[],
    compensation: {
      base_salary: {
        currency: string,
        currency_name: string,
        currency_symbol: string,
        interval: string,
        min_amount: string,
        mid_amount: string,
        max_amount: string
      }
    }
  }
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
    salaryDescription?: string,
    salaryDescriptionPlain?: string,
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
  education: string | null,
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
  locationsText?: string,
  postedOn: string,
  bulletFields: string[],
  remoteType: string,
  url: string
}