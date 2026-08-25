import type { PaginationParams } from '@features/pagination/types/pagination.ts';

export const getPageCount = (total: number, perPage: number): number => {
    if (total <= 0 || perPage <= 0) return 0;

    return Math.ceil(total / perPage);
};

export const paginateItems = <T>(items: T[], { page, perPage }: PaginationParams): T[] => {
    if (page < 1 || perPage < 1) return [];

    const startIndex = (page - 1) * perPage;

    return items.slice(startIndex, startIndex + perPage);
};
