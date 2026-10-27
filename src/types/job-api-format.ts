// -------- API types
export interface AshbyJobApiFormat {
  id: string,
  title: string,
  location: string,
  publishedAt: string,
  isRemote: boolean,
  workplaceType: string,
  jobUrl: string,
}

export interface BambooHrJobApiFormat {
  id: string,
  jobOpeningName: string,
  atsLocation: {
    country: string | null,
  },
  isRemote: boolean | null,
  locationType: string
}

export interface BreezyJobApiFormat {
  id: string,
  name: string,
  url: string,
  published_date: string,
  location: {
    country?: {
      name: string,
    },
    is_remote: boolean | null,
  },
  company: {
    name: string,
  }
}

export interface ClearCompanyJobApiFormat {
  id: string,
  positionTitle: string,
  openDate: string,
  postedDate: string,
  officeName: string,
  jobFunctionName: string | null,
  location: string,
  locations: {
    country: string,
    isRemote: boolean
  }[],
  brandName: string,
  applyLink: string,
}

export interface DayforceJobApiFormat {
  Title: string,
  CompanyName: string,
  Description?: string,
  JobDetailsUrl: string,
  CultureCode?: string,
  Country?: string,
  DatePosted: string,
  LastUpdated: string,
  ReferenceNumber: number,
  IsVirtualLocation: boolean
}

export interface GemJobsApiFormat {
  absolute_url: string,
  created_at: string,
  first_published_at: string,
  id: string,
  location: {
    name: string,
  },
  location_type: string,
  title: string,
  updated_at: string
}

export interface GreenhouseJobApiFormat {
  absolute_url: string,
  company_name: string,
  first_published: string,
  id: number,
  location: {
    name: string
  },
  title: string,
  updated_at: string
}

export interface JobviteJobApiFormat {
  created_x0020_on: string,
  date: string,
  'detail-url': string,
  id: string,
  location: string,
  remote_x0020_type?: string,
  title: string,
}

export interface KulaJobApiFormat {
  id: number,
  title: string,
  launch_at: string,
  ats_job: {
    workplace: string,
    offices: {
      name: string,
      country: string,
    }[],
  }
}

export interface LeverJobApiFormat {
  createdAt: number,
  categories: {
    allLocations?: string[],
    location: string
  },
  id: string,
  text: string,
  country: string,
  workplaceType: string,
  hostedUrl: string,
}

export interface PaylocityJobApiFormat {
  JobId: number,
  JobTitle: string,
  PublishedDate: string,
  JobLocation: {
    Country: string,
  },
  IsRemote: boolean,
}

export interface RecruiteeJobApiFormat {
  id: number,
  title: string,
  updated_at: string,
  published_at: string,
  remote: boolean,
  country: string,
  careers_url: string,
}

export interface RipplingJobApiFormat {
  uuid: string,
  name: string,
  url: string,
  workLocation: {
    label: string,
  }
}

export interface WordpressJobApiFormat {
  id: number,
  date: string,
  link: string,
  modified: string,
  title: {
    rendered: string
  },
  workplace_type_details: {
    name: string,
  }[]
}

export interface WorkableJobApiFormat {
  title: string,
  shortcode: string,
  telecommuting: boolean,
  url: string,
  published_on: string,
  created_at: string,
  country: string,
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

export type ApiJob =
  AshbyJobApiFormat |
  BambooHrJobApiFormat |
  BreezyJobApiFormat |
  ClearCompanyJobApiFormat |
  DayforceJobApiFormat |
  GemJobsApiFormat | 
  GreenhouseJobApiFormat |
  JobviteJobApiFormat |
  KulaJobApiFormat |
  LeverJobApiFormat |
  PaylocityJobApiFormat |
  RecruiteeJobApiFormat |
  RipplingJobApiFormat |
  WordpressJobApiFormat |
  WorkableJobApiFormat |
  WorkdayJobApiFormat;