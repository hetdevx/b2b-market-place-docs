---
sidebar_position: 3
---

# Sections Reference

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

All FDK section components live under `theme/sections/`. Sections are renderable blocks registered with the Fynd Platform page builder.

## Full inventory (55 sections)

| File | Purpose |
|---|---|
| `account-locked.jsx` | Account locked section |
| `application-banner.jsx` | App banner |
| `blog.jsx` | Blog listing section |
| `blog-detail.jsx` | Blog detail section |
| `brand-listing.jsx` | Brand list |
| `brands-landing.jsx` | Brands landing |
| `cart-items.jsx` | Cart items view |
| `cart-landing.jsx` | Cart landing |
| `categories.jsx` | Categories grid |
| `categories-listing.jsx` | Category listing |
| `checkout.jsx` | Checkout section |
| `collection-listing.jsx` | Collection product grid |
| `collection-listing.jsx` | Collections listing |
| `collections.jsx` | Collections grid |
| `collections-listing.jsx` | All collections list |
| `contact-us.jsx` | Contact us form |
| `edit-profile.jsx` | Profile edit form |
| `faq.jsx` | FAQ accordion |
| `feature-blog.jsx` | Featured blog posts |
| `featured-collection.jsx` | Featured collection |
| `forgot-password.jsx` | Forgot password |
| `hero-image.jsx` | Hero image banner |
| `hero-video.jsx` | Hero video banner |
| `image-gallery.jsx` | Image gallery |
| `image-slideshow.jsx` | Image slideshow / carousel |
| `link.jsx` | Link section |
| `login.jsx` | Login form |
| `media-with-text.jsx` | Media + text section |
| `multi-collection-product-list.jsx` | Multi-collection product list |
| `order-details.jsx` | Order details |
| `order-status.jsx` | Order status |
| `order-tracking.jsx` | Order tracking |
| `order-tracking-details.jsx` | Tracking details |
| `page-not-found.jsx` | 404 content |
| `privacy-policy.jsx` | Privacy policy content |
| `product-description.jsx` | PDP content (B2B-extended) |
| `product-listing.jsx` | PLP grid |
| `product-recommendation.jsx` | Product recommendations |
| `profile-address.jsx` | Address section |
| `profile-details-form.jsx` | Profile details form |
| `profile-email.jsx` | Email management |
| `profile-navigation-menu.jsx` | Profile side nav |
| `profile-orders.jsx` | Orders list |
| `profile-phone.jsx` | Phone management |
| `profile-wishlist.jsx` | Wishlist section |
| `raw-html.jsx` | Raw HTML injection |
| `register.jsx` | Registration form |
| `return-policy.jsx` | Return policy |
| `set-password.jsx` | Password set/reset |
| `shipping-policy.jsx` | Shipping policy |
| `shared-cart-breakup.jsx` | Shared cart price breakup |
| `shared-cart-items.jsx` | Shared cart item list |
| `site-map.jsx` | Site map |
| `store-locator.jsx` | Google Maps store locator |
| `testimonials.jsx` | Testimonials |
| `tnc.jsx` | Terms and conditions |
| `trust-marker.jsx` | Trust badges |
| `verify-email.jsx` | Email verification |
| `verify-email-link.jsx` | Email link verification |

## Notes

- `product-description.jsx` and `product-listing.jsx` are the most complex sections — they integrate B2B layout overrides.
- `store-locator.jsx` uses `@react-google-maps/api` and requires a Google Maps API key.
- `shared-cart-items.jsx` and `shared-cart-breakup.jsx` are used on the shared cart page flow.
