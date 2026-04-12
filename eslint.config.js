import vueParser from 'vue-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';

import { importRules, importSettings } from './configuration/eslint/plugins/import.js';
import { importSortRules } from './configuration/eslint/plugins/import-sort.js';
import { unusedImportsRules } from './configuration/eslint/plugins/unused-imports.js';
import { restrictedImportsRules } from './configuration/eslint/rules/restricted-imports.js';

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
            'unused-imports': unusedImports,
            import: importPlugin,
            'simple-import-sort': simpleImportSort,
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
            ...restrictedImportsRules,
            ...importRules,
            ...importSortRules,
        },
    },

    eslintConfigPrettier,
];
