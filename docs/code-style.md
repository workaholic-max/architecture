## Code Style & Formatting

This project uses Prettier for formatting and ESLint for code quality.

### Requirements

- Enable Prettier format on save in your IDE
- Enable ESLint auto-fix on save in your IDE

### Notes

Pre-commit hooks (husky + lint-staged) run on staged files only.

**Execution order:**
1. Prettier — formatting
2. ESLint — linting and autofix