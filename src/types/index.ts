export interface Job {
  companyName: string,
  id: string,
  published: Date,
  title: string,
  updated: Date,
  url: string
}

export interface CompanyRow {
  provider: string,
  boardToken: string,
  companyName: string
}

export interface Failure {
  reason: string,
  row: CompanyRow
}

export interface JobsResponse {
  jobs: Job[],
  failures: Failure[],
  noResults: string[]
}