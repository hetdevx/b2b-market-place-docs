---
sidebar_position: 4
---

# Publish the Theme

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

## Production publish

Build the theme and publish it to the Fynd Platform:

```bash
npm run publish:theme
```

This runs `npm run build` followed by `node scripts/publish.js`. The script uploads the built artifacts to the connected Fynd sales channel.

## Local / development publish

```bash
npm run publish:local
```

Builds with local Webpack config and publishes. Useful for testing a complete publish flow without a production build.

## Pre-publish checklist

- [ ] `npm run lint` passes with no errors
- [ ] `npm run format` has been run and changes committed
- [ ] `npm run build` completes without errors
- [ ] Theme preview in `fdk theme serve` shows expected output
- [ ] Section schemas are up to date (`npm run upload-sections`)

## Refreshing the base template

If the base `@gofynd/theme-template` needs updating:

```bash
npm run refresh
```

This uninstalls the current `fdk-store` and installs the latest `develop` branch of `shadowfire`. Review the diff carefully before committing.

## Troubleshooting

| Error | Likely cause | Fix |
|---|---|---|
| Build fails with CSS error | Less syntax error | Run `npm run lint` and check Less files |
| Publish script fails with auth error | FDK session expired | Run `fdk login` again |
| Section props not updated on platform | `upload-sections` not run | Run `npm run upload-sections` |
| Bundle analyzer shows unexpected size | Large dependency added | Run `npm run analyze` and review |
