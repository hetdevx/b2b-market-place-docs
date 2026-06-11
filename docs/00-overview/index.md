---
sidebar_position: 1
slug: /overview/
---

# Overview

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

## Project identity

| Field | Value |
|---|---|
| Name | Turbo B2B |
| Version | 1.4.12 |
| Type | FDK React Theme (`theme_type: react`) |
| Platform | Fynd Commerce (FDK) |
| License | ISC |
| Runtime | React 18, Webpack 5 |

## Purpose

Turbo B2B is a production React storefront theme for Fynd Commerce tailored for **B2B commerce workflows**. It extends the Fynd FDK base template (`@gofynd/theme-template`) with B2B-specific features including:

- Quote request and negotiation flows
- Minimum order quantity (MOQ) enforcement on PDP
- Ladder / contracted / best-price pricing models
- B2B wishlist with sharing, notes, and bulk order
- GST input on cart
- Distributed retail dashboard
- B2B seller identifier on PDP
- B2B-aware checkout helper

## Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 18 |
| Bundler | Webpack 5 with code-splitting (section chunking enabled) |
| Styling | CSS Modules + Less |
| State | `fdk-store` (SWR-based, GQL) |
| API layer | Axios (`theme/b2b/api/axios.js`) + SWR (`theme/b2b/api/swr.js`) |
| Type-checking | None (plain JSX; ESLint enforced) |
| Linting | ESLint (airbnb config) + Prettier |
| AI assistant | Copilot.live (registered actions in `copilot/`) |

## Key external dependencies

| Package | Role |
|---|---|
| `@gofynd/theme-template` | Base FDK theme templates (b2b-v1.0.277) |
| `@gofynd/fdk-store-gql` | Storefront GQL store |
| `fdk-store` | Extended store (v3.0.67) |
| `embla-carousel-react` | Carousels / sliders |
| `framer-motion` | Animation |
| `react-hook-form` | Form management |
| `swr` | Data fetching cache |
| `dayjs` | Date utilities |
| `@react-google-maps/api` | Store locator / hyperlocal maps |
| `@pixelbin/core` | Image optimization |

## Repository layout

```
react-starter/
├── theme/                  # All source code
│   ├── pages/              # Page-level components (45 pages)
│   ├── sections/           # Section components rendered by FDK (59 sections)
│   ├── components/         # Shared UI components
│   ├── custom-templates/   # B2B custom page templates
│   ├── page-layouts/       # Base FDK page layouts
│   ├── b2b-page-layouts/   # B2B overrides for PDP / PLP / Cart layouts
│   ├── b2b/                # B2B API layer and helpers
│   ├── helper/             # General utility functions
│   ├── providers/          # React context providers
│   ├── queries/            # GQL queries
│   ├── locales/            # i18n resource files
│   ├── styles/             # Global Less / CSS
│   ├── assets/             # Fonts, images, SVGs
│   └── constants/          # Constants, SVG mappings
├── copilot/                # Copilot.live AI action definitions
├── webpack.config.js       # Webpack build configuration
├── config.json             # FDK theme config
├── plugin.js               # FDK plugin entry
├── sync.sh                 # Helper to switch .fdk context and run `fdk theme sync`
└── docs/                   # This documentation
```
