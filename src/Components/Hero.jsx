import BlurText from "../reactbits/BlurText";
import DotGrid from "../reactbits/DotGrid";
import { CANVAS_COLORS } from "../lib/theme";
import { formatDate } from "../lib/format";
import CountryPicker from "./CountryPicker";

const HEADLINE = ["Every reported case,", "country by country."];

/** Headline, short introduction and the country picker, over a dot grid that reads like a counting slide. */
export default function Hero({ isDark, countries, selected, onSelect, updatedAt, status }) {
  const colors = isDark ? CANVAS_COLORS.dark : CANVAS_COLORS.light;

  return (
    <section className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-4 -top-24 bottom-0 mask-b-from-35% mask-l-from-60% sm:-inset-x-6 lg:-inset-x-10"
      >
        <DotGrid
          dotSize={4}
          gap={22}
          baseColor={colors.dot}
          activeColor={colors.dotActive}
          proximity={120}
          clickShock={false}
        />
      </div>

      <div className="relative pt-10 pb-12 sm:pt-16 lg:pt-20 lg:pb-16">
        <h1 className="sr-only">{HEADLINE.join(" ")}</h1>
        <div
          aria-hidden="true"
          className="font-display text-[clamp(2rem,8.4vw,6rem)] leading-[0.92] font-bold tracking-[-0.04em]"
        >
          <BlurText text={HEADLINE[0]} trigger="load" delay={90} />
          <BlurText text={HEADLINE[1]} trigger="load" delay={90} />
        </div>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end lg:gap-16">
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Totals, daily history, a world map and rankings for every country and territory that reported data. Pick one
            to see its own record.
          </p>

          <div>
            <CountryPicker
              countries={countries}
              selected={selected}
              onSelect={onSelect}
              disabled={status !== "ready"}
            />
            <div className="mt-3 flex items-center justify-between gap-4 text-sm text-muted">
              <p aria-live="polite">
                {status === "ready" && `Figures last updated ${formatDate(updatedAt)}.`}
                {status === "loading" && "Loading the latest figures…"}
              </p>
              {selected && (
                <button
                  type="button"
                  onClick={() => onSelect(null)}
                  className="shrink-0 rounded-md font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  Show worldwide
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
