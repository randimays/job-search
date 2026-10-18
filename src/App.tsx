import { useEffect, useState } from 'react';
import { prepareForApiCalls } from './api';
import JobsTable from './components/JobsTable';
import { formatDate, parseCsv } from './utils';
import csv from './data/jobBoards.csv?raw';
import type { Job } from './types';
import { useJobs } from './store';
import type { JobsState } from './store';
import FailuresTable from './components/FailuresTable';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [failures, setFailures] = useState<Job[]>([]);
  const today = formatDate();
  const omittedTitlesSet = useJobs((state: JobsState) => state.omittedTitles);
  const omittedTitlesArray = [...omittedTitlesSet].sort();

  useEffect(() => {
    if (!jobs.length) {
      const csvToArray = parseCsv(csv);

      const fetchData = async () => {
        const response = await prepareForApiCalls(csvToArray);

        if (response?.jobs) {
          setJobs(response.jobs);
        }

        if (response?.failures) {
          setFailures(response.failures);
        }
      };

      fetchData();      
    }
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">Job search for {today}</h1>
      { jobs && (
        <JobsTable jobs={jobs} />
      )}
      <h2 className="text-2xl font-bold mt-20">Omitted Jobs</h2>
      {!omittedTitlesArray.length && <p className="mt-12">If there are omitted titles when the search is completed, you'll see them here.</p>}
      {omittedTitlesArray.length ? (
        <>
          <p className="mt-12">These job titles were filtered out by the regex logic. If there's something in here that should be caught in the matches, adjust your keywords to be more (or less) specific.</p>
          <ul className="mt-6 p-3 h-100 border border-gray-300 rounded-md overflow-scroll overflow-x-hidden text-xs">
            {omittedTitlesArray.map(title => <li key={title}>{title}</li>)}
          </ul>
        </>
      ) : null}
      {failures.length ? (
        <>
          <h2 className="text-2xl font-bold mt-20">Failed Calls</h2>
          <FailuresTable failures={failures} />
        </>
      ) : null}
    </>
  );
}

export default App
