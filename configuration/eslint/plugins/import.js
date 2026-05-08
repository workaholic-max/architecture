import { eslintAliases } from '../../aliases.js';

export const importSettings = {
    'import/resolver': {
        node: {
            extensions: ['.js', '.ts', '.vue', '.scss'],
        },
        alias: {
            map: Object.entries(eslintAliases),
            extensions: ['.js', '.ts', '.vue', '.scss'],
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
    'import/no-unresolved': [
        'error',
        {
            ignore: ['\\.vue$'],
        },
    ],
};
