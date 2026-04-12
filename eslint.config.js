import vueParser from 'vue-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';

import { importRules, importSettings } from './configuration/eslint/plugins/import.js';
import { simpleImportSortRules } from './configuration/eslint/plugins/simple-import-sort.js';
import { unusedImportsRules } from './configuration/eslint/plugins/unused-imports.js';
import { noRestrictedImportsRules } from './configuration/eslint/rules/no-restricted-imports.js';

export default [
    ...eslintPluginVue.configs['flat/recommended'],

    {
        files: ['**/*.js', '**/*.vue'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                extraFileExtensions: ['.vue'],
            },
            globals: {
                ...globals.browser,
                ...globals.vue,
            },
        },
        plugins: {
            vue: eslintPluginVue,
            'unused-imports': eslintPluginUnusedImports,
            import: eslintPluginImport,
            'simple-import-sort': eslintPluginSimpleImportSort,
        },
        settings: {
            ...importSettings,
        },
        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',

            'vue/multi-word-component-names': 'off',
            'vue/attributes-order': [
                'error',
                {
                    order: [
                        'DEFINITION',
                        'LIST_RENDERING',
                        'CONDITIONALS',
                        'RENDER_MODIFIERS',
                        'GLOBAL',
                        ['UNIQUE', 'SLOT'],
                        'TWO_WAY_BINDING',
                        'OTHER_DIRECTIVES',
                        'OTHER_ATTR',
                        'EVENTS',
                        'CONTENT',
                    ],
                    alphabetical: false,
                },
            ],

            ...unusedImportsRules,
            ...noRestrictedImportsRules,
            ...importRules,
            ...simpleImportSortRules,
        },
    },

    eslintConfigPrettier,
];
