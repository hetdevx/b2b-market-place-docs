---
sidebar_position: 3
---

# Customize Global Config

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

Global configuration controls theme-wide settings such as typography, header layout, footer, product cards, and cart behavior. These settings are managed via the Fynd Platform theme editor.

## Access the config editor

1. Log in to [Fynd Platform](https://platform.fynd.com).
2. Navigate to your company and select your sales channel.
3. Under **Appearance**, open **Themes** and click **Edit** on your active theme.
4. In the theme editor, locate **Settings** under **Configuration**.

## Key global config options

| Config key | Type | Default | Category |
|---|---|---|---|
| `font_header` | `font` | `false` | Typography |
| `font_body` | `font` | `false` | Typography |
| `header_layout` | `select` | `"single"` | Header |
| `logo_menu_alignment` | `select` | `"layout_1"` | Header |
| `header_mega_menu` | `checkbox` | `false` | Header |
| `is_hyperlocal` | `checkbox` | `false` | Header |
| `disable_cart` | `checkbox` | `false` | Cart |
| `show_price` | `checkbox` | `true` | Cart |
| `button_options` | `select` | `"addtocart_buynow"` | Cart |
| `custom_button_text` | `text` | `"Enquire now"` | Cart |
| `custom_button_link` | `url` | `""` | Cart |
| `product_img_width` | `text` | `""` | Product Card |
| `product_img_height` | `text` | `""` | Product Card |
| `show_sale_badge` | `checkbox` | `true` | Product Card |
| `image_border_radius` | `range` | `24` | Product Card |
| `img_fill` | `checkbox` | `false` | Product Card |
| `img_container_bg` | `color` | `""` | Product Card |
| `show_image_on_hover` | `checkbox` | `false` | Product Card |
| `section_margin_bottom` | `range` | `16` | Other |
| `button_border_radius` | `range` | `4` | Other |

## Accessing config in code

Global config is available in all sections and pages via the `globalConfig` prop:

```jsx
function MySection({ props, globalConfig }) {
  const { show_price, button_border_radius } = globalConfig;
  return (
    <div style={{ borderRadius: button_border_radius }}>
      {show_price && <span>Price</span>}
    </div>
  );
}
```

## Adding a new global config option

Edit `config.json` at the repo root to add new global config schema entries. After editing, publish the theme to sync the schema with the platform.
