---
sidebar_position: 1
---

# Quality

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

## Linting

ESLint is configured with the `airbnb` config plus `prettier` integration:

```bash
npm run lint          # check only
npm run lint:fix      # auto-fix
```

Config file: `.eslintrc.js`
Ignore file: `.eslintignore`

Key rules enforced:
- React hooks rules (`eslint-plugin-react-hooks`)
- Accessibility rules (`eslint-plugin-jsx-a11y`)
- Prettier formatting parity (`eslint-plugin-prettier`)

## Formatting

Prettier is enforced on all `theme/**` files:

```bash
npm run format
```

Config: `.prettierrc`
Ignore: `.prettierignore`

## Pre-commit hooks

Husky is configured to run lint and format before every commit:

```bash
npm run husky   # one-time setup
```

Hook: `.husky/pre-commit` — runs `npm run lint && npm run format`

## Bundle analysis

```bash
npm run analyze
```

Opens the Webpack Bundle Analyzer report. Use this to track bundle size regressions when adding new dependencies.

## Testing

**Known gap:** No unit or integration test suite exists. `npm run test` exits with an error stub.

Recommended future additions:
- Vitest or Jest for unit tests on `helper/` utilities
- Playwright (`@playwright/test` is already installed as a dev dependency) for E2E tests

## Playwright

`@playwright/test` is installed. No test files are present yet. To scaffold E2E tests:

```bash
npx playwright test
```

Tests should be placed in a `tests/` or `e2e/` directory at the repo root.

## Known quality gaps

| Gap | Priority | Notes |
|---|---|---|
| No unit tests | High | `@playwright/test` is installed but unused |
| No E2E tests | High | Playwright available, no test files |
| No bundle size CI check | Medium | Manual `npm run analyze` only |
| No type checking | Medium | No TypeScript; ESLint partially covers this |
