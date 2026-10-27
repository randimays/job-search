import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
  ripplingMapper,
  workableMapper,
  workdayMapper,
} from '../../utils/ats-mappers';
import { AshbyMock } from '../../mock/ashby';
import { BreezyMock } from '../../mock/breezy';
import { ClearCompanyMock } from '../../mock/clearcompany';
import { DayforceMock } from '../../mock/dayforce';
import { GemMock } from '../../mock/gem';
import { GreenhouseMock } from '../../mock/greenhouse';
import { JobviteMock } from '../../mock/jobvite';
import { KulaMock } from '../../mock/kula';
import { LeverMock } from '../../mock/lever';
import { PaylocityMock } from '../../mock/paylocity';
import { RipplingMock } from '../../mock/rippling';
import { WorkableMock } from '../../mock/workable';
import { WorkdayMock } from '../../mock/workday';
import { BambooMock } from '../../mock/bamboo';

describe('mappers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 14, 12, 0, 0));
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('ashbyMapper', () => {
    const expectedAshbyReturn = {
      companyName: 'Vanta',
      id: '1513e1ac-5dca-4acb-a99d-8b5461115651',
      published: new Date('2025-03-13T22:25:56.507+00:00'),
      title: 'Senior Fullstack Software Engineer, GRC',
      updated: new Date('2025-03-13T22:25:56.507+00:00'),
      url: 'https://jobs.ashbyhq.com/vanta/1513e1ac-5dca-4acb-a99d-8b5461115651'
    };

    it('properly formats an API entry from Ashby', () => {
      const mockEntry = AshbyMock[1];
      expect(ashbyMapper(mockEntry, 'Vanta')).toEqual(expectedAshbyReturn);
    });

    it('properly handles missing ID', () => {
      const mockWithoutId = {
        ...AshbyMock[1],
        id: '',
      };

      expect(ashbyMapper(mockWithoutId, 'Vanta')).toEqual({
        ...expectedAshbyReturn,
        id: ''
      });
    });
  });

  describe('bambooMapper', () => {
    const expectedBambooReturn = {
      companyName: 'Maisha Meds',
      id: '173',
      published: new Date('2026-10-13T17:00:00.000Z'),
      title: 'Senior Software Engineer',
      updated: new Date('2026-10-13T17:00:00.000Z'),
      url: 'https://maishameds.bamboohr.com/careers/173'
    };

    it('properly formats an API entry from Bamboo', () => {
      const mockEntry = BambooMock[0];
      expect(bambooMapper(mockEntry, 'Maisha Meds')).toEqual(expectedBambooReturn);
    });

    it('properly handles missing ID', () => {
      const mockWithoutId = {
        ...BambooMock[0],
        id: '',
      };

      expect(bambooMapper(mockWithoutId, 'Maisha Meds')).toEqual({
        ...expectedBambooReturn,
        url: 'https://maishameds.bamboohr.com/careers/',
        id: ''
      });
    });
  });

  describe('breezyMapper', () => {
    const expectedBreezyReturn = {
      companyName: 'Switchboard',
      id: '5720a5741f80',
      published: new Date('2026-10-26T18:50:20.122Z'),
      title: 'Senior Software Engineer',
      updated: new Date('2026-10-26T18:50:20.122Z'),
      url: 'https://switchboard.breezy.hr/p/5720a5741f80-customer-experience-associate-resume-drop-interviewing-begins-nov-dec-2026'
    };

    it('properly formats an API entry from Bamboo', () => {
      const mockEntry = BreezyMock[0];
      expect(breezyMapper(mockEntry)).toEqual(expectedBreezyReturn);
    });

    it('properly handles missing ID', () => {
      const mockWithoutId = {
        ...BreezyMock[0],
        id: '',
      };

      expect(breezyMapper(mockWithoutId)).toEqual({
        ...expectedBreezyReturn,
        id: ''
      });
    });
  });

  describe('clearCompanyMapper', () => {
    const expectedCCReturn = {
      companyName: 'Ad Hoc',
          id: 'f71c1213-fe6a-9202-9704-206536d822c5',
          published: new Date('2026-10-26T00:00:00'),
          title: 'Senior Software Engineer - Front End/Back End (Library of Congress)',
          updated: new Date('2026-10-26T00:00:00'),
          url: 'https://adhoc.clearcompany.com/careers/jobs/f71c1213-fe6a-9202-9704-206536d822c5/apply?source=CJB-0'
    };

    it('properly formats an API entry from Bamboo', () => {
      const mockEntry = ClearCompanyMock[0];
      expect(clearCompanyMapper(mockEntry)).toEqual(expectedCCReturn);
    });

    it('properly handles missing ID', () => {
      const mockWithoutId = {
        ...ClearCompanyMock[0],
        id: '',
      };

      expect(clearCompanyMapper(mockWithoutId)).toEqual({
        ...expectedCCReturn,
        id: ''
      });
    });
  });

  describe('dayforceMapper', () => {
    const expectedCCReturn = {
      companyName: 'Stretto',
      id: '179',
      published: new Date('2026-08-04T03:00:00'),
      title: 'Software Engineer',
      updated: new Date('2026-09-17T19:37:38.29'),
      url: 'https://jobs.dayforcehcm.com/en-US/stretto/StrettoCareers/jobs/179'
    };

    it('properly formats an API entry from Bamboo', () => {
      const mockEntry = DayforceMock[0];
      expect(dayforceMapper(mockEntry)).toEqual(expectedCCReturn);
    });
  });

  describe('gemMapper', () => {
    const expectedGemReturn = {
      companyName: 'Snout',
      id: 'am9icG9zdDqQjNG0z9Cfaj7woaSEXnLq',
      published: new Date('2025-11-25T18:54:50.362Z'),
      title: 'Senior Software Engineer',
      updated: new Date('2026-06-27T05:37:51.859Z'),
      url: 'https://jobs.gem.com/snout/am9icG9zdDqQjNG0z9Cfaj7woaSEXnLq',
    };

    it('properly formats an API entry from Gem', () => {
      const mockEntry = GemMock[3];
      expect(gemMapper(mockEntry, 'Snout')).toEqual(expectedGemReturn);
    });

    it('properly handles missing ID', () => {
      const mockWithoutId = {
        ...GemMock[3],
        id: '',
      };

      expect(gemMapper(mockWithoutId, 'Snout')).toEqual({
        ...expectedGemReturn,
        id: ''
      });
    });
  });

  describe('greenhouseMapper', () => {
    const expectedGreenhouseReturn = {
      companyName: 'Capital Technology Group',
      id: '5187306007',
      published: new Date('2026-07-14T23:10:14-04:00'),
      title: 'Associate Recruiter',
      updated: new Date('2026-10-02T10:14:01-04:00'),
      url: 'https://boards.greenhouse.io/capitaltg/jobs/5187306007?gh_jid=5187306007'
    };

    it('properly formats an API entry from Greenhouse', () => {
      const mockEntry = GreenhouseMock[0];
      expect(greenhouseMapper(mockEntry)).toEqual(expectedGreenhouseReturn);
    });
  });

  describe('jobviteMapper', () => {
    const expectedJobviteReturn = {
      companyName: 'Uplight',
      id: 'oTxMAfww',
      published: new Date('9/10/2026'),
      title: 'Senior Software Engineer',
      updated: new Date('9/10/2026'),
      url: 'http://app.jobvite.com/CompanyJobs/Job.aspx?c=qf79Vfwa&j=oTxMAfww',
    };

    it('properly formats an API entry from Uplight', () => {
      const mockEntry = JobviteMock[4];
      expect(jobviteMapper(mockEntry, 'Uplight')).toEqual(expectedJobviteReturn);
    });
  });

  describe('kulaMapper', () => {
    const expectedKulaReturn = {
      companyName: 'Akkio',
      id: '19319',
      published: new Date('2025-11-18T20:16:46.000Z'),
      title: 'Senior Forward Deployed Engineer',
      updated: new Date('2025-11-18T20:16:46.000Z'),
      url: 'https://careers.kula.ai/hire',
    };
    
    it('properly formats an API entry from Kula', () => {
      const mockEntry = KulaMock[0];
      expect(kulaMapper(mockEntry, 'Akkio')).toEqual(expectedKulaReturn);
    });
  });

  describe('leverMapper', () => {
    const expectedLeverReturn = {
      companyName: 'Ellevation',
      id: '63d5bd17-5957-4562-8971-5a096dc28079',
      published: new Date(1787671018630),
      title: 'Senior Forward Deployed Engineer',
      updated: new Date(1787671018630),
      url: 'https://jobs.lever.co/ellevationeducation/63d5bd17-5957-4562-8971-5a096dc28079',
    };

    it('properly formats an API entry from Lever', () => {
      const mockEntry = LeverMock[0];
      expect(leverMapper(mockEntry, 'Ellevation')).toEqual(expectedLeverReturn);
    });

    it('properly handles missing ID', () => {
      const mockWithoutId = {
        ...LeverMock[0],
        id: '',
      };

      expect(leverMapper(mockWithoutId, 'Ellevation')).toEqual({
        ...expectedLeverReturn,
        id: ''
      });
    });
  });

  describe('paylocityMapper', () => {
    const expectedPaylocityReturn = {
      companyName: 'Ellevation',
      id: '4314622',
      published: new Date('2026-10-16T12:32:17-05:00'),
      title: 'Senior Spectrum Manager',
      updated: new Date('2026-10-16T12:32:17-05:00'),
      url: 'https://recruiting.paylocity.com/Recruiting/Jobs/Details/4314622',
    };
    
    it('properly formats an API entry from Paylocity}', () => {
      const mockEntry = PaylocityMock[0];
      expect(paylocityMapper(mockEntry, 'Ellevation')).toEqual(expectedPaylocityReturn);
    });
  });

  describe('ripplingMapper', () => {
    const expectedRipplingReturn = {
      companyName: 'MCCi',
      id: '77db9e1f-dd55-4517-a2da-3945425e34d6',
      published: new Date('2026-10-14T17:00:00.000Z'),
      title: 'Cloud Operations Engineer',
      updated: new Date('2026-10-14T17:00:00.000Z'),
      url: 'https://ats.rippling.com/mccicareers/jobs/77db9e1f-dd55-4517-a2da-3945425e34d6',
    };
    
    it('properly formats an API entry from Rippling', () => {
      const mockEntry = RipplingMock[0];
      expect(ripplingMapper(mockEntry, 'MCCi')).toEqual(expectedRipplingReturn);
    });

    it('properly handles missing ID', () => {
      const mockWithoutId = {
        ...RipplingMock[0],
        uuid: '',
      };

      expect(ripplingMapper(mockWithoutId, 'MCCi')).toEqual({
        ...expectedRipplingReturn,
        id: ''
      });
    });
  });

  describe('workableMapper', () => {
    const expectedWorkableReturn = {
      companyName: 'Atria Health',
      id: '96D3C67C3E',
      published: new Date('2026-10-13'),
      title: 'Chief of Staff to the CEO',
      updated: new Date('2026-10-13'),
      url: 'https://apply.workable.com/j/96D3C67C3E',
    };
    
    it('properly formats an API entry from Workable', () => {
      const mockEntry = WorkableMock[0];
      expect(workableMapper(mockEntry, 'Atria Health')).toEqual(expectedWorkableReturn);
    });

    it('properly handles missing ID', () => {
      const mockWithoutId = {
        ...WorkableMock[0],
        shortcode: '',
      };

      expect(workableMapper(mockWithoutId, 'Atria Health')).toEqual({
        ...expectedWorkableReturn,
        id: ''
      });
    });
  });

  describe('workdayMapper', () => {
    const expectedWorkdayReturn = {
      companyName: 'Atria Health',
      id: 'JR101655',
      published: new Date('2026-09-29T17:00:00.000Z'),
      title: 'Sr. Manager of Support Operations, Inspection',
      updated: new Date('2026-09-29T17:00:00.000Z'),
      url: '/job/US-WA-Remote---Non-Seattle/Sr-Manager-of-Support-Operations--Inspection_JR101655',
    };

    it('properly formats an API entry from Workday', () => {
      const mockEntry = WorkdayMock[0];
      expect(workdayMapper(mockEntry, 'Atria Health')).toEqual(expectedWorkdayReturn);
    });

    it('properly handles missing ID', () => {
      const mockWithoutId = {
        ...WorkdayMock[0],
        externalPath: '',
        url: '',
      };

      expect(workdayMapper(mockWithoutId, 'Atria Health')).toEqual({
        ...expectedWorkdayReturn,
        id: '',
        url: '',
      });
    });
  });
});