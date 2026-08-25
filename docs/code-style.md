# Code Style and Verification

Formatting, linting, type-checking, tests, and the production build form the verification contract for the project.

## Local Workflow

- Enable formatter integration in the editor.
- Enable lint auto-fix on save when supported.
- Run `pnpm format:check` to verify formatting.
- Run `pnpm lint:check` to verify code quality and architectural import boundaries.
- Run `pnpm type:check` to verify TypeScript and Vue files.
- Run `pnpm test` to execute the test suite.
- Run `pnpm build` before releases or changes that affect build configuration.

## Pre-Commit Verification

The pre-commit hook first runs `lint-staged`: the formatter processes supported staged files and ESLint fixes staged
JavaScript, TypeScript, and Vue files. It then runs `pnpm type:check` across the project.

This provides fast feedback without replacing repository-wide verification. Staged-file checks do not cover unaffected
files, the complete test suite, or the production build.

## Continuous Integration

Continuous integration installs dependencies from the lockfile and runs:

1. formatting verification;
2. linting;
3. tests;
4. `pnpm build`, which type-checks and creates the production bundle.

The workflow runs for pull requests and pushes to the main branch. Local scripts and continuous integration use the same
commands so both environments evaluate the same contract.
