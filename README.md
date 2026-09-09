# NVILE — Opportunity Report Dashboard

The interactive prediction dashboard, on its own. This branch carries the
dashboard route and nothing else — the marketing site, its components and its
SEO/metadata routes are not part of it.

## Run it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root path redirects to
`/dashboard`, which is the only page in this build.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## What's here

```
src/
  app/
    dashboard/page.tsx      the only route
    layout.tsx              root layout, fonts, modal provider
    globals.css             Tailwind v4 theme tokens
  components/
    dashboard/
      DashboardShell.tsx    header, sidebar + content shell, holds tab state
      ReportSidebar.tsx     Contents tabs and the evidence mix box
      ReportDoc.tsx         title row, market/horizon controls, Verdict tab
      reportUi.tsx          Card, ClsMark, ClsTag, section labels
      panels/               one component per tab, 02 through 08
    HorizonPicker.tsx       30D / 6MO / 12MO / 3YR control
    ModalProvider.tsx       modal context used by the dashboard buttons
    RequestAccessModal.tsx  the modal those buttons open
  lib/
    marketsData.ts          markets, per-horizon stats, chart series, verdicts
    reportData.ts           tab 02–08 content
    dimensionsData.ts       BEAR / BASE / BULL scenario sets
    forecastData.ts         chart series helpers and the base series
    site.ts                 name, URL and metadata constants
```

## How the tabs work

`DashboardShell` owns the selected `SectionId`. `ReportSidebar` sets it,
`ReportDoc` renders exactly one section for it: the Verdict tab inline, and tabs
02–08 from `components/dashboard/panels/`. Only one section is mounted at a
time — the Contents list is a tab bar, not anchor links.

## Evidence classes

Every figure carries a class, and the class sets the mark printed beside it:

| Class      | Mark | Meaning                                        |
| ---------- | ---- | ---------------------------------------------- |
| VERIFIED   | ●    | Observed in a primary document                 |
| SIGNAL     | ◦    | Observed but indirect                          |
| ESTIMATE   | ◇    | Derived — the method ships with the number     |
| PREDICTION | ◈    | Model output — never stated without a band     |

The sidebar's evidence mix box prints `◍` for SIGNAL and `◆` for PREDICTION;
the report body uses `◦` and `◈` for those same two classes.

## Data

All data is static and lives in `src/lib/`. There is no API layer, database or
fetch in this build — swapping the modules in `src/lib/` for real sources is the
integration point.
