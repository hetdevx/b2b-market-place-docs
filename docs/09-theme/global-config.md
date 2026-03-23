---
sidebar_position: 2
---

# Global Config Reference

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

Full reference for all global configuration options. See [How-To: Customize Global Config](../04-how-to/customize-global-config.md) for editing instructions.

## Typography

| Key | Type | Default | Description |
|---|---|---|---|
| `font_header` | `font` | `false` | Header font |
| `font_body` | `font` | `false` | Body font |

## Header

| Key | Type | Default | Description |
|---|---|---|---|
| `header_layout` | `select` | `"single"` | Single or double row nav |
| `logo_menu_alignment` | `select` | `"layout_1"` | Logo/menu desktop alignment |
| `header_mega_menu` | `checkbox` | `false` | Enable mega menu (double row only) |
| `extension` | `extension` | `{}` | Extension injection points |
| `is_hyperlocal` | `checkbox` | `false` | Hyperlocal location feature |
| `is_delivery_minutes` | `checkbox` | `false` | Show delivery time in minutes |
| `max_delivery_min` | `text` | `"60"` | Minutes threshold |
| `is_delivery_hours` | `checkbox` | `false` | Show delivery time in hours |
| `max_delivery_hours` | `text` | `"2"` | Hours threshold |
| `is_delivery_day` | `checkbox` | `false` | Show Today/Tomorrow format |
| `is_delivery_date` | `checkbox` | `false` | Show date range format |

## Footer

| Key | Type | Default | Description |
|---|---|---|---|
| `logo` | `image_picker` | `""` | Footer logo |
| `footer_description` | `text` | `""` | Footer description text |
| `payments_logo` | `image_picker` | `""` | Payment methods image |
| `footer_image` | `checkbox` | `false` | Enable footer image |
| `footer_image_desktop` | `image_picker` | `""` | Footer image (desktop) |
| `footer_image_mobile` | `image_picker` | `""` | Footer image (mobile/tablet) |

## Cart and Button Configuration

| Key | Type | Default | Description |
|---|---|---|---|
| `disable_cart` | `checkbox` | `false` | Disable cart and checkout |
| `show_price` | `checkbox` | `true` | Show product prices |
| `button_options` | `select` | `"addtocart_buynow"` | Button combinations |
| `custom_button_text` | `text` | `"Enquire now"` | Custom button label |
| `custom_button_link` | `url` | `""` | Custom button URL |
| `custom_button_icon` | `image_picker` | `""` | Custom button icon |

## Product Card Configuration

| Key | Type | Default | Description |
|---|---|---|---|
| `product_img_width` | `text` | `""` | Product image width |
| `product_img_height` | `text` | `""` | Product image height |
| `show_sale_badge` | `checkbox` | `true` | Show Sale badge |
| `image_border_radius` | `range` | `24` | Image corner radius |
| `img_fill` | `checkbox` | `false` | Fill image container |
| `img_container_bg` | `color` | `""` | Image container background |
| `show_image_on_hover` | `checkbox` | `false` | Show alternate image on hover |

## Other Page Configuration

| Key | Type | Default | Description |
|---|---|---|---|
| `img_hd` | `checkbox` | `false` | HD image upscaling (homepage) |
| `section_margin_bottom` | `range` | `16` | Section bottom margin (px) |
| `button_border_radius` | `range` | `4` | Button corner radius |
