import { useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Area, AreaChart, CartesianGrid, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { findPeak } from "../lib/history";
import { formatCompact, formatDate, formatNumber } from "../lib/format";
import { TREND_METRICS } from "../lib/metrics";
import Panel from "./Panel";
import SegmentedControl from "./SegmentedControl";

const AXIS_TICK = { fill: "var(--muted)", fontSize: 12 };

/** The first day of the series, then 1 January of each later year, so the axis reads as a calendar. */
function yearTicks(series) {
  if (series.length === 0) return [];
  const start = series[0].date;
  const firstYear = new Date(start).getFullYear();
  const lastYear = new Date(series.at(-1).date).getFullYear();
  const newYears = Array.from({ length: lastYear - firstYear }, (_, index) =>
    new Date(firstYear + index + 1, 0, 1).getTime(),
  );
  return [start, ...newYears];
}

/** Four evenly spaced round-number ticks (0, 1M, 2M, 3M…) covering the highest value. */
function niceTicks(max) {
  if (!max) return [0];
  const roughStep = max / 4;
  const magnitude = 10 ** Math.floor(Math.log10(roughStep));
  const step = [1, 2, 2.5, 5, 10].map((factor) => factor * magnitude).find((candidate) => candidate >= roughStep);
  return Array.from({ length: Math.ceil(max / step) + 1 }, (_, index) => index * step);
}

function TrendTooltip({ active, payload, metric }) {
  if (!active || !payload?.length) return null;
  const row = payload[0].payload;

  return (
    <div className="rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm shadow-xl shadow-ink/10">
      <p className="text-muted">{formatDate(row.date)}</p>
      <p className="mt-1 font-display text-lg font-semibold">{formatNumber(row[`${metric.value}Average`])}</p>
      <p className="text-muted">new {metric.label.toLowerCase()} a day, 7-day average</p>
      <p className="mt-1.5 border-t border-line pt-1.5 text-muted">
        {formatNumber(row[metric.value])} reported that day
      </p>
    </div>
  );
}

function ChartMessage({ children }) {
  return (
    <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-line px-6 text-center text-muted">
      <p className="max-w-sm">{children}</p>
    </div>
  );
}

/** Daily new cases or deaths as a 7-day average, with the peak day marked. */
export default function TrendChart({ placeName, history }) {
  const [metricValue, setMetricValue] = useState("cases");
  const reduceMotion = useReducedMotion();
  const metric = TREND_METRICS.find((item) => item.value === metricValue);
  const dataKey = `${metric.value}Average`;

  const { series, status, retry } = history;
  const peak = useMemo(() => findPeak(series, dataKey), [series, dataKey]);
  const xTicks = useMemo(() => yearTicks(series), [series]);
  const yTicks = useMemo(() => niceTicks(peak?.[dataKey]), [peak, dataKey]);

  const description =
    status === "ready" && peak
      ? `7-day average for ${placeName}. The busiest point was ${formatCompact(peak[dataKey])} a day, around ${formatDate(peak.date)}.`
      : status === "loading"
        ? `7-day average for ${placeName}.`
        : null;

  return (
    <Panel
      id="trend"
      plain
      className="pt-4"
      title={`Daily new ${metric.label.toLowerCase()}`}
      description={description}
      actions={
        <SegmentedControl
          label="Chart metric"
          items={TREND_METRICS.map(({ value, label }) => ({ value, label }))}
          value={metricValue}
          onChange={setMetricValue}
        />
      }
    >
      <div className="h-72 sm:h-96 lg:h-[28rem]">
        {status === "loading" && <div className="h-full animate-pulse rounded-2xl bg-line/50" />}
        {status === "empty" && (
          <ChartMessage>
            Johns Hopkins didn’t publish daily history for {placeName}. The totals above still apply.
          </ChartMessage>
        )}
        {status === "error" && (
          <ChartMessage>
            The daily history didn’t load.{" "}
            <button type="button" onClick={retry} className="font-semibold text-ink underline underline-offset-4">
              Try again
            </button>
          </ChartMessage>
        )}
        {status === "ready" && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 16, right: 12, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={metric.color} stopOpacity={0.28} />
                  <stop offset="100%" stopColor={metric.color} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="var(--line)" />
              <XAxis
                dataKey="date"
                type="number"
                scale="time"
                domain={["dataMin", "dataMax"]}
                ticks={xTicks}
                tickFormatter={(value) => new Date(value).getFullYear()}
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis
                tickFormatter={formatCompact}
                tick={AXIS_TICK}
                axisLine={false}
                tickLine={false}
                ticks={yTicks}
                domain={[0, yTicks.at(-1)]}
                width={44}
              />
              <Tooltip
                content={<TrendTooltip metric={metric} />}
                cursor={{ stroke: "var(--muted)", strokeDasharray: "4 4" }}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={metric.color}
                strokeWidth={2}
                fill="url(#trend-fill)"
                isAnimationActive={!reduceMotion}
                animationDuration={900}
              />
              {peak && (
                <ReferenceDot
                  x={peak.date}
                  y={peak[dataKey]}
                  r={5}
                  fill={metric.color}
                  stroke="var(--surface)"
                  strokeWidth={2}
                  label={{
                    value: `Peak ${formatCompact(peak[dataKey])}`,
                    position: "right",
                    offset: 10,
                    fill: "var(--ink)",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      {status === "ready" && series.length > 0 && (
        <p className="mt-4 text-sm text-muted">
          Johns Hopkins CSSE, {formatDate(series[0].date)} to {formatDate(series.at(-1).date)}.
        </p>
      )}
    </Panel>
  );
}
