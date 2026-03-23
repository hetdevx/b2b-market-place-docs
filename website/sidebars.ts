import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  mainSidebar: [
    {
      type: "category",
      label: "Overview",
      link: { type: "doc", id: "overview/index" },
      items: [],
    },
    {
      type: "category",
      label: "Getting Started",
      link: { type: "doc", id: "getting-started/index" },
      items: [
        "getting-started/prerequisites",
        "getting-started/local-development",
      ],
    },
    {
      type: "category",
      label: "Architecture",
      link: { type: "doc", id: "architecture/index" },
      items: [
        "architecture/data-flow",
        "architecture/module-boundaries",
      ],
    },
    {
      type: "category",
      label: "Reference",
      link: { type: "doc", id: "reference/index" },
      items: [
        "reference/pages",
        "reference/sections",
        "reference/components",
        "reference/b2b-layouts",
        "reference/helpers",
      ],
    },
    {
      type: "category",
      label: "How-To Guides",
      link: { type: "doc", id: "how-to/index" },
      items: [
        "how-to/add-new-section",
        "how-to/customize-global-config",
        "how-to/publish-theme",
        "how-to/add-new-b2b-feature",
        "how-to/upgrade-base-template",
      ],
    },
    {
      type: "category",
      label: "Operations",
      link: { type: "doc", id: "operations/index" },
      items: [],
    },
    {
      type: "category",
      label: "Decisions (ADRs)",
      link: { type: "doc", id: "decisions/index" },
      items: [
        "decisions/adr-001-docs-strategy",
        "decisions/adr-002-b2b-layout-override",
        "decisions/adr-template",
      ],
    },
    {
      type: "category",
      label: "Quality",
      link: { type: "doc", id: "quality/index" },
      items: [],
    },
    {
      type: "category",
      label: "Contributing",
      link: { type: "doc", id: "contributing/index" },
      items: [],
    },
    {
      type: "category",
      label: "Theme",
      link: { type: "doc", id: "theme/index" },
      items: [
        "theme/global-config",
        "theme/copilot-integration",
        "theme/webpack",
      ],
    },
    {
      type: "category",
      label: "Business Requirements",
      link: { type: "doc", id: "business-requirement/index" },
      items: ["business-requirement/b2b-features"],
    },
  ],
};

export default sidebars;
