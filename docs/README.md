# Turbo B2B Theme — Documentation

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

## Purpose

This directory is the source-of-truth for all engineering documentation for the **Turbo B2B** FDK React Theme (v1.4.5). It covers architecture, development workflows, B2B feature reference, operations, and governance.

## Structure

| Section | Path | Purpose |
|---|---|---|
| 00 Overview | [00-overview/](00-overview/index.md) | Project summary, goals, and tech stack |
| 01 Getting Started | [01-getting-started/](01-getting-started/index.md) | Prerequisites, local dev, onboarding |
| 02 Architecture | [02-architecture/](02-architecture/index.md) | Entry points, data flow, module map |
| 03 Reference | [03-reference/](03-reference/index.md) | File inventories for pages, sections, components |
| 04 How-To | [04-how-to/](04-how-to/index.md) | Runbooks for common engineering tasks |
| 05 Operations | [05-operations/](05-operations/index.md) | Build, CI/CD, publish, rollback |
| 06 Decisions | [06-decisions/](06-decisions/index.md) | Architecture Decision Records (ADRs) |
| 07 Quality | [07-quality/](07-quality/index.md) | Linting, testing, bundle analysis |
| 08 Contributing | [08-contributing/](08-contributing/index.md) | PR process, code style, commit conventions |
| 09 Theme | [09-theme/](09-theme/index.md) | Global config, Copilot.live, theming reference |
| 10 Business Requirements | [10-business-requirement/](10-business-requirement/index.md) | B2B feature specifications |

## Quick links

- [Local development](01-getting-started/local-development.md)
- [Publishing the theme](04-how-to/publish-theme.md)
- [B2B feature overview](10-business-requirement/b2b-features.md)
- [ADR index](06-decisions/index.md)

## Known gaps

- No unit or integration test suite is present; test setup is a known gap.
- `npm run test` is a stub that exits with an error.
