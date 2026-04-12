import { eslintAliases } from '../../aliases.js';

export const importSettings = {
    'import/resolver': {
        node: {
            extensions: ['.js', '.vue', '.scss'],
        },
        alias: {
            map: Object.entries(eslintAliases),
            extensions: ['.js', '.vue', '.scss'],
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
