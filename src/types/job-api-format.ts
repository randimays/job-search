import { z } from 'zod';

// -------- API types
export const AshbySchema = z.object({
  id: z.string(),
  title: z.string(),
  location: z.string().nullish(),
  address: z.object({
    postalAddress: z.object({
      addressCountry: z.string().nullish(),
      addressLocality: z.string().nullish()
    })
  }),
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
  locationType: z.string(),
});

export const BreezySchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.httpUrl(),
  published_date: z.string(),
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
  openDate: z.string(),
  postedDate: z.string(),
  locations: z.array(z.object({
    country: z.string().nullish(),
    isRemote: z.boolean().nullish()
  })),
  brandName: z.string(),
  applyLink: z.httpUrl(),
});

export const DayforceSchema = z.object({
  Title: z.string(),
  CompanyName: z.string(),
  Description: z.string().nullish(),
  JobDetailsUrl: z.httpUrl(),
  CultureCode: z.string().nullish(),
  Country: z.string().nullish(),
  DatePosted: z.string(),
  LastUpdated: z.string(),
  ReferenceNumber: z.number(),
  IsVirtualLocation: z.boolean()
});

export const GemSchema = z.object({
  absolute_url: z.httpUrl(),
  created_at: z.string(),
  first_published_at: z.string(),
  id: z.string(),
  location: z.object({
    name: z.string(),
  }),
  location_type: z.string(),
  title: z.string(),
  updated_at: z.string()
});

export const GreenhouseSchema = z.object({
  absolute_url: z.string(),
  company_name: z.string(),
  first_published: z.string(),
  id: z.number(),
  location: z.object({
    name: z.string()
  }),
  title: z.string(),
  updated_at: z.string()
});

export const JobviteSchema = z.object({
  created_x0020_on: z.string(),
  date: z.string(),
  'detail-url': z.string(),
  id: z.string(),
  location: z.string(),
  remote_x0020_type: z.string().nullish(),
  title: z.string(),
});

export const KulaSchema = z.object({
  id: z.number(),
  title: z.string(),
  launch_at: z.string(),
  ats_job: z.object({
    workplace: z.string(),
    offices: z.array(z.object({
      name: z.string(),
      country: z.string(),
    })),
  })
});

export const LeverSchema = z.object({
  createdAt: z.number(),
  categories: z.object({
    allLocations: z.array(z.string().nullish()).nullish(),
    location: z.string()
  }),
  id: z.string(),
  text: z.string(),
  country: z.string(),
  workplaceType: z.string(),
  hostedUrl: z.string(),
});

export const PaylocitySchema = z.object({
  JobId: z.number(),
  JobTitle: z.string(),
  PublishedDate: z.string(),
  JobLocation: z.object({
    Country: z.string(),
  }),
  IsRemote: z.boolean(),
});

export const PinpointSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.httpUrl(),
  workplace_type: z.string(),
  location: z.object({
    name: z.string()
  })
});

export const RecruiteeSchema = z.object({
  id: z.number(),
  title: z.string(),
  updated_at: z.string(),
  published_at: z.string(),
  remote: z.boolean(),
  country: z.string(),
  careers_url: z.string(),
});

export const RipplingSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  url: z.string(),
  workLocation: z.object({
    label: z.string(),
  })
});

export const SmartRecruitersSchema = z.object({
  id: z.string(),
  name: z.string(),
  company: z.object({
    name: z.string()
  }),
  releasedDate: z.string(),
  location: z.object({
    remote: z.boolean(),
    fullLocation: z.string(),
  }),
  ref: z.httpUrl()
});

export const WordpressSchema = z.object({
  id: z.number(),
  date: z.string(),
  link: z.string(),
  modified: z.string(),
  title: z.object({
    rendered: z.string()
  }),
  workplace_type_details: z.array(z.object({
    name: z.string(),
  })).default([])
});

export const WorkableSchema = z.object({
  title: z.string(),
  shortcode: z.string(),
  telecommuting: z.boolean(),
  url: z.string(),
  published_on: z.string(),
  created_at: z.string(),
  country: z.string(),
});

export const WorkdaySchema = z.object({
  title: z.string(),
  externalPath: z.string(),
  locationsText: z.string().nullish(),
  postedOn: z.string(),
  bulletFields: z.array(z.string()),
  remoteType: z.string(),
  url: z.string()
});

export type AshbyJobApiFormat = z.infer<typeof AshbySchema>;
export type BambooHrJobApiFormat = z.infer<typeof BambooSchema>;
export type BreezyJobApiFormat = z.infer<typeof BreezySchema>;
export type ClearCompanyJobApiFormat = z.infer<typeof ClearCompanySchema>;
export type DayforceJobApiFormat = z.infer<typeof DayforceSchema>;
export type GemJobsApiFormat = z.infer<typeof GemSchema>;
export type GreenhouseJobApiFormat = z.infer<typeof GreenhouseSchema>;
export type JobviteJobApiFormat = z.infer<typeof JobviteSchema>;
export type KulaJobApiFormat = z.infer<typeof KulaSchema>;
export type LeverJobApiFormat = z.infer<typeof LeverSchema>;
export type PaylocityJobApiFormat = z.infer<typeof PaylocitySchema>;
export type PinpointJobApiFormat = z.infer<typeof PinpointSchema>;
export type RecruiteeJobApiFormat = z.infer<typeof RecruiteeSchema>;
export type RipplingJobApiFormat = z.infer<typeof RipplingSchema>;
export type SmartRecruitersJobApiFormat = z.infer<typeof SmartRecruitersSchema>;
export type WordpressJobApiFormat = z.infer<typeof WordpressSchema>;
export type WorkableJobApiFormat = z.infer<typeof WorkableSchema>;
export type WorkdayJobApiFormat = z.infer<typeof WorkdaySchema>;

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