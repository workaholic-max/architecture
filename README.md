# Architecture

A reference architecture for **Vue 3** applications — built with TypeScript, Vite, Pinia, SCSS, and
Progressive Web App support — with ESLint-enforced boundaries, tests, and CI for long-term maintainability, predictable
structure, and high codebase readability.

---

## Purpose

This repository is a maintained, runnable reference implementation of one coherent application architecture. The code
makes concrete choices — including SCSS for styling and integrated PWA support — so the structure, configuration, and
implementation patterns can be inspected in context, adopted selectively, and adapted to the needs of a real product.

The included product surface keeps those decisions executable and verifiable while providing concrete examples across
the architectural layers.

---

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — layer ownership, dependency rules, routing, API, styling, testing, CI, and shared
  implementation patterns.
- [docs/icons.md](docs/icons.md) — icon registry and rendering conventions.
- [docs/api-client.md](docs/api-client.md) — the shared axios wrapper, cancellation, and what's not wired in yet.
- [docs/scss-tokens.md](docs/scss-tokens.md) — the SCSS variable/mixin/function alias and barrel pattern.
- [docs/application-init.md](docs/application-init.md) — the boot sequence and why its call order matters.
- [docs/code-style.md](docs/code-style.md) — local formatting, linting, type-checking, and pre-commit verification.
- [docs/section-comments.md](docs/section-comments.md) — reusable section comment snippets for code organization.
- [docs/progressive-web-app.md](docs/progressive-web-app.md) — manifest, service worker, install presentation,
  social preview, and offline behavior.
- [docs/new-domain.md](docs/new-domain.md) — end-to-end walkthrough for adding a new domain.
- [docs/new-feature.md](docs/new-feature.md) — end-to-end walkthrough for adding a new feature.
- [docs/new-service.md](docs/new-service.md) — end-to-end walkthrough for adding a new service.

---

## AI-Assisted Development

This repo doesn't ship its own AI-agent configuration. For the Claude Code toolkit — skills, subagents, conventions —
used to build and maintain projects like this one, see
[dev-lab/ai-assisted-dev](https://github.com/workaholic-max/dev-lab/tree/main/ai-assisted-dev). Treat it as a starting
point to adapt rather than a drop-in fit — you'll likely want it stricter for your own project.
