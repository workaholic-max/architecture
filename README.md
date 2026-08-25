# Vue Application Architecture

This repository is a development starting point for maintainable Vue applications. It combines a documented
architecture, enforceable dependency boundaries, portable creation guides, and a runnable implementation.

The architecture is the product of this repository. The included screens and optional facilities demonstrate that the
structure can run, but they do not define the structure and are not intended to become requirements for every product.

---

## Start Here

Follow this path when joining or adopting the repository:

1. Read [`ARCHITECTURE.md`](ARCHITECTURE.md). It is the authoritative contract for ownership, dependencies,
   initialization, routing, API composition, imports, tests, and delivery safeguards.
2. Use the appropriate creation guide before adding a [domain](docs/new-domain.md), [feature](docs/new-feature.md), or
   [service](docs/new-service.md).
3. Implement the change in the narrowest correct owner. Add only the folders that owner actually needs.
4. Follow [Code Style and Verification](docs/code-style.md) before handing off or opening a pull request.
5. Consult [`references/`](references/README.md) only when you need the reasoning or provenance behind an optional
   repository-specific implementation.

Do not start with the implementation references when deciding ownership. They are supporting material;
`ARCHITECTURE.md` is the source of truth.

---

## Documentation Map

| Location                              | Purpose                                                                                                  | Authority     |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------- |
| [`ARCHITECTURE.md`](ARCHITECTURE.md)  | Defines the layer model, dependency rules, composition points, configuration, and verification contract. | Normative     |
| [`docs/`](docs/README.md)             | Provides product-independent workflows for applying the architecture.                                    | Operational   |
| [`references/`](references/README.md) | Records optional implementation choices and links to their original reasoning.                           | Supplementary |
| [`src/`](src)                         | Keeps the architecture executable and demonstrates representative folder shapes.                         | Illustrative  |

If code and architecture documentation disagree, resolve the disagreement deliberately: correct the code when it
violates the contract, or update the contract and its automated enforcement when the architectural decision changed.

---

## Development Setup

The verified toolchain uses Node.js 20, pnpm 10, Vue 3, TypeScript, Vite, Pinia, Vitest, ESLint, and Prettier.

```sh
pnpm install
pnpm dev
```

Review [`.env.example`](.env.example) and the mode-specific environment files before connecting a real backend. Every
value exposed through Vite is public browser configuration; server secrets do not belong in these files.

Before handing off a change, run:

```sh
pnpm format:check
pnpm lint:check
pnpm type:check
pnpm test
pnpm build
```

Husky provides staged-file and type-check feedback before a commit. GitHub Actions repeats repository-wide formatting,
linting, tests, and the production build for pull requests and pushes to the main branch.

---

## Adopting the Repository

Keep these foundations when they match the product:

- the ownership and dependency contract in [`ARCHITECTURE.md`](ARCHITECTURE.md);
- the `app`, `domains`, `features`, `shared`, `api`, and `router` responsibilities;
- aligned aliases across Vite, TypeScript, and ESLint;
- lint-enforced boundaries, strict type-checking, colocated tests, and continuous integration;
- the generic workflows under [`docs/`](docs/README.md).

Rename or remove the sample product domains and features as the real product replaces them. Optional SCSS, icons, PWA
support, fonts, favicons, social metadata, controls, and directives may also be removed without changing the layer
model. Their implementation notes are isolated under [`references/`](references/README.md).

---

## Production-Ready Scope

This is a production-oriented architectural foundation: it has explicit ownership, guarded dependency direction,
strict types, automated formatting and linting, tests, pre-commit checks, reproducible installation, CI, and a verified
production build.

It is not a finished production product. A consuming application still owns its real environment values, backend and
authentication integration, security review, operational monitoring, deployment configuration, accessibility review,
and product-specific test coverage. Those concerns should be added without weakening the architectural contract.
