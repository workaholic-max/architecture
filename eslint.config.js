import vueParser from 'vue-eslint-parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import eslintPluginVue from 'eslint-plugin-vue';

// ───────────────────────────────────────────────────────
// Import sort
// ───────────────────────────────────────────────────────

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
    'icons',
];

const createTypeGroup = (type) => [
    `^@domains/.*/${type}`,
    `^@features/.*/${type}`,
    `^@shared/${type}`,

    `^\\./${type}`,
    `^\\.\\./${type}`,
    `^\\.\\.\\/(?:\\.\\.\\/)+${type}`,
];

// ───────────────────────────────────────────────────────
// Config
// ───────────────────────────────────────────────────────

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
                alias: {
                    map: [
                        ['@', './src'],
                        ['@router', './src/router'],
                        ['@api', './src/api'],
                        ['@domains', './src/domains'],
                        ['@features', './src/features'],
                        ['@shared', './src/shared'],
                    ],
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

            'import/extensions': [
                'error',
                'always',
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
        },
    },

    {
        files: ['vite.config.js', 'eslint.config.js'],
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js'],
                },
            },
        },
        rules: {
            'import/no-unresolved': 'error',
        },
    },

    eslintConfigPrettier,
];
