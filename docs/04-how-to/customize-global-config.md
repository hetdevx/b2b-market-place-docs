---
sidebar_position: 3
---

# Customize Global Config

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

Global configuration controls theme-wide settings such as typography, header layout, footer, product cards, cart behavior, and B2B-specific toggles. These settings are managed via the Fynd Platform theme editor.

## Access the config editor

1. Log in to [Fynd Platform](https://platform.fynd.com).
2. Navigate to your company and select your sales channel.
3. Under **Appearance**, open **Themes** and click **Edit** on your active theme.
4. In the theme editor, locate **Settings** under **Configuration**.

## Key global config options

The full schema lives in `theme/config/settings_schema.json` (~87 props). A representative subset:

| Config key | Type | Default | Category |
|---|---|---|---|
| `font_header` | `font` | `false` | Typography |
| `font_body` | `font` | `false` | Typography |
| `header_layout` | `select` | `"single"` | Header |
| `logo_menu_alignment` | `select` | `"layout_1"` | Header |
| `header_mega_menu` | `radio` | `"default"` | Header |
| `sticky_header` | `checkbox` | `true` | Header |
| `disable_cart` | `checkbox` | `false` | Cart & Button Configuration |
| `show_price` | `checkbox` | `true` | Cart & Button Configuration |
| `button_options` | `select` | `"addtocart_buynow"` | Cart & Button Configuration |
| `product_img_width` | `text` | `""` | Product Card |
| `product_img_height` | `text` | `""` | Product Card |
| `show_sale_badge` | `checkbox` | `true` | Product Card |
| `image_border_radius` | `range` | `24` | Product Card |
| `img_fill` | `checkbox` | `false` | Product Card |
| `img_container_bg` | `color` | `""` | Product Card |
| `show_image_on_hover` | `checkbox` | `false` | Product Card |
| `button_border_radius` | `range` | `4` | Other Page Configuration |
| `show_kyc_notification_bar` | `checkbox` | `true` | B2B Configurations |
| `show_marked_price_guest` | `checkbox` | `false` | B2B Configurations |
| `auto_apply_gst` | `checkbox` | `true` | B2B Configurations |
| `force_apply_gst` | `checkbox` | `true` | B2B Configurations |
| `show_loyalty` | `checkbox` | `false` | B2B Configurations |
| `hide_single_size` | `checkbox` | `false` | B2B Configurations |

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

1. Add the schema entry to the `props` array in `theme/config/settings_schema.json`.
2. If a default value is needed in the shipped preset, also set it under `list[].global_config.custom.props` in `theme/config/settings_data.json`.
3. Sync the theme (`fdk theme sync`) to push the updated schema to the platform.

> Note: `config.json` at the repo root is a generated theme artifact (styles, fonts) — do not edit it to add config options.
