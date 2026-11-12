import { useEffect, useMemo, useState } from 'react';
import { CircularProgress, Snackbar } from '@mui/material';
import { prepareForApiCalls } from './api/fetch-jobs-external';
import JobsTable from './components/JobsTable';
import { formatDate } from './utils';
import { parseCsv } from './utils/parse-csv'; // TODO fix this
import csv from './data/jobBoards.csv?raw';
import type { Failure, Job } from './types';
import { useJobs } from './store';
import type { JobsState } from './store';
import FailuresTable from './components/FailuresTable';
import OmittedJobs from './components/OmittedJobs';
import tempIgnoreList from './api/temp-ignore-list';

function App() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [failures, setFailures] = useState<Failure[]>([]);
  const [clipboardTextCopied, setClipboardTextCopied] = useState(false);

  const today = formatDate();
  const omittedTitlesSet = useJobs((state: JobsState) => state.omittedTitles);
  const omittedTitlesArray = [...omittedTitlesSet].sort();
  const fetchingJobs = useJobs((state: JobsState) => state.fetchingJobs);

  const filteredJobs = useMemo(
    () => allJobs.filter(job => !tempIgnoreList.some(id => id === job.id)),
    [allJobs]
  );
  
  const closeSnackbar = () => {
    setClipboardTextCopied(false);
  };

  useEffect(() => {
    if (!allJobs.length) {
      const csvToArray = parseCsv(csv);

      const fetchData = async () => {
        const response = await prepareForApiCalls(csvToArray);
        console.log("🚀 ~ fetchData ~ response:", response)

        if (response?.jobs) {
          // Merge all company job arrays into one array
          const flattenedJobs = response.jobs.flat();

          setAllJobs(flattenedJobs);
        }

        if (response?.failures) {
          setFailures(response.failures);
          console.log("🚀 ~ fetchData ~ response.failures:", response.failures)
        }
      };

      fetchData()
        .catch(error => console.error('Fetch data failed: ', error));      
    }
  }, [allJobs.length]);

  return (
    <>
      <h1 className="text-3xl text-center font-bold">Job search for {today}</h1>
      {(!fetchingJobs && filteredJobs) ? <JobsTable jobs={filteredJobs} setClipboardTextCopied={setClipboardTextCopied} /> : null}
      {fetchingJobs ? (
        <>
          <div className="w-full flex justify-center">
            <CircularProgress aria-label="Loading..." className="mt-20" />
          </div>
          <p className="mt-8 text-center">Retrieving job listings. This may take a couple minutes.</p>
        </>)
        : null}
      <h2 className="text-2xl text-center font-bold mt-20">Omitted Job Titles</h2>
      {!omittedTitlesArray.length ? <p className="mt-12">If there are omitted titles when the search is completed, you'll see them here.</p> : null}
      {omittedTitlesArray.length ? <OmittedJobs omittedJobs={omittedTitlesArray} /> : null}
      {failures.length ? (
        <>
          <h2 className="text-2xl font-bold mt-20">Failed Calls</h2>
          <FailuresTable failures={failures} />
        </>
      ) : null}
      <Snackbar
        open={clipboardTextCopied}
        autoHideDuration={1000}
        onClose={closeSnackbar}
        message="ID(s) copied!"
      />
    </>
  );
}

export default App
