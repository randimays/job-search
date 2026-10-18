import type { ReactElement } from 'react';
import type { Failure } from '../types';
import FailuresRow from './FailuresRow';

interface FailuresTableProps {
  failures: Failure[];
}

const FailuresTable = ({ failures }: FailuresTableProps): ReactElement | string => {
  if (!failures || !failures.length) {
    return <p className="mt-12">No failures today.</p>;
  }

  return (
    <>
      <p className="mt-12">You have {failures.length} failed calls for today.</p>
      <table className="table-auto mt-6 border border-gray-400 dark:border-gray-500">
        <thead className="text-sm text-left font-semibold">
          <tr>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Platform</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Company Name</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Company Identifier</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Reason</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {failures.map((failure, i) => <FailuresRow key={i} failure={failure} />)}
        </tbody>
      </table>
    </>
  )
}

export default FailuresTable;