import type { ReactElement } from 'react';
import type { Job } from '../types';
import JobRow from './JobRow';

interface JobsTableProps {
  jobs: Job[];
}

const JobsTable = ({ jobs }: JobsTableProps): ReactElement | string => {
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
    <>
      <p className="mt-12">You have {sortedJobs.length} jobs to review.</p>
      <table className="table-auto mt-6 border border-gray-400 dark:border-gray-500">
        <thead className="text-sm text-left font-semibold">
          <tr>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Last Updated</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Company Name</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Title</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Published</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">ID</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {sortedJobs.map(job => <JobRow key={job.id} job={job} />)}
        </tbody>
      </table>
    </>
  )
}

export default JobsTable;