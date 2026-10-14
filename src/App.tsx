import { useEffect, useState } from 'react';
import { fetchJobs } from './api';
import JobsTable from './components/JobsTable';
import { formatDate } from './utils';

function App() {
  const [jobs, setJobs] = useState([]);
  const today = formatDate();

  useEffect(() => {
    if (!jobs.length) {
      setJobs(fetchJobs('Greenhouse', 'capitaltg'));
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
