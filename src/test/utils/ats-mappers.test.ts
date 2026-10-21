import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ashbyMapper,
  gemMapper,
  greenhouseMapper,
  kulaMapper,
  leverMapper,
  paylocityMapper,
  ripplingMapper,
  workableMapper,
  workdayMapper,
} from '../../utils/ats-mappers';
import { AshbyMock } from '../../mock/ashby';
import { GemMock } from '../../mock/gem';
import { GreenhouseMock } from '../../mock/greenhouse';
import { KulaMock } from '../../mock/kula';
import { LeverMock } from '../../mock/lever';
import { PaylocityMock } from '../../mock/paylocity';
import { RipplingMock } from '../../mock/rippling';
import { WorkableMock } from '../../mock/workable';
import { WorkdayMock } from '../../mock/workday';

describe('mappers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 14, 12, 0, 0));
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });

  describe('ashbyMapper', () => {
    const mockEntry = AshbyMock[1];

    it('properly formats an API entry from Ashby', () => {
      expect(ashbyMapper(mockEntry, 'AidKit')).toEqual({
        companyName: 'AidKit',
        id: 'c05f270b-e045-4b1e-8bf1-3f5025c176ee',
        published: new Date('2026-10-07T23:54:01.434+00:00'),
        title: 'Controller',
        updated: new Date('2026-10-07T23:54:01.434+00:00'),
        url: 'https://jobs.ashbyhq.com/aidkit/c05f270b-e045-4b1e-8bf1-3f5025c176ee'
      });
    });
  });

  describe('bambooMapper', () => {
    it('properly formats an API entry from Bamboo', () => {
      // TODO
    });
  });

  describe('gemMapper', () => {
    const mockEntry = GemMock[3];

    it('properly formats an API entry from Gem', () => {
      expect(gemMapper(mockEntry, 'Snout')).toEqual({
        companyName: 'Snout',
        id: 'am9icG9zdDqQjNG0z9Cfaj7woaSEXnLq',
        published: new Date('2025-11-25T18:54:50.362Z'),
        title: 'Senior Software Engineer',
        updated: new Date('2026-06-27T05:37:51.859Z'),
        url: 'https://jobs.gem.com/snout/am9icG9zdDqQjNG0z9Cfaj7woaSEXnLq',
      });
    });
  });

  describe('greenhouseMapper', () => {
    const mockEntry = GreenhouseMock[0];
  
    it('properly formats an API entry from Greenhouse', () => {
      expect(greenhouseMapper(mockEntry)).toEqual({
        companyName: 'Capital Technology Group',
        id: '5187306007',
        published: new Date('2026-07-14T23:10:14-04:00'),
        title: 'Associate Recruiter',
        updated: new Date('2026-10-02T10:14:01-04:00'),
        url: 'https://boards.greenhouse.io/capitaltg/jobs/5187306007?gh_jid=5187306007'
      });
    });
  });

  describe('kulaMapper', () => {
    const mockEntry = KulaMock[0];
  
    it('properly formats an API entry from Kula', () => {
      expect(kulaMapper(mockEntry, 'Akkio')).toEqual({
        companyName: 'Akkio',
        id: '19319',
        published: new Date('2025-11-18T20:16:46.000Z'),
        title: 'Senior Forward Deployed Engineer',
        updated: new Date('2025-11-18T20:16:46.000Z'),
        url: '',
      });
    });
  });

  describe('leverMapper', () => {
    const mockEntry = LeverMock[0];
  
    it('properly formats an API entry from Lever', () => {
      expect(leverMapper(mockEntry, 'Ellevation')).toEqual({
        companyName: 'Ellevation',
        id: '63d5bd17-5957-4562-8971-5a096dc28079',
        published: new Date(1787671018630),
        title: 'Revenue Enablement Manager',
        updated: new Date(1787671018630),
        url: 'https://jobs.lever.co/ellevationeducation/63d5bd17-5957-4562-8971-5a096dc28079',
      });
    });
  });

  describe('paylocityMapper', () => {
    const mockEntry = PaylocityMock[0];
  
    it('properly formats an API entry from Paylocity}', () => {
      expect(paylocityMapper(mockEntry, 'Ellevation')).toEqual({
        companyName: 'Ellevation',
        id: '4314622',
        published: new Date('2026-10-16T12:32:17-05:00'),
        title: 'Senior Spectrum Manager',
        updated: new Date('2026-10-16T12:32:17-05:00'),
        url: 'https://recruiting.paylocity.com/Recruiting/Jobs/Details/4314622',
      });
    });
  });

  describe('ripplingMapper', () => {
    const mockEntry = RipplingMock[0];
  
    it('properly formats an API entry from Rippling', () => {
      expect(ripplingMapper(mockEntry, 'MCCi')).toEqual({
        companyName: 'MCCi',
        id: '77db9e1f-dd55-4517-a2da-3945425e34d6',
        published: new Date(),
        title: 'Cloud Operations Engineer',
        updated: new Date(),
        url: 'https://ats.rippling.com/mccicareers/jobs/77db9e1f-dd55-4517-a2da-3945425e34d6',
      });
    });
  });

  describe('workableMapper', () => {
    const mockEntry = WorkableMock[0];
  
    it('properly formats an API entry from Workable', () => {
      expect(workableMapper(mockEntry, 'Atria Health')).toEqual({
        companyName: 'Atria Health',
        id: '96D3C67C3E',
        published: new Date('2026-10-13'),
        title: 'Chief of Staff to the CEO',
        updated: new Date('2026-10-13'),
        url: 'https://apply.workable.com/j/96D3C67C3E',
      });
    });
  });

  describe('workdayMapper', () => {
    const mockEntry = WorkdayMock[0];
  
    it('properly formats an API entry from Workday', () => {
      expect(workdayMapper(mockEntry, 'Atria Health')).toEqual({
        companyName: 'Atria Health',
        id: 'JR101655',
        published: new Date('2026-09-29T17:00:00.000Z'),
        title: 'Sr. Manager of Support Operations, Inspection',
        updated: new Date('2026-09-29T17:00:00.000Z'),
        url: '',
      });
    });
  });
});