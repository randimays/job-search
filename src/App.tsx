import { useEffect, useState } from 'react';
import { prepareForApiCalls } from './api';
import JobsTable from './components/JobsTable';
import { formatDate, parseCsv } from './utils';
import csv from './data/jobBoards.csv?raw';
import type { Failure, Job } from './types';
import { useJobs } from './store';
import type { JobsState } from './store';
import FailuresTable from './components/FailuresTable';
import NoResults from './components/NoResults';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [failures, setFailures] = useState<Failure[]>([]);
  const [noResultsCompanies, setNoResultsCompanies] = useState<string[]>([]);
  const today = formatDate();
  const omittedTitlesSet = useJobs((state: JobsState) => state.omittedTitles);
  const omittedTitlesArray = [...omittedTitlesSet].sort();
  const fetchingJobs = useJobs((state: JobsState) => state.fetchingJobs);

  useEffect(() => {
    if (!jobs.length) {
      const csvToArray = parseCsv(csv);

      const fetchData = async () => {
        const response = await prepareForApiCalls(csvToArray);

        console.log('response: ', response);

        if (response?.jobs) {
          setJobs(response.jobs);
        }

        if (response?.failures) {
          setFailures(response.failures);
        }

        if (response?.noResults) {
          setNoResultsCompanies(response.noResults);
        }
      };

      fetchData();      
    }
  }, []);

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Job search for {today}</h1>
      { !fetchingJobs && jobs && (
        <JobsTable jobs={jobs} />
      )}
      { fetchingJobs && <p className="mt-20">Attempting to retrieve job listings for today...</p> }
      { noResultsCompanies.length && <NoResults noResultsCompanies={noResultsCompanies} /> }
      <h2 className="text-2xl text-center font-bold mt-20">Omitted Jobs</h2>
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
