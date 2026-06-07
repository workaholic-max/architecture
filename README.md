# Architecture

A reference architecture for **Vue 3** applications — built with TypeScript, Vite, Pinia, and SCSS — with
ESLint-enforced boundaries, tests, CI, and AI-agent guidance for long-term maintainability, predictable structure, and
high codebase readability.

---

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — layer ownership, dependency rules, routing, API, styling, testing, CI, and shared
  implementation patterns.
- [docs/ai-agents.md](docs/ai-agents.md) — how the optional AI guidance files are organized and how to remove them.
- [docs/icons.md](docs/icons.md) — icon registry and rendering conventions.
- [docs/section-comments.md](docs/section-comments.md) — reusable section comment snippets for code organization.

---

## Other Variants

- [PWA](https://github.com/workaholic-max/architecture/tree/pwa) — base architecture plus manifest, installability,
  service worker update handling, and mobile-friendly behavior.
- [Tailwind](https://github.com/workaholic-max/architecture/tree/tailwind) — base architecture with SCSS replaced by a
  production-ready Tailwind CSS setup.
- [Tailwind + PWA](https://github.com/workaholic-max/architecture/tree/tailwind-pwa) — Tailwind CSS setup combined with
  the PWA infrastructure.
