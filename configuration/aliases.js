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

const styleAliases = {
    '@style-vars': resolve(root, 'src/assets/styles/abstracts/variables'),
    '@style-mixins': resolve(root, 'src/assets/styles/abstracts/mixins'),
    '@style-fns': resolve(root, 'src/assets/styles/abstracts/functions'),
};

export const viteAliases = {
    ...baseAliases,
    ...styleAliases,
};

export const eslintAliases = baseAliases;
