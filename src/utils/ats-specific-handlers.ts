import type { GreenhouseJobApiFormat, Job, LeverJobPosting } from '../types';
import { cleanUpAPIString, isRemoteOrVirtualUS, isPotentialJobMatch } from '.';

// -------- Mappers
// Used to map an API response to a Job type for easy formatting

export const greenhouseMapper = (job: GreenhouseJobApiFormat): Job => {
  return {
    companyName: cleanUpAPIString(job.company_name),
    id: job?.id.toString() || null,
    published: new Date(job.first_published),
    title: cleanUpAPIString(job.title),
    updated: new Date(job?.updated_at),
    url: cleanUpAPIString(job.absolute_url),
  };
};

export const leverMapper = (job: LeverJobPosting, companyName: string): Job => {
  return {
    companyName,
    id: job?.id,
    published: new Date(job?.createdAt),
    title: cleanUpAPIString(job.text),
    updated: null,
    url: job?.applyUrl
  };
};

// -------- Handlers

export const greenhouseJobsHandler = (jobs: GreenhouseJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => isRemoteOrVirtualUS(job?.location?.name))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => greenhouseMapper(filteredJob));
  }

  return [];
};

export const leverJobsHandler = (jobs: LeverJobPosting[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => isRemoteOrVirtualUS(job?.workplaceType))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.text))
      .map(filteredJob => leverMapper(filteredJob, companyName));
  } 
  
  return [];
}