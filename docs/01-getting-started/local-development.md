---
sidebar_position: 3
---

# Local Development

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
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
| `npm run analyze` | Production build with `ANALYZE=true` (the `BundleAnalyzerPlugin` block is currently commented out in `webpack.config.js`) |
| `npm run upload-sections` | Extract section props to platform |
| `npm run refresh` | Reinstall `fdk-store` from the shadowfire `develop` branch |
| `npm run husky` | Install Husky and add a pre-commit hook running `lint` + `format` |
| `npm run test` | Stub — exits with an error (no test suite) |

> **Warning:** `serve`, `dev`, `publish:theme`, `publish:local`, and `upload-sections` reference a `scripts/` directory (`scripts/server.js`, `scripts/publish.js`, `scripts/extract-section-props.js`) that is **not committed** to this repo, so they fail out of the box. Use `fdk theme serve` for local development.

## Starting local development

```bash
fdk theme serve
```

Requires `.fdk` config (run `fdk theme init` once). This links the local build to a Fynd sales channel for live preview.

> **Note:** `npm run dev` (concurrent `build:dev` + `serve`) expects `scripts/server.js`, which is not committed to the repo, so `fdk theme serve` is the supported local dev flow. `npm run build:dev` alone still works for a watch-mode Webpack build.

## Switching FDK contexts

`sync.sh` switches the active context in `.fdk/context.json` (by context name, domain, or full URL) and optionally runs `fdk theme sync`. Requires `jq`.

```bash
sh sync.sh -c <context-name|domain|url>
```

## Initializing a new theme from this template

```bash
fdk theme new --name your-theme-name
```

Select account type, account, and sales channel when prompted. The theme is cloned and scaffolded automatically.

## Environment variables

No `.env` file is required for local development. The Webpack config loads `dotenv-webpack` only for local builds (`webpack --env local`) for optional env injection.

## Output directories

| Directory | Contents |
|---|---|
| `dist/` | Webpack production/dev build artifacts |
| `dist_sections/` | Extracted section bundles |
