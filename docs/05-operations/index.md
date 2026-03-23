---
sidebar_position: 1
---

# Operations

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
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

**What the pipeline actually does:** It is a **GitHub Sync** pipeline, not a build/lint/publish pipeline. When `master` is merged, it clones the public `gofynd/Turbo` GitHub repo, copies the source into it, and pushes to the `main` branch — syncing the internal ADO repo to the public GitHub mirror.

```yaml
# Trigger: on merge to master
# Action: sync source into gofynd/Turbo GitHub repo (main branch)
# Variables required: GITHUB_USERNAME, GITHUB_PERSONAL_TOKEN (from 'pipeline' variable group)
```

**There is no automated lint, build, or publish step in CI.** These are run manually by the developer before publishing:

```bash
npm run lint
npm run build
npm run publish:theme
```

**Known gap:** A proper CI pipeline with lint + build validation does not exist. Consider adding an Azure DevOps pipeline stage or GitHub Actions workflow that runs `npm run lint && npm run build` on every PR.

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

Then re-run the publish pipeline.

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
