import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
} from '../../utils/ats-handlers';
import { AshbyMock } from '../../mock/ashby';
import { BambooMock } from '../../mock/bamboo';
import { BreezyMock } from '../../mock/breezy';
import { ClearCompanyMock } from '../../mock/clearcompany';
import { DayforceMock } from '../../mock/dayforce';
import { GemMock } from '../../mock/gem';
import { GreenhouseMock } from '../../mock/greenhouse';
import { JobviteMock } from '../../mock/jobvite';
import { KulaMock } from '../../mock/kula';
import { LeverMock } from '../../mock/lever';
import { PaylocityMock } from '../../mock/paylocity';
import { RecruiteeMock } from '../../mock/recruitee';
import { RipplingMock } from '../../mock/rippling';
import { WorkableMock } from '../../mock/workable';
import { WorkdayMock } from '../../mock/workday';
import { WordpressMock } from '../../mock/wordpress';

describe('handlers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 14, 12, 0, 0));
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('ashbyHandler', () => {
    it('handles empty jobs array', () => {
      expect(ashbyHandler([], 'Vanta')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = AshbyMock;
  
      expect(ashbyHandler(jobs, 'Vanta')).toEqual([
        {
          companyName: 'Vanta',
          id: '1513e1ac-5dca-4acb-a99d-8b5461115651',
          published: new Date('2025-03-13T22:25:56.507+00:00'),
          title: 'Senior Fullstack Software Engineer, GRC',
          updated: new Date('2025-03-13T22:25:56.507+00:00'),
          url: 'https://jobs.ashbyhq.com/vanta/1513e1ac-5dca-4acb-a99d-8b5461115651'
        },
        {
          companyName: 'Vanta',
          id: '470689af-bbce-4c96-818e-408bf4a6c8e5',
          published: new Date('2026-05-07T17:26:02.787+00:00'),
          title: 'Backend Senior Software Engineer, Identity',
          updated: new Date('2026-05-07T17:26:02.787+00:00'),
          url: 'https://jobs.ashbyhq.com/vanta/470689af-bbce-4c96-818e-408bf4a6c8e5'
        },
      ])
    });
  });
  
  describe('bambooHandler', () => {
    it('handles empty jobs array', () => {
      expect(bambooHandler([], 'Maisha Meds')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = BambooMock;
  
      expect(bambooHandler(jobs, 'Maisha Meds')).toEqual([
        {
          companyName: 'Maisha Meds',
          id: '173',
          published: new Date('2026-10-13T17:00:00.000Z'),
          title: 'Senior Software Engineer',
          updated: new Date('2026-10-13T17:00:00.000Z'),
          url: 'https://maishameds.bamboohr.com/careers/173'
        }
      ])
    });
  });

  describe('breezyHandler', () => {
    it('handles empty jobs array', () => {
      expect(breezyHandler([])).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = BreezyMock;
  
      expect(breezyHandler(jobs)).toEqual([
        {
          companyName: 'Switchboard',
          id: '5720a5741f80',
          published: new Date('2026-10-26T18:50:20.122Z'),
          title: 'Senior Software Engineer',
          updated: new Date('2026-10-26T18:50:20.122Z'),
          url: 'https://switchboard.breezy.hr/p/5720a5741f80-customer-experience-associate-resume-drop-interviewing-begins-nov-dec-2026'
        }
      ])
    });
  });

  describe('clearCompanyHandler', () => {
    it('handles empty jobs array', () => {
      expect(clearCompanyHandler([])).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = ClearCompanyMock;
  
      expect(clearCompanyHandler(jobs)).toEqual([
        {
          companyName: 'Ad Hoc',
          id: 'f71c1213-fe6a-9202-9704-206536d822c5',
          published: new Date('2026-10-26T00:00:00'),
          title: 'Senior Software Engineer - Front End/Back End (Library of Congress)',
          updated: new Date('2026-10-26T00:00:00'),
          url: 'https://adhoc.clearcompany.com/careers/jobs/f71c1213-fe6a-9202-9704-206536d822c5/apply?source=CJB-0'
        },
        {
          companyName: 'Ad Hoc',
          id: '3c96b712-1954-c370-8b20-63c8139925f5',
          published: new Date('2026-10-26T00:00:00'),
          title: 'Software Engineer III - Back End (Library of Congress)',
          updated: new Date('2026-10-26T00:00:00'),
          url: 'https://adhoc.clearcompany.com/careers/jobs/3c96b712-1954-c370-8b20-63c8139925f5/apply?source=CJB-0'
        },
        {
          companyName: 'Ad Hoc',
          id: '91c3f9ee-f8e1-1f08-8091-c42dda76fd68',
          published: new Date('2026-10-08T00:00:00'),
          title: 'Senior Software Engineer - Full Stack (Ruby on Rails)',
          updated: new Date('2026-10-08T00:00:00'),
          url: 'https://adhoc.clearcompany.com/careers/jobs/91c3f9ee-f8e1-1f08-8091-c42dda76fd68/apply?source=CJB-0'
        },
        {
          companyName: 'Ad Hoc',
          id: 'bc376ffe-7a04-fab0-ec9c-fd27dc141683',
          published: new Date('2026-10-06T00:00:00'),
          title: 'Software Engineer III - Full Stack (Drupal)',
          updated: new Date('2026-10-06T00:00:00'),
          url: 'https://adhoc.clearcompany.com/careers/jobs/bc376ffe-7a04-fab0-ec9c-fd27dc141683/apply?source=CJB-0'
        }
      ])
    });
  });

  describe('dayforceHandler', () => {
    it('handles empty jobs array', () => {
      expect(dayforceHandler([])).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = DayforceMock;
  
      expect(dayforceHandler(jobs)).toEqual([
        {
          companyName: 'Stretto',
          id: '179',
          published: new Date('2026-08-04T03:00:00'),
          title: 'Software Engineer',
          updated: new Date('2026-09-17T19:37:38.29'),
          url: 'https://jobs.dayforcehcm.com/en-US/stretto/StrettoCareers/jobs/179'
        }
      ])
    });
  });

  describe('gemHandler', () => {
    it('handles empty jobs array', () => {
      expect(gemHandler([], 'Snout')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = GemMock;
  
      expect(gemHandler(jobs, 'Snout')).toEqual([
        {
          companyName: 'Snout',
          id: 'am9icG9zdDqQjNG0z9Cfaj7woaSEXnLq',
          published: new Date('2025-11-25T18:54:50.362Z'),
          title: 'Senior Software Engineer',
          updated: new Date('2026-06-27T05:37:51.859Z'),
          url: 'https://jobs.gem.com/snout/am9icG9zdDqQjNG0z9Cfaj7woaSEXnLq'
        }
      ])
    });
  });
  
  describe('greenhouseHandler', () => {
    it('handles empty jobs array', () => {
      expect(greenhouseHandler([])).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = GreenhouseMock;
  
      expect(greenhouseHandler(jobs)).toEqual([
        {
          companyName: 'Capital Technology Group',
          id: '5147833007',
          published: new Date('2026-06-09T11:21:53-04:00'),
          title: 'Full Stack Engineer',
          updated: new Date('2026-09-18T07:18:55-04:00'),
          url: 'https://boards.greenhouse.io/capitaltg/jobs/5147833007?gh_jid=5147833007',
        },
        {
          companyName: 'Capital Technology Group',
          id: '5239695007',
          published: new Date('2026-09-16T08:59:35-04:00'),
          title: 'Software Developer',
          updated: new Date('2026-09-16T08:59:35-04:00'),
          url: 'https://boards.greenhouse.io/capitaltg/jobs/5239695007?gh_jid=5239695007',
        }
      ])
    });
  });

  describe('jobviteHandler', () => {
    it('handles empty jobs array', () => {
      expect(jobviteHandler([], 'Uplight')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = JobviteMock;
  
      expect(jobviteHandler(jobs, 'Uplight')).toEqual([
        {
          companyName: 'Uplight',
          id: 'oTxMAfww',
          published: new Date('9/10/2026'),
          title: 'Senior Software Engineer',
          updated: new Date('9/10/2026'),
          url: 'http://app.jobvite.com/CompanyJobs/Job.aspx?c=qf79Vfwa&j=oTxMAfww',
        }
      ])
    });
  });

  describe('kulaHandler', () => {
    it('handles empty jobs array', () => {
      expect(kulaHandler([], 'Swiftly')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = KulaMock;
  
      expect(kulaHandler(jobs, 'Swiftly')).toEqual([
        {
          companyName: 'Swiftly',
          id: '19319',
          published: new Date('2025-11-18T20:16:46.000Z'),
          title: 'Senior Forward Deployed Engineer',
          updated: new Date('2025-11-18T20:16:46.000Z'),
          url: 'https://careers.kula.ai/hire',
        },
        {
          companyName: 'Swiftly',
          id: '52130',
          published: new Date('2026-07-31T19:57:37.000Z'),
          title: 'Senior Software Engineer',
          updated: new Date('2026-07-31T19:57:37.000Z'),
          url: 'https://careers.kula.ai/hire',
        }
      ])
    });
  });

  describe('leverHandler', () => {
    it('handles empty jobs array', () => {
      expect(leverHandler([], 'Ellevation Education')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = LeverMock;
  
      expect(leverHandler(jobs, 'Ellevation Education')).toEqual([
        {
          companyName: 'Ellevation Education',
          id: '63d5bd17-5957-4562-8971-5a096dc28079',
          published: new Date('2026-08-25T15:16:58.630Z'),
          title: 'Senior Forward Deployed Engineer',
          updated: new Date('2026-08-25T15:16:58.630Z'),
          url: 'https://jobs.lever.co/ellevationeducation/63d5bd17-5957-4562-8971-5a096dc28079',
        }
      ]);
    });
  });

  describe('paylocityHandler', () => {
    it('handles empty jobs array', () => {
      expect(paylocityHandler([], 'eSimplicity')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = PaylocityMock;
  
      expect(paylocityHandler(jobs, 'eSimplicity')).toEqual([
        {
          companyName: 'eSimplicity',
          id: '4564982',
          published: new Date('2026-10-06T15:52:39-05:00'),
          title: 'Full Stack Engineer',
          updated: new Date('2026-10-06T15:52:39-05:00'),
          url: 'https://recruiting.paylocity.com/Recruiting/Jobs/Details/4564982',
        },
        {
          companyName: 'eSimplicity',
          id: '4469749',
          published: new Date('2026-09-28T09:18:34-05:00'),
          title: 'Senior DevOps Engineer',
          updated: new Date('2026-09-28T09:18:34-05:00'),
          url: 'https://recruiting.paylocity.com/Recruiting/Jobs/Details/4469749',
        }
      ]);
    });
  });

  describe('recruiteeHandler', () => {
    it('handles empty jobs array', () => {
      expect(recruiteeHandler([], 'Differential')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = RecruiteeMock;
  
      expect(recruiteeHandler(jobs, 'Differential')).toEqual([
        {
          companyName: 'Differential',
          id: '2740642',
          published: new Date('2026-09-09 14:11:36 UTC'),
          title: 'Senior Software Developer',
          updated: new Date('2026-09-09 14:11:36 UTC'),
          url: 'https://careers.differential.com/o/senior-software-developer-4',
        },
        {
          companyName: 'Differential',
          id: '2715929',
          published: new Date('2026-08-19 18:46:32 UTC'),
          title: 'Senior Software Engineer (FinTech)',
          updated: new Date('2026-09-01 15:15:11 UTC'),
          url: 'https://careers.differential.com/o/senior-software-engineer-fintech',
        }
      ]);
    });
  });
  
  describe('ripplingHandler', () => {
    it('handles empty jobs array', () => {
      expect(ripplingHandler([], 'MCCi')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = RipplingMock;
  
      expect(ripplingHandler(jobs, 'MCCi')).toEqual([
        {
          companyName: 'MCCi',
          id: '9f630b2a-f7c7-4e5e-b2a1-ff69f2c5efd9',
          published: new Date('2026-10-13T17:00:00.000Z'),
          title: 'Software Engineer III',
          updated: new Date('2026-10-13T17:00:00.000Z'),
          url: 'https://ats.rippling.com/mccicareers/jobs/9f630b2a-f7c7-4e5e-b2a1-ff69f2c5efd9',
        }
      ]);
    });
  });

  describe('wordpressHandler', () => {
    it('handles empty jobs array', () => {
      expect(wordpressHandler([], 'Aretum')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = WordpressMock;
  
      expect(wordpressHandler(jobs, 'Aretum')).toEqual([
        {
          companyName: 'Aretum',
          id: '86564',
          published: new Date('2026-10-20T18:04:40'),
          title: 'Biomedical Engineering Support Specialist III',
          updated: new Date('2026-10-26T18:17:21'),
          url: 'https://aretum.com/job-openings/biomedical-engineering-support-specialist-iii-3/',
        },
        {
          companyName: 'Aretum',
          id: '86339',
          published: new Date('2026-10-09T15:37:13'),
          title: 'Sr. .NET Developer',
          updated: new Date('2026-10-26T18:17:15'),
          url: 'https://aretum.com/job-openings/sr-net-developer/',
        },
      ]);
    });
  });

  describe('workableHandler', () => {
    it('handles empty jobs array', () => {
      expect(workableHandler([], 'Panorama Education')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = WorkableMock;
  
      expect(workableHandler(jobs, 'Panorama Education')).toEqual([
        {
          companyName: 'Panorama Education',
          id: 'E3D5CEAFC4',
          published: new Date('2026-06-24'),
          title: 'Senior Software Engineer',
          updated: new Date('2026-06-30'),
          url: 'https://apply.workable.com/j/E3D5CEAFC4',
        }
      ]);
    });
  });

  describe('workdayHandler', () => {
    it('handles empty jobs array', () => {
      expect(workdayHandler([], 'Capital One')).toEqual([]);
    });
  
    it('correctly filters a list of jobs per the given keywords', () => {
      const jobs = WorkdayMock;
  
      expect(workdayHandler(jobs, 'Capital One')).toEqual([
        {
          companyName: 'Capital One',
          id: 'JR101609',
          published: new Date('2026-09-19T17:00:00.000Z'),
          title: 'Senior Software Engineer I, Insurance Services',
          updated: new Date('2026-09-19T17:00:00.000Z'),
          url: '/job/IN-Remote/Senior-Software-Engineer-I--Insurance-Services_JR101609',
        }
      ]);
    });
  });
});
