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
      <td>
        {published ? <span>{formatDate(published)}</span> : null}
      </td>
      <td>{companyName}</td>
      <td><a href={url}>{title} &#8250;</a></td>
      <td>
        {updated ? <span>{formatDate(updated)}</span> : null}
      </td>
      <td>
        {deadline ? <span>{formatDate(deadline)}</span> : null}
      </td>
    </tr>
  );
};

export default JobRow;