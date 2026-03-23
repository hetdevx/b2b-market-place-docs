---
sidebar_position: 3
---

# Copilot.live Integration

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

## Overview

The theme integrates with [Copilot.live](https://docs.copilot.live/) to provide an AI-powered chat assistant on the storefront. The widget is loaded and initialized in `theme/providers/global-provider.jsx`.

## Copilot action files

| File | Purpose |
|---|---|
| `copilot/actions/index.js` | Action registration entry point |
| `copilot/actions/cart-actions.js` | Cart actions (add, remove, view) |
| `copilot/actions/cart-actions-v2.js` | Cart actions v2 |
| `copilot/actions/checkout-actions.js` | Checkout navigation |
| `copilot/actions/navigation-actions.js` | Page navigation |
| `copilot/actions/order-actions.js` | Order-related actions |
| `copilot/actions/payment-actions.js` | Payment actions |
| `copilot/actions/product-actions.js` | Product search / detail |
| `copilot/actions/redirect-actions.js` | Redirect helpers |
| `copilot/actions/search-actions.js` | Search actions |
| `copilot/actions/wishlist-actions.js` | Wishlist actions |

## Available Copilot tools

| Tool name | Purpose |
|---|---|
| `search_product` | Search for products |
| `add_to_cart` | Add product to cart |
| `redirect_to_cart` | Navigate to cart |
| `redirect_to_product` | Navigate to product page |
| `redirect_to_home` | Navigate to homepage |
| `redirect_to_contact_support` | Navigate to contact/support |
| `redirect_to_policies` | Navigate to policy pages |
| `redirect_to_checkout` | Navigate to checkout |
| `redirect_to_collections` | Navigate to collections |
| `redirect_to_categories` | Navigate to categories |
| `redirect_to_blogs` | Navigate to blogs |

## Utility files

| File | Purpose |
|---|---|
| `copilot/utils/index.js` | Utils export |
| `copilot/utils/cart-utils.js` | Cart operation helpers |
| `copilot/utils/cart-v2-utils.js` | Cart v2 helpers |
| `copilot/utils/common-utils.js` | Shared utility functions |
| `copilot/utils/order-utils.js` | Order helpers |
| `copilot/utils/product-utils.js` | Product helpers |
| `copilot/utils/redirect-utils.js` | Redirect helpers |
| `theme/helper/copilot-utils.js` | Theme-side Copilot utils |

## Widget initialization

The Copilot widget is loaded in `theme/providers/global-provider.jsx`. Configuration:

```javascript
const copilotConfig = {
  // apiKey: "your-api-key",     // Optional
  // apiBaseUrl: "your-url",     // Optional custom API URL
};
```

The widget script is loaded from `cdn.copilot.live` with automatic retry (up to 5 times with exponential backoff).

## Debugging

In the browser console, look for:
- `"Loading Copilot.live widget script..."` — script load start
- `"Copilot script loaded successfully"` — script loaded
- `"Copilot widget is ready"` — widget initialized
- `"Successfully registered X copilot tools!"` — tools registered

Common issues:
- **"Copilot is not available on window object"** — script not yet loaded; retry logic handles this automatically.
- **Script loading failures** — verify network access to `cdn.copilot.live`.
