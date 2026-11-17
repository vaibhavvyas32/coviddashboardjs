import { useMemo } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldTopology from "world-atlas/countries-110m.json";
import { formatCompact } from "../lib/format";

const WIDTH = 960;
const HEIGHT = 470;
const BIN_OPACITY = [0.14, 0.28, 0.44, 0.6, 0.78, 1];

// Country outlines are projected once at module load; only their fill changes afterwards.
const features = feature(worldTopology, worldTopology.objects.countries).features.filter(
  (shape) => shape.properties.name !== "Antarctica",
);
const projection = geoEqualEarth().fitSize([WIDTH, HEIGHT], { type: "FeatureCollection", features });
const toPath = geoPath(projection);
const SHAPES = features.map((shape) => ({ id: Number(shape.id), name: shape.properties.name, d: toPath(shape) }));

/** Splits values into six equal-sized groups (quantiles), so colour shows rank rather than raw size. */
function quantileBreaks(values) {
  const sorted = values.filter((value) => value > 0).sort((a, b) => a - b);
  if (sorted.length === 0) return [];
  return BIN_OPACITY.slice(1).map((_, index) => sorted[Math.floor(((index + 1) / BIN_OPACITY.length) * sorted.length)]);
}

const binFor = (value, breaks) => breaks.filter((limit) => value >= limit).length;

/** Choropleth of the chosen metric. Hovering or tapping a country reports it; clicking selects it. */
export default function WorldMap({ countries, metric, selected, hovered, onHover, onSelect }) {
  const byNumericId = useMemo(
    () => new Map(countries.filter((item) => item.countryInfo?._id).map((item) => [item.countryInfo._id, item])),
    [countries],
  );
  const breaks = useMemo(() => quantileBreaks(countries.map((item) => item[metric.value])), [countries, metric.value]);

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`World map shaded by ${metric.label.toLowerCase()}. Use the country list for exact figures.`}
        className="h-auto w-full touch-manipulation"
        onPointerLeave={() => onHover(null)}
      >
        {SHAPES.map((shape) => {
          const country = byNumericId.get(shape.id);
          const value = country?.[metric.value];
          const hasData = value > 0;
          const isSelected = country && selected?.country === country.country;
          const isHovered = country && hovered?.country === country.country;

          return (
            <path
              key={`${shape.id}-${shape.name}`}
              d={shape.d}
              fill={hasData ? metric.color : "var(--line)"}
              fillOpacity={hasData ? BIN_OPACITY[binFor(value, breaks)] : 1}
              stroke={isSelected || isHovered ? "var(--ink)" : "var(--surface)"}
              strokeWidth={isSelected ? 1.6 : isHovered ? 1.2 : 0.5}
              className={`transition-[fill-opacity] duration-300 ${country ? "cursor-pointer" : ""}`}
              onPointerEnter={() => country && onHover(country)}
              onClick={() => country && onSelect(country)}
            />
          );
        })}
      </svg>

      <MapLegend metric={metric} breaks={breaks} />
    </div>
  );
}

function MapLegend({ metric, breaks }) {
  if (breaks.length === 0) return null;

  return (
    <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3 text-xs text-muted">
      <figure>
        <figcaption className="mb-1.5">{metric.label}</figcaption>
        <svg viewBox="0 0 240 10" className="h-2.5 w-60 max-w-full" aria-hidden="true">
          {BIN_OPACITY.map((opacity, index) => (
            <rect
              key={opacity}
              x={index * 40}
              width="39"
              height="10"
              rx="1"
              fill={metric.color}
              fillOpacity={opacity}
            />
          ))}
        </svg>
        <div className="mt-1 flex w-60 max-w-full justify-between tabular-nums">
          <span>Under {formatCompact(breaks[0])}</span>
          <span>{formatCompact(breaks.at(-1))} and up</span>
        </div>
      </figure>
      <span className="flex items-center gap-1.5 pb-4">
        <span aria-hidden="true" className="size-2.5 rounded-sm bg-line" />
        No data
      </span>
    </div>
  );
}
