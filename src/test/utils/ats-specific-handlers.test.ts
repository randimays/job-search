import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  greenhouseJobsHandler,
  greenhouseMapper,
} from '../../utils/ats-specific-handlers';
import { GreenhouseMock } from '../../mock/greenhouse';

describe('greenhouseMapper', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 14, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

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

describe('greenhouseJobsHandler', () => {
  it('handles empty jobs array', () => {
    expect(greenhouseJobsHandler([])).toEqual([]);
  });

  it('correctly filters a list of jobs per the given keywords', () => {
    const jobs = GreenhouseMock;

    expect(greenhouseJobsHandler(jobs)).toEqual([
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