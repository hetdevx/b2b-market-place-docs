---
sidebar_position: 4
---

# Webpack Configuration

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

The Webpack configuration lives at `webpack.config.js` in the repo root. It uses `webpack-merge` to compose a base config with environment-specific overrides.

## Entry points

Entry points are dynamically generated from all `.jsx` files in `theme/pages/` and `theme/sections/`. The main theme bundle entry is `theme/index.jsx`.

Section chunking is enabled (`fdk_feature.enable_section_chunking: true` in `package.json`), so each section is emitted as a separate chunk for lazy loading on the platform.

## Output

| Directory | Contents |
|---|---|
| `dist/` | Main Webpack build artifacts |
| `dist_sections/` | Extracted section chunks |

## Loaders

| Loader | File types handled | Notes |
|---|---|---|
| `babel-loader` | `.js`, `.jsx` | Transpiles with `@babel/preset-env` + `@babel/preset-react`; uses `@loadable/babel-plugin` for code splitting |
| `css-loader` | `.css` | CSS Modules support |
| `less-loader` | `.less` | Less with module support for scoped styles |
| `@svgr/webpack` | `.svg` | Import SVGs as React components |
| `asset/resource` | Fonts (`.ttf`, `.woff`, `.woff2`) | Emits font files to output |
| `file-loader` | Static assets | Handles other binary assets |

## Plugins

| Plugin | Purpose |
|---|---|
| `MiniCssExtractPlugin` | Extracts CSS into separate files per chunk |
| `NodeJSPolyfillPlugin` | Polyfills Node.js globals (`Buffer`, `url`, etc.) for browser |
| `DotenvWebpack` | Injects `.env` variables into the build |
| `ReactHydrationOverlay` | Dev-only overlay for debugging React hydration mismatches |

## Optimization

| Optimization | Config |
|---|---|
| CSS minification | `CssMinimizerPlugin` in production mode |
| JS minification | Webpack default Terser in production mode |
| Code splitting | `@loadable/component` + `@loadable/babel-plugin` |

## Build modes

| Command | Mode | Notes |
|---|---|---|
| `npm run build` | `production` | Minified, no source maps |
| `npm run build:dev` | `local` (watch) | Unminified, watches for changes |
| `npm run build:local` | `local` | Unminified single build |
| `npm run analyze` | `production` | Adds `webpack-bundle-analyzer` report |

## Bundle analysis

```bash
npm run analyze
```

Opens an interactive treemap of all bundle chunks. Use to identify large dependencies, duplicate modules, or unexpectedly large sections.

Key things to check:
- Individual section chunk sizes (should be < 50KB each for fast lazy loading).
- Whether shared dependencies are properly deduplicated into common chunks.
- Whether SVG imports are tree-shaken (avoid importing large SVG libraries wholesale).

## Less module conventions

Less files can be used as CSS modules:

```jsx
import styles from "./my-component.less";

// Usage
<div className={styles.container}>...</div>
```

Or as global styles (no `.module` suffix needed — Less is treated globally by default unless explicitly scoped).

## Known configuration gaps

- No source maps in production builds.
- No TypeScript loader (project is plain JSX).
- `ReactHydrationOverlay` is included in the `devDependencies` but may add some overhead in development builds.
