export const baseRestrictedImportPatterns = [
    {
        group: ['@/router/**', '@/api/**', '@/domains/**', '@/features/**', '@/shared/**'],
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
];

export const appRestrictedImportPatterns = [
    {
        group: ['@/app/**'],
        message: 'The app layer is the top of the dependency graph and must never be imported by other layers.',
    },
];

export const featureRestrictedImportPatterns = [
    {
        group: ['@domains/**'],
        message: 'Features must not import from domains. Features are consumed by domains, not the other way around.',
    },
];

export const buildNoRestrictedImports = (...patternGroups) => ({
    'no-restricted-imports': ['error', { patterns: patternGroups.flat() }],
});
