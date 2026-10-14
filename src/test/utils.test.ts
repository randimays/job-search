import { describe, expect, test, vi } from 'vitest';
import { formatDate } from '../utils';

describe('formatDate', () => {
  const mockDate = new Date(2026, 9, 14);
  vi.setSystemTime(mockDate);

  test('handles undefined dates', () => {
    expect(formatDate(undefined)).toBe('October 14');
  });

  test('handles new dates', () => {
    expect(formatDate(new Date(''))).toBe('Invalid date');
  });

  test('handles junk dates', () => {
    expect(formatDate(new Date('garbage'))).toBe('Invalid date');
  });

  test('handles valid dates', () => {
    expect(formatDate(new Date('2026-10-02T10:14:01-04:00'))).toBe('October 2');
  });

  vi.useRealTimers();
});
