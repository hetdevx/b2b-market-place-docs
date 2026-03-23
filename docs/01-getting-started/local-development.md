---
sidebar_position: 3
---

# Local Development

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

## Clone and install

```bash
git clone <repo-url> react-starter
cd react-starter
npm install
```

## Available npm scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Concurrent Webpack watch + local dev server |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run build:dev` | Development build with watch (no server) |
| `npm run build:local` | Local Webpack build without serve |
| `npm run clean` | Remove `dist/` and `dist_sections/` |
| `npm run serve` | Start nodemon dev server |
| `npm run publish:theme` | Build and publish to Fynd platform |
| `npm run publish:local` | Local build and publish |
| `npm run lint` | Run ESLint on `.js` and `.jsx` files |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run format` | Run Prettier on `theme/**` |
| `npm run analyze` | Build with bundle analyzer |
| `npm run upload-sections` | Extract section props to platform |

## Starting local development

```bash
npm run dev
```

This runs `build:dev` and `serve` concurrently. The dev server is powered by `scripts/server.js` via nodemon.

> **Note:** `fdk theme serve` requires a `.fdk` folder configured via `fdk theme init`. Use `npm run dev` for local Webpack-only builds.

## FDK theme serve (platform-linked)

```bash
fdk theme serve
```

Requires `.fdk` config (run `fdk theme init` once). This links the local build to a Fynd sales channel for live preview.

## Initializing a new theme from this template

```bash
fdk theme new --name your-theme-name
```

Select account type, account, and sales channel when prompted. The theme is cloned and scaffolded automatically.

## Environment variables

No `.env` file is required for local development. The Webpack config uses `dotenv-webpack` for optional env injection.

## Output directories

| Directory | Contents |
|---|---|
| `dist/` | Webpack production/dev build artifacts |
| `dist_sections/` | Extracted section bundles |
