---
sidebar_position: 4
---

# Components Reference

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

Shared UI components live under `theme/components/`. These are consumed by pages, sections, and B2B templates.

## Component groups

### Core

| Path | Purpose |
|---|---|
| `core/fy-html-renderer/` | Safe HTML renderer (DOMPurify) |
| `core/html-content/` | HTML content block |
| `core/skeletons/` | Skeleton/shimmer loading states for all pages |

### Layout / Navigation

| Component | Purpose |
|---|---|
| `header/mega-menu.jsx` | Mobile mega menu |
| `header/mega-menu-large.jsx` | Desktop mega menu |
| `header/useHeader.jsx` | Header state hook |
| `header/location-modal/` | Hyperlocal location modal (pincode, places, serviceability) |
| `announcement-bar/` | Top announcement bar |
| `scroll-to-top/` | Scroll-to-top button |

### Product & Commerce

| Component | Purpose |
|---|---|
| `product-recommendation/` | Product recommendation card system |
| `collection-card/` | Collection card |
| `categories-card/` | Category card |
| `card-list/` | Card list with shimmer |
| `range-slider/` | Price range filter slider |
| `infinite-loader/` | Infinite scroll loader |
| `infinite-spinner/` | Infinite spinner |

### B2B-specific components

| Component | Purpose |
|---|---|
| `FeatureGuard/FeatureGuard.jsx` | Feature-flag-based conditional rendering |
| `request-quote-modal/` | Request-a-quote modal |
| `quote-log-modal/` | Quote negotiation log |
| `comment-modal/` | Comment / note modal |

### Orders

| Component | Purpose |
|---|---|
| `orders/order-filter-modal.jsx` | Order filter modal |
| `orders/shipment-address.jsx` | Shipment address display |
| `orders/add-payment.jsx` | Add payment method |
| `orders/beneficiary-list.jsx` | Refund beneficiary list |
| `orders/payment-list.jsx` | Payment method list |

### Forms & UI primitives

| Component | Purpose |
|---|---|
| `FormItem/` | Controlled form field wrapper |
| `dropdown/` | Custom dropdown |
| `table/` | Data table |
| `tooltip/Tooltip.jsx` | Tooltip |
| `options-menu/` | Options/context menu |
| `loader/` | Loading spinner |
| `confirmation-modal/` | Generic confirmation modal |
| `DateTimePicker/` | Date-time picker |

### Shimmer / Loading states

| Component | Purpose |
|---|---|
| `shimmer/index.jsx` | Main shimmer export (WishlistDetailShimmer, etc.) |
| `shimmer/price-address-shimmer/` | Price + address skeleton |
| `shimmer/wishlist-card-shimmer/` | Wishlist card skeleton |
| `shimmer/wishlist-page-shimmer/` | Full wishlist page skeleton |
| `table-shimmer/TableShimmer.jsx` | Table loading state |

### Payment / Refund

| Component | Purpose |
|---|---|
| `refund/otp-form.jsx` | OTP verification for refund |
| `refund/upi-form.jsx` | UPI refund form |
| `refund/wallet-form.jsx` | Wallet refund form |
| `payment-link/` | Payment link UI (countdown, expired state, loader) |

### Misc

| Component | Purpose |
|---|---|
| `b2b/empty-page/` | B2B empty state page |
| `socail-media/` | Social media share links |
| `share-item/` | Share item widget |
| `intersection-observer/` | Intersection Observer wrapper |
| `slider-arrow/` | Carousel arrow |
| `blog/blog-tabs.jsx` | Blog tab navigation |
| `blog/blog-footer.jsx` | Blog footer |
| `message-card/MessageCard.jsx` | Inline message / alert card |
| `page-not-found/` | 404 component |
