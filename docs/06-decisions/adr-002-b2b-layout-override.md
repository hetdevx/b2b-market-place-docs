# ADR-002: B2B Layout Override Approach

Date: 2026-03-14
Status: Accepted

## Context

The Fynd FDK base theme template (`@gofynd/theme-template`) provides standard PDP, PLP, and Cart layouts. B2B commerce requires significant UI differences (MOQ, ladder pricing, GST, seller identification, quote flows). We needed a strategy to extend base layouts without forking the entire template.

## Decision

- Create `theme/b2b-page-layouts/` as a parallel directory to hold B2B-specific layout components.
- B2B layout components override or wrap specific sub-components of the base template (e.g., size wrapper, price wrapper, sticky cart) rather than replacing entire pages.
- The `FeatureGuard` component gates B2B components behind feature flags fetched from the platform API.
- B2B full-page templates (quotes, wishlist, distributed dashboard) live in `theme/custom-templates/b2b/` and are registered via `custom-templates/index.jsx`.

## Consequences

- Base template upgrades (`npm run refresh`) affect shared components but not B2B overrides — delta is isolated.
- B2B components can be conditionally rendered based on account/feature flags without shipping code to non-B2B stores.
- Module boundary between `b2b-page-layouts/` and `pages/` must be maintained to avoid circular dependencies.
- Trade-off: two places to look for PDP-related code (base template + B2B overrides); requires good documentation.
