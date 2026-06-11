---
sidebar_position: 6
---

# Helpers Reference

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

All utility and helper modules live under `theme/helper/`. The root-level and `b2b/` modules are plain JS utilities; React hooks live in `theme/helper/hooks/`. All are consumed by pages, sections, and B2B templates.

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
| `prefetch-cache.js` | Module-level TTL cache for prefetched collection data (SPA-session scoped) |
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

## React hooks — `theme/helper/hooks/`

| File | Purpose |
|---|---|
| `index.jsx` | Re-exports all hooks |
| `hooks.jsx` | Misc shared hooks (`useLoggedInUser`, `useSnackbar`, etc.) |
| `useAccounts.jsx` | Login/register/account flows |
| `useAddress.jsx` | Address CRUD |
| `useAddressFormSchema.jsx` | Address form schema builder |
| `useAppConfig.jsx` | Application config access |
| `useBackExitOverride.jsx` | Browser back-button override for tab flows |
| `useConsole.jsx` | Debug console logging |
| `useDeliverPromise.jsx` | Delivery promise/date formatting |
| `useFpiQuery.jsx` | FPI GraphQL query with background updates |
| `useGoogleMapConfig.jsx` | Google Maps API config |
| `useLenderProfile.jsx` | Lender/credit profile fetching (SWR + FPI store) |
| `useLocalStorage.jsx` | LocalStorage-backed state |
| `useLocaleDirection.jsx` | RTL/LTR locale direction |
| `usePincodeInput.jsx` | Pincode input handling |
| `usePolling.jsx` | Interval polling |
| `usePrefetchCollectionOnHover.jsx` | Prefetch collection data on link hover |
| `usePrefetchProductsOnHover.jsx` | Prefetch product data on link hover |
| `useSeoMeta.jsx` | SEO meta tags |
| `useStateRef.jsx` | State + ref combo |
| `useSyncedState.jsx` | State synced with a parent value |
| `useThemeConfig.jsx` | Theme config access |
| `useThemeFeature.jsx` | Theme feature checks (incl. cross-border detection) |
| `useToggleState.jsx` | Boolean toggle state |
| `useWindowWidth.jsx` | Window width tracking |
| `useWishlist.jsx` | Wishlist add/remove |

## Nested utilities — `theme/helper/utils/`

| File | Purpose |
|---|---|
| `lru-cache.js` | LRU cache (scoped version used by specific utilities) |

## Usage guidelines

- **Do not import from pages or sections** inside helpers. Non-hook helpers must remain side-effect free and framework agnostic; only `hooks/` modules may import React.
- B2B helpers in `helper/b2b/` may import from the B2B API layer (`theme/b2b/api/`) but not from component directories.
- `settle.js` is designed for parallel fetch patterns — use it to prevent one failing price call from blocking others.
- `auth-guard.js` is consumed by pages to redirect guests; it should not be called inside shared components.

## Known gaps

- `lru-cache.js` appears in both `theme/helper/` and `theme/helper/utils/` — the root-level one is legacy and should be consolidated.
- No unit tests exist for any helper utility.
