---
sidebar_position: 5
---

# B2B Layouts Reference

Owner: B2B Team
Last Updated: 2026-03-14
Status: Approved

B2B layout overrides live under `theme/b2b-page-layouts/`. These components replace or augment the standard FDK template layouts for PDP, PLP, and Cart when B2B features are active.

## PDP (Product Detail Page) — `b2b-page-layouts/pdp/`

| Component | Purpose |
|---|---|
| `components/b2b-size-wrapper/b2b-size-wrapper.jsx` | B2B size selector wrapper with MOQ enforcement |
| `components/size-container/b2b-size-container.jsx` | Size option container |
| `components/price-wrapper/b2b-price-wrapper.jsx` | B2B price display (best price, ladder, contracted) |
| `components/best-price-wrapper/b2b-best-price-wrapper.jsx` | Best available price display |
| `components/moq-wrapper/b2b-moq-wrapper.jsx` | Minimum order quantity enforcement UI |
| `components/seller-identifier/b2b-seller-identifier.jsx` | Seller badge / identifier |
| `components/seller-identifier-modal/seller-identifier-modal.jsx` | Seller detail modal |
| `components/loginless-wrapper/b2b-loginless-wrapper.jsx` | Guest / loginless view wrapper |
| `components/sticky-cart/b2b-sticky-cart.jsx` | Sticky add-to-cart bar |
| `price-details/usePriceDetails.jsx` | React hook for resolving B2B price tiers |

## PLP (Product Listing Page) — `b2b-page-layouts/plp/`

| Component | Purpose |
|---|---|
| `components/available-offers-modal/available-offers-modal.jsx` | Available offers popup on PLP |

## Cart — `b2b-page-layouts/cart/`

| Component | Purpose |
|---|---|
| `components/clearcart-modal/clear-cart-modal.jsx` | Confirm clear cart modal |
| `components/gst-card/components/b2b-gst-wrapper.jsx` | GST number input on cart |

## Custom B2B page templates — `theme/custom-templates/b2b/`

These are full-page templates registered via `custom-templates/index.jsx`.

| Template | Purpose |
|---|---|
| `quotes.jsx` | Quote listing and management |
| `quotes/create-new-qr.jsx` | Create new quote request |
| `quotes/list-qr.jsx` | List quote requests |
| `quotes/quick-order.jsx` | Quick order from SKU |
| `quotes/quote-products.jsx` | Products in a quote |
| `quotes/bulk-upload.jsx` | Bulk product upload to quote |
| `quotes/quotation-table.jsx` | Quotation data table |
| `quotes/quote-logs.jsx` | Negotiation log |
| `quotes/quote-notes.jsx` | Quote notes |
| `wishlist/index.jsx` | B2B wishlist root |
| `wishlist/components/my-wishlist/` | My wishlists view |
| `wishlist/components/wishlist-detail/` | Wishlist detail + price/address/GST |
| `wishlist/components/shared-wishlist/` | Shared wishlist view |
| `wishlist/components/modals/` | All wishlist modals (create, delete, share, subscribe, save, offer) |
| `distributed-dashboard/index.jsx` | Retailer / distributor dashboard root |
| `distributed-dashboard/pages/overview/` | Dashboard overview tab |
| `distributed-dashboard/pages/order-history/` | Order history tab |
| `distributed-dashboard/pages/inventory/` | Inventory management tab |
| `distributed-dashboard/pages/retail-management/` | Retailer management tab |
| `distributed-dashboard/pages/draft-orders/` | Draft orders tab |
| `credit.jsx` | Credit / payment terms display |
| `ladder-price.jsx` | Ladder pricing display |
| `contracted-price.jsx` | Contracted price display |
| `size-selector.jsx` | B2B size selector |
| `product-selector.jsx` | B2B product selector |
| `menu.jsx` | B2B profile menu |
| `my-profile.jsx` | B2B profile page |
| `payment-method.jsx` | B2B payment method |
| `address-book.jsx` | B2B address book |
| `custom-my-orders.jsx` | B2B custom orders page |
| `notification-bar/` | B2B notification bar |
| `stateless-redirect/check-business.jsx` | Business check redirect |

## B2B API modules — `theme/b2b/api/`

| Module | Purpose |
|---|---|
| `axios.js` | Axios instance with B2B auth headers |
| `swr.js` | SWR fetcher factory |
| `errors.js` | Error normalizer |
| `modules/features-api/feature-api.js` | Feature flag fetching |
| `modules/retail-distribution/overview.js` | Dashboard overview API |
| `modules/retail-distribution/order-history.js` | Order history API |
| `modules/retail-distribution/retailers.js` | Retailer management API |
| `modules/retail-distribution/dropdown-items.js` | Dropdown data API |
