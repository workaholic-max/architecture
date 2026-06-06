/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_BASE_URL: string;

    readonly VITE_SECRET_KEY_1: string;
    readonly VITE_SECRET_KEY_2: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// Lets the ESLint TypeScript program type `.vue` imports (vue-tsc keeps its precise types).
declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent<{}, {}, any>;

    export default component;
}
