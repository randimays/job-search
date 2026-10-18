import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  greenhouseMapper,
} from '../../utils/ats-mappers';
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