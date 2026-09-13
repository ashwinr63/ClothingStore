# ClothingStore

An e-commerce web application for browsing and purchasing clothing online. ClothingStore provides a complete shopping experience where customers can explore curated clothing categories, manage a shopping cart, and securely check out with Stripe payments.

## What It Does

ClothingStore is an online clothing shop offering products across five categories: **Hats**, **Jackets**, **Sneakers**, **Womens**, and **Mens**. Users can:

- **Browse products** by category with images and pricing
- **Create an account** using email/password or sign in with Google
- **Add items to a cart** with real-time quantity and total tracking
- **Check out securely** through Stripe payment processing

## Tech Stack

| Layer            | Technology                          |
|------------------|-------------------------------------|
| Frontend         | React 18, React Router 6            |
| State Management | Redux Toolkit, Reselect              |
| Styling          | Styled Components, SASS              |
| Authentication   | Firebase Auth (Email + Google OAuth) |
| Database         | Cloud Firestore                      |
| Payments         | Stripe (legacy); Razorpay in progress (separate PR) |
| Hosting          | Netlify (with serverless functions)  |

## Project Structure

```
src/
  components/       UI components (buttons, cart, product cards, forms, etc.)
  routes/           Page-level components (home, shop, checkout, authentication)
  store/            Redux slices for user, cart, and categories
  utils/            Firebase configuration and helper utilities
  contexts/         Legacy Context API files (superseded by Redux)

netlify/
  functions/        Serverless function for Stripe payment intent creation
```

## Getting Started

### Prerequisites

- Node.js (or Bun)
- A Firebase project with Authentication and Firestore enabled
- A Stripe account

### Environment Variables

Use `.env.example` as a reference. Copy it to `.env` and fill in your Firebase and client-side Razorpay values (no secrets).

```
# Firebase (client)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=000000000000
REACT_APP_FIREBASE_APP_ID=1:000000000000:web:xxxxxxxxxxxxxxxxxxxxxx

# Razorpay (client)
REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```

Payments integration (Stripe/Razorpay) is owned by a separate agent; this branch does not modify checkout/payment code.

### Run Locally

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Firestore Security Rules

This repo includes `firestore.rules`:

- Public read for `categories/*`
- Authenticated users can read/write their own `users/{uid}` and `users/{uid}/orders/*`

To deploy:

```bash
firebase login
firebase init firestore   # if not already initialized
firebase deploy --only firestore:rules
```

## Cart Persistence

The cart is persisted to `localStorage` (no redux-persist) to minimize dependencies. Clearing site data will reset the cart.

## Notes

- The `src/assests` directory name is intentionally left as-is to avoid broad refactors; references remain valid.
- A `bun.lock` is present; installing with npm is fine. Do not delete the lockfile.
