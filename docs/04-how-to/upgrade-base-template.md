---
sidebar_position: 6
---

# Upgrade the Base Template

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

This runbook covers upgrading `@gofynd/theme-template` and `fdk-store` — the two base packages that provide FDK template components and the GQL store.

## Packages involved

| Package | Current source | Script |
|---|---|---|
| `@gofynd/theme-template` | `github:gofynd/fdk-react-templates#b2b-v1.0.173` | `npm run refresh` |
| `fdk-store` | `github:gofynd/fdk-store-gql#v3.0.67` | manual (see below) |

## Upgrade via npm run refresh

```bash
npm run refresh
```

This uninstalls `fdk-store` and reinstalls it from the `develop` branch of the `shadowfire` repo. Use only when explicitly upgrading to the latest develop snapshot.

> **Warning:** `npm run refresh` points to `develop`, not a tagged release. Always review the diff before committing.

## Upgrade @gofynd/theme-template to a specific tag

Edit `package.json` and change the tag in the dependency:

```json
"@gofynd/theme-template": "github:gofynd/fdk-react-templates#b2b-v1.0.174"
```

Then install:

```bash
npm install
```

## Upgrade fdk-store to a specific tag

Edit `package.json`:

```json
"fdk-store": "github:gofynd/fdk-store-gql#v3.0.68"
```

Then install:

```bash
npm install
```

## Post-upgrade checklist

After upgrading either package:

- [ ] Run `npm run build` — confirm it builds with no errors.
- [ ] Run `npm run lint` — confirm no new lint violations.
- [ ] Check for breaking changes in the package's changelog or commit log.
- [ ] Test the following critical flows locally via `fdk theme serve`:
  - [ ] Homepage renders correctly.
  - [ ] PDP shows correct price, size selector, and B2B layout overrides.
  - [ ] Cart loads and GST card renders.
  - [ ] Checkout flow completes.
  - [ ] Quote request modal opens.
  - [ ] B2B wishlist loads.
- [ ] Check that the B2B layout overrides in `theme/b2b-page-layouts/` still receive the correct props from the updated base template.

## Common breaking change patterns

| Symptom | Likely cause | Fix |
|---|---|---|
| B2B size wrapper receives wrong props | `SizeWrapper` prop shape changed in base template | Update `b2b-size-wrapper.jsx` prop destructuring |
| Price not displaying on PDP | `productPrice` GQL query shape changed | Update `usePriceDetails.jsx` |
| Cart items not rendering | `cartItems` prop structure changed | Update cart section component |
| `fdk-store` action name mismatch | Store action renamed | Search for the old action name and replace |

## Rolling back a bad upgrade

```bash
git checkout package.json package-lock.json
npm install
```

This restores the previous package versions from git. Verify with `npm run build` before continuing.
