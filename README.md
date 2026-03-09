# 🏠 Villa Buena E-Commerce

> A modern React-based e-commerce platform with shopping cart, checkout flow, and user account management.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)
[![Auth0](https://img.shields.io/badge/Auth0-Authentication-EB5424?logo=auth0)](https://auth0.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State-orange)](https://zustand-demo.pmnd.rs/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Documentation](#documentation)

---

## Overview

Villa Buena is a full-featured e-commerce frontend built with React and Vite. It includes product browsing with filtering and search, a persistent shopping cart, a multi-step checkout process, Auth0 authentication, and a user account section with order history.

---

## Features

- **Product Catalog** — Browse products with filtering, search, and sorting
- **Shopping Cart** — Persistent cart with real-time quantity management
- **Multi-step Checkout** — Shipping and payment forms with validation
- **Authentication** — Auth0-powered login with session persistence
- **User Accounts** — Profile page with editable shipping and payment info
- **Order History** — View past orders with full item detail and totals
- **Dark / Light Mode** — Theme toggle with persistent preference
- **Responsive Design** — Mobile-friendly layout built with Bootstrap

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| State Management | Zustand (with `persist` middleware) |
| Authentication | Auth0 (`@auth0/auth0-react`) |
| Server State | React Query |
| Styling | Bootstrap + custom CSS |
| Icons | Lucide React |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rafaelval/Villa-buena-ecommerce.git
cd Villa-buena-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the project (see [Environment Variables](#environment-variables)).

### 4. Start the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## Environment Variables

Create a `.env` file with the following variables:

```env
VITE_API_URL=https://your-api-url.com

VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
```

> Auth0 credentials can be found in your [Auth0 Dashboard](https://manage.auth0.com/). Make sure to add your local and production URLs to the **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins** in your Auth0 application settings.

---

## Project Structure

```
src/
├── components/
│   ├── checkoutStepper/     # Step indicator for checkout flow
│   ├── orderSummary/        # Cart summary used in checkout
│   ├── navbar/              # Sticky navbar with auth + cart
│   └── ...
├── pages/
│   ├── home/
│   ├── checkout/
│   │   ├── CheckoutShipping.jsx
│   │   └── CheckoutPayment.jsx
│   ├── account/             # AccountPage with editable user info
│   ├── orders/              # Order history
│   └── paymentSuccess/
├── store/
│   ├── useCartStore.js      # Cart state (Zustand)
│   ├── useUserStore.js      # Shipping, payment, orders (Zustand + persist)
│   └── uiStore.js           # Dark mode, cart drawer (Zustand)
├── services/
│   ├── api.js               # Axios base instance
│   ├── productService.js    # Product fetch functions
│   └── categoryService.js   # Category fetch functions
└── main.jsx                 # App entry point with Auth0Provider
```

---

## Architecture

### State Management

The app uses **Zustand** for all global state, split into three stores:

- **`useCartStore`** — Cart items and quantity management. Not persisted (cleared on checkout).
- **`useUserStore`** — Shipping info, payment info, and order history. Persisted to `localStorage` via Zustand's `persist` middleware under the key `user-checkout-storage`. Cleared on logout.
- **`uiStore`** — Dark mode toggle and cart drawer open/close state.

### Authentication

Auth0 handles all authentication. The `Auth0Provider` wraps the app in `main.jsx` with `cacheLocation="localstorage"` to persist sessions across page refreshes. On logout, `user-checkout-storage` is cleared from localStorage to prevent personal data from persisting between sessions.

### Checkout Flow

The checkout follows a 3-step flow:

1. **Cart** → Review items
2. **Shipping** → Enter name, address, and city (pre-filled from Auth0 if available)
3. **Payment** → Enter card details with client-side validation

The order is saved to `useUserStore` at the moment of payment (before the cart is cleared), then the user is redirected to a success page with the generated order ID.

### API Integration

Product and category data is fetched via **React Query** using service functions in `/services`. The base API URL is configured via the `VITE_API_URL` environment variable.

---

## Documentation

Full documentation is available at:

📖 **[rafaelval-villa-buena-ecommerce.mintlify.app](https://rafaelval-villa-buena-ecommerce.mintlify.app)**

Topics covered:
- Component library reference
- API integration guide
- Routing architecture
- Development setup
- Environment variables
- Building for production

---

## License

This project is for educational and portfolio purposes.