import { useEffect, useState } from 'react';
import { createApiBatch } from './api';
import JobsTable from './components/JobsTable';
import { formatDate, parseCsv } from './utils';
import csv from './data/jobBoards.csv?raw';

function App() {
  const [jobs, setJobs] = useState([]);
  const today = formatDate();

  useEffect(() => {
    if (!jobs.length) {
      const csvToArray = parseCsv(csv);
      
      Promise.allSettled()
    }
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">Job search for {today}</h1>
      { jobs && (
        <JobsTable jobs={jobs} />
      )}
    </>
  );
}

export default App
