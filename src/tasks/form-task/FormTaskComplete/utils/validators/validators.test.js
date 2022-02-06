import { advanceTo, clear } from 'jest-date-mock';
import { validateDateStringFormat, validateDateString, isDateInThePast } from './validators';

describe('validateDateStringFormat', () => {
  test('returns true for properly formatted date string inputs', () => {
    expect(validateDateStringFormat('2015-01-01')).toBe(true);
    expect(validateDateStringFormat('3500-11-10')).toBe(true);
    expect(validateDateStringFormat('1995-12-31')).toBe(true);
    expect(validateDateStringFormat('8888-88-88')).toBe(true);
    expect(validateDateStringFormat('0000-00-01')).toBe(true);
  });

  test('returns false for not properly formatted date string inputs', () => {
    expect(validateDateStringFormat('2015-01-1')).toBe(false);
    expect(validateDateStringFormat('30-11-10')).toBe(false);
    expect(validateDateStringFormat('')).toBe(false);
    expect(validateDateStringFormat('8888-8888')).toBe(false);
    expect(validateDateStringFormat('0000.00.01')).toBe(false);
    expect(validateDateStringFormat('01.01.2001')).toBe(false);
  });
});

describe('validateDateString', () => {
  test('returns true for existing date string inputs', () => {
    expect(validateDateString('2015-01-01')).toBe(true);
    expect(validateDateString('3500-11-10')).toBe(true);
    expect(validateDateString('1995-12-31')).toBe(true);
  });

  test('returns false for not existing date string inputs', () => {
    expect(validateDateString('2021-00-01')).toBe(false);
    expect(validateDateString('2021-00-00')).toBe(false);
    expect(validateDateString('0000-00-00')).toBe(false);
    expect(validateDateString('2021-11-33')).toBe(false);
    expect(validateDateString('2021-13-10')).toBe(false);
  });
});

describe('isDateInThePast', () => {
  beforeEach(() => {
    advanceTo('2000-01-01');
  });

  afterEach(() => {
    clear();
  });

  test('returns true in case passed date is from the past', () => {
    expect(isDateInThePast('1999-01-02')).toBe(true);
    expect(isDateInThePast('1955-12-31')).toBe(true);
  });

  test('returns false in case passed date is today', () => {
    expect(isDateInThePast('2000-01-01')).toBe(false);
  });

  test('returns false in case passed date is from the future', () => {
    expect(isDateInThePast('2000-01-02')).toBe(false);
    expect(isDateInThePast('2000-12-31')).toBe(false);
    expect(isDateInThePast('2025-01-01')).toBe(false);
  });
});
