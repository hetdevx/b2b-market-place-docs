# Product Recommendation Reco API Dedupe Plan

## Summary

- Root cause: `/ext/reco-extension/reco` is fetched from effects whose dependencies can change during store/auth/i18n hydration, and `recently-viewed` has a separate reco fetch path.
- Fix target: one reco API network request per stable request key, covering normal recommendation slugs and `recently-viewed`.
- Keep auth/KYC/discount changes out of the reco request key; those changes should only re-run price enrichment.

## Implementation Changes

- Add a shared reco API helper with canonical sorted param serialization, in-flight dedupe, and a short response cache for identical requests.
- Refactor `theme/sections/product-recommendation.jsx` to build params from `useLocation().pathname`, fetch raw items by stable request key, then enrich best prices in a separate effect.
- Guard FPI config/data writes so identical writes do not churn `CUSTOM_VALUE`.
- Refactor `useRecentlyViewed` to use the same reco helper for its server-tail request and ignore stale promise results after cleanup/key changes.
- Pass `items={undefined}` to `ApiWrapper` for `recently-viewed` so it reads the hook-published store data.

## Test Plan

- Run ESLint on the three touched implementation files.
- Run `npm run build:local` if lint passes.
- Manual network checks:
  - PDP normal slug refresh sends one reco request for identical params.
  - Non-PDP placement refresh sends one reco request with stable `placement_slug`.
  - Auth/KYC/global config hydration does not refetch reco items.
  - Recently-viewed sends one reco server-tail request and still renders merged local/server items.
  - Route slug, currency, or language changes may send a new reco request because the key changed.

## Assumptions

- "One time" means one network call per stable recommendation request key, not one forever across route, currency, language, or slug changes.
- Scope includes all direct reco endpoint paths in the B2B product recommendation UI.
- Public section settings do not change.
