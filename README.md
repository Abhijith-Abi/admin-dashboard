<div align="center">
  <br />
  <h1>🚀 Next.js Admin Dashboard</h1>
  <p>
    <strong>A highly scalable, performant, and modern administrative interface built with Next.js 16.</strong>
  </p>
  <p>
    React 19 • Next.js 16 • Tailwind CSS v4 • Zustand • TanStack Query v5 • Lucide Icons
  </p>
</div>

<br />

## 📖 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Project Architecture](#-project-architecture)
- [State Management](#-state-management)
- [Error Handling](#-error-handling)
- [Performance Optimization](#-performance-optimization)
- [SEO & Accessibility](#-seo--accessibility)
- [Getting Started](#-getting-started)
- [Assumptions & Trade-offs](#-assumptions--trade-offs)

---

## 🌟 Overview
This project is an enterprise-grade Admin Dashboard designed to handle rich data tables, product directories, and user management. It is architected for scalability, prioritizing seamless user experiences, flawless responsiveness, and minimal bundle sizes via code-splitting, suspense boundaries, and lazy loading strategies. 

---

## ✨ Key Features
- **Dynamic Views:** Easily toggle between Grid and List views for flexible data visualization.
- **Debounced Global Search:** Real-time search optimized with local debouncing to prevent UI freezing or unnecessary API calls.
- **Virtualized Data Tables:** Powered by TanStack Virtual, enabling smooth 60fps scrolling even with massive datasets.
- **Dark/Light Mode:** Seamless theme transitions powered by `next-themes` and Tailwind CSS.
- **Robust Loading States:** Native React 19 Suspense boundaries paired with Skeleton loaders and Spinners to eliminate visually jarring layout shifts and provide smooth transitions.
- **Responsive Design:** A fully responsive UI that adapts flawlessly across mobile, tablet, and desktop viewports.

---

## 🏗 Project Architecture

### Feature-Centric File Structure
Instead of dumping all hooks and components into flat `hooks/` and `components/` folders, complex logic is encapsulated within feature domains (e.g., `features/users/`, `features/products/`). This isolation prevents deeply coupled modules, enabling independent scaling and simpler future maintenance.

```text
admin-dashboard/
├── app/                  # Next.js App Router setup
├── components/           # Global Shared and UI Components (Shadcn UI, Buttons, Spinners)
├── features/             # Feature-based encapsulated logic
│   ├── products/         # Product-specific components, hooks, api
│   └── users/            # User-specific components, hooks, api
├── services/             # Global API endpoints & fetch logic
├── store/                # Zustand global state configurations
└── ...
```

---

## ⛔ Error Handling
The application utilizes a robust, multi-layered error handling approach:
- **Global Error Boundaries:** `global-error.tsx` and `error.tsx` exist at the top level to catch catastrophic rendering errors securely without crashing the platform.
- **Query Error Boundaries:** For asynchronous data fetching, `@tanstack/react-query`'s `useSuspenseQuery` is wrapped with a custom `<QueryErrorBoundary>`.
- **Custom Error View:** Errors in specific widget blocks only crash their localized section (displaying an elegant `ApplicationError` prompt with retry functionality) keeping the rest of the application completely usable.

---

## 🗄 State Management 
This application takes a strictly hybrid approach to state management perfectly tailored for modern React:

- **Server-Side State (TanStack React Query):**  
  Owns all asynchronous API states (Users, Products). Handles caching, background polling, request deduplication, and refetching logic automatically.
  
- **Global Client State (Zustand):**  
  Owns strictly synchronous, app-wide UI settings such as `activeTab`, `viewMode`, and `selected` entities for modals.
  
- **Local Component State:**  
  Handles rapid interactions locally. E.g., The search bar manages keystrokes internally and passes them up only post-debounce to prevent React tree recalculations.

---

## ⚡ Performance Optimization
- **Code Splitting (Lazy Loading):** Huge UI components (Modals and heavy Tables) are dynamically imported via `next/dynamic`. They are deferred and only loaded over the network when invoked.
- **Re-render Prevention:** Extracted volatile state blocks. The global search logic is completely standalone, allowing the dashboard parent to bypass rapid unneeded re-renders.
- **DOM Virtualization:** Only the exact table rows currently visible inside the viewport are mounted into the browser's DOM, significantly boosting scroll performance.
- **Lighthouse Optimizations:** Consistently optimized image assets, caching policies, layout shifts (CLS), and time to interactive (TTI) resolving previous bottlenecks.

---

## 🛡 SEO & Accessibility
- **High-Quality Meta Tags & Open Graph Hooks:** Added dedicated configurations within `layout.tsx` for optimal web crawlers indexing and platform social sharing.
- **Icons & Favicons:** Custom global icons integrated seamlessly into the App Router.
- **Semantic HTML & ARIA:** Built heavily relying strictly on accessible web standards and robust UI accessibility structures. 

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed Node.js (v20.x or above) and `npm`.

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the development server**
   ```bash
   npm run dev
   ```
4. **Production Build**
   ```bash
   npm run build
   npm run start
   ```
   Open [http://localhost:3000](http://localhost:3000)

---

## 📌 Assumptions & Trade-offs
- **Heavy Client-Side Rendering (CSR):** Admin dashboards are heavily gated, highly interactive, private tools where raw SEO indexing on the internal data tables is largely irrelevant. Thus, maximizing instantaneous interactions via React Query cache-hits and CSR takes heavy priority over deep Server-Side Rendering (SSR).
- **REST Integrations:** Using standard REST structures. Processed efficiently without needing heavier GraphQL clients.
