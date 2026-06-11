---
sidebar_position: 2
---

# Data Flow

Owner: Frontend Platform Team
Reviewers: Theme Team, QA
Last Updated: 2026-06-11
Last Reviewed: 2026-06-11
Status: Approved

## Standard FDK data flow

GraphQL documents live in `theme/queries/` (one file per domain: `cartQuery.js`, `pdpQuery.js`, `plpQuery.js`, …). On boot, `globalDataResolver` / `pageDataResolver` (`theme/helper/lib.js`) execute the global/page queries; components read state with `useGlobalStore(fpi.getters.X)` and trigger mutations/queries with `fpi.executeGQL(...)`.

```mermaid
sequenceDiagram
    participant FDK as FDK Runtime
    participant Resolver as helper/lib.js resolvers
    participant Store as fdk-store (GQL)
    participant Section as Section / Page component
    participant Component as Shared component

    FDK->>Resolver: globalDataResolver / pageDataResolver
    Resolver->>Store: fpi.executeGQL(GLOBAL_DATA / page query)
    Store->>Section: useGlobalStore(fpi.getters.X)
    Section->>Component: Pass data as props
    Component->>Store: fpi.executeGQL (add to cart, etc.)
    Store-->>Section: Re-render on state change
```

## B2B REST data flow (SWR)

`theme/b2b/api/swr.js` exports `SWRProvider`, which wraps the SWR-driven custom-template routes (mainly the distributed-dashboard routes in `theme/custom-templates/index.jsx`) and sets `consoleAxios.get` as the default fetcher. `consoleAxios` (`theme/b2b/api/axios.js`) targets `<origin>/ext/b2b-console` with `withCredentials: true`; extra `x-application-data` / `x-user-data` headers and cookie forwarding only apply in local-dev mode.

```mermaid
sequenceDiagram
    participant Component as B2B Template / Layout
    participant SWR as theme/b2b/api/swr.js
    participant Axios as theme/b2b/api/axios.js (consoleAxios)
    participant API as /ext/b2b-console proxy → Fynd Platform REST API

    Component->>SWR: useSWR(key)
    SWR->>Axios: HTTP GET (default fetcher)
    Axios->>API: Cookie-authenticated request (withCredentials)
    API-->>Axios: JSON response
    Axios-->>SWR: Parsed data
    SWR-->>Component: { data, isLoading, error }
```

## B2B pricing data flow

Best-price resolution (best price, contract, quotation, ladder, pricing tier) is handled by helpers in `theme/helper/b2b/`, exposed through the `B2B_ACTIONS` map (`theme/helper/b2b/index.js`):

- `theme/helper/b2b/fetch_best_price_details.js` — fetches best available price for a single product (`POST /best-price/v1/price-detail`)
- `theme/helper/b2b/fetch_best_price_list.js` — batch price fetch for product lists (`POST /best-price/v1/price-list`)
- `theme/b2b-page-layouts/pdp/price-details/usePriceDetails.jsx` — exports the `useBestPriceDetails` hook, consumed by the PDP section (`theme/sections/product-description.jsx`) and the PLP add-to-cart modal (`theme/page-layouts/plp/useAddToCartModal.jsx`)

```mermaid
sequenceDiagram
    participant PDP as product-description.jsx (section)
    participant Hook as useBestPriceDetails (usePriceDetails.jsx)
    participant Helper as B2B_ACTIONS.best_price_details
    participant API as /ext/b2b-console/best-price/v1

    PDP->>Hook: invoke useBestPriceDetails({ productDetails, priceDataDefault })
    Hook->>Helper: best_price_details(payload with item_id, size, store_ids, price range)
    Helper->>API: POST /price-detail
    API-->>Helper: best_price / contract / quotation / ladder data
    Helper-->>Hook: resolved price details
    Hook-->>PDP: { bestPriceDetails, isBestPriceLoading, updateStoreIds, ... }
```

`theme/helper/b2b/quotation.service.js` also provides `getBestPrice` / `getBestPriceEffective` helpers used to apply contract, quotation, and ladder slabs to an effective price.

## Quote flow

Quote requests are created from the `RequestQuoteModal` shared component (`theme/components/request-quote-modal/`) or the `create-new-qr.jsx` custom template (`theme/custom-templates/b2b/quotes/`). The quote list and detail pages (`quotes.jsx`, `list-qr.jsx`, `quote-products.jsx`) live under the same custom-template directory and fetch via `consoleAxios`.

```mermaid
sequenceDiagram
    participant User
    participant QuoteUI as RequestQuoteModal / create-new-qr.jsx
    participant Axios as consoleAxios
    participant API as /ext/b2b-console/quotation/v1

    User->>QuoteUI: Submit quote request
    QuoteUI->>Axios: POST quotation/v1/quote-requests
    Axios->>API: Authenticated request
    API-->>Axios: quote request created
    Axios-->>QuoteUI: success
    QuoteUI->>User: Display quote status (list-qr.jsx)
```
