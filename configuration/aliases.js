import { resolve } from 'node:path';

const root = process.cwd();

const baseAliases = {
    '@': resolve(root, 'src'),
    '@router': resolve(root, 'src/router'),
    '@api': resolve(root, 'src/api/index.js'),
    '@domains': resolve(root, 'src/domains'),
    '@features': resolve(root, 'src/features'),
    '@shared': resolve(root, 'src/shared'),
};

const scssAliases = {
    '@scss-vars': resolve(root, 'src/assets/styles/abstracts/variables'),
    '@scss-mixins': resolve(root, 'src/assets/styles/abstracts/mixins'),
    '@scss-functions': resolve(root, 'src/assets/styles/abstracts/functions'),
};

export const viteAliases = {
    ...baseAliases,
    ...scssAliases,
};

export const eslintAliases = baseAliases;
