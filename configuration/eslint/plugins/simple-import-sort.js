const TYPE_ORDER = [
    'types',
    'mocks',
    'routes',
    'stores',
    'services',
    'controls',
    'utils',
    'configs',
    'enums',
    'composables',
    'directives',
    'views',
    'layouts',
    'components',
];

const createTypeGroup = (type) => [
    `^@router/${type}`,

    `^@domains/.*/${type}`,
    `^@features/.*/${type}`,
    `^@shared/${type}`,

    `^(\\.\\./)+${type}`,
    `^\\./${type}`,
];

export const simpleImportSortRules = {
    'simple-import-sort/imports': [
        'error',
        {
            groups: [
                ['^vue', '^@?\\w'],

                ['^@/'],
                ['^@router'],
                ['^@api'],

                ...TYPE_ORDER.map(createTypeGroup),

                ['^@shared/icons'],

                ['^\\.'],
            ],
        },
    ],
    'simple-import-sort/exports': 'error',
};
