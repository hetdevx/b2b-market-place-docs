---
sidebar_position: 1
---

# Quality

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

## Linting

ESLint is configured with `airbnb` + `airbnb/hooks` + `prettier`:

```bash
npm run lint          # eslint . --ext .js,.jsx (check only)
npm run lint:fix      # auto-fix
```

Config file: `.eslintrc.js`
Ignore file: `.eslintignore` (excludes `node_modules/`, `.fdk/`, `.husky`, `build/`, `theme/sections/index.js`, `theme/config/*`)

Key rules enforced:
- React hooks rules (`eslint-plugin-react-hooks`) — note `react-hooks/exhaustive-deps` is disabled
- Accessibility rules (`eslint-plugin-jsx-a11y`) — several a11y rules are disabled
- Prettier formatting parity (`eslint-plugin-prettier`, `prettier/prettier: error`)

Many airbnb rules are explicitly turned off in `.eslintrc.js` (e.g., `no-unused-vars`, `react/prop-types`, `camelcase`, `no-param-reassign`), so the effective ruleset is considerably looser than stock airbnb.

## Formatting

Prettier is applied to `theme/**/*.{js,jsx,json,css,md}`:

```bash
npm run format
```

Config: `.prettierrc` (double quotes, semicolons, 2-space tabs, 80-char width, ES5 trailing commas)
Ignore: `.prettierignore`

## Pre-commit hooks

Husky (v8) is a dev dependency, but **hooks are not active on a fresh clone** — `.husky/` is gitignored and not committed. One-time setup per clone:

```bash
npm run husky   # installs husky and creates .husky/pre-commit
```

This creates `.husky/pre-commit` running `npm run lint && npm run format`.

Note: `package.json` also contains a legacy `"husky": { "hooks": { ... } }` block; husky v8 ignores this config, so it has no effect.

## Bundle analysis

```bash
npm run analyze
```

Opens the Webpack Bundle Analyzer report. Use this to track bundle size regressions when adding new dependencies.

## Testing

**Known gap:** No unit or integration test suite exists. The `test` script is a stub:

```json
"test": "echo \"Error: no test specified\" && exit 1"
```

No test framework is installed (no Jest, Vitest, or Playwright in `package.json`). Recommended future additions:
- Vitest or Jest for unit tests on `helper/` utilities
- Playwright for E2E tests

## Known quality gaps

| Gap | Priority | Notes |
|---|---|---|
| No unit tests | High | No test framework installed; `npm test` is an error stub |
| No E2E tests | High | No Playwright/Cypress dependency or test files |
| No CI lint/build/test check | High | CI is a GitHub-sync pipeline only (see Operations) |
| No bundle size CI check | Medium | Manual `npm run analyze` only |
| No type checking | Medium | No TypeScript; ESLint partially covers this |
