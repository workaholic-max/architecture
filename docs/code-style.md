# Code Style and Verification

This project uses Prettier for formatting, ESLint for code quality and architectural import boundaries, and `vue-tsc`
for TypeScript verification.

## Local workflow

- Enable Prettier format on save in the IDE.
- Enable ESLint auto-fix on save in the IDE.
- Run `pnpm format:check`, `pnpm lint:check`, `pnpm type:check`, and `pnpm test` before handing off a change.

## Pre-commit verification

The Husky pre-commit hook first runs `lint-staged`: Prettier formats supported staged files, and ESLint fixes staged
JavaScript, TypeScript, and Vue source files. It then runs `pnpm type:check` across the project.

## Continuous integration

Continuous integration repeats formatting, linting, and tests across the repository and performs the production build.
See [ARCHITECTURE.md](../ARCHITECTURE.md#githubworkflowsciyml) for the complete CI contract.
