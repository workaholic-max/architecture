import vuePlugin from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

import { viteAliases } from './configuration/aliases.js';
import { autoImportPlugin } from './configuration/vite/plugins/auto-import.js';

export default defineConfig({
    plugins: [vuePlugin(), autoImportPlugin()],
    resolve: {
        alias: viteAliases,
    },
});
