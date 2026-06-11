---
sidebar_position: 2
---

# Add a New Section

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

FDK sections are renderable page builder blocks. Each section is a React component exported as `Component` alongside a `settings` schema, and registered in `theme/sections/index.js`.

## Steps

### 1. Create the component file

Create `theme/sections/my-section.jsx`:

```jsx
import React from "react";
import styles from "../styles/sections/my-section.less";

export function Component({ props, globalConfig, blocks }) {
  const { title } = props;
  return (
    <section className={styles.container}>
      <h2>{title?.value || "Default Title"}</h2>
    </section>
  );
}

Component.serverFetch = async ({ fpi }) => {
  // Optional: fetch server-side data
};

export const settings = {
  label: "My Section",
  props: [
    {
      type: "text",
      id: "title",
      default: "My Section",
      label: "Title",
    },
  ],
  blocks: [],
};

export default Component;
```

Note the pattern used by existing sections (see `theme/sections/hero-image.jsx`):

- The component is exported as a **named export `Component`** (and also as the default export).
- `serverFetch` is attached to `Component`, not the file.
- Existing themes use translation keys (`t:resource.…`) for `label`/`default` values; plain strings also work.

### 2. Create the Less file (if needed)

Section styles live in `theme/styles/sections/`, not next to the component. Create `theme/styles/sections/my-section.less`:

```less
.container {
  padding: 24px;
}
```

### 3. Register the section

Sections are **manually registered** in `theme/sections/index.js`. Add three entries, following the existing pattern:

```jsx
// 1. Loadable chunk import (top of file)
const MySectionSectionChunk = loadable(() => import(/* webpackChunkName:"MySectionSectionChunk" */ './my-section.jsx'));

// 2. Case in the getbundle() switch
case 'my-section':
    return (props) => <MySectionSectionChunk {...props}/>;

// 3. Entry in the default export map
'my-section': { ...MySectionSectionChunk, Component: getbundle('my-section') },
```

The section schema (`settings` export) is picked up by the FDK CLI when the theme is served/synced — no separate upload step is required.

### 4. Test locally

```bash
fdk theme serve
```

Open the FDK preview in your browser and add the new section via the page builder.

## Notes

- Section props are defined in the exported `settings` object.
- Use `Component.serverFetch` for SSR data requirements.
- Section chunking is enabled (`fdk_feature.enable_section_chunking: true` in `package.json`), so each section is lazily loaded as a separate chunk — which is why each registration uses `loadable()` with a named `webpackChunkName`.
