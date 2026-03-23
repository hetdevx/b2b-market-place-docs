---
sidebar_position: 6
---

# Helpers Reference

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

All utility and helper modules live under `theme/helper/`. These are pure JS utilities — they do not import React and are consumed by pages, sections, and B2B templates.

## General helpers — `theme/helper/`

| File | Purpose |
|---|---|
| `utils.js` | General-purpose utility functions (formatting, string manipulation, date helpers) |
| `lib.js` | Low-level library utilities shared across helpers |
| `constant.js` | Application-wide constants (timeouts, limits, keys) |
| `theme.js` | Theme-specific helper utilities (section props, config helpers) |
| `auth-guard.js` | Auth guard logic — checks login state and redirects unauthenticated users |
| `media-layout.js` | Responsive media/layout utilities (breakpoints, image sizing) |
| `lru-cache.js` | LRU cache implementation (root-level, legacy) |
| `ms.js` | Millisecond conversion utility |
| `fpi-swr-wrapper.js` | SWR wrapper for FDK's FPI (Fynd Platform Integration) data fetching |
| `pdp-image-updater-extension.js` | Extension hook for updating PDP images from external sources |
| `copilot-utils.js` | Utility functions for Copilot.live action registration |

## B2B helpers — `theme/helper/b2b/`

| File | Purpose |
|---|---|
| `index.js` | B2B helper module entry point / re-exports |
| `utils.js` | B2B-specific utility functions (cart validation, MOQ checks, GST formatting) |
| `fetch_best_price_details.js` | Fetch the best available price for a single product/size combination |
| `fetch_best_price_list.js` | Batch fetch best available prices for multiple products (PLP use) |
| `quotation.service.js` | Quote/RFQ service — create, list, update, and manage quotation requests |
| `checkout.js` | B2B checkout helper — payment method selection, credit terms, GST validation |
| `settle.js` | Promise settle utility — resolves all promises regardless of rejection (used for parallel price fetching) |

## Nested utilities — `theme/helper/utils/`

| File | Purpose |
|---|---|
| `lru-cache.js` | LRU cache (scoped version used by specific utilities) |

## Usage guidelines

- **Do not import from pages or sections** inside helpers. Helpers must remain side-effect free and framework agnostic.
- B2B helpers in `helper/b2b/` may import from the B2B API layer (`theme/b2b/api/`) but not from component directories.
- `settle.js` is designed for parallel fetch patterns — use it to prevent one failing price call from blocking others.
- `auth-guard.js` is consumed by pages to redirect guests; it should not be called inside shared components.

## Known gaps

- `lru-cache.js` appears in both `theme/helper/` and `theme/helper/utils/` — the root-level one is legacy and should be consolidated.
- No unit tests exist for any helper utility.
