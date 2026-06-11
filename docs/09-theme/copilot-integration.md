---
sidebar_position: 3
---

# Copilot.live Integration

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

## Overview

The theme integrates with [Copilot.live](https://docs.copilot.live/) to provide an AI-powered chat assistant ("Kaily") on the storefront. The widget itself (`window.copilot`) is injected by the platform — the theme does not load the widget script. The theme's role is to register storefront action tools with the widget via `copilot/index.js`, triggered from `theme/providers/global-provider.jsx`.

Registration is gated by the global config setting `storefront_copilot_actions` (Kaily Configuration, default `false`). When disabled, Copilot falls back to backend-API-based results.

> **Current status:** the bodies of `registerCopilotTools` and `initializeCopilot` in `copilot/index.js` are commented out, so storefront tool registration is effectively a no-op right now. The action/tool definitions below remain in the codebase and document the intended behavior when re-enabled.

## Copilot action files

| File | Purpose |
|---|---|
| `copilot/actions/index.js` | Combines action modules into `allCopilotActions` |
| `copilot/actions/cart-actions.js` | Legacy cart actions (superseded by v2; not in `allCopilotActions`) |
| `copilot/actions/cart-actions-v2.js` | Cart actions v2 with data chaining |
| `copilot/actions/checkout-actions.js` | Checkout, address, and coupon actions |
| `copilot/actions/navigation-actions.js` | On-page and universal navigation |
| `copilot/actions/order-actions.js` | Order tracking and status |
| `copilot/actions/payment-actions.js` | Payment options and pay flow |
| `copilot/actions/product-actions.js` | Product info / listing |
| `copilot/actions/redirect-actions.js` | Redirect helpers (not included in `allCopilotActions`) |
| `copilot/actions/search-actions.js` | Product search |
| `copilot/actions/wishlist-actions.js` | Wishlist actions |

## Available Copilot tools

Tools registered via `allCopilotActions`, grouped by module:

| Module | Tools |
|---|---|
| Search | `search_product` |
| Cart (v2) | `add_to_cart_v2`, `show_cart_items`, `remove_cart_item`, `update_cart_item_quantity`, `select_color_variant`, `set_delivery_pincode`, `clear_cart`, `bulk_add_to_cart` |
| Product | `get_product_info`, `list_products_on_page` |
| Wishlist | `add_to_wishlist_from_pdp`, `add_to_wishlist_from_listing`, `remove_from_wishlist`, `toggle_wishlist`, `redirect_to_wishlist`, `list_wishlist_products`, `add_to_cart_from_wishlist`, `clear_wishlist` |
| Orders | `get_latest_order_tracking`, `list_my_orders`, `track_order_by_id`, `track_order_by_position`, `get_order_status`, `share_order_tracking_details` |
| Navigation | `show_products`, `navigate_to_product_by_position`, `navigate_to_category`, `universal_navigate` |
| Checkout | `navigate_to_checkout_page`, `get_shipping_addresses`, `select_delivery_address`, `get_available_coupons`, `apply_coupon`, `remove_coupon` |
| Payment | `get_payment_options`, `select_payment_method`, `checkout_and_pay` |

`redirect-actions.js` additionally defines `redirect_to_*` tools (home, product, products, cart, checkout, collections, categories, brands, blogs, faq, policies, contact_support, orders, address, wishlist) but is exported separately and not part of `allCopilotActions`.

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
| `copilot/utils/wishlist-utils.js` | Wishlist helpers |
| `theme/helper/copilot-utils.js` | Theme-side Copilot utils (validated add-to-cart, pincode checks, caching) |

## Initialization flow

`theme/providers/global-provider.jsx` reads `globalConfig.storefront_copilot_actions` and calls `initializeCopilot({ storefrontCopilotActions })` on mount (or on `DOMContentLoaded` if the document is still loading).

`initializeCopilot` (when enabled) checks for `window.copilot`, then registers `allCopilotActions` via `copilot.tools.add(...)` with retry. Retry settings live in `COPILOT_CONFIG` in `copilot/index.js`: up to 3 attempts, 500ms initial delay, 1.5x exponential backoff, capped at 5s.

## Debugging

When registration is enabled, console messages use the `[COPILOT]` prefix, e.g.:
- `"[COPILOT] Initializing copilot registration..."` — registration start
- `"[COPILOT] Copilot tools registered successfully"` — tools registered
- `"[COPILOT] Storefront Copilot Actions disabled..."` — config flag off; backend API results used

Common issues:
- **`window.copilot` not available** — the widget script has not loaded yet; the retry/backoff logic handles transient timing, and registration silently skips if the widget is absent.
- **No tools registered at all** — check that `storefront_copilot_actions` is enabled in global config, and note that the registration body in `copilot/index.js` is currently commented out.
