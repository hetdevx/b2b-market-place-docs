---
sidebar_position: 2
---

# Pages Reference

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

All page components live under `theme/pages/`. Each file maps to a route registered in the FDK theme config.

## Full inventory (45 pages)

| File | Route / Purpose |
|---|---|
| `about-us.jsx` | About Us static page |
| `account-locked.jsx` | Account locked state |
| `blog.jsx` | Blog listing |
| `blog-detail.jsx` | Individual blog post |
| `brands.jsx` | Brands landing |
| `cart-landing.jsx` | Cart page |
| `categories.jsx` | Category listing |
| `collection-listing.jsx` | Products in a collection |
| `collections.jsx` | Collections listing |
| `contact-us.jsx` | Contact form |
| `edit-profile.jsx` | User profile edit |
| `faq.jsx` | FAQ page |
| `forgot-password.jsx` | Forgot password flow |
| `home.jsx` | Homepage |
| `locate-us.jsx` | Store locator |
| `login.jsx` | Login page |
| `not-found-page.jsx` | 404 page |
| `order-status.jsx` | Order status |
| `order-tracking.jsx` | Order tracking |
| `order-tracking-details.jsx` | Detailed tracking |
| `orders-list.jsx` | User orders list |
| `payment-link.jsx` | Payment link handler |
| `policy.jsx` | Policy pages |
| `product-description.jsx` | Product Detail Page (PDP) |
| `product-listing.jsx` | Product Listing Page (PLP) |
| `profile.jsx` | User profile root |
| `profile-address.jsx` | Address book |
| `profile-details.jsx` | Profile details |
| `profile-email.jsx` | Email management |
| `profile-phone.jsx` | Phone management |
| `refund-order.jsx` | Refund initiation |
| `register.jsx` | Registration page |
| `request-reattempt.jsx` | Delivery reattempt request |
| `return-policy.jsx` | Return policy |
| `return-summary-status.jsx` | Return summary |
| `set-password.jsx` | Set/reset password |
| `shared-cart.jsx` | Shared cart view |
| `shipment-details.jsx` | Shipment details |
| `shipment-update.jsx` | Shipment update form |
| `shipping-policy.jsx` | Shipping policy |
| `single-page-checkout.jsx` | Single-page checkout |
| `tnc.jsx` | Terms and conditions |
| `verify-email.jsx` | Email verification |
| `verify-email-link.jsx` | Email verification link handler |
| `wishlist.jsx` | Wishlist page |

## Page layouts — `theme/page-layouts/` (31 directories)

Most pages delegate their logic and presentational markup to a matching directory under `theme/page-layouts/`:

`account-locked`, `address`, `auth`, `blog`, `brands`, `cart`, `categories`, `collection-listing`, `collections`, `compare`, `edit-profile`, `faq`, `forgot-password`, `hero-video`, `login`, `marketing`, `orders`, `pdp`, `plp`, `profile`, `profile-address`, `refund-management`, `register`, `section-render`, `set-password`, `shared-cart`, `single-checkout`, `site-map`, `store-locator`, `verify-email-link`, `wishlist`

## Notes

- PDP (`product-description.jsx`) renders B2B-specific layout overrides from `theme/b2b-page-layouts/pdp/`.
- Cart (`cart-landing.jsx`) renders the GST card via `theme/b2b-page-layouts/cart/`.
- Profile pages may render B2B custom templates (quotes, wishlist, credit, distributed dashboard) via `custom-templates/index.jsx`.
