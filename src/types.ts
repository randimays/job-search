// -------- API types

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

// -------- App types

export interface Job {
  companyName: string,
  deadline: string | null,
  id: number,
  published: Date | null,
  title: string,
  updated: Date | null,
  url: string
}