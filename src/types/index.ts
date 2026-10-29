export interface Job {
  companyName: string,
  id: string,
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

export interface JobsResponse {
  jobs: Job[],
  failures: Failure[],
  noResults: string[]
}