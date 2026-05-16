# Clothing Store (CRWN Pattern)

Modern CRWN-style clothing store with Firebase, Redux Toolkit, Razorpay checkout, and order history.

## Setup (Bun)

1. Install [Bun](https://bun.sh), then install dependencies:
   - `bun install`
2. Copy `.env.example` → `.env` and add Firebase values.
3. Start the app:
   - `bun run start`

### Payments — Razorpay

**Demo mode (no keys):** keep `REACT_APP_USE_MOCK_PAYMENT=true` in `.env`. Only run `bun run start`.

**Test payments:** from [Razorpay Dashboard](https://dashboard.razorpay.com) → Settings → API Keys (test mode):

```env
REACT_APP_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
REACT_APP_USE_MOCK_PAYMENT=false
```

Run two terminals:

- `bun run start:server` — payment API on port 4242
- `bun run start` — React app

Checkout opens the Razorpay modal. Amounts use INR (₹).

## Scripts

| Command | Description |
|---------|-------------|
| `bun run start` | React dev server |
| `bun run start:server` | Razorpay order API |
| `bun run build` | Production build |
| `bun run test` | Jest tests (cart reducer, etc.) |

## Firestore security rules

Rules live in [`firestore.rules`](./firestore.rules):

- **categories** — public read (catalog); writes disabled from clients
- **users/{userId}** — read/write only when `request.auth.uid == userId`
- **users/{userId}/orders** — read/write only for the signed-in owner

Deploy rules in the [Firebase Console](https://console.firebase.google.com) → Firestore → Rules, or with the Firebase CLI:

```bash
firebase deploy --only firestore:rules
```

## Seed categories (one-time)

If the `categories` collection is empty, seed from `src/shop-data.js`:

**From browser devtools** (while signed in and app is running):

```js
import { seedCategoriesIfEmpty } from './utils/firebase/seed-categories.utils';
await seedCategoriesIfEmpty();
```

Or temporarily call `seedCategoriesIfEmpty()` from a `useEffect` in development, then remove it.

The helper skips seeding when categories already exist.

**After updating `src/shop-data.js`:** delete the existing `categories` documents in Firestore (or the whole collection), then run `seedCategoriesIfEmpty()` again so the database matches the file. Seeding does not run automatically on app start.

## Deployment

### Netlify deployment

[`netlify.toml`](./netlify.toml) uses Bun (`bun install && bun run build`) with `BUN_VERSION` and skips Netlify's default npm install (`NETLIFY_SKIP_INSTALL`); publishes `build/`. Keep `bun.lock` in the repo�do not rely on `package-lock.json` for deploys. [`public/_redirects`](./public/_redirects) maps `/*` to `/index.html` for SPA routing.

**Env vars in the Netlify UI** (Site settings -> Environment variables -> **Production** and **Deploy previews**):

| Variable | Notes |
|----------|--------|
| All `REACT_APP_FIREBASE_*` from [`.env.example`](./.env.example) | Required for auth and Firestore |
| `REACT_APP_RAZORPAY_KEY_ID` | When using Razorpay (not mock) |
| `REACT_APP_API_URL` | Deployed payment server URL (not localhost) |
| `REACT_APP_USE_MOCK_PAYMENT` | `true` = demo without backend; `false` = live API |

**Secrets:** `RAZORPAY_KEY_SECRET` stays on the payment server host only (`server/index.js`), not in Netlify.

**How Netlify picks up env changes:** CRA injects `REACT_APP_*` at **build time**. After any change: **Deploy -> Trigger deploy -> Clear cache and deploy site**.

**Payment server:** Netlify is static React only; deploy `server/` on Render/Railway and set `REACT_APP_API_URL` to that URL.

**Firestore:** Deploy [`firestore.rules`](./firestore.rules) via Firebase Console or `firebase deploy --only firestore:rules`.

### Build locally

```bash
bun run build
```

## Features

- Authentication (email/password + Google popup)
- Firestore categories + Redux Toolkit cart
- Lazy-loaded routes (Shop, Checkout, Auth, Orders, Product Detail)
- Razorpay checkout + demo fallback
- Orders in `users/{uid}/orders` with protected `/orders` page
- Server-side Razorpay signature verification

## Tests

```bash
bun run test -- --watchAll=false
```

Cart reducer tests: `src/store/cart/cart.reducer.test.js`
