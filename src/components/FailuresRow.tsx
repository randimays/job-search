import type { ReactElement } from 'react';
import type { Failure } from '../types';
import { TABLE_CELL_CLASS } from '../constants';

interface FailuresRowProps {
  failure: Failure;
}

const FailuresRow = ({ failure }: FailuresRowProps): ReactElement | null => {
  const { reason, row } = failure;

  if (!reason || !row.length) {
    return null;
  }

  return (
    <tr>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{row[0]}</td>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{row[2]}</td>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{row[1]}</td>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{reason.message}</td>
    </tr>
  );
};

export default FailuresRow;