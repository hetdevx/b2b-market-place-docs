---
sidebar_position: 3
---

# Module Boundaries

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

## Directory ownership rules

| Directory | Owned by | May import from | Must NOT import from |
|---|---|---|---|
| `theme/pages/` | Page authors | `sections/`, `components/`, `helper/`, `providers/` | `b2b-page-layouts/` directly |
| `theme/sections/` | Section authors | `components/`, `helper/`, `assets/` | `pages/`, `custom-templates/` |
| `theme/components/` | Shared component team | `helper/`, `assets/`, `constants/` | `pages/`, `sections/`, `b2b/api/` |
| `theme/b2b-page-layouts/` | B2B team | `components/`, `b2b/api/`, `helper/b2b/` | `pages/`, `sections/` |
| `theme/custom-templates/b2b/` | B2B team | `components/`, `b2b/api/`, `helper/b2b/` | `sections/` |
| `theme/b2b/api/` | B2B API team | `axios.js`, `swr.js`, `errors.js` | `components/`, `pages/` |
| `theme/helper/` | All | `constants/` | `pages/`, `sections/`, `components/` |
| `theme/providers/` | Platform team | `helper/`, `constants/`, `copilot/` | `b2b/api/` directly |
| `copilot/` | AI integration team | None (standalone) | Theme internals |

## B2B vs standard module split

```
Standard (non-B2B):
  theme/pages/*          (shared pages accessible to all users)
  theme/sections/*       (FDK sections for page builder)
  theme/components/*     (shared UI)

B2B-specific:
  theme/b2b-page-layouts/   (layout overrides for PDP, PLP, Cart)
  theme/custom-templates/b2b/  (full page templates: quotes, wishlist, dashboard)
  theme/b2b/api/            (REST API layer)
  theme/helper/b2b/         (B2B utility functions)
```

## Provider chain

```
FDK Runtime
  └── global-provider.jsx   (Copilot.live init, global FDK context)
        └── Pages / Sections
              └── B2B Layout components
                    └── Shared components
```

## Allowed cross-boundary patterns

- Pages MAY render B2B layout components by importing from `b2b-page-layouts/` via section wrappers.
- Custom templates ARE the B2B page implementations; they are registered in `custom-templates/index.jsx`.
- The `FeatureGuard` component (`theme/components/FeatureGuard/`) gates B2B feature rendering based on feature flags fetched via `b2b/api/modules/features-api/`.
