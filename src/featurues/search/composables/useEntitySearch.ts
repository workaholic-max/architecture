import { normalizeStr } from '@shared/utils/string.ts';

type SearchableKey<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type UseEntitySearchOptions<T> = {
    searchKeys: SearchableKey<T>[];
};

export const useEntitySearch = <T extends Record<string, unknown>>({ searchKeys }: UseEntitySearchOptions<T>) => {
    const searchModel = ref('');

    const normalizedSearch = computed(() => normalizeStr(searchModel.value));

    const filterCallback = (entity: T) =>
        searchKeys.some((key) => {
            const value = entity[key];

            return normalizeStr(value).includes(normalizedSearch.value);
        });

    const getFilteredEntities = (entities?: T[]): T[] => {
        if (!entities) {
            return [];
        }

        if (!normalizedSearch.value) {
            return entities;
        }

        return entities.filter(filterCallback);
    };

    return {
        searchModel,
        getFilteredEntities,
    };
};
