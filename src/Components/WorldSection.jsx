import { useState } from "react";
import { formatNumber } from "../lib/format";
import { getMapMetric, MAP_METRICS } from "../lib/metrics";
import CountryRanking from "./CountryRanking";
import Panel from "./Panel";
import SegmentedControl from "./SegmentedControl";
import WorldMap from "./WorldMap";

function MapReadout({ country, metric }) {
  if (!country) {
    return (
      <p className="text-sm text-muted">Point at or tap a country to see its figure, and click it to select it.</p>
    );
  }

  return (
    <p className="flex flex-wrap items-baseline gap-x-2 text-sm" aria-live="polite">
      <span className="font-semibold">{country.country}</span>
      <span className="font-display text-base font-semibold tabular-nums">{formatNumber(country[metric.value])}</span>
      <span className="text-muted">{metric.label.toLowerCase()}</span>
    </p>
  );
}

/** The world map and the ranked country list, driven by one shared metric. */
export default function WorldSection({ countries, selected, onSelect }) {
  const [metricValue, setMetricValue] = useState(MAP_METRICS[0].value);
  const [hovered, setHovered] = useState(null);
  const metric = getMapMetric(metricValue);

  return (
    <Panel
      id="world"
      title="Around the world"
      description="Per-million rates make small and large countries comparable. Total cases show where the most people were infected."
      actions={
        <SegmentedControl
          label="Map metric"
          size="sm"
          items={MAP_METRICS.map(({ value, short }) => ({ value, label: short }))}
          value={metricValue}
          onChange={setMetricValue}
        />
      }
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <div className="mb-4 min-h-6">
            <MapReadout country={hovered ?? selected} metric={metric} />
          </div>
          <WorldMap
            countries={countries}
            metric={metric}
            selected={selected}
            hovered={hovered}
            onHover={setHovered}
            onSelect={onSelect}
          />
        </div>
        <CountryRanking
          countries={countries}
          metric={metric}
          selected={selected}
          onSelect={onSelect}
          onHover={setHovered}
        />
      </div>
    </Panel>
  );
}
