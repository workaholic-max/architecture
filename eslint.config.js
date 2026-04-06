import vueParser from 'vue-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginVue from 'eslint-plugin-vue';

import { eslintAliases } from './configuration/aliases.js';
import { importSortRules } from './configuration/eslint/plugins/import-sort.js';

export default [
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
                defineProps: 'readonly',
                defineEmits: 'readonly',
                defineExpose: 'readonly',
                defineOptions: 'readonly',
            },
        },
        plugins: {
            vue: eslintPluginVue,
            import: importPlugin,
            'unused-imports': unusedImports,
            'simple-import-sort': simpleImportSort,
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js', '.vue', '.scss'],
                },
                alias: {
                    map: Object.entries(eslintAliases),
                    extensions: ['.js', '.vue', '.scss'],
                },
            },
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
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

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

            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@/router/**', '@/api/**', '@/domains/**', '@/features/**', '@/shared/**'],
                            message: 'Root-level @/ imports are forbidden. Always use the specific alias instead.',
                        },
                    ],
                },
            ],

            ...importSortRules,
        },
    },

    eslintConfigPrettier,
];
