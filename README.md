# Bharat Insight

> AI-Driven Government Data Analytics Platform

A production-quality analytics platform that visualizes Indian government datasets from [data.gov.in](https://data.gov.in) with AI-powered insights using Google Gemini. Built with Next.js 15, TanStack Query/Table/Virtual, Zustand, and Recharts.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?logo=tailwindcss) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **Multi-Tenant Architecture** — Switch between 4 government departments seamlessly; each gets its own data, theme, and analytics context
- **Live Government Data** — Direct integration with data.gov.in REST APIs for petroleum, procurement, and production datasets
- **AI-Powered Insights** — Google Gemini generates streaming analytics insights from your filtered data
- **Natural Language Queries** — Ask questions like "Show October 2022 output" and the dashboard auto-applies filters
- **High-Performance Data Grid** — TanStack Table + TanStack Virtual renders 100K+ rows with sorting, search, and column filtering
- **Client-Side Analytics Engine** — Computes mean, median, min, max, trend direction, and top categories in the browser
- **Command Palette** — Ctrl+K to search, switch datasets, toggle roles, and trigger AI insights
- **Role-Based Access** — Toggle between Viewer and Admin roles (admin gets inline editing, row deletion, CSV export)
- **Beautiful Dark UI** — Glassmorphism cards, smooth animations, gradient accents, and responsive design

---

## 🛠 Tech Stack

| Category       | Technology                              |
| -------------- | --------------------------------------- |
| Framework      | Next.js 15 (App Router) + TypeScript    |
| Styling        | Tailwind CSS v4 + Framer Motion         |
| State          | Zustand + TanStack Query v5             |
| Data Grid      | TanStack Table v8 + TanStack Virtual v3 |
| Charts         | Recharts                                |
| AI             | Google Gemini (`@google/generative-ai`) |
| Command Palette| cmdk                                    |
| Icons          | Lucide React                            |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd ai-driven-data-platform

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
```

### Environment Variables

```env
# Required: data.gov.in API key (sample key provided)
NEXT_PUBLIC_DATA_GOV_API_KEY=579b464db66ec23bdd00000100ff4c7e078a466a78de52d8ccde236f

# Optional: Google Gemini API key (for AI features)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key_here
```

> **Note**: The sample data.gov.in key returns max 10 records. Generate your own at [data.gov.in](https://data.gov.in) for full data access.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the landing page loads instantly.

Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to explore the analytics dashboard.

---

## 📐 Architecture

### Application Flow

```
Landing Page → Department Selection → Analytics Dashboard → Data Grid + Filters → AI Insights
```

### Data Flow

```
data.gov.in API
       ↓
TanStack Query (cached, paginated)
       ↓
Client-Side Analytics Engine
       ↓
TanStack Table + Virtual (sorted, filtered)
       ↓
Recharts Visualizations
       ↓
Gemini AI Insights (streaming)
```

### Folder Structure

```
├── app/
│   ├── layout.tsx              # Root layout: providers, fonts, metadata
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Design system
│   ├── api/dataset/route.ts    # CORS proxy for data.gov.in
│   └── dashboard/
│       ├── layout.tsx          # Dashboard shell
│       └── page.tsx            # Dashboard page
├── components/
│   ├── landing/                # Hero, BentoGrid, AnalyticsPreview, CTA
│   ├── dashboard/              # DataTable, Charts, Filters, AI panels
│   └── providers/              # QueryClient provider
├── lib/
│   ├── api/client.ts           # data.gov.in API client
│   ├── datasets/registry.ts    # 4 dataset configurations
│   ├── analytics/              # Statistics + analytics engine
│   ├── ai/                     # Gemini client, prompts, NL parser
│   └── utils/                  # cn(), format helpers
├── hooks/                      # useDataset, useDebounce
├── stores/                     # Zustand: tenant, UI state
└── types/                      # TypeScript interfaces
```

---

## 📊 Data Handling

### API Integration

The platform connects to data.gov.in's REST API:

```
GET https://api.data.gov.in/resource/{dataset_id}
  ?api-key=KEY
  &format=json
  &limit=100
  &offset=200
  &filters[year]=2022
  &filters[_month_]=October
```

### Server Pagination

```
offset = page × 100
```

TanStack Query caches each page independently with a 5-minute stale time and uses `keepPreviousData` for seamless page transitions.

### Dynamic Schema

Columns are auto-generated from the API's `field[]` metadata — no hardcoded table structures. Switching datasets automatically reconfigures the entire table.

---

## 📈 Datasets

| Dataset                     | Records | Fields                             |
| --------------------------- | ------- | ---------------------------------- |
| Crude Oil Processing        | ~1,392  | Month, Year, Oil Companies, Qty    |
| Petroleum Products          | ~360    | Month, Year, Products, Qty         |
| Indigenous Crude Production | ~168    | Month, Year, Company, Qty          |
| Public Procurement (Assam)  | ~6,590  | 30+ fields (tenders, buyers, etc.) |

---

## 🔬 Virtualization

TanStack Virtual ensures only **~30 rows** are rendered at any time, regardless of dataset size. This enables smooth 60fps scrolling through datasets of 100K+ rows.

---

## 🧮 Client-Side Analytics

The analytics engine (`lib/analytics/`) computes in the browser:

- **Mean, Median, Min, Max** — for all numeric fields
- **Top K Categories** — most frequent values in category fields
- **Trend Direction** — linear regression slope analysis (up/down/stable)
- **Distribution** — value spread and standard deviation

Results display as analytics cards above the data table.

---

## 🤖 AI Integration

### Insight Panel

When enabled, Gemini receives:
- Dataset metadata and department context
- Current filter state
- Summary statistics (computed client-side)
- First 15 sample rows

Response streams in real-time with progressive status: *Thinking → Analyzing → Streaming*.

### Natural Language Queries

Type questions like:
- *"Show refinery output for October 2022"*
- *"Which company has the highest production?"*

Gemini extracts structured filters (`{ year: "2022", _month_: "October" }`) and applies them to the dashboard automatically.

---

## 🎨 UI Design

- **Dark Mode** — Full dark theme with `#09090b` background
- **Glassmorphism** — Cards with `backdrop-blur` and subtle borders
- **Framer Motion** — Scroll reveal, stagger, fade, and spring animations
- **Gradient Accents** — Each dataset has a unique color theme
- **Skeleton Loaders** — Shimmer animation for all loading states
- **Responsive** — Landing page: mobile → desktop; Dashboard: tablet → desktop

---

## ⌨ Keyboard Shortcuts

| Shortcut | Action              |
| -------- | ------------------- |
| Ctrl+K   | Open command palette |
| ↑↓       | Navigate commands    |
| Enter    | Select command       |
| Escape   | Close palette        |

---

## 📝 License

MIT
