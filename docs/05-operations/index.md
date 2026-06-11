---
sidebar_position: 1
---

# Operations

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

## Build

```bash
# Production build
npm run build

# Development build (with watch)
npm run dev

# Clean build artifacts
npm run clean
```

Output directories:
- `dist/` — Webpack build artifacts
- `dist_sections/` — Extracted section chunks

## CI/CD pipeline

The project includes `azure-pipelines.yml` for Azure DevOps CI.

**What the pipeline actually does:** It is a **GitHub Sync** pipeline, not a build/lint/publish pipeline. On merge to `master`, it (in a `node:18-buster` container):

1. Authenticates as a GitHub App (JWT signed with the `ado-gh-sync.pem` secure file, exchanged for an installation token).
2. Clones the public `gofynd/Turbo` GitHub repo, replaces its contents with this repo's source (using `.gitignore.ci` as the mirror's `.gitignore`), and pushes to `main`.
3. Pushes a tag named after the source branch and creates a GitHub release `Release_<branch>` on `gofynd/Turbo`.

```yaml
# Trigger: on merge to master
# Action: sync source into gofynd/Turbo GitHub repo (main branch) + tag + release
# Variables required: GITHUB_APP_ID, GITHUB_APP_INSTALLATION_ID (from 'ado-gh-sync-vg' variable group)
# Secure file: ado-gh-sync.pem (GitHub App private key)
```

**There is no automated lint, build, or publish step in CI.** Run these manually before publishing:

```bash
npm run lint
npm run build
```

Note: `package.json` defines `publish:theme` (and `dev`, `serve`, `upload-sections`), but the `scripts/` directory they reference (`scripts/publish.js`, `scripts/server.js`, `scripts/extract-section-props.js`) is **not present in this repo**, so those npm scripts fail. Local serve and publish go through the FDK CLI instead (`fdk theme serve`, `fdk theme sync`).

**Known gap:** A proper CI pipeline with lint + build validation does not exist. Consider adding an Azure DevOps pipeline stage or GitHub Actions workflow that runs `npm run lint && npm run build` on every PR.

## Theme sync helper (`sync.sh`)

`sync.sh` switches the active FDK context and syncs the theme to an environment:

```bash
sh sync.sh -c <context-name|domain|full-url>
```

It looks up the context in `.fdk/context.json` (requires `jq`), updates `theme.active_context`, prints the context summary (domain, application/company/theme IDs, env), then prompts before running `fdk theme sync`.

## Docs deployment

`vercel.json` configures a Vercel build for a docs website (`npm ci --prefix website`, `npm --prefix website run build`, output `website/build`). The `website/` directory is not present in the repo yet, so this config is inert until the docs site is scaffolded. Note: `docs/` and `vercel.json` are listed in `.gitignore`, so they are local-only.

## Rollback procedure

If a published theme causes issues on production:

1. Log in to Fynd Platform.
2. Navigate to **Themes** for the affected sales channel.
3. Click the previous stable version in the theme history.
4. Click **Publish** to restore it.

Git rollback (for source-of-truth):

```bash
git revert HEAD
git push origin main
```

Then rebuild and republish the theme via the FDK CLI (`fdk theme sync`).

## Incident response

1. Identify whether the issue is in the theme code or the FDK platform.
2. Check browser console for JS errors and network tab for failing requests.
3. If theme code: hotfix branch, fix, lint, build, publish.
4. If platform: check Fynd status page and contact platform support.

## Monitoring

- No custom APM is configured.
- Monitor via Fynd Platform analytics for storefront errors and performance.
- Browser console errors in `fdk theme serve` are the primary local debug signal.

## Known operational gaps

- No automated testing pipeline (unit or E2E).
- No error tracking integration (e.g., Sentry) is present.
- Bundle size monitoring is manual (`npm run analyze`).
