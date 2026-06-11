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
| `core/fy-accordion/` | Accordion primitive |
| `core/fy-dropdown/` | Dropdown primitive |
| `core/fy-html-renderer/` | Safe HTML renderer (DOMPurify) |
| `core/fy-image/` | Responsive image component |
| `core/html-content/` | HTML content block |
| `core/modal/` | Base modal primitive |
| `core/skeletons/` | Skeleton/shimmer loading states for all pages |

### Layout / Navigation

| Component | Purpose |
|---|---|
| `header/header.jsx` / `header/desktop-header.jsx` | Header root and desktop layout |
| `header/mega-menu.jsx` | Mobile mega menu |
| `header/mega-menu-large.jsx` | Desktop mega menu |
| `header/navigation.jsx` / `header/left-navigation.jsx` | Navigation menus |
| `header/search.jsx` | Header search |
| `header/i18n-dropdown.jsx` / `header/useInternational.jsx` | Locale/currency switcher |
| `header/myaccount-dropdown.jsx` | Account dropdown |
| `header/useHeader.jsx` | Header state hook |
| `header/location-modal/` | Hyperlocal location modal (pincode, places, serviceability) |
| `footer/` | Site footer |
| `mobile-navigation/` | Mobile bottom navigation |
| `breadcrumb/` | Breadcrumb trail |
| `announcement-bar/` | Top announcement bar |
| `scroll-to-top/` | Scroll-to-top button |

### Product & Commerce

| Component | Purpose |
|---|---|
| `product-recommendation/` | Product recommendation card system |
| `cart/` | Mini cart, MOV checkout alert, chip item skeleton |
| `collection-card/` | Collection card |
| `categories-card/` | Category card |
| `card-list/` | Card list with shimmer |
| `card/` / `card-logo/` | Generic card and logo card |
| `carousel/` | Carousel with dot/arrow utilities |
| `hotspot/` | Product hotspot overlay |
| `range-slider/` | Price range filter slider |
| `infinite-loader/` | Infinite scroll loader |
| `infinite-spinner/` | Infinite spinner |
| `store-locator/` | Store locator cards, info window, search field |
| `google-map/` | Google Maps wrapper |

### B2B-specific components

| Component | Purpose |
|---|---|
| `FeatureGuard/FeatureGuard.jsx` | Feature-flag-based conditional rendering |
| `request-quote-modal/` | Request-a-quote modal |
| `quote-log-modal/` | Quote negotiation log |
| `comment-modal/` | Comment / note modal |
| `ladder-pricing-table/` | Quantity-slab ladder pricing table (cart-aware quantity marker) |
| `gst-registration-modal/` | GST number entry + verification modal |
| `b2b-product-recommendation/` | B2B recommendation widget (placements, best-price queries, hooks) |
| `purchase-order-details-modal/` | Purchase order details modal (currently an empty placeholder directory) |
| `simple-purchase-order-modal/` | Simple purchase order modal (currently an empty placeholder directory) |
| `b2b/empty-page/` | B2B empty state page |

### Orders

| Component | Purpose |
|---|---|
| `orders/order-filter-modal.jsx` | Order filter modal |
| `orders/order-header.jsx` / `orders/order-shipment.jsx` | Order header and shipment block |
| `orders/shipment-address.jsx` | Shipment address display |
| `orders/shipment-breakup.jsx` | Shipment price breakup |
| `orders/add-payment.jsx` | Add payment method |
| `orders/beneficiary-list.jsx` / `orders/beneficiary-list-item.jsx` | Refund beneficiary list |
| `orders/payment-list.jsx` / `orders/payment-detail-card.jsx` | Payment method list and detail card |
| `orders/dropdown.jsx` / `orders/pagination.jsx` | Orders dropdown and pagination |
| `orders-empty-state/` | Orders empty state styles |

### Forms & UI primitives

| Component | Purpose |
|---|---|
| `FormItem/` | Controlled form field wrapper |
| `dropdown/` | Custom dropdown |
| `table/` | Data table |
| `summary-table/` | Summary/totals table |
| `tooltip/Tooltip.jsx` | Tooltip |
| `options-menu/` | Options/context menu |
| `loader/` | Loading spinner |
| `confirmation-modal/` | Generic confirmation modal |
| `DateTimePicker/` | Date-time picker |
| `DateRangePicker/` | Date range picker |
| `verify-otp/VerifyOtp.jsx` | OTP verification input |
| `empty-state/` | Generic empty state |

### Shimmer / Loading states

| Component | Purpose |
|---|---|
| `shimmer/shimmer.jsx` / `shimmer/index.jsx` | Main shimmer exports |
| `shimmer/shimmer-elements/` | Reusable shimmer building blocks |
| `shimmer/price-address-shimmer/` | Price + address skeleton |
| `shimmer/product-detail-shimmer/` | PDP skeleton |
| `shimmer/search-suggestions-shimmer.jsx` | Search suggestions skeleton |
| `shimmer/store-list-shimmer.jsx` / `shimmer/store-locator-shimmer.jsx` | Store locator skeletons |
| `shimmer/wishlist-card-shimmer/` | Wishlist card skeleton |
| `shimmer/wishlist-detail-shimmer/` | Wishlist detail skeleton |
| `shimmer/wishlist-page-shimmer/` | Full wishlist page skeleton |
| `table-shimmer/TableShimmer.jsx` | Table loading state |

### Payment / Refund

| Component | Purpose |
|---|---|
| `refund/bank-form.jsx` | Bank account refund form |
| `refund/otp-form.jsx` | OTP verification for refund |
| `refund/upi-form.jsx` | UPI refund form |
| `refund/wallet-form.jsx` | Wallet refund form |
| `refund-breakup/` | Refund amount breakup |
| `refund-summary/` | Refund summary |
| `contact-refund-support/` | Refund support contact block |
| `bank-account-item/` | Saved bank account row |
| `save-upi-item/` | Saved UPI row |
| `payment-link/` | Payment link UI (countdown, expired state, loader) |

### Misc

| Component | Purpose |
|---|---|
| `profile/` | Profile root, details form, logout modal |
| `profile-address-card/` | Address card |
| `address-empty-state/` | Address empty state styles |
| `legal-doc-templates/legal-pages-template.jsx` | Shared template for legal/policy pages |
| `trust-badges-block/` | Trust badges block |
| `socail-media/` | Social media share links |
| `share-item/` | Share item widget |
| `intersection-observer/` | Intersection Observer wrapper |
| `slider-arrow/` | Carousel arrow |
| `site-map/` | Site map component |
| `blog/BlogPage.jsx` | Blog page layout |
| `blog/blog-tabs.jsx` | Blog tab navigation |
| `blog/blog-footer.jsx` | Blog footer |
| `message-card/MessageCard.jsx` | Inline message / alert card |
| `page-not-found/` | 404 component |
