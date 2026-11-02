import type { ReactElement } from 'react';
import type { Job } from '../types';
import { formatDate } from '../utils';
import { TABLE_CELL_CLASS } from '../constants';

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

  if (!companyName || !title) {
    return null;
  }

  return (
    <tr>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{formatDate(updated)}</td>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{companyName}</td>
      {url ? 
        <td className={`p-1 ${TABLE_CELL_CLASS}`}>
          <a
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {title}
          </a>
        </td> :
        <td className={`p-1 ${TABLE_CELL_CLASS}`}>{title}</td>
      }
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{formatDate(published)}</td>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{id}</td>
    </tr>
  );
};

export default JobRow;