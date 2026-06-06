import vueParser from 'vue-eslint-parser';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import eslintPluginVue from 'eslint-plugin-vue';
import eslintPluginVuejsA11y from 'eslint-plugin-vuejs-accessibility';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

import { importRules, importSettings } from './configuration/eslint/plugins/import.js';
import { simpleImportSortRules } from './configuration/eslint/plugins/simple-import-sort.js';
import { unusedImportsRules } from './configuration/eslint/plugins/unused-imports.js';
import {
    appRestrictedImportPatterns,
    baseRestrictedImportPatterns,
    buildNoRestrictedImports,
    featureRestrictedImportPatterns,
} from './configuration/eslint/rules/no-restricted-imports.js';

export default typescriptEslint.config(
    js.configs.recommended,
    ...eslintPluginVue.configs['flat/recommended'],
    ...eslintPluginVuejsA11y.configs['flat/recommended'],

    // Base rules for all source files: parser, plugins, import hygiene + sorting,
    // and the architectural import boundaries shared by every layer.
    {
        files: ['**/*.{js,ts,vue}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                parser: typescriptEslint.parser,
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
            eqeqeq: ['error', 'always'],

            // Off because: TypeScript already resolves identifiers, and auto-imported composables
            // (ref, computed, useRouter, ...) are not known to ESLint, so it only false-positives.
            'no-undef': 'off',
            // Off because: reported by the unused-imports plugin below (with the _-prefix ignore).
            'no-unused-vars': 'off',

            'vue/multi-word-component-names': 'off',
            'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
            'vue/component-api-style': ['error', ['script-setup']],
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
            ...buildNoRestrictedImports(baseRestrictedImportPatterns),
            ...importRules,
            ...simpleImportSortRules,
        },
    },

    // src/** (except the entry point) additionally must not import the app layer.
    {
        files: ['src/**/*.{js,ts,vue}'],
        ignores: ['src/main.ts'],
        rules: {
            ...buildNoRestrictedImports(baseRestrictedImportPatterns, appRestrictedImportPatterns),
        },
    },

    // features/** additionally must not import domains (features are consumed by domains, never the reverse).
    {
        files: ['src/features/**/*.{js,ts,vue}'],
        rules: {
            ...buildNoRestrictedImports(
                baseRestrictedImportPatterns,
                appRestrictedImportPatterns,
                featureRestrictedImportPatterns
            ),
        },
    },

    // Vue SFC scripts: TypeScript's non-type-aware recommended rules.
    // `extends` supplies the rules; vueParser must stay the parser so <script setup lang="ts"> parses.
    // Full type-checking of .vue is done by vue-tsc (pnpm type:check), not here.
    {
        files: ['src/**/*.vue'],
        extends: [typescriptEslint.configs.recommended],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: typescriptEslint.parser,
                extraFileExtensions: ['.vue'],
            },
        },
        rules: {
            // Off because: unused vars/imports are reported by the unused-imports plugin (base config).
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },

    // TypeScript source files: type-aware ("type-checked") rules, which need the TS program
    // via projectService. .vue is intentionally excluded — typed linting of SFCs needs heavier
    // wiring and vue-tsc already type-checks them.
    {
        files: ['src/**/*.ts'],
        extends: [typescriptEslint.configs.recommendedTypeChecked],
        languageOptions: {
            parser: typescriptEslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // Off because: unused vars/imports are reported by the unused-imports plugin (base config).
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },

    // Must be last: turns off rules that would conflict with Prettier formatting.
    eslintConfigPrettier
);
