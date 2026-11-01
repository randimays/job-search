import { z } from 'zod';

// -------- API types
export const AshbySchema = z.object({
  id: z.string(),
  title: z.string(),
  location: z.string().nullish(),
  publishedAt: z.string(),
  workplaceType: z.string(),
  jobUrl: z.httpUrl(),
});

export const BambooSchema = z.object({
  id: z.string(),
  jobOpeningName: z.string(),
  atsLocation: z.object({
    country: z.string().nullish(),
  }),
  isRemote: z.boolean().nullish(),
  locationType: z.string(),
});

export const BreezySchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.httpUrl(),
  published_date: z.string().nullish(),
  location: z.object({
    country: z.object({
      name: z.string().nullish(),
    }),
    is_remote: z.boolean().nullish(),
  }),
  company: z.object({
    name: z.string(),
  })
});

export const ClearCompanySchema = z.object({
  id: z.string(),
  positionTitle: z.string(),
  openDate: z.string().nullish(),
  postedDate: z.string().nullish(),
  locations: z.array(z.object({
    country: z.string().nullish(),
    isRemote: z.boolean().nullish()
  })),
  brandName: z.string(),
  applyLink: z.url(),
});

export type AshbyJobApiFormat = z.infer<typeof AshbySchema>;
export type BambooHrJobApiFormat = z.infer<typeof BambooSchema>;
export type BreezyJobApiFormat = z.infer<typeof BreezySchema>;
export type ClearCompanyJobApiFormat = z.infer<typeof ClearCompanySchema>;






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