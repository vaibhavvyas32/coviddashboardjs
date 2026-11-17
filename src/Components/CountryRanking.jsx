import { useEffect, useMemo, useRef } from "react";
import { formatNumber } from "../lib/format";

/** Every country ranked by the chosen metric. The selected country is highlighted and scrolled into view. */
export default function CountryRanking({ countries, metric, selected, onSelect, onHover }) {
  const listRef = useRef(null);

  const ranked = useMemo(
    () => countries.filter((item) => item[metric.value] > 0).sort((a, b) => b[metric.value] - a[metric.value]),
    [countries, metric.value],
  );
  const highest = ranked[0]?.[metric.value] ?? 1;

  useEffect(() => {
    if (!selected) return;
    const row = listRef.current?.querySelector(`[data-country="${CSS.escape(selected.country)}"]`);
    row?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selected, metric.value]);

  return (
    <div className="flex h-full flex-col">
      <p className="text-sm text-muted">{ranked.length} countries, highest first</p>
      <ol
        ref={listRef}
        aria-label={`Countries ranked by ${metric.label.toLowerCase()}`}
        className="mt-3 max-h-96 flex-1 space-y-0.5 overflow-y-auto overscroll-contain pr-1 lg:max-h-[30rem]"
        onPointerLeave={() => onHover(null)}
      >
        {ranked.map((country, index) => {
          const isSelected = selected?.country === country.country;
          const value = country[metric.value];

          return (
            <li key={country.country} data-country={country.country}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(isSelected ? null : country)}
                onPointerEnter={() => onHover(country)}
                onFocus={() => onHover(country)}
                className={`grid w-full grid-cols-[2rem_22px_1fr_auto] items-center gap-x-3 rounded-xl px-2.5 py-2 text-left text-sm transition-colors hover:bg-paper ${
                  isSelected ? "bg-paper ring-1 ring-ink" : ""
                }`}
              >
                <span className="text-xs text-muted tabular-nums">{index + 1}</span>
                <img
                  src={country.countryInfo.flag}
                  alt=""
                  width={22}
                  height={16}
                  loading="lazy"
                  className="h-4 w-[22px] rounded-[3px] object-cover ring-1 ring-line"
                />
                <span className="truncate font-medium">{country.country}</span>
                <span className="font-display font-semibold tabular-nums">{formatNumber(value)}</span>
                <span
                  aria-hidden="true"
                  className="col-start-3 col-end-5 mt-1.5 h-1 overflow-hidden rounded-full bg-line"
                >
                  <svg viewBox="0 0 100 1" preserveAspectRatio="none" className="block h-full w-full">
                    <rect width={(value / highest) * 100} height="1" fill={metric.color} />
                  </svg>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
