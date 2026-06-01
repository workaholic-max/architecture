export const noRestrictedImportsRules = {
    'no-restricted-imports': [
        'error',
        {
            patterns: [
                {
                    group: ['@/app/**', '@/router/**', '@/api/**', '@/domains/**', '@/features/**', '@/shared/**'],
                    message: 'Root-level @/ imports are forbidden. Always use the specific alias instead.',
                },

                {
                    group: ['@shared/icons/**', '!@shared/icons/index.ts'],
                    message: 'Direct imports from internal files are forbidden. Always import from the module root.',
                },

                {
                    group: ['@/**/fragments/**', '@*/**/fragments/**'],
                    message:
                        'Fragments are local only intended for use within the same module. Always use relative imports. Absolute imports are forbidden.',
                },
            ],
        },
    ],
};
