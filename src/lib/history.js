const AVERAGE_WINDOW = 7;

/**
 * Turns the API's cumulative timelines ({ "1/22/20": 555, ... }) into daily rows with
 * new cases and deaths plus their 7-day averages. Downward corrections in the source data
 * would show up as negative days, so those are clamped to zero.
 */
export function toDailySeries(timeline) {
  if (!timeline?.cases) return [];

  const dates = Object.keys(timeline.cases);
  const rows = dates.map((date, index) => {
    const previous = dates[index - 1];
    const newCases = previous ? timeline.cases[date] - timeline.cases[previous] : 0;
    const newDeaths = previous ? (timeline.deaths?.[date] ?? 0) - (timeline.deaths?.[previous] ?? 0) : 0;

    return {
      date: new Date(date).getTime(),
      cases: Math.max(0, newCases),
      deaths: Math.max(0, newDeaths),
    };
  });

  return rows.map((row, index) => {
    const window = rows.slice(Math.max(0, index - AVERAGE_WINDOW + 1), index + 1);
    const average = (key) => window.reduce((sum, item) => sum + item[key], 0) / window.length;

    return { ...row, casesAverage: average("cases"), deathsAverage: average("deaths") };
  });
}

/** The day with the highest 7-day average for a metric. */
export function findPeak(series, key) {
  return series.reduce((peak, row) => (!peak || row[key] > peak[key] ? row : peak), null);
}
