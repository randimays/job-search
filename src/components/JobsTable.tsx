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

  const flattenedJobs = jobs.flat();
  const sortedJobs = flattenedJobs.sort((a: Job, b: Job) => {
    if (a.updated < b.updated) {
      return 1;
    }

    if (a.updated > b.updated) {
      return -1;
    }

    return 0;
  });

  return (
    <table className="table-auto mt-12 border border-gray-500 rounded-md">
      <thead className="text-base text-left font-semibold">
        <tr>
          <th>Last Updated</th>
          <th>Company Name</th>
          <th>Title</th>
          <th>Published</th>
          <th>Deadline</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {sortedJobs.map(job => <JobRow key={job.id} job={job} />)}
      </tbody>
    </table>
  )
}

export default JobsTable;