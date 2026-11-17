import { useCallback, useEffect, useState } from "react";
import { fetchCountries, fetchHistory, fetchWorldSummary } from "../lib/api";
import { toDailySeries } from "../lib/history";

/** Worldwide totals plus the full country list. */
export function useCovidSummary() {
  const [state, setState] = useState({ status: "loading", world: null, countries: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, status: "loading" }));

    Promise.all([fetchWorldSummary({ signal: controller.signal }), fetchCountries({ signal: controller.signal })])
      .then(([world, countries]) => {
        const sorted = [...countries].sort((a, b) => a.country.localeCompare(b.country));
        setState({ status: "ready", world, countries: sorted });
      })
      .catch((error) => {
        if (error.name !== "AbortError") setState((current) => ({ ...current, status: "error" }));
      });

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  return { ...state, retry };
}

/** Daily new cases and deaths for the world (no iso3) or a single country. */
export function useDailyHistory(iso3) {
  const [state, setState] = useState({ status: "loading", series: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading", series: [] });

    fetchHistory(iso3, { signal: controller.signal })
      .then((timeline) => setState({ status: "ready", series: toDailySeries(timeline) }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        // The history source doesn't cover every country; a 404 means "no history", not a failure.
        setState({ status: error.status === 404 ? "empty" : "error", series: [] });
      });

    return () => controller.abort();
  }, [iso3, attempt]);

  const retry = useCallback(() => setAttempt((count) => count + 1), []);

  return { ...state, retry };
}
