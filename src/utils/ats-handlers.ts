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
      .filter(job => 
        (job?.isRemote !== false && !['0', '2'].includes(job?.locationType)) &&
        isUnitedStates(job?.atsLocation?.country || ''))
      .filter(job => isPotentialJobMatch(job?.jobOpeningName))
      .map(filteredJob => bambooMapper(filteredJob, companyName));
  }

  return [];
};

export const breezyHandler = (jobs: BreezyJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        job?.location?.is_remote !== false && 
        isUnitedStates(job?.location?.country?.name))
      .filter(job => isPotentialJobMatch(job?.name))
      .map(filteredJob => breezyMapper(filteredJob));
  }

  return [];
};

export const clearCompanyHandler = (jobs: ClearCompanyJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => {
        const locations = job?.locations ?? [];
        const clearlyNotRemote = locations.length > 0 && locations.every(l => l?.isRemote === false);

        return !clearlyNotRemote &&
          isUnitedStates(job?.locations?.[0]?.country)
      })
      .filter(job => isPotentialJobMatch(job?.positionTitle))
      .map(filteredJob => clearCompanyMapper(filteredJob));
  }

  return [];
};

export const dayforceHandler = (jobs: DayforceJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    // Dayforce has some contradiction with IsVirtualLocation and what is in the description, so
    // we have some explicit checking here
    const isRemoteText = (job: DayforceJobApiFormat): boolean =>
      /\bremote\b/i.test(job?.Title ?? '') ||
      /(position|role|job)\s+(is|can be|may be)\s+(fully\s+)?remote\b/i.test(job?.Description ?? '');

    const postingsWithVirtualRow = new Set(
      jobs.filter(job => job?.IsVirtualLocation).map(job => job.ReferenceNumber)
    );

    return jobs
    .filter(job => {
        let country = '';
    
        if (job?.Country) {
          country = job.Country;
        } else if (job?.CultureCode) {
          const cultureCodeArray = job.CultureCode.split('-');
          const countryFromCC = cultureCodeArray?.[cultureCodeArray.length - 1];

          if (countryFromCC) {
            country = countryFromCC;
          }
        }

        return (job?.IsVirtualLocation ||
          (!postingsWithVirtualRow.has(job.ReferenceNumber) && isRemoteText(job))) &&
          isUnitedStates(country)
      })
      .filter(job => isPotentialJobMatch(job?.Title))
      .map(filteredJob => dayforceMapper(filteredJob));
  }

  return [];
};

export const gemHandler = (jobs: GemJobsApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        job?.location_type === 'remote' && 
        isUnitedStates(job?.location?.name))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => gemMapper(filteredJob, companyName));
  }

  return [];
};

export const greenhouseHandler = (jobs: GreenhouseJobApiFormat[]): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        !isHybridOrOnsite(job?.location?.name) && 
        isUnitedStates(job?.location?.name))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => greenhouseMapper(filteredJob));
  }

  return [];
};

export const jobviteHandler = (jobs: JobviteJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        (job?.remote_x0020_type !== 'No Remote' &&
          (job?.remote_x0020_type === 'Remote' || !isHybridOrOnsite(job?.location))) && 
        isUnitedStates(job?.location))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => jobviteMapper(filteredJob, companyName));
  }

  return [];
};

export const kulaHandler = (jobs: KulaJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => {
        const places = (job?.ats_job?.offices ?? [])
          .map(office => office?.country || office?.name)
          .filter(Boolean);

        return job?.ats_job?.workplace === 'remote' &&
          (places.length === 0 || places.some(place => isUnitedStates(place)));
      })
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => kulaMapper(filteredJob, companyName));
  }

  return [];
};

export const leverHandler = (jobs: LeverJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => {
        let country = '';
    
        if (job?.country) {
          country = job.country;
        } else if (job?.categories.location) {
          country = job.categories.location
        }

        const hasRemoteLocation = job?.categories?.allLocations?.some(location => /remote/i.test(location));

        return (!isHybridOrOnsite(job?.workplaceType) || hasRemoteLocation) &&
          isUnitedStates(country);
      })
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.text))
      .map(filteredJob => leverMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const paylocityHandler = (jobs: PaylocityJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        job?.IsRemote && 
        isUnitedStates(job?.JobLocation?.Country))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.JobTitle))
      .map(filteredJob => paylocityMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const recruiteeHandler = (jobs: RecruiteeJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job => 
        job?.remote && 
        isUnitedStates(job?.country))
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
      // Rippling returns one row per location, which can result in duplicates for the same job
      .filter((job, index, all) => all.findIndex(other => other.uuid === job.uuid) === index)
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
      .filter(job => 
        job?.telecommuting && 
        isUnitedStates(job?.country))
      .filter(remoteJob => isPotentialJobMatch(remoteJob?.title))
      .map(filteredJob => workableMapper(filteredJob, companyName));
  } 
  
  return [];
};

export const workdayHandler = (jobs: WorkdayJobApiFormat[], companyName: string): Job[] | [] => {
  if (jobs && jobs.length) {
    return jobs
      .filter(job =>
        !isHybridOrOnsite((job?.bulletFields ?? []).join(' ')) &&
        isUnitedStates(job?.locationsText))
      .filter(job => isPotentialJobMatch(job?.title))
      .map(filteredJob => workdayMapper(filteredJob, companyName));
  } 
  
  return [];
};