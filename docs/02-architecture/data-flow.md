---
sidebar_position: 2
---

# Data Flow

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-03-14
Last Reviewed: 2026-03-14
Status: Approved

## Standard FDK data flow

```mermaid
sequenceDiagram
    participant FDK as FDK Runtime
    participant Store as fdk-store (GQL)
    participant Provider as global-provider.jsx
    participant Section as Section / Page component
    participant Component as Shared component

    FDK->>Store: Hydrate store on page load
    Store->>Provider: Provide store context
    Provider->>Section: Render with FDK props
    Section->>Component: Pass data as props
    Component->>Store: Dispatch actions (add to cart, etc.)
    Store-->>Section: Re-render on state change
```

## B2B REST data flow (SWR)

```mermaid
sequenceDiagram
    participant Component as B2B Template / Layout
    participant SWR as theme/b2b/api/swr.js
    participant Axios as theme/b2b/api/axios.js
    participant API as Fynd Platform REST API

    Component->>SWR: useSWR(key, fetcher)
    SWR->>Axios: HTTP GET/POST
    Axios->>API: Authenticated request (headers from FDK context)
    API-->>Axios: JSON response
    Axios-->>SWR: Parsed data
    SWR-->>Component: { data, isLoading, error }
```

## B2B pricing data flow

Best-price and ladder-price resolution is handled by two helpers:

- `theme/helper/b2b/fetch_best_price_details.js` — fetches best available price for a single product
- `theme/helper/b2b/fetch_best_price_list.js` — batch price fetch for product lists
- `theme/b2b-page-layouts/pdp/price-details/usePriceDetails.jsx` — React hook wrapping price fetch for PDP

```mermaid
sequenceDiagram
    participant PDP as b2b-price-wrapper.jsx
    participant Hook as usePriceDetails.jsx
    participant Helper as fetch_best_price_details.js
    participant API as Fynd Platform API

    PDP->>Hook: invoke usePriceDetails()
    Hook->>Helper: fetchBestPriceDetails(productId, size)
    Helper->>API: POST /b2b/prices
    API-->>Helper: price tiers
    Helper-->>Hook: resolved price
    Hook-->>PDP: { bestPrice, ladderTiers, contractedPrice }
```

## Quote flow

```mermaid
sequenceDiagram
    participant User
    participant QuotePage as quotes.jsx (custom-template)
    participant Service as quotation.service.js
    participant API as Fynd Platform Quote API

    User->>QuotePage: Submit quote request
    QuotePage->>Service: createQuote(payload)
    Service->>API: POST /quotes
    API-->>Service: quoteId
    Service-->>QuotePage: success
    QuotePage->>User: Display quote status
```
