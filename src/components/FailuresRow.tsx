import type { ReactElement } from 'react';
import type { Failure } from '../types';

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
      <td className="p-1 border border-gray-300 dark:border-gray-600">{row[0]}</td>
      <td className="p-1 border border-gray-300 dark:border-gray-600">{row[2]}</td>
      <td className="p-1 border border-gray-300 dark:border-gray-600">{row[1]}</td>
      <td className="p-1 border border-gray-300 dark:border-gray-600">{reason.message}</td>
    </tr>
  );
};

export default FailuresRow;