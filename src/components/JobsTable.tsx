import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { Job } from '../types';
import JobRow from './JobRow';

interface JobsTableProps {
  jobs: Job[];
}

const alphabetizeDesc = (a: string | Date, b: string | Date) => {
  if (a < b) {
    return 1;
  }

  if (a > b) {
    return -1;
  }

  return 0;
};

const alphabetizeAsc = (a: string | Date, b: string | Date) => {
  if (a > b) {
    return 1;
  }

  if (a < b) {
    return -1;
  }

  return 0;
};

const JobsTable = ({ jobs }: JobsTableProps): ReactElement | string => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');

  const allJobs = useMemo(() => 
    [...jobs].sort((a: Job, b: Job) => alphabetizeDesc(a.updated, b.updated)),
    [jobs]
  );

  const companiesWithJobs = useMemo(() =>
    Array.from(
      new Set(
        allJobs
          .map(job => job.companyName)))
          .sort(alphabetizeAsc),
      [allJobs]
  );

  const jobsToShow = useMemo(
    () =>
      selectedCompany ?
        allJobs.filter(job => job.companyName === selectedCompany)
        : allJobs,
      [allJobs, selectedCompany]
  );
  
  const selectCompany = (e: SelectChangeEvent) => {
    if (e?.target?.value) {
      setSelectedCompany(e.target.value);
    }
  };

  return (
    <>
      <p className="mt-12 mb-6">You have {jobsToShow.length} jobs to review.</p>
      {companiesWithJobs.length ? (
        <FormControl fullWidth>
          <InputLabel id="selected-company-label">Select company</InputLabel>
            <Select
              labelId="selected-company-label"
              id="selected-company-input"
              value={selectedCompany}
              label="Select company"
              onChange={selectCompany}
            >
          {companiesWithJobs.map(company => (
            <MenuItem
              key={company}
              value={company}
            >
              {company}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      ): null}
      <table className="table-auto mt-6 border border-gray-400 dark:border-gray-500">
        <thead className="text-sm text-left font-semibold">
          <tr>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Last Updated</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Company Name</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Title</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">Published</th>
            <th className="p-2 border border-gray-300 dark:border-gray-600">ID</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {jobsToShow.map(job => <JobRow key={job.id} job={job} />)}
        </tbody>
      </table>
    </>
  )
}

export default JobsTable;