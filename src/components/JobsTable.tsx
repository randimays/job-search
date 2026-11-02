import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { Job } from '../types';
import JobRow from './JobRow';
import { TABLE_CELL_CLASS } from '../constants';

interface JobsTableProps {
  jobs: Job[];
}

const JobsTable = ({ jobs }: JobsTableProps): ReactElement | string => {
  const [selectedCompany, setSelectedCompany] = useState<string>('All');

  const allJobs = useMemo(() => 
    [...jobs].sort((a: Job, b: Job) => b.updated.getTime() - a.updated.getTime()),
    [jobs]
  );

  const companiesWithJobs = useMemo(() => {
    const names = new Set(allJobs.map(job => job.companyName));

    return [...names].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, [allJobs]);

  const jobsToShow = useMemo(
    () => {
      if (selectedCompany === 'All') {
        return allJobs;
      }
    
      return allJobs.filter(job => job.companyName === selectedCompany)
    }, [allJobs, selectedCompany]
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
              <MenuItem value="All">Select a company to filter</MenuItem>
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
            <th className={`p-2 ${TABLE_CELL_CLASS}`}>Last Updated</th>
            <th className={`p-2 ${TABLE_CELL_CLASS}`}>Company Name</th>
            <th className={`p-2 ${TABLE_CELL_CLASS}`}>Title</th>
            <th className={`p-2 ${TABLE_CELL_CLASS}`}>Published</th>
            <th className={`p-2 ${TABLE_CELL_CLASS}`}>ID</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {jobsToShow.map((job, index) => <JobRow key={job.id ? job.id : index} job={job} />)}
        </tbody>
      </table>
    </>
  )
}

export default JobsTable;