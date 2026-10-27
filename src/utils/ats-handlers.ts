import type {
  AshbyJobApiFormat,
  BambooHrJobApiFormat,
  BreezyJobApiFormat,
  ClearCompanyJobApiFormat,
  DayforceJobApiFormat,
  GemJobsApiFormat,
  GreenhouseJobApiFormat,
  JobviteJobApiFormat,
  KulaJobApiFormat,
  LeverJobApiFormat,
  PaylocityJobApiFormat,
  RecruiteeJobApiFormat,
  RipplingJobApiFormat,
  WordpressJobApiFormat,
  WorkableJobApiFormat,
  WorkdayJobApiFormat
} from '../types/job-api-format';
import type { Job } from '../types';
import {
  isHybridOrOnsite,
  isPotentialJobMatch,
  isUnitedStates,
  isUnitedStatesWorkday
} from '.';
import {
  ashbyMapper,
  bambooMapper,
  breezyMapper,
  clearCompanyMapper,
  dayforceMapper,
  gemMapper,
  greenhouseMapper,
  jobviteMapper,
  kulaMapper,
  leverMapper,
  paylocityMapper,
  recruiteeMapper,
  ripplingMapper,
  wordpressMapper,
  workableMapper,
  workdayMapper
} from './ats-mappers';

// -------- Handlers

export const ashbyHandler = (jobs: AshbyJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        job?.isRemote && 
        !isHybridOrOnsite(job?.workplaceType) && 
        isUnitedStates(job?.location))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => ashbyMapper(filteredJob, companyName));
  }

  return [];
};

export const bambooHandler = (jobs: BambooHrJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      // Remote filtering is skipped for Bamboo jobs because so far I've only seen
      // them `null` for `isRemote` and with no location information
      .filter(job => job?.isRemote !== false && isUnitedStates(job?.atsLocation?.country || ''))
      .filter(job => isPotentialJobMatch(job?.jobOpeningName))
      .map(filteredJob => bambooMapper(filteredJob, companyName));
  }

  return [];
};

export const breezyHandler = (jobs: BreezyJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.location?.is_remote && isUnitedStates(job?.location?.country?.name))
      .filter(job => isPotentialJobMatch(job?.name))
      .map(filteredJob => breezyMapper(filteredJob));
  }

  return [];
};

export const clearCompanyHandler = (jobs: ClearCompanyJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.officeName === 'Remote' && isUnitedStates(job?.locations?.[0]?.country))
      .filter(job => isPotentialJobMatch(job?.positionTitle))
      .map(filteredJob => clearCompanyMapper(filteredJob));
  }

  return [];
};

export const dayforceHandler = (jobs: DayforceJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.IsVirtualLocation && isUnitedStates(job?.Country || ''))
      .filter(job => isPotentialJobMatch(job?.Title))
      .map(filteredJob => dayforceMapper(filteredJob));
  }

  return [];
};

export const gemHandler = (jobs: GemJobsApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.location_type === 'remote' && isUnitedStates(job?.location?.name))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => gemMapper(filteredJob, companyName));
  }

  return [];
};

export const greenhouseHandler = (jobs: GreenhouseJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => !isHybridOrOnsite(job?.location?.name) && isUnitedStates(job?.location?.name))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => greenhouseMapper(filteredJob));
  }

  return [];
};

export const jobviteHandler = (jobs: JobviteJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        (job?.remote_x0020_type === 'Remote' || !isHybridOrOnsite(job?.location)) && 
        isUnitedStates(job?.location))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => jobviteMapper(filteredJob, companyName));
  }

  return [];
};

export const kulaHandler = (jobs: KulaJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        job?.ats_job.workplace === 'remote' && 
        isUnitedStates(job?.ats_job?.offices?.[0].country))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => kulaMapper(filteredJob, companyName));
  }

  return [];
};

export const leverHandler = (jobs: LeverJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => !isHybridOrOnsite(job?.workplaceType) && isUnitedStates(job?.country))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.text))
      .map(filteredJob => leverMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const paylocityHandler = (jobs: PaylocityJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.IsRemote && isUnitedStates(job?.JobLocation?.Country))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.JobTitle))
      .map(filteredJob => paylocityMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const recruiteeHandler = (jobs: RecruiteeJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.remote && isUnitedStates(job?.country))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => recruiteeMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const ripplingHandler = (jobs: RipplingJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        !isHybridOrOnsite(job?.workLocation.label) && 
        isUnitedStates(job?.workLocation?.label))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.name))
      .map(filteredJob => ripplingMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const wordpressHandler = (jobs: WordpressJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => !isHybridOrOnsite(job?.workplace_type_details?.[0].name))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title?.rendered))
      .map(filteredJob => wordpressMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const workableHandler = (jobs: WorkableJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job?.telecommuting && isUnitedStates(job?.country))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => workableMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const workdayHandler = (jobs: WorkdayJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => job.remoteType === 'Full Remote' && isUnitedStatesWorkday(job.bulletFields))
      .filter(job => isPotentialJobMatch(job?.title))
      .map(filteredJob => workdayMapper(filteredJob, companyName));
  } 
  
  return [];
};