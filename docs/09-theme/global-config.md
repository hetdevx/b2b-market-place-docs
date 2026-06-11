---
sidebar_position: 2
---

# Global Config Reference

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

Full reference for all global configuration options, defined in `theme/config/settings_schema.json` (defaults in `theme/config/settings_data.json`). See [How-To: Customize Global Config](../04-how-to/customize-global-config.md) for editing instructions.

## Typography

| Key | Type | Default | Description |
|---|---|---|---|
| `font_header` | `font` | `false` | Header/title font |
| `font_body` | `font` | `false` | Body font |

## Header

| Key | Type | Default | Description |
|---|---|---|---|
| `mobile_logo_max_height` | `range` | `24` | Mobile navigation logo max height |
| `desktop_logo_max_height` | `range` | `65` | Desktop header logo max height |
| `mobile_logo_max_height_header` | `range` | `38` | Mobile header logo max height |
| `header_layout` | `select` | `"single"` | Single or double row nav |
| `always_on_search` | `checkbox` | `false` | Keep search bar always visible |
| `show_secondary_header_on_checkout` | `checkbox` | `false` | Simplified header on cart/checkout |
| `header_border` | `checkbox` | `true` | Show header border on desktop |
| `sticky_header` | `checkbox` | `true` | Sticky header on scroll |
| `show_icon_text_in_header` | `checkbox` | `false` | Show text labels under header icons |
| `profile_icon_text` | `text` | `""` | Profile icon label |
| `wishlist_icon_text` | `text` | `""` | Wishlist icon label |
| `cart_icon_text` | `text` | `""` | Cart icon label |
| `logo_menu_alignment` | `select` | `"layout_1"` | Logo/menu desktop alignment |
| `header_mega_menu` | `radio` | `"default"` | Switch to mega menu |
| `nav_weight` | `select` | `"semibold"` | Navigation font weight |
| `transparent_header` | `checkbox` | `false` | Transparent header |
| `enable_left_navigation` | `checkbox` | `false` | Left navigation (hamburger) menu |

## Search and Recommendation Extension

| Key | Type | Default | Description |
|---|---|---|---|
| `algolia_enabled` | `checkbox` | `false` | Enable Algolia-backed search/recommendations |

## Footer

| Key | Type | Default | Description |
|---|---|---|---|
| `logo` | `image_picker` | `""` | Footer logo |
| `show_footer_logo` | `checkbox` | `true` | Show footer logo |
| `show_footer_description` | `checkbox` | `true` | Show footer description |
| `footer_description` | `text` | `""` | Footer description text |
| `payments_logo` | `image_picker` | `""` | Bottom bar (payment methods) image |
| `footer_image` | `checkbox` | `false` | Enable footer image |
| `footer_image_desktop` | `image_picker` | `""` | Footer image (desktop) |
| `footer_image_mobile` | `image_picker` | `""` | Footer image (mobile/tablet) |
| `collapsible_footer_menu` | `checkbox` | `false` | Collapsible footer menu on mobile |
| `footer_contact_background` | `checkbox` | `true` | Background behind footer contact details |
| `footer_social_open_same_tab` | `checkbox` | `false` | Open social links in same tab |
| `footer_social_text` | `text` | `"Social Media"` | Social media section label |
| `footer_logo_max_height_mobile` | `range` | `25` | Footer logo max height (mobile) |
| `footer_logo_max_height_desktop` | `range` | `36` | Footer logo max height (desktop) |

## Cart and Button Configuration

| Key | Type | Default | Description |
|---|---|---|---|
| `disable_cart` | `checkbox` | `false` | Disable cart and checkout |
| `show_price` | `checkbox` | `true` | Show product prices |
| `button_options` | `select` | `"addtocart_buynow"` | Button combinations |
| `show_quantity_control` | `checkbox` | `false` | Quantity stepper on product cards |
| `enable_minicart` | `checkbox` | `false` | Enable minicart drawer |

## Product Card Configuration

| Key | Type | Default | Description |
|---|---|---|---|
| `product_img_width` | `text` | `""` | Product image width (px) |
| `product_img_height` | `text` | `""` | Product image height (px) |
| `show_custom_badge` | `checkbox` | `true` | Show custom badge |
| `show_sale_badge` | `checkbox` | `true` | Show Sale badge |
| `show_color_variants` | `checkbox` | `false` | Show color variants on card |
| `image_border_radius` | `range` | `24` | Image corner radius |
| `badge_border_radius` | `range` | `24` | Badge corner radius |
| `img_fill` | `checkbox` | `false` | Fill image container |
| `img_container_bg` | `color` | `""` | Image container background |
| `show_image_on_hover` | `checkbox` | `false` | Show alternate image on hover |
| `limited_stock_quantity` | `range` | `11` | Quantity threshold for limited-stock label |

## Product Details Modal Settings

| Key | Type | Default | Description |
|---|---|---|---|
| `hide_brand_name` | `checkbox` | `false` | Hide brand name |
| `is_limited_stock` | `checkbox` | `true` | Show limited-stock label |
| `limited_stock_label` | `text` | `"Hurry! Only {{qty}} Left"` | Limited-stock label text |

## Other Page Configuration

| Key | Type | Default | Description |
|---|---|---|---|
| `img_hd` | `checkbox` | `false` | HD image upscaling (use original images) |
| `button_border_radius` | `range` | `4` | Button corner radius |
| `enable_page_max_width` | `checkbox` | `false` | Constrain page max width |
| `filter_toggle_button` | `checkbox` | `false` | Show filter toggle button on listings |
| `carousel_controls_mobile` | `select` | `"none"` | Carousel controls (mobile/tablet) |
| `carousel_controls_desktop` | `select` | `"none"` | Carousel controls (desktop) |

## Performance and Caching

| Key | Type | Default | Description |
|---|---|---|---|
| `enable_swr_caching` | `checkbox` | `false` | Enable SWR response caching |

## Delivery Promise

| Key | Type | Default | Description |
|---|---|---|---|
| `serviceability_max_min` | `range` | `59` | Show delivery promise in minutes up to this value |
| `serviceability_max_hour` | `range` | `2` | Show delivery promise in hours up to this value |
| `is_serviceability` | `checkbox` | `false` | Serviceability (pincode) check in header |
| `is_serviceability_mandatory` | `checkbox` | `false` | Make header serviceability check mandatory |
| `is_delivery_promise` | `checkbox` | `false` | Show delivery promise in header |
| `delivery_promise_type` | `radio` | `"min"` | Delivery promise display format |

## Google Maps

| Key | Type | Default | Description |
|---|---|---|---|
| `is_header_map` | `checkbox` | `false` | Enable Maps/Places in header |
| `is_checkout_map` | `checkbox` | `false` | Enable Maps/Places in checkout |
| `is_store_locator_map` | `checkbox` | `false` | Enable Maps in store locator |
| `map_api_key` | `text` | `""` | Google Maps API key |

## B2B Configurations

| Key | Type | Default | Description |
|---|---|---|---|
| `show_available_offer_button` | `checkbox` | `true` | Show Available Offers button |
| `show_kyc_notification_bar` | `checkbox` | `true` | Show KYC notification bar |
| `show_marked_price_guest` | `checkbox` | `false` | Show marked price for guest users |
| `show_discount_guest` | `checkbox` | `false` | Show discounted price for guest users |
| `show_login_for_guest` | `checkbox` | `true` | Show login option for guest users |
| `show_discount_non_kyc` | `checkbox` | `false` | Show discounted price for non-KYC users |
| `show_kyc_completion_badge` | `checkbox` | `true` | Show KYC completion badge |
| `kyc_badge_text` | `text` | `"Complete KYC"` | KYC badge text |
| `auto_apply_gst` | `checkbox` | `true` | Auto-apply GST on cart |
| `force_apply_gst` | `checkbox` | `true` | Force GST application |
| `show_loyalty` | `checkbox` | `false` | Enable loyalty/rewards feature |
| `referral_share_message` | `textarea` | Refer & Earn template | Referral share message (`{Link}` placeholder) |
| `show_referral_code_field` | `checkbox` | `false` | Referral code field on registration |
| `hide_single_size` | `checkbox` | `false` | Hide size selector when only one size exists |

## Home Page

| Key | Type | Default | Description |
|---|---|---|---|
| `initial_sections_count` | `range` | `3` | Number of sections to load initially |

## Kaily (Copilot) Configuration

| Key | Type | Default | Description |
|---|---|---|---|
| `storefront_copilot_actions` | `checkbox` | `false` | Enable AI action mode (register storefront Copilot tools) |

## Mobile Configuration

| Key | Type | Default | Description |
|---|---|---|---|
| `show_mobile_icons` | `checkbox` | `false` | Show mobile icons |

## Related section-level settings

Product display toggles such as `show_buy_now_button` (default `false`) and `show_moq` (default `true`) are **section** settings, not global config. They control the Buy Now button and MOQ display in the add-to-cart popup and are defined in `theme/sections/product-listing.jsx`, `collection-listing.jsx`, `featured-collection.jsx`, and `product-recommendation.jsx`.
