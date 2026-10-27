import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ashbyHandler,
  bambooHandler,
  breezyHandler,
  gemHandler,
  greenhouseHandler,
  kulaHandler,
  leverHandler,
  paylocityHandler,
  ripplingHandler,
  workableHandler,
  workdayHandler
} from '../../utils/ats-handlers';
import { AshbyMock } from '../../mock/ashby';
import { BambooMock } from '../../mock/bamboo';
import { BreezyMock } from '../../mock/breezy';
import { GemMock } from '../../mock/gem';
import { GreenhouseMock } from '../../mock/greenhouse';
import { KulaMock } from '../../mock/kula';
import { LeverMock } from '../../mock/lever';
import { PaylocityMock } from '../../mock/paylocity';
import { RipplingMock } from '../../mock/rippling';
import { WorkableMock } from '../../mock/workable';
import { WorkdayMock } from '../../mock/workday';

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
          published: new Date('2026-10-14T17:00:00.000Z'),
          title: 'Software Engineer III',
          updated: new Date('2026-10-14T17:00:00.000Z'),
          url: 'https://ats.rippling.com/mccicareers/jobs/9f630b2a-f7c7-4e5e-b2a1-ff69f2c5efd9',
        }
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
