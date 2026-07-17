# Portfolio Dashboard

A responsive finance dashboard built to showcase frontend development skills, featuring interactive charts, sortable data tables, and dark mode support.

## Live Demo

[finance-dashboard-mu-green.vercel.app](https://finance-dashboard-mu-green.vercel.app)

## Features

- Interactive portfolio value chart (line chart with tooltips)
- Sector allocation breakdown (pie chart)
- Sortable holdings table (by symbol, shares, price, gain/loss)
- Dark mode toggle
- Fully responsive (mobile, tablet, desktop)
- Loading skeleton states and error handling

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Charts:** Recharts
- **State Management:** Zustand
- **Data:** Mock data served via Next.js API Routes

## Getting Started

Clone the repository:

    git clone https://github.com/afraalmaci/finance-dashboard.git
    cd finance-dashboard

Install dependencies:

    npm install

Run the development server:

    npm run dev

Open http://localhost:3000 in your browser.

## Project Structure

    src/
      app/
        api/
          dashboard-data/
            route.ts              # mock data API endpoint
        layout.tsx                 # root layout with theme provider
        page.tsx                   # main dashboard page
        globals.css                # global styles and Tailwind setup
      components/
        portfolio-chart.tsx        # portfolio value line chart
        sector-allocation-chart.tsx # sector allocation pie chart
        holdings-table.tsx         # sortable holdings table
        dashboard-skeleton.tsx     # loading skeleton UI
        theme-provider.tsx         # dark mode sync with Zustand store
      lib/
        mock-data.ts                # mock portfolio data generator
        use-dashboard-data.ts       # custom data-fetching hook
      store/
        dashboard-store.ts          # Zustand global state (filters, dark mode)
      types/
        portfolio.ts                # TypeScript interfaces

## Notes

This project uses mock data generated on the server (via a Next.js API route) rather than a live financial API, so it can be run and demoed without requiring API keys or external dependencies.

## License

MIT