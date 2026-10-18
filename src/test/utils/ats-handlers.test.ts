import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  greenhouseJobsHandler,
} from '../../utils/ats-handlers';
import { GreenhouseMock } from '../../mock/greenhouse';

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