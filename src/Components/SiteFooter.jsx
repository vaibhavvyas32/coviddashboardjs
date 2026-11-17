import { PORTFOLIO_URL } from "../lib/links";

export default function SiteFooter() {
  return (
    <footer className="mx-auto mt-16 max-w-7xl px-4 pb-10 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-end sm:justify-between">
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Totals come from Worldometers and daily history from Johns Hopkins University CSSE, both through the open{" "}
          <a href="https://disease.sh" className="underline decoration-line underline-offset-4 hover:text-ink">
            disease.sh
          </a>{" "}
          API. Johns Hopkins stopped collecting new data in March 2023.
        </p>

        <a
          href={PORTFOLIO_URL}
          className="group inline-flex items-baseline gap-2 self-start rounded-lg font-display text-2xl font-semibold tracking-tight sm:self-auto sm:text-3xl"
        >
          <span className="text-muted">Made by</span>
          <span className="underline decoration-cases decoration-2 underline-offset-[6px] transition-colors group-hover:text-cases">
            Vaibhav
          </span>
        </a>
      </div>
    </footer>
  );
}
