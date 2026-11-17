import Counter from "../reactbits/Counter";
import { formatNumber } from "../lib/format";

const percentOf = (part, total) => (total ? `${((part / total) * 100).toFixed(1)}%` : "—");

function buildStats(data) {
  return [
    {
      key: "cases",
      label: "Cases",
      dot: "bg-cases",
      value: data.cases,
      today: data.todayCases,
      details: [
        `${formatNumber(data.active)} still active`,
        `${formatNumber(data.casesPerOneMillion)} per million people`,
      ],
    },
    {
      key: "recovered",
      label: "Recovered",
      dot: "bg-recovered",
      value: data.recovered,
      today: data.todayRecovered,
      details: [`${percentOf(data.recovered, data.cases)} of all cases`],
    },
    {
      key: "deaths",
      label: "Deaths",
      dot: "bg-deaths",
      value: data.deaths,
      today: data.todayDeaths,
      details: [
        `${percentOf(data.deaths, data.cases)} of all cases`,
        `${formatNumber(data.deathsPerOneMillion)} per million people`,
      ],
    },
  ];
}

function StatSkeleton() {
  return (
    <div className="space-y-3 py-1">
      <div className="h-4 w-20 animate-pulse rounded-full bg-line" />
      <div className="h-10 w-48 animate-pulse rounded-xl bg-line sm:h-12" />
      <div className="h-4 w-36 animate-pulse rounded-full bg-line" />
    </div>
  );
}

/** The three headline totals. Digits roll to the new value when the country changes. */
export default function StatStrip({ data }) {
  const stats = data ? buildStats(data) : null;

  return (
    <dl className="grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
      {(stats ?? [{ key: "a" }, { key: "b" }, { key: "c" }]).map((stat) => (
        <div key={stat.key} className="py-5 sm:py-6 md:px-8 md:first:pl-0 md:last:pr-0">
          {stats ? (
            <>
              <dt className="flex items-center gap-2 text-base text-muted">
                <span aria-hidden="true" className={`size-2.5 rounded-full ${stat.dot}`} />
                {stat.label}
              </dt>
              <dd className="mt-2">
                <span className="sr-only">{formatNumber(stat.value)}</span>
                <span
                  aria-hidden="true"
                  className="block font-display text-4xl font-semibold tracking-tight lg:text-5xl"
                >
                  <Counter value={stat.value ?? 0} fontSize="inherit" fontWeight="inherit" />
                </span>
                <span className="mt-3 block space-y-0.5 text-sm text-muted">
                  {stat.today > 0 && (
                    <span className="block font-semibold text-ink">+{formatNumber(stat.today)} reported today</span>
                  )}
                  {stat.details.map((detail) => (
                    <span key={detail} className="block">
                      {detail}
                    </span>
                  ))}
                </span>
              </dd>
            </>
          ) : (
            <StatSkeleton />
          )}
        </div>
      ))}
    </dl>
  );
}
