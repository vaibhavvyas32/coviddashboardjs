import { Moon, Sun } from "lucide-react";
import SquishSwitch from "../reactbits/SquishSwitch";

/** Light/dark switch: React Bits' SquishSwitch flanked by sun and moon icons. */
export default function ThemeToggle({ isDark, onChange }) {
  return (
    <div className="flex items-center gap-2 text-muted">
      <Sun aria-hidden="true" className={`size-4 transition-colors ${isDark ? "" : "text-ink"}`} />
      <SquishSwitch
        checked={isDark}
        onChange={onChange}
        ariaLabel="Dark mode"
        width={44}
        height={24}
        radius={12}
        trackColor="var(--line)"
        trackOnColor="var(--cases)"
        thumbColor="var(--surface)"
        thumbOnColor="var(--paper)"
      />
      <Moon aria-hidden="true" className={`size-4 transition-colors ${isDark ? "text-ink" : ""}`} />
    </div>
  );
}
