import { describe, it, expect, vi, afterEach } from 'vitest';
import { calculateAge } from '../components/utils/utils';

describe('calculateAge', () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it('returns a number', () => {
        expect(typeof calculateAge('2000-01-01')).toBe('number');
    });

    it('returns the correct age when birthday has already passed this year', () => {
        // Fix "today" to 2026-02-22
        vi.setSystemTime(new Date('2026-02-22'));
        // Born 2004-01-10 → birthday was Jan 10, already passed → age 22
        expect(calculateAge('2004-01-10')).toBe(22);
    });

    it('subtracts 1 when birthday has not yet occurred this year', () => {
        vi.setSystemTime(new Date('2026-02-22'));
        // Born 2004-06-06 → birthday is June 6, not yet reached → age 21
        expect(calculateAge('2004-06-06')).toBe(21);
    });
});
