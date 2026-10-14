import { describe, expect, it, vi } from 'vitest';
import { formatDate, isPotentialJobMatch } from '../utils';

describe('formatDate', () => {
  const mockDate = new Date(2026, 9, 14);
  vi.setSystemTime(mockDate);

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

  vi.useRealTimers();
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
    it('should correctly identify matches', () => {
      MATCHING_JOB_TITLES.forEach(title => {
        expect(isPotentialJobMatch(title)).toBe(true);
      });
    });
  });

  const FAILING_JOB_TITLES = [
    'Back End Developer',
    'Back End Engineer',
    'Data Engineer',
    'Director of Business Development',
    'Engineering Manager',
    'Founding Full Stack Engineer',
    'Head Software Engineer',
    'Java Developer',
    'Junior Engineer',
    'Lead Front End Engineer',
    'Lead Developer',
    'Product Manager',
    'Project Manager',
    'Software Architect',
    'Staff Front End Engineer',
    'Staff Software Developer',
    'Staff Software Engineer'
  ];

  describe('matches to exclude', () => {
    it('should correctly identify exclusions', () => {
      FAILING_JOB_TITLES.forEach(title => {
        expect(isPotentialJobMatch(title)).toBe(false);
      });
    });
  });
});
