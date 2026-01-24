import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
import { dirname, resolve as pathResolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': pathResolve(__dirname, 'src'),

            '@router': pathResolve(__dirname, 'src/router'),
            '@api': pathResolve(__dirname, 'src/api'),
            '@domains': pathResolve(__dirname, 'src/domains'),
            '@features': pathResolve(__dirname, 'src/features'),
            '@shared': pathResolve(__dirname, 'src/shared'),

            '@style-vars': pathResolve(__dirname, 'src/assets/styles/abstracts/variables'),
            '@style-mixins': pathResolve(__dirname, 'src/assets/styles/abstracts/mixins'),
            '@style-fns': pathResolve(__dirname, 'src/assets/styles/abstracts/functions'),
        },
    },
});
