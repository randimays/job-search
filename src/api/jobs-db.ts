interface Job {
  id: number,
  company: string,
  title: string,
  url: string
}

export const getJobs = async(): Promise<Job[]> => {
  const res = await fetch('/api/jobs');

  if (!res.ok) {
    throw new Error('Failed to load jobs from database');
  }

  return res.json();
};

export const addJob = async(job: Omit<Job, 'id'>) => {
  const res = await fetch('/api/jobs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(job)
  });

  if (!res.ok) {
    throw new Error('Failed to add job to database');
  }

  return res.json();
};

