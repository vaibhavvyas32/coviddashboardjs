import { useMemo, useState } from "react";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { Check, ChevronsUpDown, Globe } from "lucide-react";

const WORLDWIDE = { country: "Worldwide" };

function Flag({ country, className = "" }) {
  if (!country?.countryInfo?.flag) {
    return <Globe aria-hidden="true" className={`size-5 shrink-0 text-cases ${className}`} />;
  }
  return (
    <img
      src={country.countryInfo.flag}
      alt=""
      width={22}
      height={16}
      loading="lazy"
      className={`h-4 w-[22px] shrink-0 rounded-[3px] object-cover ring-1 ring-line ${className}`}
    />
  );
}

/** Searchable list of every country, with "Worldwide" first. `selected` is a country object or null. */
export default function CountryPicker({ countries, selected, onSelect, disabled }) {
  const [query, setQuery] = useState("");

  const options = useMemo(() => {
    const search = query.trim().toLowerCase();
    const matches = search ? countries.filter((item) => item.country.toLowerCase().includes(search)) : countries;
    return search ? matches : [WORLDWIDE, ...matches];
  }, [countries, query]);

  const current = selected ?? WORLDWIDE;

  return (
    <Combobox
      value={current}
      by="country"
      onChange={(option) => option && onSelect(option === WORLDWIDE ? null : option)}
      onClose={() => setQuery("")}
      disabled={disabled}
      immediate
    >
      <div className="relative w-full">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
          <Flag country={selected} />
        </span>
        <ComboboxInput
          aria-label="Country"
          placeholder="Search countries"
          displayValue={(option) => option?.country ?? ""}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={(event) => event.target.select()}
          className="h-14 w-full rounded-2xl border border-line bg-surface pr-12 pl-12 font-display text-lg font-medium text-ink transition-colors placeholder:text-muted hover:border-muted focus:border-cases focus:outline-none disabled:opacity-60"
        />
        <ComboboxButton
          aria-label="Show all countries"
          className="absolute inset-y-0 right-0 flex items-center px-4 text-muted"
        >
          <ChevronsUpDown aria-hidden="true" className="size-5" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom start"
        transition
        className="z-50 mt-2 max-h-80 w-(--input-width) overflow-y-auto rounded-2xl border border-line bg-surface p-1.5 shadow-2xl shadow-ink/10 transition duration-150 ease-out [--anchor-gap:0] data-closed:-translate-y-1 data-closed:opacity-0 empty:invisible"
      >
        {options.length === 0 && <p className="px-3 py-2.5 text-sm text-muted">No country matches “{query}”.</p>}
        {options.map((option) => (
          <ComboboxOption
            key={option.country}
            value={option}
            className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-ink select-none data-focus:bg-paper"
          >
            <Flag country={option === WORLDWIDE ? null : option} />
            <span className="flex-1 truncate group-data-selected:font-semibold">{option.country}</span>
            <Check aria-hidden="true" className="invisible size-4 text-cases group-data-selected:visible" />
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
