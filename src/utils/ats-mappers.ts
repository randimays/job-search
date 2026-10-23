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
import { cleanUpAPIString, determinePublishDateForWorkday } from '.';

// -------- Mappers
// Used to map an API response to a Job type for easy formatting

export const ashbyMapper = (job: AshbyJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.id || '',
  published: new Date(job.publishedAt),
  title: cleanUpAPIString(job.title),
  updated: new Date(job.publishedAt), // Ashby doesn't have "updated" so we use publish date instead
  url: cleanUpAPIString(job.jobUrl),
});

export const bambooMapper = (job: BambooHrJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.id || '',
  published: new Date(), // BambooHR does not have published dates
  title: cleanUpAPIString(job.jobOpeningName),
  updated: new Date(), // BambooHR does not have updated dates
  url: `https://maishameds.bamboohr.com/careers/${job.id}`
});

export const gemMapper = (job: GemJobsApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.id || '',
  published: new Date(job?.first_published_at),
  title: cleanUpAPIString(job.title),
  updated: new Date(job?.updated_at),
  url: cleanUpAPIString(job.absolute_url),
});

export const greenhouseMapper = (job: GreenhouseJobApiFormat): Job => ({
  companyName: cleanUpAPIString(job.company_name),
  id: job.id.toString(),
  published: new Date(job.first_published),
  title: cleanUpAPIString(job.title),
  updated: new Date(job?.updated_at),
  url: cleanUpAPIString(job.absolute_url),
});

export const kulaMapper = (job: KulaJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job.id.toString(),
  published: new Date(job.launch_at),
  title: cleanUpAPIString(job.title),
  updated: new Date(job?.launch_at),
  url: 'https://careers.kula.ai/hire', // No distinct URLs for job postings
});

export const leverMapper = (job: LeverJobPosting, companyName: string): Job => ({
  companyName,
  id: job?.id || '',
  published: new Date(job?.createdAt),
  title: cleanUpAPIString(job.text),
  updated: new Date(job.createdAt), // Lever doesn't have "updated" so we use publish date instead,
  url: job?.hostedUrl
});

export const paylocityMapper = (job: PaylocityJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job.JobId.toString(),
  published: new Date(job?.PublishedDate),
  title: cleanUpAPIString(job.JobTitle),
  updated: new Date(job.PublishedDate), // Paylocity doesn't have "updated" so we use publish date instead,
  url: `https://recruiting.paylocity.com/Recruiting/Jobs/Details/${job.JobId}`
});

export const ripplingMapper = (job: RipplingJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.uuid || '',
  published: new Date(), // Rippling doesn't have any dates
  title: cleanUpAPIString(job.name),
  updated: new Date(), // Rippling doesn't have any dates
  url: job?.url
});

export const workableMapper = (job: WorkableJobApiFormat, companyName: string): Job => ({
  companyName,
  id: job?.shortcode || '',
  published: new Date(job?.created_at),
  title: cleanUpAPIString(job.title),
  updated: new Date(job.published_on),
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