import { normalizeStr } from '@shared/utils/string.js';

export const useEntitySearch = ({
    state,
    entitiesKey = 'data',
    searchKeys = ['name'],
    transformEntities = (entities) => entities,
}) => {
    const searchModel = ref('');

    const normalizedSearch = computed(() => normalizeStr(searchModel.value));

    const transformedEntities = computed(() => {
        if (!state[entitiesKey]) {
            return null;
        }

        const entities = state[entitiesKey].map((data) =>
            Object.entries(data).reduce((acc, [key, value]) => {
                if (searchKeys.includes(key)) {
                    acc[`${key}_normalized`] = normalizeStr(value);
                }

                return { ...acc, [key]: value };
            }, [])
        );

        return transformEntities(entities);
    });

    const filterCallback = (entity) =>
        searchKeys.some((key) => {
            const value = entity[`${key}_normalized`];

            return value && value.includes(normalizedSearch.value);
        });

    const filteredEntities = computed(() => {
        const entities = transformedEntities.value;

        if (!entities) {
            return [];
        }

        if (normalizedSearch.value.length === 0) {
            return entities;
        }

        return entities.filter(filterCallback);
    });

    return { searchModel, filteredEntities };
};
