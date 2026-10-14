import type { Job } from './types';

export const formatDate = (date: Date = new Date()): string => {
  if (Number.isNaN(date?.getTime())) {
    return 'Invalid date';
  }

  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric'});
};

export const isSoftwareDeveloperJob = (title: string): boolean => {
  if (!title || typeof title !== 'string') {
    return false;
  }

  // return title.
};

export const greenhouseJobsHandler = (jobs: GreenhouseJobApiFormat[]): Job[] | null => {
  console.log("🚀 ~ greenhouseJobsHandler ~ jobs:", jobs)
  if (!jobs || !jobs.length) {
    console.error('greenhouseJobsHandler: invalid job array given');
    return null;
  }

  // Filter out unsuitable jobs
};