---
sidebar_position: 4
---

# Publish the Theme

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

The theme is built and uploaded to Fynd Platform via the FDK CLI. Publishing requires an initialized `.fdk/` folder (`fdk theme init`/`fdk theme new`) and a valid session (`fdk login`).

## Sync (publish) to the connected sales channel

```bash
fdk theme sync
```

This builds the theme and uploads it to the sales channel of the **active context** in `.fdk/context.json`.

## Switch context before syncing

`sync.sh` (repo root) is a helper that switches the active FDK context by context name, domain, or full storefront URL, then runs `fdk theme sync` after confirmation:

```bash
sh sync.sh -c b2b-dev-pratik
sh sync.sh --context https://b2b-commerce-dms.hostx5.de/c/profile/quotes
```

It requires `jq` and a populated `.fdk/context.json`.

## Pre-publish checklist

- [ ] `npm run lint` passes with no errors
- [ ] `npm run format` has been run and changes committed
- [ ] `npm run build` completes without errors
- [ ] Theme preview in `fdk theme serve` shows expected output
- [ ] New sections are registered in `theme/sections/index.js` (schemas are extracted automatically during sync)

> **Note:** `package.json` still contains legacy `publish:theme`, `publish:local`, and `upload-sections` scripts that reference a `scripts/` directory (`scripts/publish.js`, `scripts/extract-section-props.js`) which does not exist in this repo. Do not use these scripts — use `fdk theme sync` instead.

## Refreshing the base store package

If `fdk-store` needs updating to the latest develop snapshot:

```bash
npm run refresh
```

This uninstalls `fdk-store` and installs it from the `develop` branch of the internal GitLab `shadowfire` repo. Review the diff carefully before committing. See [Upgrade the Base Template](upgrade-base-template.md).

## Troubleshooting

| Error | Likely cause | Fix |
|---|---|---|
| Build fails with CSS error | Less syntax error | Run `npm run lint` and check Less files |
| Sync fails with auth error | FDK session expired | Run `fdk login` again |
| Sync targets the wrong sales channel | Wrong active context | Run `sh sync.sh -c <context>` or edit `.fdk/context.json` |
| `fdk theme serve`/`sync` fails with missing context | `.fdk` folder not set up | Run `fdk theme init` |
| Bundle analyzer shows unexpected size | Large dependency added | Run `npm run analyze` and review |
