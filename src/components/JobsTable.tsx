import type { ReactElement } from 'react';
import type { Job } from '../types';
import JobRow from './JobRow';

interface JobsTableProps {
  jobs: Job[];
}

const JobsTable = ({ jobs }: JobsTableProps): ReactElement | string => {
  console.log("🚀 ~ JobsTable ~ jobs:", jobs)
  if (!jobs || !jobs.length) {
    return <p className="mt-12">No suitable jobs found for today.</p>;
  }

  return (
    <table className="table-auto mt-12 border border-gray-500 rounded-md">
      <thead className="text-base font-semibold">
        <tr>
          <th>Published</th>
          <th>Company Name</th>
          <th>Title</th>
          <th>Last Updated</th>
          <th>Deadline</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map(job => <JobRow key={job.id} job={job} />)}
      </tbody>
    </table>
  )
}

export default JobsTable;