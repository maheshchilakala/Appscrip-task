# MUSE - Luxury Product Listing Page

A high-fidelity, production-ready luxury e-commerce application designed to deliver an elite shopping experience. This project features dynamic server-side rendering, advanced responsive layouts, and robust contextual state management.

## Tech Stack
- **Framework:** Next.js (SSR)
- **State Management:** React Context API
- **Styling:** Plain CSS (CSS Modules & Custom Properties)
- **Data Fetching:** FakeStoreAPI

## Features
- **Responsive Grid:** Hard-coded adaptive 5-column strict layouts scaling down gracefully to single-column mobile structures.
- **Dark/Light Mode:** Full DOM-persistent theming powered by Context and HTML Data-Attributes.
- **Live Search:** Real-time 300ms debounced search filtering seamlessly tied into the UX flow.
- **Cart & Wishlist Drawers:** Absolute Context-driven draw management orchestrating complex cross-component interactions (like "Move to Bag").
- **SEO Optimization:** HTML5 Semantics properly structured with native Server-Side Rendering (SSR).

## How to Run
To test and execute this application locally:

```bash
# Install the exact dependencies required in package.json
npm install

# Start the Next.js development server
npm run dev
```

Then navigate your browser to `http://localhost:3000`.

---
**Author:** Chalakala Mahesh (CSE Graduate)
