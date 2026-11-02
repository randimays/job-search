import { TABLE_CELL_CLASS } from '../constants';
import type { Failure } from '../types';
import FailuresRow from './FailuresRow';

interface FailuresTableProps {
  failures: Failure[];
}

const FailuresTable = ({ failures }: FailuresTableProps) => {
  return (
    <>
      <p className="mt-12">You have {failures.length} failed calls for today.</p>
      <table className="table-auto mt-6 border border-gray-400 dark:border-gray-500">
        <thead className="text-sm text-left font-semibold">
          <tr>
            <th className={`p-2 ${TABLE_CELL_CLASS}`}>Platform</th>
            <th className={`p-2 ${TABLE_CELL_CLASS}`}>Company Name</th>
            <th className={`p-2 ${TABLE_CELL_CLASS}`}>Company Identifier</th>
            <th className={`p-2 ${TABLE_CELL_CLASS}`}>Reason</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {failures.map(failure => 
            <FailuresRow
              key={`${failure.row[0]}:${failure.row[1]}`}
              failure={failure}
            />
          )}
        </tbody>
      </table>
    </>
  )
};

export default FailuresTable;