export interface Job {
  companyName: string,
  id: string | null,
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