---
sidebar_position: 2
---

# Prerequisites

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

## Required accounts

| Account | Purpose |
|---|---|
| Fynd Partner account | Create and manage themes |
| Fynd development account | Test theme against a live store |

Create a partner account at [partners.fynd.com](https://partners.fynd.com/help/docs/guide/become-fynd-partner).

## Required tools

| Tool | Minimum version | Notes |
|---|---|---|
| Node.js | 16.19 | 20.x recommended (LTS) |
| npm | 8+ | Ships with Node 16+ |
| Git | Any | |
| FDK CLI | Latest | Install with `npm install -g @gofynd/fdk-cli` |

## Optional tools

| Tool | Purpose |
|---|---|
| Bun | Faster installs (`bun.lockb` present in repo) |
| jq | Required by the `sync.sh` context-switch helper |
| ESLint VSCode extension | Inline linting |
| Prettier VSCode extension | Auto-format on save |

## Installing FDK CLI

```bash
npm install -g @gofynd/fdk-cli
fdk --version
```

## FDK login

```bash
fdk login
```

You will be redirected to the Fynd Partners browser login. Select your Partner Organization to complete authentication.
