import { lazy, Suspense, useState } from "react";
import { useCovidSummary, useDailyHistory } from "./hooks/useCovidData";
import { useTheme } from "./hooks/useTheme";
import Hero from "./Components/Hero";
import SiteFooter from "./Components/SiteFooter";
import SiteHeader from "./Components/SiteHeader";
import StatStrip from "./Components/StatStrip";

// The chart library and the world map outlines are the heaviest parts of the page, so they load separately.
const TrendChart = lazy(() => import("./Components/TrendChart"));
const WorldSection = lazy(() => import("./Components/WorldSection"));

const SectionFallback = () => <div className="h-96 animate-pulse rounded-3xl bg-surface" />;

export default function App() {
  const { isDark, setTheme } = useTheme();
  const { status, world, countries, retry } = useCovidSummary();
  const [selected, setSelected] = useState(null); // a country from the list, or null for worldwide
  const history = useDailyHistory(selected?.countryInfo?.iso3);

  const placeName = selected?.country ?? "the world";
  const totals = selected ?? world;

  return (
    <div className="overflow-x-clip">
      <SiteHeader isDark={isDark} onThemeChange={(dark) => setTheme(dark ? "dark" : "light")} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Hero
          isDark={isDark}
          countries={countries}
          selected={selected}
          onSelect={setSelected}
          updatedAt={totals?.updated}
          status={status}
        />

        {status === "error" ? (
          <div role="alert" className="rounded-3xl border border-line bg-surface p-8 text-center">
            <p className="font-display text-xl font-semibold">The figures didn’t load.</p>
            <p className="mt-2 text-muted">The disease.sh API didn’t respond. Check your connection, then try again.</p>
            <button
              type="button"
              onClick={retry}
              className="mt-5 rounded-full bg-ink px-5 py-2.5 font-semibold text-paper transition-opacity hover:opacity-85"
            >
              Try again
            </button>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            <StatStrip data={totals} />
            <Suspense fallback={<SectionFallback />}>
              <TrendChart placeName={placeName} history={history} />
            </Suspense>
            {status === "ready" && (
              <Suspense fallback={<SectionFallback />}>
                <WorldSection countries={countries} selected={selected} onSelect={setSelected} />
              </Suspense>
            )}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
