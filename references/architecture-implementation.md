# Implementation Overview

This repository makes the architecture executable with Vue 3, TypeScript, Vite, Pinia, Axios, Vitest, ESLint,
Prettier, Husky, and GitHub Actions.

The architecture itself—including ownership, dependencies, initialization, routing, API composition, aliases, lint
boundaries, tests, and delivery safeguards—is documented in [`ARCHITECTURE.md`](../ARCHITECTURE.md). This file does not
repeat it.

The following are optional implementation choices rather than architectural requirements:

- [SCSS tokens](scss-tokens.md)
- [centralized icon rendering](icons.md)
- [Progressive Web App support](progressive-web-app.md)
- [section comments](section-comments.md)

The application initialization and API client are concrete implementations of architectural concepts:

- [application initialization](application-init.md)
- [API client](api-client.md)

Their original and related Dev Lab material is collected in the [source index](dev-lab-sources.md).
