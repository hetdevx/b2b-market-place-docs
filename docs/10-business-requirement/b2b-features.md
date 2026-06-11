---
sidebar_position: 2
---

# B2B Features

Owner: B2B Product Team
Last Updated: 2026-06-11
Status: Approved

Complete inventory of B2B-specific features implemented in Turbo B2B.

## Pricing

### Ladder pricing

Tiered pricing based on quantity ordered. Higher quantities unlock lower prices.

- **Implementation:** `theme/custom-templates/b2b/ladder-price.jsx`
- **Table component:** `theme/components/ladder-pricing-table/ladder-pricing.jsx` (used on PDP description and in the PLP available-offers modal)
- **PDP integration:** `theme/b2b-page-layouts/pdp/components/price-wrapper/b2b-price-wrapper.jsx`
- **Data fetch:** `theme/helper/b2b/fetch_best_price_details.js`

### Contracted pricing

Pre-negotiated prices for specific buyers or buyer groups.

- **Implementation:** `theme/custom-templates/b2b/contracted-price.jsx`
- **PDP integration:** `theme/b2b-page-layouts/pdp/components/best-price-wrapper/b2b-best-price-wrapper.jsx`

### Best price resolution

System automatically selects the best available price for the buyer across ladder and contracted tiers.

- **Hook:** `theme/b2b-page-layouts/pdp/price-details/usePriceDetails.jsx`
- **Helpers:** `theme/helper/b2b/fetch_best_price_details.js`, `theme/helper/b2b/fetch_best_price_list.js`

## Ordering

### Minimum Order Quantity (MOQ)

Enforces minimum, maximum, and increment-unit quantities per SKU on the PDP. Prevents add-to-cart below the MOQ threshold.

- **Display:** `theme/b2b-page-layouts/pdp/components/moq-wrapper/b2b-moq-wrapper.jsx`
- **Enforcement (min/max/increment_unit):** `theme/b2b-page-layouts/pdp/components/b2b-size-wrapper/b2b-size-wrapper.jsx`
- **Listing toggle:** the `show_moq` section setting (default `true`) controls MOQ display in the add-to-cart popup on product/collection listing, featured-collection, and recommendation sections; `show_buy_now_button` (default `false`) similarly toggles Buy Now there.

### Quote request (RFQ)

Buyers can request a quote for products they cannot directly purchase. Supports negotiation cycles.

- **Entry point:** `theme/custom-templates/b2b/quotes.jsx`
- **Create quote:** `theme/custom-templates/b2b/quotes/create-new-qr.jsx`
- **List quotes:** `theme/custom-templates/b2b/quotes/list-qr.jsx`
- **Quotation table:** `theme/custom-templates/b2b/quotes/quotation-table.jsx`
- **Quote products:** `theme/custom-templates/b2b/quotes/quote-products.jsx`
- **Quote products table:** `theme/custom-templates/b2b/quotes/quote-products-table.jsx`
- **Negotiation log:** `theme/custom-templates/b2b/quotes/quote-logs.jsx`
- **Notes:** `theme/custom-templates/b2b/quotes/quote-notes.jsx`
- **Bulk upload:** `theme/custom-templates/b2b/quotes/bulk-upload.jsx`
- **Quick order:** `theme/custom-templates/b2b/quotes/quick-order.jsx`
- **Service layer:** `theme/helper/b2b/quotation.service.js`
- **Request quote modal:** `theme/components/request-quote-modal/`
- **Quote log modal:** `theme/components/quote-log-modal/`

### GST handling

B2B buyers can enter their GSTIN on the cart page for tax invoice generation, and register/manage GST numbers from their profile and wishlist flows.

- **Cart GST card:** `theme/b2b-page-layouts/cart/components/gst-card/components/b2b-gst-wrapper.jsx`
- **GST registration modal:** `theme/components/gst-registration-modal/gst-registration-modal.jsx` (used from cart GST card, my-profile, and wishlist detail)
- **Global config:** `auto_apply_gst` and `force_apply_gst` (B2B Configurations) control automatic/forced GST application on cart.

### Clear cart

B2B buyers can clear the entire cart with a confirmation modal.

- **Implementation:** `theme/b2b-page-layouts/cart/components/clearcart-modal/clear-cart-modal.jsx`

## Wishlist (B2B)

Enhanced wishlist with B2B-specific capabilities: sharing, notes, subscription, bulk order.

- **Root:** `theme/custom-templates/b2b/wishlist/index.jsx`
- **My wishlists:** `theme/custom-templates/b2b/wishlist/components/my-wishlist/`
- **Wishlist detail:** `theme/custom-templates/b2b/wishlist/components/wishlist-detail/`
- **Shared wishlist:** `theme/custom-templates/b2b/wishlist/components/shared-wishlist/`
- **Shared wishlist detail:** `theme/custom-templates/b2b/wishlist/components/shared-wishlist-detail/`
- **Modals:** create/rename, delete, share, subscribe, save-to, offer, note, action menu, more-options

## Seller identification

B2B PDP shows seller identity information for multi-seller scenarios.

- **Badge:** `theme/b2b-page-layouts/pdp/components/seller-identifier/b2b-seller-identifier.jsx`
- **Detail modal:** `theme/b2b-page-layouts/pdp/components/seller-identifier-modal/seller-identifier-modal.jsx`

## Available offers on PLP

Shows available offers for a product in a modal on the Product Listing Page.

- **Implementation:** `theme/b2b-page-layouts/plp/components/available-offers-modal/available-offers-modal.jsx`
- **Global toggle:** `show_available_offer_button` (default `true`)

## B2B product recommendations

Recommendation carousel with B2B pricing/offer awareness, rendered by the product-recommendation section.

- **Component library:** `theme/components/b2b-product-recommendation/` (product cards, price box, add-to-cart, placement/analytics helpers)
- **Section:** `theme/sections/product-recommendation.jsx`
- **API module:** `theme/b2b/api/modules/b2b-product-recommendation/`

## Loyalty, rewards, and referrals

Loyalty dashboard with reward history, tiers, expiring-points banner, and a Refer & Earn program.

- **Root:** `theme/custom-templates/b2b/loyalty-rewards.jsx` + `theme/custom-templates/b2b/loyalty-rewards/` (dashboard, reward-history, refer-earn, referral-list, tiers-modal)
- **API module:** `theme/b2b/api/modules/b2b-loyalty/`
- **Global config:** gated by `show_loyalty`; referral controlled by `show_referral_code_field` and `referral_share_message`.

## KYC

Non-KYC buyers see a KYC notification bar and completion badge; discounted price visibility for guest/non-KYC users is configurable.

- **Notification bar:** `theme/custom-templates/b2b/notification-bar/` (KYC status prompts and actions)
- **Global config:** `show_kyc_notification_bar`, `show_kyc_completion_badge`, `kyc_badge_text`, `show_discount_non_kyc`, plus guest settings (`show_marked_price_guest`, `show_discount_guest`, `show_login_for_guest`).

## Distributed retail dashboard

A full management interface for distributor/retailer B2B relationships.

- **Root:** `theme/custom-templates/b2b/distributed-dashboard/index.jsx`
- **API module:** `theme/b2b/api/modules/retail-distribution/`
- **Overview:** analytics and stats cards
- **Order history:** order list + order detail
- **Inventory:** inventory management with add/edit/view
- **Retail management:** manage retailer relationships
- **Draft orders:** draft order management

## Profile and account

| Feature | Implementation |
|---|---|
| B2B profile page | `custom-templates/b2b-profile.jsx` |
| B2B my profile | `custom-templates/b2b/my-profile.jsx` |
| B2B email (custom) | `custom-templates/b2b/fdk-templates/b2b-email.jsx` |
| B2B phone (custom) | `custom-templates/b2b/fdk-templates/b2b-phone.jsx` |
| B2B profile details | `custom-templates/b2b/fdk-templates/b2b-profile-details.jsx` |
| B2B menu | `custom-templates/b2b/menu.jsx` |
| B2B address book | `custom-templates/b2b/address-book.jsx` |
| B2B payment method | `custom-templates/b2b/payment-method.jsx` (config via API module `theme/b2b/api/modules/payment-option-config/`) |
| Credit / terms | `custom-templates/b2b/credit.jsx`, `custom-templates/b2b/b2b-credit.jsx` (+ `b2b-credit/` components), API module `theme/b2b/api/modules/b2b-credit/` |
| Custom orders | `custom-templates/b2b/custom-my-orders.jsx` |
| Notification bar | `custom-templates/b2b/notification-bar/` |

## Feature flags

B2B features are gated via the `FeatureGuard` component (`theme/components/FeatureGuard/FeatureGuard.jsx`) using feature flags returned by `theme/b2b/api/modules/features-api/feature-api.js` (e.g. `distributor_dashboard`, `smart_wishlist`). Features can be enabled/disabled per account without a code deploy; disabled features redirect with an optional error snackbar.

## Loginless B2B

Supports B2B browsing without requiring a login via `theme/b2b-page-layouts/pdp/components/loginless-wrapper/b2b-loginless-wrapper.jsx`. Business check redirect is handled by `custom-templates/b2b/stateless-redirect/check-business.jsx`.

## B2B checkout helper

`theme/helper/b2b/checkout.js` provides B2B-specific checkout utilities (payment method selection, credit terms, GST validation).
