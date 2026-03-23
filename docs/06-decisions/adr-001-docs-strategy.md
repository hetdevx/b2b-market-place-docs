# ADR-001: Documentation Strategy for Turbo B2B

Date: 2026-03-14
Status: Accepted

## Context

The Turbo B2B theme is a large React codebase with significant B2B-specific surface area (quotes, wishlists, distributed dashboard, pricing models). There was no structured documentation making onboarding, maintenance, and team handoffs slow and error-prone.

## Decision

- Adopt a `docs/` directory in the repository root as the source-of-truth for all engineering documentation.
- Use numbered section folders (`00-overview/` through `10-business-requirement/`) to impose a consistent structure.
- Publish docs as a Docusaurus site (in `website/`) deployed to Vercel using Mode A (repo root build, `../docs` path).
- All docs must include owner, reviewer, last-updated, and status metadata.
- Reference docs (pages, sections, components) must be derived from the filesystem — no invented architecture.

## Consequences

- Docs are co-located with code, making them easier to keep in sync.
- Docusaurus provides search, sidebar navigation, and Mermaid diagram rendering.
- Vercel deployment makes docs accessible to non-engineering stakeholders.
- Teams must maintain docs when adding new pages, sections, or B2B features.
- Known gap: no automated doc validation CI step yet.
