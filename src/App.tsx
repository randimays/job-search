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
import OmittedJobs from './components/OmittedJobs';

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
        console.log("🚀 ~ fetchData ~ response:", response)

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
      {(!fetchingJobs && jobs) ? <JobsTable jobs={jobs} /> : null}
      {fetchingJobs ? <p className="mt-20">Attempting to retrieve job listings for today...</p> : null}
      {noResultsCompanies.length ? <NoResults noResultsCompanies={noResultsCompanies} /> : null}
      <h2 className="text-2xl text-center font-bold mt-20">Omitted Jobs</h2>
      {!omittedTitlesArray.length ? <p className="mt-12">If there are omitted titles when the search is completed, you'll see them here.</p> : null}
      {omittedTitlesArray.length ? <OmittedJobs omittedJobs={omittedTitlesArray} /> : null}
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
