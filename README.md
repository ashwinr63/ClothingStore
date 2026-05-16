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
| Payments         | Stripe                               |
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

```
REACT_APP_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
```

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
