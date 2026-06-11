import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/docs/00-overview/',
    component: ComponentCreator('/docs/00-overview/', 'fe0'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '14a'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'e38'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'e35'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'cbb'),
                exact: true
              },
              {
                path: '/docs/architecture/',
                component: ComponentCreator('/docs/architecture/', 'b2f'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/architecture/data-flow',
                component: ComponentCreator('/docs/architecture/data-flow', '3bd'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/architecture/module-boundaries',
                component: ComponentCreator('/docs/architecture/module-boundaries', '82f'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/business-requirement/',
                component: ComponentCreator('/docs/business-requirement/', 'be3'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/business-requirement/b2b-features',
                component: ComponentCreator('/docs/business-requirement/b2b-features', 'e7c'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/contributing/',
                component: ComponentCreator('/docs/contributing/', '453'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/decisions/',
                component: ComponentCreator('/docs/decisions/', 'a1a'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/decisions/adr-001-docs-strategy',
                component: ComponentCreator('/docs/decisions/adr-001-docs-strategy', '831'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/decisions/adr-002-b2b-layout-override',
                component: ComponentCreator('/docs/decisions/adr-002-b2b-layout-override', '23f'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/decisions/adr-template',
                component: ComponentCreator('/docs/decisions/adr-template', '54e'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/getting-started/',
                component: ComponentCreator('/docs/getting-started/', 'cd4'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/getting-started/local-development',
                component: ComponentCreator('/docs/getting-started/local-development', '116'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/getting-started/prerequisites',
                component: ComponentCreator('/docs/getting-started/prerequisites', 'd90'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/how-to/',
                component: ComponentCreator('/docs/how-to/', 'deb'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/how-to/add-new-b2b-feature',
                component: ComponentCreator('/docs/how-to/add-new-b2b-feature', 'f69'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/how-to/add-new-section',
                component: ComponentCreator('/docs/how-to/add-new-section', '57f'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/how-to/customize-global-config',
                component: ComponentCreator('/docs/how-to/customize-global-config', '787'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/how-to/publish-theme',
                component: ComponentCreator('/docs/how-to/publish-theme', '1bf'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/how-to/upgrade-base-template',
                component: ComponentCreator('/docs/how-to/upgrade-base-template', '054'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/loyalty-rewards-technical-doc',
                component: ComponentCreator('/docs/loyalty-rewards-technical-doc', 'fe0'),
                exact: true
              },
              {
                path: '/docs/operations/',
                component: ComponentCreator('/docs/operations/', 'c40'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/overview/',
                component: ComponentCreator('/docs/overview/', '416'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/pdp-pricing-duplicate-calls-plan',
                component: ComponentCreator('/docs/pdp-pricing-duplicate-calls-plan', 'f33'),
                exact: true
              },
              {
                path: '/docs/product-recommendation-reco-dedupe-plan',
                component: ComponentCreator('/docs/product-recommendation-reco-dedupe-plan', '72e'),
                exact: true
              },
              {
                path: '/docs/quality/',
                component: ComponentCreator('/docs/quality/', 'd0e'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/reference/',
                component: ComponentCreator('/docs/reference/', 'af6'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/reference/b2b-layouts',
                component: ComponentCreator('/docs/reference/b2b-layouts', 'a1c'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/reference/components',
                component: ComponentCreator('/docs/reference/components', '01d'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/reference/helpers',
                component: ComponentCreator('/docs/reference/helpers', 'bbe'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/reference/pages',
                component: ComponentCreator('/docs/reference/pages', '124'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/reference/sections',
                component: ComponentCreator('/docs/reference/sections', '11d'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/theme/',
                component: ComponentCreator('/docs/theme/', '651'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/theme/copilot-integration',
                component: ComponentCreator('/docs/theme/copilot-integration', '289'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/theme/global-config',
                component: ComponentCreator('/docs/theme/global-config', 'e72'),
                exact: true,
                sidebar: "mainSidebar"
              },
              {
                path: '/docs/theme/webpack',
                component: ComponentCreator('/docs/theme/webpack', '023'),
                exact: true,
                sidebar: "mainSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
