import { XMLParser } from 'fast-xml-parser';
import {
  ashbyHandler,
  bambooHandler,
  breezyHandler,
  clearCompanyHandler,
  dayforceHandler,
  gemHandler,
  greenhouseHandler,
  jobviteHandler,
  kulaHandler,
  leverHandler,
  paylocityHandler,
  recruiteeHandler,
  ripplingHandler,
  wordpressHandler,
  workableHandler,
  workdayHandler
} from '../utils/ats-handlers';
import type { Job } from '../types';

interface BoardConfig {
  handler: (jobs: any[], params?: any) => Job[] | null, // TODO finish typing this properly to cover all types of API responses
  name: string,
  url: (board_token: string) => string,
  parse: (response: Response) => Promise<any[]>, // defaults to JSON .jobs
  concurrency?: number
}

// Comment out various sections to speed up local API calls while dev'ing
export const BOARD_CONFIGS: BoardConfig[] = [
  //   {
  //   handler: () => {}, // TODO
  //   name: 'JazzHR',
  //   url: (board_token: string): string => `https://jobs.jobvite.com/${board_token}`
  // },
  {
    handler: ashbyHandler,
    name: 'Ashby',
    url: (board_token: string): string => `https://api.ashbyhq.com/posting-api/job-board/${board_token}?includeCompensation=true`,
    parse: async response => {
      return (await response.json()).jobs;
    }
  },
  {
    handler: bambooHandler,
    name: 'Bamboo',
    url: (board_token: string): string => `/bamboohr/${board_token}/careers/list`,
    parse: async response => {
       return (await response.json()).result;
    }
  },
  {
    handler: breezyHandler,
    name: 'Breezy',
    url: (board_token: string): string => `https://${board_token}.breezy.hr/json`,
    parse: async response => {
      return await response.json();
    }
  },
  {
    handler: clearCompanyHandler,
    name: 'ClearCompany',
    url: (board_token: string): string => `
https://careers-api.clearcompany.com/v1/${board_token}?pageIndex=0&pageSize=10&source=CJB-0`,
    parse: async response => {
      return (await response.json()).results;
    }
  },
  {
    handler: dayforceHandler,
    name: 'Dayforce',
    url: (board_token: string): string => `/dayforce/${board_token}/V1/JobFeeds`,
    parse: async response => {
      return await response.json();
    }
  },
  {
    handler: gemHandler,
    name: 'Gem',
    url: (board_token: string): string => `https://api.gem.com/job_board/v0/${board_token}/job_posts/`,
    parse: async response => {
      return await response.json();
    }
  },
  {
    handler: greenhouseHandler,
    name: 'Greenhouse',
    url: (board_token: string): string => `https://boards-api.greenhouse.io/v1/boards/${board_token}/jobs`,
    parse: async response => {
      return (await response.json()).jobs;
    },
    concurrency: 200
  },
  {
    handler: jobviteHandler,
    name: 'Jobvite',
    url: (board_token: string): string => `/jobvite/CompanyJobs/Xml.aspx?c=${board_token}`,
    parse: async response => {
      const parser = new XMLParser();
      return parser.parse(await response.text())?.result?.job;
    },
  },
  {
    handler: kulaHandler,
    name: 'Kula',
    url: (board_token: string): string => `/kula/api/internal/ats_job_posts?accountName=${board_token}&page=1&type=ats_job_post.index&items=99`,
    parse: async response => {
      return (await response.json()).data;
    },
  },
  {
    handler: leverHandler,
    name: 'Lever',
    url: (board_token: string): string => `https://api.lever.co/v0/postings/${board_token}?group=team&mode=json`,
    parse: async (response) => {
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Unexpected Lever response shape');
      }

      return data.flatMap(department => department.postings);
    }
  },
  {
    handler: paylocityHandler,
    name: 'Paylocity',
    url: (board_token: string): string => `/paylocity/Recruiting/Jobs/All/${board_token}`,
    parse: async (response) => {
      const html = await response.text();
      const match = html.match(/window\.pageData\s*=\s*(\{[\s\S]*?\});?\s*<\/script>/);
      
      if (match) {
        const pageData = JSON.parse(match[1]);

        return (pageData.Jobs ?? []).filter((job: any) => !job.IsInternal);
      }

      return [];
    },
    concurrency: 2
  },
  {  
    handler: recruiteeHandler,
    name: 'Recruitee',
    url: (board_token: string): string => `https://${board_token}.recruitee.com/api/offers`,
    parse: async response => {
      return (await response.json()).offers;
    }
  },
  {
    handler: ripplingHandler,
    name: 'Rippling',
    url: (board_token: string): string => `https://api.rippling.com/platform/api/ats/v1/board/${board_token}/jobs`,
    parse: async response => {
      return await response.json();
    }
  },
  {
    handler: wordpressHandler,
    name: 'Wordpress',
    url: (board_token: string): string => `https://${board_token}.com/wp-json/wp/v2/job_opening?per_page=10&page=1&orderby=date&order=desc`,
    parse: async response => {
      return await response.json();
    }
  },
  {
    handler: workableHandler,
    name: 'Workable',
    url: (board_token: string): string => `https://apply.workable.com/api/v1/widget/accounts/${board_token}?details=true`,
    parse: async response => {
      return await response.json();
    }
  },
  {
    handler: workdayHandler,
    name: 'Workday',
    url: (board_token: string): string => {
      const [tenant, shard, site] = board_token.split(';');

      return `https://${tenant}.${shard}.myworkdayjobs.com/wday/cxs/${tenant}/${site}/jobs`;
    },
    parse: async response => {
      return await response.json();
    }
  },
];