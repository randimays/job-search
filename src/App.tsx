import { useEffect, useState } from 'react';
import { fetchJobs } from './api';

function App() {
  const [jobs, setJobs] = useState([]);
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric'});

  useEffect(() => {
    if (!jobs.length) {
      setJobs(fetchJobs('Greenhouse', 'capitaltg'));
    }
  }, []);

  console.log('jobs: ', jobs);

  return (
    <>
      <h1 className="text-3xl font-bold">Job search for {today}</h1>
      <h2 className="text-2xl mt-4">Jobs</h2>
    </>
  );
}

export default App
