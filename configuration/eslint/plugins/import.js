import { eslintAliases } from '../../aliases.js';

const aliasPathGroupOverrides = eslintAliases.map(([alias]) => ({
    pattern: `${alias}/**`,
    action: 'enforce',
}));

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
            pattern: {
                js: 'always',
                ts: 'always',
                vue: 'always',
                scss: 'always',
            },
            pathGroupOverrides: aliasPathGroupOverrides,
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
