interface OmittedJobsProps {
  omittedJobs: string[]
}

const OmittedJobs = ({ omittedJobs }: OmittedJobsProps) => {
  return (
    <>
      <p className="mt-12">These {omittedJobs.length} job titles are United States remote jobs that were filtered out by the keywords. If there's something in here that should be caught in the matches, adjust your keywords to be more (or less) specific.</p>
      <ul className="mt-6 p-3 h-100 border border-gray-300 rounded-md overflow-scroll overflow-x-hidden text-xs">
        {omittedJobs.map(title => <li key={title}>{title}</li>)}
      </ul>
    </>
  );
};

export default OmittedJobs;