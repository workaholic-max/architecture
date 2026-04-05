const TYPE_ORDER = [
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
    `^@domains/.*/${type}`,
    `^@features/.*/${type}`,
    `^@shared/${type}`,

    `^(\\.\\./)+${type}`,
    `^\\./${type}`,
];

export const importSortRules = {
    'simple-import-sort/imports': [
        'error',
        {
            groups: [
                ['^vue', '^@?\\w'],

                ['^@/'],
                ['^@router'],
                ['^@api'],
                ['^@domains'],

                ...TYPE_ORDER.map(createTypeGroup),

                ['^\\.'],
            ],
        },
    ],
    'simple-import-sort/exports': 'error',
};
