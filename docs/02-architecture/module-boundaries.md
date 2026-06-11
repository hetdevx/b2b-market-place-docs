---
sidebar_position: 3
---

# Module Boundaries

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

## Directory ownership rules

| Directory | Owned by | May import from | Must NOT import from |
|---|---|---|---|
| `theme/pages/` | Page authors | `page-layouts/`, `components/`, `helper/`, `providers/`, `queries/` | `sections/`, `b2b-page-layouts/` directly |
| `theme/sections/` | Section authors | `page-layouts/`, `b2b-page-layouts/`, `components/`, `helper/`, `queries/`, `assets/` | `pages/` |
| `theme/page-layouts/` | Page authors | `components/`, `helper/`, `queries/`, `assets/` | `pages/`, `sections/` |
| `theme/components/` | Shared component team | `helper/`, `assets/`, `queries/`, `constants/` | `pages/`, `sections/` |
| `theme/b2b-page-layouts/` | B2B team | `components/`, `helper/b2b/`, `queries/`, `page-layouts/` | `pages/`, `sections/` |
| `theme/custom-templates/b2b/` | B2B team | `components/`, `b2b/api/`, `helper/b2b/`, `queries/`, `b2b-page-layouts/` | `sections/`, `pages/` |
| `theme/b2b/` | B2B API team | root `constant.js`, `queries/`, `helper/` | `pages/`, `sections/` |
| `theme/helper/` | All | `queries/`, `b2b/`, `constants/` | `pages/`, `sections/` |
| `theme/providers/` | Platform team | `components/`, `helper/`, `page-layouts/`, `b2b/api/modules/`, `copilot/` | `pages/`, `sections/` |
| `copilot/` | AI integration team | `theme/helper/`, `theme/page-layouts/`, `theme/queries/` (lazy imports) | `theme/components/`, `theme/pages/`, `theme/sections/` |

## B2B vs standard module split

```
Standard (non-B2B):
  theme/pages/*          (thin route entry points, lazy-loaded from theme/index.jsx)
  theme/page-layouts/*   (page implementations: pdp, plp, cart, orders, checkout, ...)
  theme/sections/*       (FDK sections for page builder)
  theme/components/*     (shared UI)
  theme/queries/*        (GraphQL documents for fdk-store, one file per domain)

B2B-specific:
  theme/b2b-page-layouts/      (layout overrides for PDP, PLP, Cart)
  theme/custom-templates/b2b/  (full page templates: quotes, wishlist, distributed
                                dashboard, credit, loyalty, contracted price, address book)
  theme/b2b/                   (REST API layer: api/axios.js, api/swr.js, api/errors.js,
                                api/modules/*, plus b2b-constants.js and helper/)
  theme/helper/b2b/            (B2B utility functions: best-price, quotation, checkout, settle)
```

## Provider chain

```
FDK Runtime
  └── theme/index.jsx           (FPIClient bootstrap, registers sections / customTemplates / page getters)
        └── ThemeProvider       (providers/global-provider.jsx: SEO/Helmet, fonts + CSS vars,
            │                    i18n/currency bootstrapping, copilot/ init, referral capture)
            └── Pages / Sections
                  └── B2B Layout components
                        └── Shared components

SWR-driven custom-template routes (the distributed-dashboard routes in
theme/custom-templates/index.jsx) are additionally wrapped in SWRProvider
(theme/b2b/api/swr.js).
```

## Allowed cross-boundary patterns

- Sections MAY render B2B layout components by importing from `b2b-page-layouts/` (e.g. `product-description.jsx`, cart sections).
- Custom templates ARE the B2B page implementations; they are registered as React Router `<Route>` elements in `theme/custom-templates/index.jsx`.
- The `FeatureGuard` component (`theme/components/FeatureGuard/`) gates B2B feature rendering based on feature flags read via the `useFPIAppConfig` hook; the flags themselves are fetched from the app-config endpoint by `theme/b2b/api/modules/features-api/`.
- `theme/b2b/api/modules/b2b-product-recommendation/` imports its co-located GraphQL documents from `theme/components/b2b-product-recommendation/queries/` (the only sanctioned `b2b/ → components/` dependency).
