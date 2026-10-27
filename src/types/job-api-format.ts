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

interface BreezyLocation {
  country: {
    name: string,
    id: string
  },
  state: {
    id: string,
    name: string
  },
  city: string,
  primary: boolean,
  streetAddress: {
    location: string,
    components: {
      long_name: string,
      short_name: string,
      types: string[]
    }[]
  },
  is_remote: boolean,
  name: string,
  id: string
}

export interface BreezyJobApiFormat {
  id: string,
  friendly_id: string,
  name: string,
  url: string,
  published_date: string,
  type: {
    id: string,
    name: string
  }
  location: BreezyLocation,
  department: string | null,
  salary: string,
  company: {
    name: string,
    logo_url: string | null,
    friendly_id: string,
    isMultipleLocationsEnabled: boolean
  },
  locations: BreezyLocation[]
}

export interface DayforceJobApiFormat {
  Title: string,
  Description: string,
  ClientSiteName: string,
  ClientSiteXRefCode: string,
  CompanyName: string,
  ParentCompanyName: string,
  JobDetailsUrl: string,
  ApplyUrl: string,
  City?: string,
  State?: string,
  Country?: string,
  PostalCode?: string,
  JobFamily?: string,
  DatePosted: string,
  LastUpdated: string,
  ReferenceNumber: number,
  CultureCode: string,
  ParentRequisitionCode: number,
  MinHiringRate: number,
  MaxHiringRate: number,
  JobType: number,
  TravelRequired: number,
  IsVirtualLocation: boolean
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

export interface JobviteJobApiFormat {
  agency_x0020_access: string,
  'apply-url': string,
  briefdescription: string,
  category: string,
  created_x0020_on: string,
  date: string,
  department: string,
  description: string,
  'detail-url': string,
  externalJobPostingId: string,
  hiring_x0020_manager: string,
  id: string,
  jobtype: string,
  location: string,
  region: string,
  requisitionid: 1280,
  title: string,
  workflow: string
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

interface RecruiteeBodyTranslations {
  [languageCode: string]: {
    body: string
  }
}

export interface RecruiteeJobApiFormat {
  id: number,
  guid: string,
  slug: string,
  title: string,
  status: string,
  position: number,
  department: string | null,
  category_code: string,
  employment_type_code: string,
  experience_code: string,
  education_code: string,
  tags: string[],
  highlight: string | null,
  cover_image: string | null,
  sharing_image: string | null,
  sharing_title: string,
  sharing_description: string,
  description: string,
  requirements: string,
  translations: {
    [languageCode: string]: {
      description: string,
      title: string,
      highlight: string | null,
      sharing_image: string | null,
      requirements: string,
      locations_question: string,
      sharing_description: string,
      sharing_title: string
    }
  },
  created_at: string,
  updated_at: string,
  published_at: string,
  close_at: string | null,
  remote: boolean,
  hybrid: boolean,
  on_site: boolean,
  location: string,
  city: string,
  state_code: string,
  state_name: string,
  postal_code: string,
  country: string,
  country_code: string,
  locations: {
    id: number,
    name: string,
    state: string,
    country: string,
    city: string,
    translations: {
      [languageCode: string]: {
        name: string,
        city: string,
        postal_code: string,
        street: string,
        note: string | null
      }
    },
    country_code: string,
    postal_code: string,
    state_code: string,
    street: string,
    note: string | null
  }[],
  locations_question: string,
  locations_question_type: string,
  locations_question_required: boolean,
  location_question_visible: boolean,
  min_hours: number | null,
  max_hours: number | null,
  min_hours_per_week: number | null,
  max_hours_per_week: number | null,
  salary: {
    min: number | null,
    max: number | null,
    period: string | null,
    currency: string | null
  },
  options_salutation: string,
  options_phone: string,
  options_title: string,
  options_cv: string,
  options_photo: string,
  options_cover_letter: string,
  open_questions: {
    id: number,
    position: number,
    options: {
      length?: number
    },
    required: boolean,
    body: string,
    kind: any,
    translations: RecruiteeBodyTranslations,
    open_question_options: {
      id: number,
      position: number,
      body: string,
      translations: RecruiteeBodyTranslations
    }[]
  }[],
  dynamic_fields: unknown[],
  company_name: string,
  mailbox_email: string,
  careers_url: string,
  careers_apply_url: string
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