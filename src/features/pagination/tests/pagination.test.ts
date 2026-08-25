import { describe, expect, it } from 'vitest';

import { getPageCount, paginateItems } from '@features/pagination/utils/pagination.ts';

describe('pagination utilities', () => {
    it('calculates the number of pages', () => {
        expect(getPageCount(21, 10)).toBe(3);
    });

    it('returns the requested page of items', () => {
        expect(paginateItems(['a', 'b', 'c', 'd'], { page: 2, perPage: 2 })).toEqual(['c', 'd']);
    });
});
