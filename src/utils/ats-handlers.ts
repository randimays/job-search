import type {
  AshbyJobApiFormat,
  BambooHrJobApiFormat,
  GemJobsApiFormat,
  GreenhouseJobApiFormat,
  KulaJobApiFormat,
  LeverJobPosting,
  PaylocityJobApiFormat,
  RipplingJobApiFormat,
  WorkableJobApiFormat,
  WorkdayJobApiFormat
} from '../types/job-api-format';
import type { Job } from '../types';
import { isRemoteOrVirtualUS, isPotentialJobMatch, isUnitedStates } from '.';
import {
  ashbyMapper,
  bambooMapper,
  gemMapper,
  greenhouseMapper,
  kulaMapper,
  leverMapper,
  paylocityMapper,
  ripplingMapper,
  workableMapper,
  workdayMapper
} from './ats-mappers';

// -------- Handlers

export const ashbyJobsHandler = (jobs: AshbyJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.isRemote && isUnitedStates(job?.location))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => ashbyMapper(filteredJob, companyName));
  }

  return [];
};

export const bambooJobsHandler = (jobs: BambooHrJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      // Remote filtering is skipped for Bamboo jobs because so far I've only seen
      // them `null` for `isRemote` and with no location information
      .filter(job => isPotentialJobMatch(job?.jobOpeningName))
      .map(filteredJob => bambooMapper(filteredJob, companyName));
  }

  return [];
};

export const gemJobsHandler = (jobs: GemJobsApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.location_type === 'remote' && isUnitedStates(job?.location?.name))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => gemMapper(filteredJob, companyName));
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

export const kulaJobsHandler = (jobs: KulaJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.ats_job.workplace === 'remote' && isUnitedStates(job?.ats_job?.offices?.[0].location))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => kulaMapper(filteredJob, companyName));
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
};

export const paylocityJobsHandler = (jobs: PaylocityJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.IsRemote && isUnitedStates(job?.JobLocation?.Country))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.JobTitle))
      .map(filteredJob => paylocityMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const ripplingJobsHandler = (jobs: RipplingJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => isRemoteOrVirtualUS(job?.workLocation.label))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.name))
      .map(filteredJob => ripplingMapper(filteredJob, companyName));
  } 
  
  return [];
};


export const workableJobsHandler = (jobs: WorkableJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.telecommuting && isUnitedStates(job?.country))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => workableMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const workdayJobsHandler = (jobs: WorkdayJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      // Remote job filtering is skipped for Workday because the listing doesn't return
      // enough information for us to deterimine this
      .filter(job => isPotentialJobMatch(job?.title))
      .map(filteredJob => workdayMapper(filteredJob, companyName));
  } 
  
  return [];
};