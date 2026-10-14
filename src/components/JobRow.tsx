import { Fragment } from 'react';
import type { ReactElement } from 'react';
import type { Job } from '../types';
import { formatDate } from '../utils';

const JobRow = ({
  companyName,
  deadline,
  id,
  published,
  title,
  updated,
  url
}: Job): ReactElement | null => {
  if (!companyName || !title || !url) {
    return null;
  }

  return (
    <Fragment key={id}>
      <td>
        {published ? <span>{formatDate(published)}</span> : null}
      </td>
      <td>{companyName}</td>
      <td><a href={url}>{title}&#8250;</a></td>
      <td>
        {updated ? <span>{formatDate(updated)}</span> : null}
      </td>
      <td>
        {deadline ? <span>{formatDate(deadline)}</span> : null}
      </td>
    </Fragment>
  );
};

export default JobRow;