# COVID-19 Dashboard

COVID-19 cases, recoveries and deaths for every country, with daily history, a world map and rankings.
Light and dark themes, built mobile-first.

**Live:** [covid19-dashboardjs.netlify.app](https://covid19-dashboardjs.netlify.app/) · Made by [Vaibhav](https://vvyas.in)

## Features

- Worldwide and per-country totals for cases, recoveries and deaths, with per-million rates
- Searchable country picker
- Daily new cases or deaths as a 7-day average, with the peak day marked
- World map shaded by cases per million, deaths per million or total cases; click a country to select it
- Every country ranked by the same metric
- Light/dark theme that follows the system setting and remembers your choice

## Design

The palette comes from the microscope. Light mode uses histology stains (hematoxylin violet, methyl green,
eosin pink); dark mode uses fluorescence dyes (DAPI blue, GFP green, Texas red). Headings are set in
Bricolage Grotesque and body text in Atkinson Hyperlegible Next, a face designed for legibility.

## Run and build

```bash
npm install
npm start          # dev server
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Project structure

```
src/
  App.jsx              page layout and selected-country state
  Components/          dashboard sections (hero, stats, chart, map, ranking, header, footer)
  reactbits/           components from React Bits, kept as published
  hooks/               data fetching and theme
  lib/                 API client, formatting, chart and map helpers
  index.css            Tailwind setup and colour tokens
```

## Tech

- React 19 and Vite
- Tailwind CSS 4
- [React Bits](https://reactbits.dev): BlurText, Counter, DotGrid, RubberSegment, SquishSwitch
- Recharts, d3-geo and world-atlas for the chart and map
- Headless UI for the country picker
- Data from the [disease.sh](https://disease.sh) API (Worldometers totals, Johns Hopkins CSSE history)
