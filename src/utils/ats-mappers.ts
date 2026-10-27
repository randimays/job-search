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
  LeverJobPosting,
  PaylocityJobApiFormat,
  RecruiteeJobApiFormat,
  RipplingJobApiFormat,
  WorkableJobApiFormat,
  WorkdayJobApiFormat
} from '../types/job-api-format';
import type { Job } from '../types';
import { cleanUpAPIString, createAPIDate, determinePublishDateForWorkday } from '.';

// -------- Mappers
// Used to map an API response to a Job type for easy formatting

export const ashbyMapper = (job: AshbyJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.id || '',
  published: createAPIDate(job?.publishedAt),
  title: cleanUpAPIString(job.title),
  updated: createAPIDate(job?.publishedAt), // Ashby doesn't have "updated" so we use publish date instead
  url: cleanUpAPIString(job.jobUrl),
});

export const bambooMapper = (job: BambooHrJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.id || '',
  published: createAPIDate(), // BambooHR does not have published dates
  title: cleanUpAPIString(job.jobOpeningName),
  updated: createAPIDate(), // BambooHR does not have updated dates
  url: `https://maishameds.bamboohr.com/careers/${job.id}`
});

export const breezyMapper = (job: BreezyJobApiFormat): Job => ({
  companyName: job?.company?.name,
  id: job?.id || '',
  published: createAPIDate(job?.published_date), 
  title: cleanUpAPIString(job.name),
  updated: createAPIDate(job?.published_date),
  url: job?.url
});

export const clearCompanyMapper = (job: ClearCompanyJobApiFormat): Job => ({
  companyName: job?.brandName,
  id: job?.id || '',
  published: createAPIDate(job?.openDate), 
  title: cleanUpAPIString(job.positionTitle),
  updated: createAPIDate(job?.postedDate),
  url: job?.applyLink
});

export const dayforceMapper = (job: DayforceJobApiFormat): Job => ({
  companyName: job?.CompanyName,
  id: job?.ReferenceNumber.toString() || '', // TODO these have duplicates; need a unique ID
  published: createAPIDate(job?.DatePosted), 
  title: cleanUpAPIString(job.Title),
  updated: createAPIDate(job?.LastUpdated),
  url: job?.JobDetailsUrl
});

export const gemMapper = (job: GemJobsApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.id || '',
  published: createAPIDate(job?.first_published_at),
  title: cleanUpAPIString(job.title),
  updated: createAPIDate(job?.updated_at),
  url: cleanUpAPIString(job.absolute_url),
});

export const greenhouseMapper = (job: GreenhouseJobApiFormat): Job => ({
  companyName: cleanUpAPIString(job.company_name),
  id: job.id.toString(),
  published: createAPIDate(job?.first_published),
  title: cleanUpAPIString(job.title),
  updated: createAPIDate(job?.updated_at),
  url: cleanUpAPIString(job.absolute_url),
});

export const jobviteMapper = (job: JobviteJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job.id,
  published: createAPIDate(job?.created_x0020_on),
  title: cleanUpAPIString(job.title),
  updated: createAPIDate(job?.date),
  url: cleanUpAPIString(job['apply-url']),
});

export const kulaMapper = (job: KulaJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job.id.toString(),
  published: createAPIDate(job?.launch_at),
  title: cleanUpAPIString(job.title),
  updated: createAPIDate(job?.launch_at),
  url: 'https://careers.kula.ai/hire', // No distinct URLs for job postings
});

export const leverMapper = (job: LeverJobPosting, companyName: string): Job => ({
  companyName,
  id: job?.id || '',
  published: new Date(job?.createdAt),
  title: cleanUpAPIString(job.text),
  updated: new Date(job?.createdAt), // Lever doesn't have "updated" so we use publish date instead,
  url: job?.hostedUrl
});

export const paylocityMapper = (job: PaylocityJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job.JobId.toString(),
  published: createAPIDate(job?.PublishedDate),
  title: cleanUpAPIString(job.JobTitle),
  updated: createAPIDate(job?.PublishedDate), // Paylocity doesn't have "updated" so we use publish date instead,
  url: `https://recruiting.paylocity.com/Recruiting/Jobs/Details/${job.JobId}`
});

export const recruiteeMapper = (job: RecruiteeJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job.id.toString(),
  published: createAPIDate(job?.published_at),
  title: cleanUpAPIString(job.title),
  updated: createAPIDate(job?.updated_at),
  url: job.careers_url
});

export const ripplingMapper = (job: RipplingJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.uuid || '',
  published: createAPIDate(), // Rippling doesn't have any dates
  title: cleanUpAPIString(job.name),
  updated: createAPIDate(), // Rippling doesn't have any dates
  url: job?.url
});

export const workableMapper = (job: WorkableJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.shortcode || '',
  published: createAPIDate(job?.created_at),
  title: cleanUpAPIString(job.title),
  updated: createAPIDate(job?.published_on),
  url: job?.url
});

export const workdayMapper = (job: WorkdayJobApiFormat, companyName: string): Job => {
  let id = '';
  let slug: string = '';

  if (job?.externalPath) {
    slug = job.externalPath;
  } else if (job?.url) {
    slug = job.url;
  }

  if (slug) {
    const splitSlug = slug.split('_');
    id = splitSlug[splitSlug.length - 1];
  }
  
  return {
    companyName,
    id,
    published: determinePublishDateForWorkday(job?.postedOn, companyName),
    title: cleanUpAPIString(job.title),
    updated: determinePublishDateForWorkday(job?.postedOn, companyName),
    url: job.url
  };
};