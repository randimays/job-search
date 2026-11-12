import { useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { Job } from '../types';
import JobRow from './JobRow';
import { TABLE_CELL_CLASS } from '../constants';
import { copyIds } from '../utils/copy-id';

interface JobsTableProps {
  jobs: Job[];
  setClipboardTextCopied: (copied: boolean) => void;
}

const JobsTable = ({ jobs, setClipboardTextCopied }: JobsTableProps): ReactElement | string => {
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

      const jobsForSelectedCompany = allJobs.filter(job => job.companyName === selectedCompany);

      if (selectedCompany && !jobsForSelectedCompany.length) {
        setSelectedCompany('All');
      }
    
      return jobsForSelectedCompany;
    }, [allJobs, selectedCompany]
);
  
  const selectCompany = (e: SelectChangeEvent) => {
    if (e?.target?.value) {
      setSelectedCompany(e.target.value);
    }
  };
  const DESIGN_KEYWORDS = ['design'];
  const SENIORITY_KEYWORDS = ['lead', 'principal'];
  const ENGINEERING_KEYWORDS = ['develop', 'engineer'];

  // inside the component
  const { designJobs, engineeringJobs } = useMemo(() => {
    const design: Job[] = [];
    const engineering: Job[] = [];

    for (const job of jobsToShow) {
      const title = job.title.toLowerCase();
      const isDesign = DESIGN_KEYWORDS.some((keyword) => title.includes(keyword));
      const isSeniority = SENIORITY_KEYWORDS.some((keyword) => title.includes(keyword));
      const isEngineering = ENGINEERING_KEYWORDS.some((keyword) => title.includes(keyword));

      if (isEngineering && isSeniority) {
        continue;
      }

      if (isEngineering) {
        engineering.push(job);
      } else if (isDesign || isSeniority) {
        design.push(job);
      }
    }

    return { designJobs: design, engineeringJobs: engineering };
  }, [jobsToShow]);

  const total = jobsToShow.length;

  const tableCreator = (jobsToShow: Job[], type: string) => {
    return (
      <>
        <h2 className="mt-6 text-2xl text-center font-bold">{type} Jobs</h2>
        <button
          className="w-fit block p-1 my-4 mr-2 cursor-pointer border rounded-md"
          onClick={() => copyIds([...jobsToShow.map(job => job.id)], setClipboardTextCopied)}
        >
          Copy all IDs
        </button>
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
            {jobsToShow.map((job, index) => 
              <JobRow
                key={job.id ? job.id : index}
                job={job}
                setClipboardTextCopied={setClipboardTextCopied}
              />
            )}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <p className="mt-12 mb-6 text-center">You have {total} {total === 1 ? 'job' : 'jobs'} to review.</p>
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
      {engineeringJobs.length ? tableCreator(engineeringJobs, 'Engineering') : null}
      {designJobs.length ? tableCreator(designJobs, 'Design') : null}
    </>
  )
}

export default JobsTable;