import { config } from '@vue/test-utils';

// Global test setup — wired via Vitest `setupFiles` in vite.config.ts and run once before the suite.
// Cross-cutting test configuration goes here (global stubs, plugins, mocks, custom matchers, ...).
// Placeholder below registers an empty global stubs map; replace or extend it as the suite grows.
config.global.stubs = {};
