export const importSettings = {
    'import/resolver': {
        typescript: {
            alwaysTryTypes: true,
        },
    },
};

export const importRules = {
    'import/no-duplicates': 'error',
    'import/newline-after-import': 'error',
    'import/first': 'error',
    'import/extensions': [
        'error',
        'ignorePackages',
        {
            js: 'always',
            ts: 'always',
            vue: 'always',
            scss: 'always',
        },
    ],
    'import/no-cycle': ['error', { maxDepth: Infinity }],
    'import/no-unresolved': [
        'error',
        {
            ignore: ['\\.vue$'],
        },
    ],
};
