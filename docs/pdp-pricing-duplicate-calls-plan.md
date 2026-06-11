# PDP Pricing: Duplicate Calls & Loader Fix — Plan

> Branch context: `fix/pdp-loader` (current), root cause introduced during `b2b-v1.4.9_yanik_atd`

---

## 1. Root Cause

Two independent systems both manage pricing on the PDP, and both fire a `FULFILLMENT_OPTIONS` call during the initial size preselect on every page refresh.

### System A — `useProductDescription.jsx`
- Lines 305–318: a `useEffect` that watches `[slug, currentSize?.value, locationDetails?.pincode, i18nDetails?.currency?.code]`
- When `currentSize` becomes non-null **and** `slug === PRODUCT.product_details.slug`, it fires `fetchProductPrice()` → `FULFILLMENT_OPTIONS`
- Controls `isLoadingPriceBySize` in the parent

### System B — `B2BSizeWrapper.jsx`
- Lines 1278–1300: `initializeComponent` effect that watches `[productDetails.slug, preselectSize, hideSizeController, sizes]`
- When `preselectSize` or `hideSizeController` is true, it calls `parentSizeSelection(firstAvailableSize)` → triggers `onB2bSizeSelection` → `setCurrentSize` in parent
- Then immediately calls `fetchPriceForSelectedSize(sizeValue)` → `FULFILLMENT_OPTIONS` (its own local call)

**The collision**: `setCurrentSize` triggers System A's effect. Meanwhile System B has already dispatched its own call. Both are in-flight simultaneously for the same size and pincode.

### Why it causes multiple shimmer flashes

The `B2BPriceWrapper` shimmer condition (line 193) is:
```
isPageLoading || isBestPriceLoading || isAwaitingBestPrice
```

On page refresh the sequence is:
```
1. isPageLoading=true                          → shimmer ON  (phase 1)
2. isPageLoading=false, storeIds still empty   → isAwaitingBestPrice=true → shimmer ON (phase 2)
3. applySizeSelection calls setStoreIds([])    → storeIds cleared          → isAwaitingBestPrice stays true
4. fetchPriceForSelectedSize completes         → sizeItemsData updated
5. currentStoreIds useMemo fires               → setStoreIds(ids)
6. useBestPriceDetails effect fires            → isBestPriceLoading=true   → shimmer ON (phase 3)
7. Best price API completes                    → isBestPriceLoading=false,
                                                 hasBestPriceFetchSettled=true
                                                 isAwaitingBestPrice=false  → shimmer OFF
```

Phases 1→2→3 look like the shimmer cycling on/off/on when only one continuous shimmer is expected.

The additional guard added in `b2b-v1.4.9_yanik_atd` (`isProductUnserviceable`) fixes the **forever-shimmer** edge case when there are zero fulfillment options, but does not fix the **duplicate call** or the **shimmer cycling** for normal serviceable products.

---

## 2. Current Flow (Page Refresh, Logged-in KYC User)

```
useProductDescription
│
├─ GET_PRODUCT_DETAILS fires
│   └─ sets currentSize via setCurrentSize(sizeToSelect)   [line 193]
│
├─ useEffect [currentSize?.value] fires                     [line 305]
│   └─ fetchProductPrice() → FULFILLMENT_OPTIONS #1
│       sets isLoadingPriceBySize = true → false
│
└─ product_price_with_fullfillment from FPI store
    └─ useEffect fires                                      [line 244]
        sets fulfillmentOptions, productPriceBySlug

B2BSizeWrapper (rendered by product-description.jsx)
│
├─ initializeComponent effect fires                        [line 1278]
│   ├─ fetchOnLoadData() → cart details fetch
│   └─ preselectSize=true → parentSizeSelection(firstSize) → setCurrentSize [triggers above]
│       └─ fetchPriceForSelectedSize(sizeValue)
│           → FULFILLMENT_OPTIONS #2
│           → setSizeItemsData → currentStoreIds useMemo
│
├─ useEffect [currentStoreIds] fires                       [line 1537]
│   └─ setStoreIds(currentStoreIds)                        → triggers useBestPriceDetails
│
└─ (also) useEffect [productPriceBySlug.store.uid]         [line 1544]
    └─ when !isInitialLoad: setStoreIds([productPriceBySlug.store.uid])

useBestPriceDetails (in product-description.jsx)
│
└─ useEffect [storeIds, currentSize, locationDetails]      [line 68]
    └─ when storeIds.length > 0 AND selectedSize set:
        debouncedFetchBestPriceDetails() (600ms debounce)
        → B2B_ACTIONS.best_price_details → Best Price API
```

**Two `FULFILLMENT_OPTIONS` calls** — one from `useProductDescription` (System A), one from `B2BSizeWrapper` (System B) — both firing for the same size on initial load.

---

## 3. Why System A Exists

`useProductDescription.fetchProductPrice` was the **original** fulfillment/price fetch mechanism — predating `B2BSizeWrapper`. It:
- Updates `isLoadingPriceBySize` (used by `B2BPriceWrapper` shimmer logic)
- Sets `pincodeErrorMessage` when no serviceable FO is found
- **Does NOT** write back into `fulfillmentOptions` state — the FPI store update from `FULFILLMENT_OPTIONS` drives that via the `product_price_with_fullfillment` effect

`B2BSizeWrapper.fetchPriceForSelectedSize` was added later for multi-size B2B, and:
- Updates its own `processedProductPriceData` (used to build `sizeItemsData`)
- Extracts `store.uid` → populates `currentStoreIds` → feeds the best-price flow

Both paths are doing the **same network call** but writing into **different local state shapes**.

---

## 4. Proposed Optimized Flow

The goal is to have **one** `FULFILLMENT_OPTIONS` call on initial load and a **single, unbroken shimmer** for the pricing section.

### Core insight
`B2BSizeWrapper` already has all the data it needs from `fetchPriceForSelectedSize` (System B). System A's call (`fetchProductPrice` in `useProductDescription`) is redundant **when B2BSizeWrapper is present on the page** — it's the same API call. The only unique things System A provides are:
- `isLoadingPriceBySize` (loading flag for `B2BPriceWrapper`)
- `pincodeErrorMessage` updates

### Proposal: Gate System A behind `isB2bSizeWrapperAvailable`

`product-description.jsx` already knows whether the B2B size wrapper block is present:
```js
const isB2bSizeWrapperAvailable = useMemo(() => {
  return !!blocks.find((block) => block.type === "b2b_size_wrapper");
}, [blocks]);
```

The same flag exists for `b2b_size_controller`.

**Change 1 — `useProductDescription.jsx` lines 305–318**

Skip `fetchProductPrice()` when the section will be handled by B2BSizeWrapper:

```js
useEffect(() => {
  if (
    Object.keys?.(PRODUCT?.product_details)?.length &&
    slug === PRODUCT?.product_details?.slug
  ) {
    if (!isB2bSizeControllerActive) {   // <-- guard (passed in as prop / returned value)
      fetchProductPrice();
    }
  }
}, [slug, PRODUCT?.product_details?.slug, currentSize?.value, locationDetails?.pincode, i18nDetails?.currency?.code]);
```

`isB2bSizeControllerActive` can be a boolean passed from `product-description.jsx` into `useProductDescription` (or returned from it). It is `true` when either `b2b_size_wrapper` or `b2b_size_controller` block type is present.

**Change 2 — `B2BSizeWrapper.jsx` line 1312 (`applySizeSelection`)**

`setStoreIds([])` at the top of `applySizeSelection` causes `useBestPriceDetails` to see an empty array, miss its first trigger window, and wait for storeIds to re-populate. This contributes to shimmer cycling. The clear should only happen when the user actively **changes** a size (not on initial preselect):

```js
const applySizeSelection = async (size, { syncUrl = false, isPreselect = false } = {}) => {
  if (!isPreselect) {
    setStoreIds([]);   // Only clear on user-driven size change
  }
  ...
};
```

Call it with `isPreselect: true` inside `initializeComponent`.

**Change 3 — `B2BSizeWrapper.jsx` line 177 (`setIsLoading`)**

The `setIsBestPriceLoading(true)` call in `setIsLoading` (cart update) fires even during the initial cart fetch (`fetchOnLoadData`), which causes the price section shimmer to flash during cart data loading — unrelated to price. Scope it to explicit cart operations only:

```js
const setIsLoading = (isLoading, { affectsBestPrice = false } = {}) => {
  setIsCartUpdating(isLoading);
  if (affectsBestPrice && setIsBestPriceLoading) {
    setIsBestPriceLoading(isLoading);
  }
};
```

Pass `{ affectsBestPrice: true }` only from `checkPincode` and cart mutation handlers, not from `fetchOnLoadData`.

**Change 4 — `B2BPriceWrapper.jsx` shimmer condition (line 193)**

Make `isLoadingPriceBySize` part of the shimmer guard, which the `b2b-v1.4.9_yanik_atd` change already threads through. This is already done — no new change needed, but confirm the prop flows through from the `b2b_size_controller` case too (currently only wired for `b2b_product_price` block, lines 1820–1821 in `product-description.jsx`).

### Summary of changes

| File | Location | Change |
|------|----------|--------|
| `useProductDescription.jsx` | lines 305–318 | Guard `fetchProductPrice` behind `!isB2bSizeControllerActive` |
| `useProductDescription.jsx` | return value | Export `isB2bSizeControllerActive` or accept it as a prop |
| `product-description.jsx` | `useProductDescription` call-site | Pass `isB2bSizeWrapperAvailable \|\| isB2bSizeControllerAvailable` |
| `b2b-size-wrapper.jsx` | `applySizeSelection` | Add `isPreselect` flag; skip `setStoreIds([])` on preselect |
| `b2b-size-wrapper.jsx` | `setIsLoading` | Add `affectsBestPrice` guard; don't set best-price loading during cart fetch |

---

## 5. Minimal Code Changes (What NOT to Touch)

- Do not change `useBestPriceDetails` — the debounce and storeIds-driven trigger logic is correct
- Do not change the `FULFILLMENT_OPTIONS` query — it is shared by both flows
- Do not restructure `processedProductPriceData` or `sizeItemsData` in `B2BSizeWrapper` — complex, high risk
- Do not move best-price fetch logic into `B2BSizeWrapper` — concerns are correctly separated
- Do not remove `fetchProductPrice` from `useProductDescription` — still needed for the non-B2B (`size_wrapper`) code path

---

## 6. Risk Areas

| Risk | Description | Mitigation |
|------|-------------|------------|
| **Pincode error messaging** | System A's `fetchProductPrice` sets `pincodeErrorMessage` when no FO is found. If gated out, pincode errors for B2B size controller path may be lost. | `B2BSizeWrapper.fetchProductPriceBySize` already calls `setPincodeErrorMessage` on empty result (line 341–348). Verify this prop is wired via `pincodeErrorMessage` / `setPincodeErrorMessage` props (already present, lines 62–63). |
| **`isLoadingPriceBySize` no longer set** | If System A is gated, `isLoadingPriceBySize` stays false. `B2BPriceWrapper` uses it for `isFulfillmentResolved`. | Replace with `loadingSizes.size > 0` from `B2BSizeWrapper` — or simply pass `isInitialLoad` as the equivalent flag. |
| **Non-B2B `size_wrapper` path** | Standard (non-B2B) size selection path still depends on System A. | Guard is conditional; System A runs normally when `b2b_size_wrapper` / `b2b_size_controller` blocks are absent. |
| **SSR hydration** | `isPdpSsrFetched` skips the `GET_PRODUCT_DETAILS` fetch but `currentSize` is pre-set. System A's effect would still fire after hydration. | The guard applies equally; SSR path is unaffected as long as the guard correctly reads the block list (available at render time). |
| **URL size param** | `B2BSizeWrapper` already handles `?size=` query param (lines 1330–1350) and calls `applySizeSelection`. This is independent of System A. No regression here. | Confirm `applySizeSelection` guard (`isPreselect: false` for URL-driven changes) so storeIds are still cleared on manual URL changes. |

---

## 7. Testing Checklist

### Core scenarios
- [ ] **Page refresh (no size in URL)** — single `FULFILLMENT_OPTIONS` call visible in network tab; shimmer appears once, then price shows
- [ ] **Page refresh with `?size=XL` in URL** — size pre-fills correctly; still single price call; best price shows for that size
- [ ] **User changes size** — price updates; `storeIds` cleared and re-populated; best price re-fetches; shimmer shows once per change
- [ ] **Logged-out user** — no best price call; shimmer resolves to MRP/marked price after `isLoadingPriceBySize` completes
- [ ] **Non-KYC logged-in user** — same as above, no best price
- [ ] **KYC-approved user** — best price API fires after storeIds are set; contract/quotation badge appears if applicable
- [ ] **Unserviceable product** — no FO returned; shimmer does not loop forever; shows "not available" state

### Regression scenarios
- [ ] **Non-B2B PDP (`size_wrapper` block only)** — System A still fires; product price and pincode check unaffected
- [ ] **Pincode change** — `checkPincode` triggers price refresh for selected size; error message shows correctly
- [ ] **Ladder pricing** — `bestPriceDetails.ladder.is_applicable` still resolves; `LadderPricingWrapper` renders
- [ ] **SSR hydrated page** — first paint uses cached data; no double shimmer on hydration
- [ ] **Mobile sticky cart** — sticky add-to-cart appears at correct time; not before price resolves
- [ ] **Quote button** — `showQuoteButton` still respected; no regression from loading state changes
