# iTunes Search App (Podcasts Explorer)

A modern, responsive web app for discovering and exploring podcasts and episodes, built with Next.js, React, and Tailwind CSS.

[See Solution Document](./PROBLEM_SOLUTION.md)

> **Brief:** This document outlines the problem statement, solution approach, main challenges, and suggestions for the podcast search feature. It details the component structure, custom hooks, API integration, and discusses difficulties like API rate limiting and UI state management, along with ideas for further improvements.

---

## 🚀 Installation & Running the App

1. **Install dependencies:**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🗂️ App Structure Preview

```
src/
  app/
    layout.tsx         # Root layout with providers and layout structure
    page.tsx           # Main page (TopPodcasts & TopEpisodes)
    globals.css        # Global styles (Tailwind)
  components/
    Spinner.tsx        # Loading spinner
  home/
    TopPodcasts.tsx    # Podcasts section with search & layout switch
    TopEpisodes.tsx    # Episodes section with search & layout switch
    shared/
      card-menu.tsx    # Context menu for cards
      scroll-navigation.tsx # Horizontal scroll navigation
  layout/
    SideNav.tsx        # Responsive sidebar navigation
    Topbar.tsx         # Top navigation bar with search
    useSideNav.tsx     # SideNav state management
    SideNavIcon.tsx    # Icon for sidebar
    SideNavSectionTitle.tsx # Section title for sidebar
  hooks/
    useITunesSearch.tsx # Podcast & episode search (iTunes API)
  types/
    itunes-search.ts   # Type definitions for search results
```

---

## 🌐 Preview

> **Live Preview:** [https://itunes-search-task.vercel.app/](https://itunes-search-task.vercel.app/)

---

## 📦 Used Libraries

- [Next.js](https://nextjs.org/) (v15)
- [React](https://react.dev/) (v19)
- [Tailwind CSS](https://tailwindcss.com/) (v4)
- [Lucide React](https://lucide.dev/icons/) (icons)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📝 Quick Review

Podbay is a sleek, modern podcast explorer webapp. It features:

- **Podcast & Episode Search:**
  - Real-time search powered by the iTunes Search API.
  - Results are displayed in visually rich cards with artwork, titles, and artist info.
- **TopPodcasts & TopEpisodes Sections:**
  - Switch between scroll, grid, and compact layouts for browsing.
  - Context menus for each card (add, go to, share, hide, etc.).
- **Responsive Layout:**
  - Sidebar navigation (collapsible on mobile), topbar with search and menu.
  - Fully responsive and mobile-friendly design.
- **Modern UI/UX:**
  - Custom theming, smooth transitions, and interactive elements.
  - Custom scrollbar, animated spinner, and clean card menus.
- **Tech Stack:**
  - Built with Next.js App Router, React 19, Tailwind CSS 4, and TypeScript.

> **Ideal for:** Podcast enthusiasts who want a fast, beautiful, and intuitive way to discover and explore podcasts and episodes.

---

## 📄 License

MIT
