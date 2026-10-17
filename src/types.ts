// -------- API types

export interface GreenhouseJobApiFormat {
  absolute_url: string,
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

// -------- App types

export interface Job {
  companyName: string,
  id: number | null,
  published: Date,
  title: string,
  updated: Date,
  url: string
}