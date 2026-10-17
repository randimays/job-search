import type { ReactElement } from 'react';
import type { Job } from '../types';
import { formatDate } from '../utils';

interface JobRowProps {
  job: Job;
}

const JobRow = ({ job }: JobRowProps): ReactElement | null => {
  const {
    companyName,
    deadline,
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
      <td>{formatDate(updated)}</td>
      <td>{companyName}</td>
      <td><a href={url} target="_blank">{title} &#8250;</a></td>
      <td>{formatDate(published)}</td>
      <td>
        {deadline ? <span>{formatDate(deadline)}</span> : '--'}
      </td>
    </tr>
  );
};

export default JobRow;