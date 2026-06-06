import vuePlugin from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

import { viteAliases } from './configuration/aliases.js';
import { autoImportPlugin } from './configuration/vite/plugins/auto-import.js';

export default defineConfig({
    plugins: [vuePlugin(), autoImportPlugin()],
    resolve: {
        alias: viteAliases,
        extensions: ['.js', '.ts', '.vue'],
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: (id: string) => {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: ['./tests/setup.ts'],
        passWithNoTests: true,
    },
});
