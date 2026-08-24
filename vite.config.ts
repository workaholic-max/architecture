import vuePlugin from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

import { viteAliases } from './configuration/aliases.js';
import { autoImportPlugin } from './configuration/vite/plugins/auto-import.js';
import { pwaPlugin } from './configuration/vite/plugins/pwa.js';

export default defineConfig({
    plugins: [vuePlugin(), autoImportPlugin(), pwaPlugin()],
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
