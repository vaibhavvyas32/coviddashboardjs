/** Colour tokens for the three headline figures. Each maps to a CSS variable defined in index.css. */
export const STAT_COLORS = {
  cases: "var(--cases)",
  recovered: "var(--recovered)",
  deaths: "var(--deaths)",
};

/** Metrics the map and the country ranking can be coloured and sorted by. */
export const MAP_METRICS = [
  { value: "casesPerOneMillion", label: "Cases per million", short: "Cases / 1M", color: STAT_COLORS.cases },
  { value: "deathsPerOneMillion", label: "Deaths per million", short: "Deaths / 1M", color: STAT_COLORS.deaths },
  { value: "cases", label: "Total cases", short: "Total cases", color: STAT_COLORS.cases },
];

export const getMapMetric = (value) => MAP_METRICS.find((metric) => metric.value === value) ?? MAP_METRICS[0];

/** Metrics the trend chart can show. */
export const TREND_METRICS = [
  { value: "cases", label: "Cases", color: STAT_COLORS.cases },
  { value: "deaths", label: "Deaths", color: STAT_COLORS.deaths },
];
