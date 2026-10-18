import type { AshbyJobApiFormat, GreenhouseJobApiFormat, Job, LeverJobPosting, PaylocityJobApiFormat, WorkableJobApiFormat } from '../types';
import { cleanUpAPIString, isRemoteOrVirtualUS, isPotentialJobMatch } from '.';

// -------- Mappers
// Used to map an API response to a Job type for easy formatting

export const ashbyMapper = (job: AshbyJobApiFormat, companyName: string): Job => {
  return {
    companyName,
    id: job?.id,
    published: new Date(job.publishedAt),
    title: cleanUpAPIString(job.title),
    updated: new Date(job.publishedAt), // Ashby doesn't have "updated" so we use publish date instead
    url: cleanUpAPIString(job.jobUrl),
  };
};

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
    updated: new Date(job.createdAt), // Lever doesn't have "updated" so we use publish date instead,
    url: job?.hostedUrl
  };
};

export const paylocityMapper = (job: PaylocityJobApiFormat, companyName: string): Job => {
  return {
    companyName,
    id: job?.JobId?.toString() || '',
    published: new Date(job?.PublishedDate),
    title: cleanUpAPIString(job.JobTitle),
    updated: new Date(job.PublishedDate), // Paylocity doesn't have "updated" so we use publish date instead,
    url: `https://recruiting.paylocity.com/Recruiting/Jobs/Details/${job.JobId}`
  };
};

export const workableMapper = (job: WorkableJobApiFormat, companyName: string): Job => {
  return {
    companyName,
    id: job?.shortcode,
    published: new Date(job?.created_at),
    title: cleanUpAPIString(job.title),
    updated: new Date(job.published_on),
    url: job?.url
  };
};

// -------- Handler
// TODO refactor these to be a generic handler?

export const ashbyJobsHandler = (jobs: AshbyJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.isRemote)
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => ashbyMapper(filteredJob, companyName));
  }

  return [];
};

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

export const paylocityJobsHandler = (jobs: PaylocityJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.IsRemote)
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.JobTitle))
      .map(filteredJob => paylocityMapper(filteredJob, companyName));
  } 
  
  return [];
}


export const workableJobsHandler = (jobs: WorkableJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.telecommuting)
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => workableMapper(filteredJob, companyName));
  } 
  
  return [];
}