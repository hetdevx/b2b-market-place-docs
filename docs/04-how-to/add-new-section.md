---
sidebar_position: 2
---

# Add a New Section

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

FDK sections are renderable page builder blocks. Each section is a React component registered with the theme.

## Steps

### 1. Create the component file

Create `theme/sections/my-section.jsx`:

```jsx
import React from "react";
import styles from "./my-section.less";

function MySection({ props, globalConfig }) {
  const { title } = props;
  return (
    <section className={styles.container}>
      <h2>{title?.value || "Default Title"}</h2>
    </section>
  );
}

MySection.serverFetch = async ({ fpi }) => {
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

export default MySection;
```

### 2. Create the Less file (if needed)

Create `theme/sections/my-section.less`:

```less
.container {
  padding: 24px;
}
```

### 3. Register the section

Webpack auto-discovers all `.jsx` files in `theme/sections/` via dynamic entry points — no manual registration is needed for the Webpack build.

For Fynd Platform registration, run:

```bash
npm run upload-sections
```

This runs `scripts/extract-section-props.js` to push section prop schemas to the platform.

### 4. Test locally

```bash
npm run dev
```

Open the FDK preview in your browser and add the new section via the page builder.

## Notes

- Section props are defined in the exported `settings` object.
- Use `serverFetch` for SSR data requirements.
- Section chunking is enabled (`fdk_feature.enable_section_chunking: true`), so each section is lazily loaded as a separate chunk.
