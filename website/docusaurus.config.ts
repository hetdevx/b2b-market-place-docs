import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Turbo B2B Docs",
  tagline: "Engineering documentation for the Turbo B2B FDK React Theme",
  favicon: "img/favicon.ico",

  url: "https://turbo-b2b-docs.vercel.app",
  baseUrl: "/",

  organizationName: "fynd-b2b",
  projectName: "react-starter",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: {
          path: "../docs",
          routeBasePath: "/docs",
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/fynd-b2b/react-starter/edit/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Turbo B2B",
      items: [
        {
          type: "docSidebar",
          sidebarId: "mainSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/fynd-b2b/react-starter",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            { label: "Overview", to: "/docs/overview/" },
            { label: "Getting Started", to: "/docs/getting-started/" },
            { label: "Architecture", to: "/docs/architecture/" },
            { label: "B2B Features", to: "/docs/business-requirement/b2b-features" },
          ],
        },
        {
          title: "Resources",
          items: [
            {
              label: "Fynd Partners",
              href: "https://partners.fynd.com",
            },
            {
              label: "FDK CLI",
              href: "https://github.com/gofynd/fdk-cli",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Fynd Commerce. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "json"],
    },
    mermaid: {
      theme: { light: "neutral", dark: "forest" },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
