---
sidebar_position: 5
---

# Add a New B2B Feature

Owner: Frontend Platform Team
Reviewers: B2B Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

This runbook covers the full lifecycle of adding a new B2B-specific feature to the theme.

## Decision: layout override vs full-page template?

| Scenario | Where to add |
|---|---|
| Modifying a part of an existing page (PDP, PLP, Cart) | `theme/b2b-page-layouts/` |
| A completely new B2B page (quotes, dashboard tab, etc.) | `theme/custom-templates/b2b/` |
| A reusable UI component used across B2B features | `theme/components/` |

## Steps

### 1. Create the feature component

**For a layout override** (e.g., new PDP widget):

```
theme/b2b-page-layouts/pdp/components/my-feature/my-feature.jsx
theme/b2b-page-layouts/pdp/components/my-feature/my-feature.less
```

**For a full-page template** (e.g., new B2B dashboard tab):

```
theme/custom-templates/b2b/my-feature/my-feature.jsx
theme/custom-templates/b2b/my-feature/my-feature.less
```

### 2. Gate with FeatureGuard (if feature-flag controlled)

Import `FeatureGuard` to conditionally render the feature based on account-level flags:

```jsx
import FeatureGuard from "../../components/FeatureGuard/FeatureGuard";

function MyFeatureWrapper() {
  return (
    <FeatureGuard featureKey="my_b2b_feature">
      <MyFeature />
    </FeatureGuard>
  );
}
```

The feature flags are fetched from `theme/b2b/api/modules/features-api/feature-api.js`.

### 3. Add an API module (if a new endpoint is needed)

Create a new module in `theme/b2b/api/modules/`:

```
theme/b2b/api/modules/my-feature/index.js
```

Use the shared Axios instance:

```js
import axios from "../../axios";

export const fetchMyFeatureData = async (params) => {
  const { data } = await axios.get("/api/v1/my-feature", { params });
  return data;
};
```

Use SWR for reactive fetching in components:

```js
import useSWR from "swr";
import { fetchMyFeatureData } from "../../b2b/api/modules/my-feature";

function useMyFeature(params) {
  return useSWR(["my-feature", params], () => fetchMyFeatureData(params));
}
```

### 4. Register a full-page template (if applicable)

If you added a full-page template, register it in `theme/custom-templates/index.jsx`:

```jsx
import MyFeature from "./b2b/my-feature/my-feature";

// Add to the templates map:
export const templates = {
  // ... existing templates
  "b2b-my-feature": MyFeature,
};
```

### 5. Update documentation

After implementing:

- Add the component to [B2B Layouts Reference](../03-reference/b2b-layouts.md).
- Add the feature description to [B2B Features](../10-business-requirement/b2b-features.md).
- If a new helper was added, update [Helpers Reference](../03-reference/helpers.md).
- If a significant architectural decision was made, add an [ADR](../06-decisions/index.md).

### 6. Test locally

```bash
npm run dev
```

Verify in FDK preview:
- Feature renders correctly when the feature flag is enabled.
- Feature is hidden or shows a fallback when the flag is disabled.
- No console errors.
- Mobile and desktop layouts work correctly.

### 7. Lint and format

```bash
npm run lint:fix
npm run format
```

All lint checks must pass before opening a PR.
