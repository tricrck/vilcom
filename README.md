# Vilcom Networks — Website

A modern, production-ready recreation of the [Vilcom Networks](https://vilcom.co.ke) website, built with React, TypeScript, and Tailwind CSS.

## What's Inside

This project includes fully designed and functional pages:

- **Gallery** — Masonry photo grid with lightbox viewer
- **Blog** — Live posts pulled from the Vilcom WordPress API, with pagination and a sidebar
- **FAQs** — Accordion-style questions grouped by category, plus an embedded speed test
- **Certifications** — Interactive certification links list with hover image previews
- **Contact** — Message form, contact details roadmap, and an embedded map

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:8080`

## Adding a New Page

Pages are routed by slug via `TemplatePage`. To replace a template with a real design:

1. Create your page component in `src/pages/`
2. Add a specific route **above** the `/:slug` catch-all in your router:
   ```tsx
   <Route path="/your-page" element={<YourPage />} />
   ```

## Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **WordPress REST API** for live blog content

## Live Reference

Original site: [vilcom.co.ke](https://vilcom.co.ke)
