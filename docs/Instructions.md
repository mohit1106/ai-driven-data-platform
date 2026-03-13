Bharat-Insight

AI-Driven Government Data Analytics Platform

1. Project Objective

Build a professional multi-tenant analytics platform that visualizes Indian public datasets and provides AI-generated insights.

The project demonstrates:

high-performance frontend architecture

large dataset visualization

AI-assisted analytics

modern UI/UX design

scalable component design

The application is frontend-only and fetches data directly from public APIs.

2. Technology Stack

Framework

Next.js (App Router)

TypeScript

Styling

Tailwind CSS

Framer Motion

State

Zustand

TanStack Query

Data Grid

TanStack Table

TanStack Virtual

AI

Google Gemini

Typography

Inter / Geist

3. System Architecture

Application Flow

Landing Page
      ↓
Department Selection
      ↓
Analytics Dashboard
      ↓
Data Grid + Filters
      ↓
Client-Side Analytics Engine
      ↓
AI Insight Panel

Data Flow

data.gov.in API
        ↓
TanStack Query
        ↓
Server Pagination
        ↓
Analytics Engine
        ↓
TanStack Table
        ↓
Virtualized Rendering
        ↓
Gemini AI Insights
4. Project Folder Structure
bharat-insight/
│
├ app/
│ ├ layout.tsx
│ ├ page.tsx
│ ├ dashboard/
│ │ ├ page.tsx
│
├ components/
│ ├ landing/
│ │ hero.tsx
│ │ bento-grid.tsx
│ │ features.tsx
│ │ stats-preview.tsx
│ │
│ ├ dashboard/
│ │ data-table.tsx
│ │ pagination.tsx
│ │ filter-bar.tsx
│ │ tenant-switcher.tsx
│ │ insight-panel.tsx
│ │ analytics-cards.tsx
│ │ ai-query-bar.tsx
│
├ features/
│ ├ ai/
│ │ gemini-client.ts
│ │ insight-generator.ts
│ │ query-parser.ts
│
│ ├ analytics/
│ │ summary-engine.ts
│ │ aggregation.ts
│
│ ├ datasets/
│ │ dataset-config.ts
│ │ dataset-schema.ts
│
├ hooks/
│ ├ use-dataset.ts
│ ├ use-pagination.ts
│
├ services/
│ ├ api-client.ts
│ ├ dataset-service.ts
│
├ stores/
│ ├ tenant-store.ts
│ ├ ui-store.ts
│
├ utils/
│ ├ build-query.ts
│ ├ statistics.ts
│
├ types/
│ ├ dataset.ts
│
├ public/
│
└ README.md
5. Landing Page Requirements

Design Style

dark mode UI

soft gradients

glass cards

minimalist typography

Sections

1 Hero Section
2 Bento Grid Feature Section
3 Analytics Preview
4 Call to Action

6. Hero Section

The hero demonstrates platform capabilities using three live components.

Components

1 Animated Chart
2 AI Streaming Insight Demo
3 Real-Time Data Ticker

Animations

Framer Motion
scroll reveal
fade + translate
staggered animations

Goal

Create a high-conversion SaaS-style landing page.

7. Bento Grid Section

Grid layout presenting product features.

Example cards

AI-Driven Insights

Multi-Tenant Architecture

Government Open Data Integration

High-Performance Data Grid

Natural Language Queries

Command Palette Navigation

8. Dashboard Layout
Navbar
Tenant Switcher
Command Palette
────────────────────────

Filters

────────────────────────

Analytics Cards

────────────────────────

Data Grid

────────────────────────

AI Insight Panel
9. Multi-Tenant Architecture

Each department acts as a tenant.

Example configuration

export const datasets = {
 petroleum: {
   datasetId: "8d3b6596-b09e-4077-aebf-425193185a5b",
   name: "Petroleum Processing",
   theme: "orange"
 },
 finance: {
   datasetId: "finance_dataset",
   name: "Public Procurement",
   theme: "green"
 }
}

Switching tenant updates

dataset

theme

icons

AI context

No page reload.

10. API Integration

Endpoint

GET https://api.data.gov.in/resource/{dataset_id}

Parameters

api-key
format=json
limit
offset
filters[field]

Example

/resource/{dataset}
?api-key=KEY
&format=json
&limit=100
&offset=200
11. Pagination Strategy

Use server-side pagination.

Logic

offset = page * limit
limit = 100

Example

Page	Offset
0	0
1	100
2	200
12. Data Fetching

Using TanStack Query

useQuery({
 queryKey: ["dataset", tenant, page, filters],
 queryFn: fetchDataset
})

Cache strategy

staleTime: 5 minutes
13. Dynamic Table Schema

API provides metadata:

field:
 name
 id
 type

Columns generated dynamically.

Example

fields.map(field => ({
 header: field.name,
 accessorKey: field.id
}))

This allows switching datasets without rewriting the table.

14. High Performance Data Grid

Libraries

TanStack Table
+
TanStack Virtual

Features

sticky headers

column sorting

fuzzy search

column filtering

keyboard navigation

pinned columns

row editing (admin)

15. Virtualized Rendering

Only visible rows render.

Example

dataset size: 100000 rows
rows rendered: ~30

Ensures smooth performance.

16. Filtering System

Use API filters.

Example

filters[year]=2022
filters[_month_]=October

Filters update the query automatically.

17. Role System

Roles simulated in UI.

Toggle

Viewer
Admin

Permissions

Viewer

view data

filter

AI insights

Admin

edit rows

delete rows

export dataset

Stored in Zustand state.

18. Client-Side Analytics Engine (Upgrade)

A lightweight analytics module computes insights directly in the browser.

Functions

mean
median
min
max
distribution
top categories
trend detection

Example

summarizeDataset(rows) {
 return {
   mean: mean(rows),
   max: max(rows),
   min: min(rows),
   topCategories: topK(rows)
 }
}

Displayed in analytics cards above the table.

Example cards

Average production
Maximum refinery output
Top producing company
Trend indicator

This transforms the dashboard into an analytics platform rather than just a table viewer.

19. AI Natural Language Query Interface (Upgrade)

Users can query the dataset using natural language.

Example prompts

Show refinery output for October 2022
Which company has highest production?
Compare IOCL vs BPCL output

Process

User prompt
      ↓
Gemini parses intent
      ↓
Extract filters
      ↓
Apply filters to dataset
      ↓
Return insights

Example transformation

Prompt

Show refinery output for October 2022

Parsed filters

month = October
year = 2022

The dashboard automatically updates.

20. AI Insight Panel

Generates insights from filtered data.

Workflow

active filters
      ↓
dataset sample
      ↓
summary statistics
      ↓
Gemini prompt
      ↓
stream response
21. Gemini Prompt Template
You are a data analyst.

Dataset: {dataset_name}

Filters applied:
{filters}

Summary statistics:
{summary}

Sample rows:
{rows}

Provide key insights and trends.
22. Streaming AI Response

Show progressive AI output.

States

Thinking...
Analyzing dataset...
Generating insights...

Then stream tokens.

23. Command Palette

Shortcut

Ctrl + K

Actions

Switch department
Search dataset
Open dashboard
Toggle role
Open AI insights
24. Loading States

Use skeleton loaders for

table

dashboard

AI panel

25. Performance Targets
Lighthouse ≥ 95
CLS = 0

Optimization techniques

Next.js image optimization

font preloading

lazy motion imports

virtualization

query caching

26. Responsiveness

Landing Page

mobile
tablet
desktop

Dashboard

tablet
desktop

Table scrolls horizontally on small screens.

27. README Requirements

The README must explain

Data Handling

API pagination

server filters

caching

Virtualization

TanStack Virtual

performance benefits

Multi-Tenancy

dataset switching

theme updates

Client-Side Analytics Engine

statistical computation

dashboard summaries

AI Prompt Design

summarization

natural language queries

UI Standards

dark mode

motion animations

skeleton loading

Final Outcome

The completed platform demonstrates

scalable frontend architecture

modern analytics UI

AI-assisted data exploration

large dataset visualization

production-quality design

The result should feel like a real analytics SaaS platform prototype, not just a UI assignment.