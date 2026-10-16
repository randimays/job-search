import { useEffect, useState } from 'react';
import { prepareForApiCalls } from './api';
import JobsTable from './components/JobsTable';
import { formatDate, parseCsv } from './utils';
import csv from './data/jobBoards.csv?raw';
import type { Job } from './types';
import { useJobs } from './store';
import type { JobsState } from './store';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const today = formatDate();
  const omittedTitles = useJobs((state: JobsState) => state.omittedTitles)

  useEffect(() => {
    if (!jobs.length) {
      const csvToArray = parseCsv(csv);

      const fetchData = async () => {
        const response = await prepareForApiCalls(csvToArray);
        // const { jobs, failures } = await prepareForApiCalls(csvToArray);

        // if (jobs.length) {
        //   setJobs(jobs);
        // }

        // TODO do something with the failures

        console.log('response: ', response);
        // console.log('failures: ', failures);
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
      <h2 className="text-2xl font-bold">Omitted Jobs</h2>
      <p>These job titles were filtered out by the regex logic. If there's something in here that should be caught in the matches, adjust your keywords to be more (or less) specific.</p>
    </>
  );
}

export default App
