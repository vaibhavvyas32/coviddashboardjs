const BASE_URL = "https://disease.sh/v3/covid-19";

async function getJson(path, { signal } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, { signal });
  if (!response.ok) {
    const error = new Error(`Request to ${path} failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

/** Worldwide totals (Worldometers). */
export const fetchWorldSummary = (options) => getJson("/all", options);

/** Totals for every country (Worldometers). */
export const fetchCountries = (options) => getJson("/countries", options);

/** Cumulative daily history (Johns Hopkins CSSE) for the world or one country. */
export async function fetchHistory(iso3, options) {
  if (!iso3) return getJson("/historical/all?lastdays=all", options);

  const data = await getJson(`/historical/${iso3}?lastdays=all`, options);
  return data.timeline;
}
