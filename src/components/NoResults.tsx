interface NoResultsProps {
  noResultsCompanies: string[]
}

const NoResults = ({ noResultsCompanies }: NoResultsProps) => {
  return (
    <>
      <h2 className="text-2xl text-center font-bold mt-20">No Results</h2>
      <p className="mt-12">These companies either did not have any jobs posted, or didn't have any jobs that matched the criteria.</p>
      <ul className="mt-6 p-3 h-50 border border-gray-300 rounded-md overflow-scroll overflow-x-hidden text-xs">
        {noResultsCompanies.sort().map(name => <li key={name}>{name}</li>)}
      </ul>
    </>
  )
};

export default NoResults;