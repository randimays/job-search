import type { ReactElement } from 'react';
import type { Failure } from '../types';
import { TABLE_CELL_CLASS } from '../constants';

interface FailuresRowProps {
  failure: Failure;
}

const FailuresRow = ({ failure }: FailuresRowProps): ReactElement | null => {
  const { reason, row } = failure;

  if (!reason || !row) {
    return null;
  }

  return (
    <tr>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{row.provider}</td>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{row.companyName}</td>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{row.boardToken}</td>
      <td className={`p-1 ${TABLE_CELL_CLASS}`}>{reason}</td>
    </tr>
  );
};

export default FailuresRow;