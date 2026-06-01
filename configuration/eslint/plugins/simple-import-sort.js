const TYPE_ORDER = [
    'types',
    'mocks',
    'routes',
    'services',
    'utils',
    'configs',
    'constants',
    'composables',
    'directives',
    'views',
    'layouts',
    'components',
];

const createTypeGroup = (type) => [
    `^@app/${type}`,
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
                ['^@app'],
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
