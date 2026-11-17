import { ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { PORTFOLIO_URL } from "../lib/links";

export default function SiteHeader({ isDark, onThemeChange }) {
  return (
    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-10">
      <a href="/" className="flex items-center gap-2.5 rounded-full font-display text-lg font-semibold tracking-tight">
        <img src="/favicon.svg" alt="" className="size-7" />
        Covid-19 dashboard
      </a>

      <div className="flex items-center gap-4 sm:gap-6">
        <a
          href={PORTFOLIO_URL}
          className="group hidden items-center gap-1 rounded-full text-sm text-muted transition-colors hover:text-ink sm:inline-flex"
        >
          vvyas.in
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
        <ThemeToggle isDark={isDark} onChange={onThemeChange} />
      </div>
    </header>
  );
}
