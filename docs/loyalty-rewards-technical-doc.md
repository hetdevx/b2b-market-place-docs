# Loyalty & Rewards — Integration Reference

**Scope:** Loyalty Page · Refer & Earn on Signup
**Branch:** `feat/loyalty` — [react-starter, Azure DevOps]

---

## PRs to Review

| Repo | PR | What changed |
|---|---|---|
| react-starter | [PR #261672](https://dev.azure.com/GoFynd/PlatformThemes/_git/react-starter/pullrequest/261672) | Loyalty page, dashboard, reward history, refer & earn UI |
| react-starter | [PR #264965](https://dev.azure.com/GoFynd/PlatformThemes/_git/react-starter/pullrequest/264965) | API module, GraphQL queries, mapper, referral manager |
| react-starter | [PR #265215](https://dev.azure.com/GoFynd/PlatformThemes/_git/react-starter/pullrequest/265215) | Signup integration — referral capture + apply after OTP |
| react-starter | [PR #265726](https://dev.azure.com/GoFynd/PlatformThemes/_git/react-starter/pullrequest/265726) | Tiers modal, expiring banner, fallback tier logic |
| react-starter | [PR #267467](https://dev.azure.com/GoFynd/PlatformThemes/_git/react-starter/pullrequest/267467) | Bug fixes, edge case handling |
| firestone | [PR #264963](https://dev.azure.com/GoFynd/CommonLibraries/_git/firestone/pullrequest/264963) | `ShareSheet` and shared UI components used by loyalty page |

---

## Codebase Map — Where to Go for What

Before diving in, here is a map of every folder and file involved. Use this to know exactly where to look or what to copy.

---

### Base URL

**File:** `constant.js` (root of the project)

```js
// constant.js
export const B2B_LOYALTY_BASE_URL =
  `${BASE_URL}/ext/fynd-engage/application/engage/graphql`;
```

`BASE_URL` is `window.location.origin` at runtime — so this resolves to your store's domain automatically. This is the single URL used for **all** Engage GraphQL calls. Every API function in the loyalty module imports it from here.

---

### `theme/b2b/api/modules/b2b-loyalty/` — The API Layer

This is the root folder for everything API-related. Go here to understand or change how the feature talks to the backend.

| File | What it does |
|---|---|
| `b2b-loyalty.js` | **Entry point for all API calls.** Contains the `loyaltyGraphQL` fetch wrapper and exports one function per operation (`fetchLoyaltyDashboard`, `fetchLoyaltyPointsHistory`, `applyLoyaltyReferralCode`, etc.). This is what the UI imports and calls. |
| `mapper.js` | Transforms raw GraphQL responses into the shape the UI components expect. You never call this directly — `b2b-loyalty.js` calls it internally before returning data. |
| `referralManager.js` | All localStorage logic for referral codes — store, read, validate, delete, and apply after signup. Nothing here talks to the UI directly. |
| `index.js` | Barrel export — re-exports everything from the three files above so the rest of the codebase imports from one place. |

---

### `theme/queries/loyaltyQuery.js` — The GraphQL Strings

All query and mutation strings for the Engage API live here as plain JS string exports. Nothing else — no fetch logic, no mapping. If you need to add a field to a query, this is the only file to change.

| Export | Used by |
|---|---|
| `LOYALTY_USER` | `fetchLoyaltyDashboard()` |
| `LOYALTY_POINTS_HISTORY` | `fetchLoyaltyPointsHistory()` |
| `LOYALTY_REWARD_DETAILS` | `fetchLoyaltyRewardDetails()` |
| `LOYALTY_REFERRALS` | `fetchLoyaltyReferrals()` |
| `APPLY_LOYALTY_REFERRAL_CODE` | `applyLoyaltyReferralCode()` |

---

### `theme/custom-templates/b2b/loyalty-rewards.jsx` — The Loyalty Page Root

This is the **root component for the entire Loyalty page**. It:
- Owns all page state via `useReducer`
- Calls `fetchLoyaltyDashboard`, `fetchLoyaltyPointsHistory`, and `fetchLoyaltyRewardDetails` on load
- Passes data down to every sub-component

All the sub-components live in the `loyalty-rewards/` folder next to it:

| Sub-component | What it renders |
|---|---|
| `loyalty-rewards/dashboard/` | Points cards, tier info, progress bar |
| `loyalty-rewards/reward-history/` | Transaction history table (desktop paged / mobile infinite scroll) |
| `loyalty-rewards/refer-earn/` | Referral link + share buttons (WhatsApp, Email, SMS, Copy) |
| `loyalty-rewards/tiers-modal/` | Full tier list modal with earn/redeem rules |
| `loyalty-rewards/expiring-banner/` | Banner shown when points are about to expire |

---

### Signup Integration — Two files touched

These are **not** new files — they are existing files with a small addition for the referral flow:

| File | What was added |
|---|---|
| `theme/providers/global-provider.jsx` | Reads `?referralCode=` from the URL on any page load and saves it to localStorage |
| `theme/page-layouts/register/useRegister.jsx` | Passes `applyReferralIfExists` as the OTP success callback; pre-fills the referral code field |

---

## API Endpoint

```
POST https://odrr.in/ext/fynd-engage/application/engage/graphql
Content-Type: application/json
```

**Auth:** No API key. Uses session cookie — the user must be logged in.

### Postman Setup

1. New **POST** request → paste the URL above
2. Headers → `Content-Type: application/json`
3. Body → **raw → JSON** → format:
   ```json
   { "query": "...", "variables": {} }
   ```
4. Cookie: copy the session cookie from a logged-in browser (DevTools → Application → Cookies) and add it as a `Cookie` header

> Switch body type to **GraphQL** in Postman for auto-formatting and inline variable editing.

---

## What Each Query / Mutation Does

---

### `LoyaltyUser`

**What it does:**
Fetches everything needed to render the Loyalty Dashboard in one call:
- Who the user is (name, blocked status, their referral code)
- Their current tier (title, icon, progress towards next tier, downgrade risk)
- Their wallet (available points, earned, redeemed, expiring points)

**File (query string):** `theme/queries/loyaltyQuery.js`

**File (API function):** `theme/b2b/api/modules/b2b-loyalty/b2b-loyalty.js`

```js
export async function fetchLoyaltyDashboard() {
  const json = await loyaltyGraphQL(LOYALTY_USER);
  return mapLoyaltyDashboard(json.data);
}
```

**Called from:** `theme/custom-templates/b2b/loyalty-rewards.jsx`

```js
// Runs once on page mount
const dashboardData = await fetchLoyaltyDashboard();
dispatch({ type: "DASHBOARD_LOADED", payload: dashboardData });
```

**What renders with this data:**
- Points cards (available / earned / redeemed)
- Current tier name + icon
- Progress bar towards next tier
- Expiring points banner (uses `expiringPoints`)
- Referral code shown on the Refer & Earn tab (uses `referralCode`)

**GraphQL:**

```graphql
query LoyaltyUser {
  loyaltyUser {
    name
    userIdentifier
    hasConsent
    isBlocked
    referralCode
    createdAt
  }
  loyaltyUserTier {
    id
    title
    icon
    thresholdValue
    thresholdValueType
    pointsToUpgrade
    orderValueToUpgrade
    entryDate
    nextTier {
      id
      title
      icon
      thresholdValue
      thresholdValueType
    }
    downgradeData {
      daysLeftForDowngrade
      downgradeDate
      minimumSpendRequired
      amountSpentForDowngrade
    }
  }
  loyaltyWallet {
    loyaltyName
    points
    pendingPoints
    earnedPoints
    redeemedPoints
    unit
    conversionRate
    expiringPoints {
      total
      expiresBy
    }
  }
}
```

---

### `LoyaltyPointsHistory`

**What it does:**
Fetches a paginated list of point transactions — every time the user earned or redeemed points (orders, referrals, manual credits, etc.).

**File (query string):** `theme/queries/loyaltyQuery.js`

**File (API function):** `theme/b2b/api/modules/b2b-loyalty/b2b-loyalty.js`

```js
export async function fetchLoyaltyPointsHistory({ limit, next } = {}) {
  const json = await loyaltyGraphQL(LOYALTY_POINTS_HISTORY, { limit, next });
  return mapLoyaltyPointsHistory(json.data);
}
```

**Called from:** `theme/custom-templates/b2b/loyalty-rewards.jsx`

```js
// Called every time the user navigates to a new page or taps "Load More"
const { items, page } = await fetchLoyaltyPointsHistory({
  limit: 3,      // items per page
  next: cursor,  // cursor from previous page's page.next — null for first page
});
```

**Pagination pattern:**
- Pass `page.next` from the response as `next` in the next call
- `page.hasNext` tells you if there are more pages
- First call: pass `next: null` (or omit it)

**What renders with this data:** The reward history table/list on the Loyalty page — transaction name, points change, date, linked order ID.

**GraphQL:**

```graphql
query LoyaltyPointsHistory($limit: Int, $next: String) {
  loyaltyPointsHistory(limit: $limit, next: $next) {
    items {
      id
      points
      remainingPoints
      activityName
      activitySlug
      status
      orderId
      orderAmount
      createdAt
      text
      subText1
      subText2
      meta {
        orderId
        orderAmount
      }
    }
    page {
      hasNext
      hasPrevious
      next
      limit
    }
  }
}
```

---

### `LoyaltyRewardDetails`

**What it does:**
Fetches the full tier list and the rules for how points are earned and redeemed. Used only when the user opens the **"View Tiers"** modal.

**File (query string):** `theme/queries/loyaltyQuery.js`

**File (API function):** `theme/b2b/api/modules/b2b-loyalty/b2b-loyalty.js`

```js
export async function fetchLoyaltyRewardDetails(dashboard = null) {
  const json = await loyaltyGraphQL(LOYALTY_REWARD_DETAILS);
  return mapLoyaltyRewardDetails(json.data, dashboard);
}
```

**Called from:** `theme/custom-templates/b2b/loyalty-rewards.jsx`

```js
// Called right after fetchLoyaltyDashboard, on page mount
const details = await fetchLoyaltyRewardDetails(dashboardData);
dispatch({ type: "REWARD_DETAILS_LOADED", payload: details });
```

**What renders with this data:** The Tiers Modal — all tiers with their icons, thresholds, earn rules, and redeem rules.

**GraphQL:**

```graphql
query LoyaltyRewardDetails {
  loyaltyRewardDetails {
    tiersData {
      title
      thresholdValue
      icon
      earnActivities {
        title
        description
        longDescription
      }
      redeemActivities {
        title
        description
        longDescription
      }
    }
    orderEarnRulesData {
      title
      description
      longDescription
    }
    orderRedeemRulesData {
      title
      description
      longDescription
    }
    referralEarnRulesData {
      title
    }
  }
  loyaltyTiers {
    id
    title
    slug
    thresholdValue
    thresholdValueType
    index
    icon
    isActive
  }
}
```

---

### `LoyaltyReferrals`

**What it does:**
Fetches the list of users the current user has referred — who signed up using their referral code and how many points were awarded to each side. Loaded when the user opens the Refer & Earn tab to see their referral history.

**File (query string):** `theme/queries/loyaltyQuery.js`

**File (API function):** `theme/b2b/api/modules/b2b-loyalty/b2b-loyalty.js`

```js
export async function fetchLoyaltyReferrals({ page = 1, limit = 10, showAll = null } = {}) {
  const json = await loyaltyGraphQL(LOYALTY_REFERRALS, { page, limit, showAll });
  return mapLoyaltyReferrals(json.data);
}
```

**Called from:** `theme/custom-templates/b2b/loyalty-rewards.jsx` — loaded when the user opens the Refer & Earn tab.

**What renders with this data:** Referral history list — referred user name, points earned by referrer, points earned by referred user, date.

**GraphQL:**

```graphql
query LoyaltyReferrals($page: Int, $limit: Int, $showAll: Boolean) {
  loyaltyReferrals(page: $page, limit: $limit, showAll: $showAll) {
    items {
      id
      referredUserPoints
      referrerPoints
      createdAt
      referredUser {
        userIdentifier
        name
      }
    }
    page {
      current
      limit
      total
      hasNext
      hasPrevious
    }
  }
}
```

---

### `ApplyLoyaltyReferralCode` (mutation)

**What it does:**
Submits a referral code on behalf of the newly signed-up user. Awards points to both the referrer (the person who shared the link) and the referred user (the new signup). This is a one-time call — the code is removed from storage after a successful response.

**File (query string):** `theme/queries/loyaltyQuery.js`

**File (API function):** `theme/b2b/api/modules/b2b-loyalty/b2b-loyalty.js`

```js
export async function applyLoyaltyReferralCode(referralCode) {
  // keepalive: true — request survives the page redirect that happens after OTP
  const json = await loyaltyGraphQL(
    APPLY_LOYALTY_REFERRAL_CODE,
    { referralCode },
    { keepalive: true }
  );
  return mapApplyReferralCode(json.data);
}
```

**When it is invoked:**
Immediately after the user successfully verifies their OTP on signup. It is **not** called on login — only on new account creation.

**Called from:** `theme/page-layouts/register/useRegister.jsx`

```js
// applyReferralIfExists is passed as the success callback to OTP verification
const verifyDetailsProp = useVerifyDetails({
  fpi,
  verifyBothData,
  onVerifySuccess: applyReferralIfExists,   // ← fires once OTP is confirmed
});
```

`applyReferralIfExists` (in `referralManager.js`) reads the stored code and calls `applyLoyaltyReferralCode`. If no code is stored, it exits silently. If the API call fails, signup is never blocked — the code stays in storage for a retry.

**GraphQL:**

```graphql
mutation ApplyLoyaltyReferralCode($referralCode: String!) {
  applyLoyaltyReferralCode(referralCode: $referralCode) {
    referral {
      userIdentifier
      referralCode
      points
      createdAt
      updatedAt
    }
  }
}
```

---

## Refer & Earn — Full Flow

| Step | What happens | File |
|---|---|---|
| 1 | User A opens `/loyalty-rewards`. Their `referralCode` comes from the `LoyaltyUser` query (`loyaltyUser.referralCode`) and is shown on the Refer & Earn tab. | `loyalty-rewards/refer-earn/refer-earn.jsx` |
| 2 | User A shares the link: `https://<store>?referralCode=<CODE>` via WhatsApp / Email / SMS / Copy. | `loyalty-rewards/refer-earn/refer-earn.jsx` |
| 3 | User B opens the link. `?referralCode=` is read from the URL, saved to localStorage with 7-day TTL, then stripped from the URL so it doesn't re-fire on refresh. | `theme/providers/global-provider.jsx` |
| 4 | User B opens the signup form. Referral code field is pre-filled from localStorage. If User B types a different code manually, it overrides the stored one. | `theme/page-layouts/register/useRegister.jsx` |
| 5 | User B submits signup + completes OTP. `onVerifySuccess` fires → `applyReferralIfExists()` runs → reads code from localStorage → calls `applyLoyaltyReferralCode`. | `theme/page-layouts/register/useRegister.jsx` |
| 6 | On success: code removed from localStorage, both users get points. On failure: code stays in localStorage, signup proceeds normally — user is never blocked. | `theme/b2b/api/modules/b2b-loyalty/referralManager.js` |

---

### Code: Capture referral code from URL

**File:** `theme/providers/global-provider.jsx`

```jsx
import { setReferralCode } from "../b2b/api/modules/b2b-loyalty";

// Inside ThemeProvider:
const [searchParams, setSearchParams] = useSearchParams();

useEffect(() => {
  const code = searchParams.get("referralCode");
  if (!code || !code.trim()) return;

  setReferralCode(code.trim());    // validates + saves to localStorage

  const next = new URLSearchParams(searchParams);
  next.delete("referralCode");
  setSearchParams(next, { replace: true });   // clean URL
}, []);
```

---

### Code: Apply after OTP success

**File:** `theme/page-layouts/register/useRegister.jsx`

```jsx
import { getStoredReferralCode, setReferralCode, applyReferralIfExists }
  from "../../b2b/api/modules/b2b-loyalty";

const verifyDetailsProp = useVerifyDetails({
  fpi,
  verifyBothData,
  onVerifySuccess: applyReferralIfExists,
});

const referralCodeDefault = getStoredReferralCode() ?? ""; // pre-fill the field

const handleFormSubmit = (formData) => {
  const trimmedCode = formData.referralCode?.trim();
  if (trimmedCode) setReferralCode(trimmedCode); // save manually typed code
  // ... signUp(user)
};
```

---

## Theme Config Flags

These live in the theme's global config schema and can be toggled from the Theme Editor (Global Settings).

| Flag | Type | Default | What it controls |
|---|---|---|---|
| `show_loyalty` | `boolean` | `false` | Enables the `/loyalty-rewards` page. If `false`, the route redirects to `/` — nothing renders. |
| `show_referral_code_field` | `boolean` | `false` | Shows the referral code input on the signup form. Even if hidden, URL-based codes are still captured and applied. |
| `referral_share_message` | `string` | `""` | The pre-written message text sent when sharing via WhatsApp / Email / SMS on the Refer & Earn tab. |

---

### How `show_loyalty` gates the page

**File:** `theme/custom-templates/b2b/loyalty-rewards.jsx`

```jsx
const { globalConfig } = useThemeConfig({ fpi });
const { show_loyalty = false } = globalConfig || {};

useEffect(() => {
  if (!show_loyalty) navigate("/");   // redirect away if feature is off
}, [show_loyalty]);
```

---

### How `show_referral_code_field` controls the signup form

**File:** `theme/page-layouts/register/useRegister.jsx`

```jsx
const { show_referral_code_field = false } = globalConfig || {};

return {
  showReferralCodeField: show_referral_code_field,
  referralCodeDefault,   // pre-filled value from localStorage
};
```

> Even when `show_referral_code_field` is `false`, the referral code from the URL is still captured silently and applied after signup. The flag only controls whether the input field is visible to the user.
