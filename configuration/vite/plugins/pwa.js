import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// Keep this require-based import unless the IDE resolves aliases correctly with
// a direct ESM import from vite-plugin-pwa.
const { VitePWA } = require('vite-plugin-pwa');

export const pwaPlugin = () =>
    VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',

        includeAssets: [
            'images/favicons/favicon.ico',
            'images/favicons/favicon-16x16.png',
            'images/favicons/favicon-32x32.png',
            'images/favicons/apple-touch-icon.png',
        ],

        manifest: {
            id: '/',
            name: 'Architecture',
            short_name: 'Architecture',
            description:
                'A reference architecture for Vue 3 applications — built with TypeScript, Vite, Pinia, SCSS, and Progressive Web App support — with ESLint-enforced boundaries, tests, and CI for long-term maintainability, predictable structure, and high codebase readability.',
            theme_color: '#ffa000',
            background_color: '#ffffff',
            display: 'standalone',
            display_override: ['standalone', 'minimal-ui'],
            scope: '/',
            start_url: '/',
            icons: [
                {
                    src: '/images/icons/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/images/icons/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: '/images/icons/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'maskable',
                },
                {
                    src: '/images/icons/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
            ],
        },

        workbox: {
            globPatterns: ['**/*.{html,css,js,ico,woff2,png,svg}'],
            globIgnores: ['**/vendor/**'],
            cleanupOutdatedCaches: true,
            clientsClaim: true,
            skipWaiting: true,
        },

        devOptions: {
            enabled: false,
        },
    });
