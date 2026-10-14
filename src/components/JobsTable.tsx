import type { ReactElement } from 'react';
import type { Job } from '../types'

const JobsTable = (jobs: Job[]): ReactElement | string => {
  if (!jobs || !jobs.length) {
    return 'No suitable jobs found for today.';
  }

  return (
    <table>
      <thead>
        <th>Published</th>
        <th>Company Name</th>
        <th>Title</th>
        <th>Last Updated</th>
        <th>Deadline</th>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  )
}

export default JobsTable;