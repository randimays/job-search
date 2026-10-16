import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanUpAPIString,
  convertAPIDate,
  formatDate,
  greenhouseJobsHandler,
  greenhouseMapper,
  isExplicitlyRemoteOrVirtual,
  isPotentialJobMatch
} from '../../utils';
import { GreenhouseMock } from '../../mock/greenhouse';

describe('formatDate', () => {
    beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 14, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('handles undefined dates', () => {
    expect(formatDate(undefined)).toBe('October 14');
  });

  it('handles new dates', () => {
    expect(formatDate(new Date(''))).toBe('Invalid date');
  });

  it('handles junk dates', () => {
    expect(formatDate(new Date('garbage'))).toBe('Invalid date');
  });

  it('handles valid dates', () => {
    expect(formatDate(new Date('2026-10-02T10:14:01-04:00'))).toBe('October 2');
  });
});

describe('convertAPIDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 14, 12, 0, 0));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('handles null dates', () => {
    expect(convertAPIDate(null)).toBeNull();
  });

  it('handles defined dates correctly', () => {
    expect(convertAPIDate('2026-10-14T10:43:28-04:00')?.toString()).toMatch(/Oct/);
    expect(convertAPIDate('2026-10-14T10:43:28-04:00')!.toString()).toMatch(/Oct/);
  });
});

describe('cleanUpAPIString', () => {
  it('handles null values', () => {
    expect(cleanUpAPIString(null)).toBe('');
  });

  it('handles undefined values', () => {
    expect(cleanUpAPIString(undefined)).toBe('');
  });

  it('handles strings with extra white space', () => {
    expect(cleanUpAPIString('  Front End Developer ')).toBe('Front End Developer');
  });
});

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
      deadline: null,
      id: 5187306007,
      published: new Date('2026-07-14T23:10:14-04:00'),
      title: 'Associate Recruiter',
      updated: new Date('2026-10-02T10:14:01-04:00'),
      url: 'https://boards.greenhouse.io/capitaltg/jobs/5187306007?gh_jid=5187306007'
    });
  });
});

describe('isPotentialJobMatch', () => {
  const MATCHING_JOB_TITLES = [
    'Development Engineer',
    'Digital Developer',
    'Engineer, Full Stack',
    'Front End Developer',
    'Front End Engineer',
    'Front End Software Engineer',
    'Front End Web Developer',
    'Front-End Developer SME',
    'Front-end Engineer',
    'Frontend Developer',
    'Frontend Engineer',
    'Frontend React Engineer',
    'Frontend Software Engineer',
    'Full Stack Developer',
    'Full Stack Engineer',
    'Full Stack Product Engineer',
    'Full Stack Software Engineer',
    'Full Stack Web Engineer',
    'Full-Stack Engineer',
    'Fullstack Engineer',
    'Fullstack Software Engineer',
    'Fullstack/Frontend Engineer',
    'React/Redux FrontEnd Developer',
    'React Developer',
    'React Engineer',
    'React Software Engineer',
    'Software Developer',
    'Software Engineer',
    'Software Engineer - Front End',
    'Software Engineer (Front End)',
    'Software Engineer / Web Developer',
    'Software Engineer, Front End',
    'Software Web Engineer',
    'UI Developer',
    'UX Engineer',
    'Web Developer',
    'Web Engineer',
  ];

  describe('positive matches', () => {
    it('correctly identifies matches', () => {
      MATCHING_JOB_TITLES.forEach(title => {
        expect(isPotentialJobMatch(title)).toBe(true);
      });
    });
  });

  const FAILING_JOB_TITLES = [
    'AI/ML Developer',
    'Back End Developer',
    'Back End Engineer',
    'Data Engineer',
    'DevOps Engineer',
    'DevSecOps Engineer',
    'Director of Business Development',
    'Engineering Manager',
    'Founding Full Stack Engineer',
    'Head Software Engineer',
    'Help Desk Engineer',
    'Java Developer',
    'Junior Engineer',
    'Lead Front End Engineer',
    'Lead Developer',
    'Network Engineer',
    'Product Manager',
    'Project Manager',
    'Salesforce Developer',
    'Site Reliability Engineer',
    'Software Architect',
    'Staff Front End Engineer',
    'Staff Software Developer',
    'Staff Software Engineer',
    'Systems Engineer',
  ];

  describe('matches to exclude', () => {
    it('correctly identifies exclusions', () => {
      FAILING_JOB_TITLES.forEach(title => {
        expect(isPotentialJobMatch(title)).toBe(false);
      });
    });
  });
});

describe('isExplicitlyRemoteOrVirtual', () => {
  const testPermutations = (keyword: string) => {
    const permutations = [
      keyword,
      `${keyword} US`,
      `${keyword} U.S.`,
      `${keyword} United States`,
      `${keyword}, United States`,
      `${keyword} - United States`,
      `${keyword} (United States)`,
      `${keyword} (US)`,
      `${keyword} (U.S.)`
    ]

    permutations.forEach(permutation => {
      expect(isExplicitlyRemoteOrVirtual(permutation)).toBe(true);
    });
  };

  it('correctly identifies explicitly remote or virtual jobs', () => {
    testPermutations('remote');
    testPermutations('virtual');
  });
});

describe('greenhouseJobsHandler', () => {
  it('handles empty jobs array', () => {
    expect(greenhouseJobsHandler([])).toBeNull();
  });

  it('correctly filters a list of jobs per the given keywords', () => {
    const jobs = GreenhouseMock;

    expect(greenhouseJobsHandler(jobs)).toEqual([
      {
        companyName: 'Capital Technology Group',
        deadline: null,
        id: 5147833007,
        published: new Date('2026-06-09T11:21:53-04:00'),
        title: 'Full Stack Engineer',
        updated: new Date('2026-09-18T07:18:55-04:00'),
        url: 'https://boards.greenhouse.io/capitaltg/jobs/5147833007?gh_jid=5147833007',
      },
        {
        companyName: 'Capital Technology Group',
        deadline: null,
        id: 5239203007,
        published: new Date('2026-09-15T16:44:52-04:00'),
        title: 'PKI Engineer',
        updated: new Date('2026-09-15T16:44:52-04:00'),
        url: 'https://boards.greenhouse.io/capitaltg/jobs/5239203007?gh_jid=5239203007',
      },
        {
        companyName: 'Capital Technology Group',
        deadline: null,
        id: 5239695007,
        published: new Date('2026-09-16T08:59:35-04:00'),
        title: 'Software Developer',
        updated: new Date('2026-09-16T08:59:35-04:00'),
        url: 'https://boards.greenhouse.io/capitaltg/jobs/5239695007?gh_jid=5239695007',
      }
    ])
  });
});
