import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanUpAPIString,
  determinePublishDateForWorkday,
  formatDate,
  isRemoteOrVirtualUS,
  isPotentialJobMatch,
  isUnitedStates,
  toTitleCase,
  flushOmittedTitles,
  parseCsv,
} from '../../utils';
import { useJobs } from '../../store';

describe('utils', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('formatDate', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 9, 14, 12, 0, 0));
    });
  
    afterEach(() => {
      vi.useRealTimers();
    });
  
    it('handles undefined dates', () => {
      expect(formatDate(undefined)).toBe('10/14/2026');
    });
  
    it('handles new dates', () => {
      expect(formatDate(new Date(''))).toBe('Invalid date');
    });
  
    it('handles junk dates', () => {
      expect(formatDate(new Date('garbage'))).toBe('Invalid date');
    });
  
    it('handles valid dates', () => {
      expect(formatDate(new Date('2026-10-02T10:14:01-04:00'))).toBe('10/2/2026');
    });
  });
  
  describe('toTitleCase', () => {
    it('handles junk values', () => {
      expect(toTitleCase('')).toBe('');
    });
  
    it('handles valid values', () => {
      expect(toTitleCase('a')).toBe('a');
      expect(toTitleCase('greenhouse')).toBe('Greenhouse');
      expect(toTitleCase('GREENHOUSE')).toBe('Greenhouse');
      expect(toTitleCase('greenhouse platform')).toBe('Greenhouse Platform');
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
  
  describe('flushOmittedTitles', () => {
    beforeEach(() => {
      useJobs.setState({ omittedTitles: new Set() })
    });
  
    it('handles empty omittedTitles', () => {
      flushOmittedTitles();
      expect(useJobs.getState().omittedTitles).toEqual(new Set());
    });
  
    it('adds omitted titles from the module-level storage', () => {
      isPotentialJobMatch('Site Reliability Developer');
      flushOmittedTitles();
      expect(useJobs.getState().omittedTitles.has('Site Reliability Developer')).toBe(true);
    });
  });
  
  describe('isPotentialJobMatch', () => {
    beforeEach(() => {
      useJobs.setState({ omittedTitles: new Set() })
    });
  
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
      'Data Engineer',
      'DevSecOps Engineer',
      'Director of Business Development',
      'Engineering Manager',
      'Founding Full Stack Engineer',
      'Head Software Engineer',
      'Help Desk Engineer',
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
  
    describe('empty titles', () => {
      it('correctly handles empties', () => {
        expect(isPotentialJobMatch('')).toBe(false);
      });
    });
  });
  
  describe('isUnitedStates', () => {
    it('handles locations correctly', () => {
      expect(isUnitedStates('Canada')).toBe(false);
      expect(isUnitedStates('ireland')).toBe(false);
      expect(isUnitedStates('india')).toBe(false);
      expect(isUnitedStates('ARGENTINA')).toBe(false);
      expect(isUnitedStates('Mexico')).toBe(false);
      expect(isUnitedStates('United States')).toBe(true);
      expect(isUnitedStates('U.S.')).toBe(true);
      expect(isUnitedStates('US')).toBe(true);
      expect(isUnitedStates('North America')).toBe(true);
    });
  
    it('handles invalid locations', () => {
      isUnitedStates('');
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(
        expect.stringContaining('invalid or missing job location')
      );
    });
  });
  
  describe('isRemoteOrVirtualUS', () => {
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
        expect(isRemoteOrVirtualUS(permutation)).toBe(true);
      });
    };
  
    it('correctly identifies explicitly remote or virtual jobs', () => {
      testPermutations('remote');
      testPermutations('virtual');
    });

    it('correctly handles not explicitly remote or virtual jobs', () => {
      expect(isRemoteOrVirtualUS('LATAM')).toBe(false);
      expect(isRemoteOrVirtualUS('')).toBe(true);
    });
  });

  describe('parseCsv', () => {
    it('correctly parses CSV data', () => {
      expect(parseCsv('Ashby,aidkit,AidKit\nAshby,propel,Propel\nAshby,sovra,SOVRA')).toEqual([
        ['Ashby', 'aidkit', 'AidKit'],
        ['Ashby', 'propel', 'Propel'],
        ['Ashby', 'sovra', 'SOVRA']
      ])
    });
  });
  
  describe('determinePublishDateForWorkday', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 9, 14, 12, 0, 0));
    });
  
    afterEach(() => {
      vi.useRealTimers();
    });
  
    it('handles a variety of dates correctly', () => {
      expect(determinePublishDateForWorkday('Posted Today', 'Bonterra').getDate()).toBe(14);
      expect(determinePublishDateForWorkday('Posted 7 Days Ago', 'Bonterra').getDate()).toBe(7);
      expect(determinePublishDateForWorkday('Posted 1 Days Ago', 'Bonterra').getDate()).toBe(13);
      expect(determinePublishDateForWorkday('Posted 16 Days Ago', 'Bonterra').getDate()).toBe(28);
      expect(determinePublishDateForWorkday('Posted 30+ Days Ago', 'Bonterra').getDate()).toBe(14);
    });

    it('handles an empty date', () => {
      expect(determinePublishDateForWorkday('', 'Bonterra').getDate()).toBe(14);
    });

    it('handles an unusually formatted date', () => {
      expect(determinePublishDateForWorkday('3 months ago', 'Bonterra').getDate()).toBe(14);
    });
  });
});