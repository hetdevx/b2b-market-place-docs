---
sidebar_position: 1
---

# Contributing

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

## Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Default branch (production-ready code) |
| `master` | Triggers the GitHub sync pipeline to `gofynd/Turbo` on merge (see Operations) |
| `b2b-v<x.y.z>` | B2B release branches (e.g., `b2b-v1.4.12`, `b2b-v1.5.0`); the package version tracks the current release |
| `merge/*` | Integration branches merging one release line into another (e.g., `merge/1.4.10-into-1.4.6`, `merge/master-1.5.0`) |
| `feature/*` | Feature branches |
| `fix/*`, `bug/*`, `bugfix/*` | Bug fix branches |
| `BB-<ticket>-*` | Ticket-scoped branches (e.g., `BB-365-b-2-b-configuration-defects`) |

## PR process

1. Create a branch from `main` (`feature/your-feature` or `fix/your-fix`).
2. Make changes. Run `npm run lint` and `npm run format` before committing (or run `npm run husky` once to set up the pre-commit hook that does this — see [Quality](../07-quality/index.md)).
3. Open a pull request against `main`.
4. Request review from at least one team member.
5. All lint checks must pass locally — there is no CI lint gate, so this is on the author.
6. Merge via the Azure DevOps PR flow (history shows `Merged PR ...` merge commits).

## Commit conventions

Use the format:

```
type: short description

Optional longer body.
```

Types: `feat`, `fix`, `refactor`, `docs`, `style`, `chore`, `test`

Examples:
```
feat: add MOQ validation to B2B size wrapper
fix: resolve GST card input clearing on cart update
docs: add B2B features section to docs
```

## Code style

- All new files in `theme/` must be `.jsx` (not `.tsx` or `.js` for React components).
- Use lowercase with hyphens for file names: `my-component.jsx`.
- CSS modules via `.less` files — no inline styles for layout.
- Do not add TypeScript unless the team decides to migrate.

## Adding B2B features

When adding a new B2B feature:
1. Add the feature component under `theme/b2b-page-layouts/` or `theme/custom-templates/b2b/`.
2. Gate with `FeatureGuard` if it should be feature-flag-controlled.
3. Add the feature API call to `theme/b2b/api/modules/` if a new API endpoint is needed.
4. Update [B2B Layouts Reference](../03-reference/b2b-layouts.md) and [B2B Features](../10-business-requirement/b2b-features.md).

## Documentation updates

When adding or removing pages/sections/components, update the corresponding reference doc:
- [Pages](../03-reference/pages.md)
- [Sections](../03-reference/sections.md)
- [Components](../03-reference/components.md)
- [B2B Layouts](../03-reference/b2b-layouts.md)
