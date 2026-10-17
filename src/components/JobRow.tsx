import type { ReactElement } from 'react';
import type { Job } from '../types';
import { formatDate } from '../utils';

interface JobRowProps {
  job: Job;
}

const JobRow = ({ job }: JobRowProps): ReactElement | null => {
  const {
    companyName,
    id,
    published,
    title,
    updated,
    url
  } = job;

  if (!companyName || !title || !url) {
    return null;
  }

  return (
    <tr>
      <td className="p-1 border border-gray-300 dark:border-gray-600">{formatDate(updated)}</td>
      <td className="p-1 border border-gray-300 dark:border-gray-600">{companyName}</td>
      <td className="p-1 border border-gray-300 dark:border-gray-600"><a href={url} target="_blank">{title} &#8250;</a></td>
      <td className="p-1 border border-gray-300 dark:border-gray-600">{formatDate(published)}</td>
      <td className="p-1 border border-gray-300 dark:border-gray-600">{id}</td>
    </tr>
  );
};

export default JobRow;