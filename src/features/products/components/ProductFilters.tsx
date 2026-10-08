"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

type FilterOption = {
  id: string;
  label: string;
};

type CheckboxTone = "gold" | "ink";

const CATEGORIES: FilterOption[] = [
  { id: "pure-extractions", label: "Pure Extractions" },
  { id: "private-reserve", label: "Private Reserve" },
  { id: "atelier-oils", label: "Atelier Oils" },
  { id: "discovery-vault", label: "Discovery Vault" },
];

const SCENT_FAMILIES: FilterOption[] = [
  { id: "floral", label: "Floral" },
  { id: "woody", label: "Woody" },
  { id: "oriental", label: "Oriental" },
  { id: "fresh", label: "Fresh" },
];

const OCCASIONS: FilterOption[] = [
  { id: "personal-use", label: "Personal Use" },
  { id: "wedding", label: "Wedding" },
  { id: "gift-sets", label: "Gift Sets" },
  { id: "birthday", label: "Birthday" },
];

const MIN_PRICE_LIMIT = 0;
const MAX_PRICE_LIMIT = 500;

function FilterCheckbox({
  option,
  checked,
  tone,
  onChange,
}: {
  option: FilterOption;
  checked: boolean;
  tone: CheckboxTone;
  onChange: () => void;
}) {
  return (
    <label className="group flex w-full cursor-pointer select-none items-center gap-2.5">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={cn(
          "flex size-4 shrink-0 items-center justify-center rounded-[2px] border border-solid border-[#ebe6de] transition-colors",
          checked && tone === "gold" && "border-[#c5a880] bg-[#c5a880]",
          checked && tone === "ink" && "border-[#1a1a1a] bg-[#1a1a1a]",
          !checked && "bg-white group-hover:border-[#c5a880]/60",
        )}
      >
        {checked && (
          <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        )}
      </span>
      <span
        className={cn(
          "text-[13px] font-normal whitespace-nowrap transition-colors",
          checked ? "font-medium text-[#1a1a1a]" : "text-[#605a54] group-hover:text-[#1a1a1a]",
        )}
      >
        {option.label}
      </span>
    </label>
  );
}

function FilterBlock({
  title,
  options,
  selected,
  tone,
  onToggle,
}: {
  title: string;
  options: FilterOption[];
  selected: string[];
  tone: CheckboxTone;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-[12px] font-bold uppercase tracking-wider text-[#1a1a1a]">
        {title}
      </p>
      <div className="flex w-full flex-col items-start gap-3">
        {options.map((option) => (
          <FilterCheckbox
            key={option.id}
            option={option}
            tone={tone}
            checked={selected.includes(option.id)}
            onChange={() => onToggle(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

function toggleValue(values: string[], id: string) {
  return values.includes(id)
    ? values.filter((value) => value !== id)
    : [...values, id];
}

export function ProductFilters() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>(["pure-extractions"]);
  const [scentFamilies, setScentFamilies] = useState<string[]>(["woody"]);
  const [occasions, setOccasions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(100);
  const [maxPrice, setMaxPrice] = useState(400);

  const selectedCount =
    categories.length + scentFamilies.length + occasions.length;

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - 20);
    setMinPrice(Math.max(MIN_PRICE_LIMIT, value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + 20);
    setMaxPrice(Math.min(MAX_PRICE_LIMIT, value));
  };

  const resetAllFilters = () => {
    setCategories([]);
    setScentFamilies([]);
    setOccasions([]);
    setMinPrice(MIN_PRICE_LIMIT);
    setMaxPrice(MAX_PRICE_LIMIT);
  };

  const minPercent = ((minPrice - MIN_PRICE_LIMIT) / (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) * 100;
  const maxPercent = ((maxPrice - MIN_PRICE_LIMIT) / (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) * 100;

  return (
    <aside className="w-full shrink-0 lg:w-[260px]">
      {/* Mobile Accordion Toggle */}
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between rounded border border-solid border-[#ebe6de] bg-white px-4 py-3 text-[12px] font-semibold uppercase text-[#1a1a1a] transition-colors hover:border-[#c5a880] lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>Filters{selectedCount > 0 ? ` (${selectedCount})` : ""}</span>
        <svg
          className={cn("size-4 text-[#1a1a1a] transition-transform duration-200", open && "rotate-180")}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div
        className={cn(
          "flex-col items-start gap-7",
          open ? "mt-6 flex" : "hidden",
          "lg:mt-0 lg:flex",
        )}
      >
        {/* Filter Header with Reset Button */}
        <div className="flex w-full items-center justify-between">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#605a54]">
            Refine Catalog
          </span>
          {(selectedCount > 0 || minPrice > MIN_PRICE_LIMIT || maxPrice < MAX_PRICE_LIMIT) && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="cursor-pointer text-[11px] font-medium text-[#c5a880] hover:underline"
            >
              Reset All
            </button>
          )}
        </div>

        {/* Category Filter */}
        <FilterBlock
          title="Category"
          options={CATEGORIES}
          selected={categories}
          tone="gold"
          onToggle={(id) =>
            setCategories((current) => toggleValue(current, id))
          }
        />

        <div className="h-px w-full bg-[#ebe6de]" />

        {/* Scent Family Filter */}
        <FilterBlock
          title="Scent Family"
          options={SCENT_FAMILIES}
          selected={scentFamilies}
          tone="ink"
          onToggle={(id) =>
            setScentFamilies((current) => toggleValue(current, id))
          }
        />

        <div className="h-px w-full bg-[#ebe6de]" />

        {/* Occasion Filter */}
        <FilterBlock
          title="Occasion"
          options={OCCASIONS}
          selected={occasions}
          tone="ink"
          onToggle={(id) => setOccasions((current) => toggleValue(current, id))}
        />

        <div className="h-px w-full bg-[#ebe6de]" />

        {/* Interactive Price Range Dual-Slider matching Figma design 1-283 */}
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex w-full items-center justify-between">
            <p className="text-[12px] font-bold uppercase tracking-wider text-[#1a1a1a]">
              Price Range
            </p>
            <span className="text-[12px] font-semibold text-[#c5a880]">
              ${minPrice} – ${maxPrice}
            </span>
          </div>

          <div className="flex w-full max-w-[260px] flex-col items-start gap-4 lg:max-w-none">
            {/* Custom Dual Slider Track Container */}
            <div className="relative flex h-6 w-full items-center">
              {/* Inactive Track */}
              <div className="absolute h-1 w-full rounded-full bg-[#ebe6de]" />

              {/* Active Gold Range Bar */}
              <div
                className="absolute h-1 rounded-full bg-[#c5a880]"
                style={{
                  left: `${minPercent}%`,
                  width: `${maxPercent - minPercent}%`,
                }}
              />

              {/* Input for Min Price with Figma-styled handle (White circle with #C5A880 stroke) */}
              <input
                type="range"
                min={MIN_PRICE_LIMIT}
                max={MAX_PRICE_LIMIT}
                step={5}
                value={minPrice}
                onChange={handleMinPriceChange}
                className="pointer-events-none absolute h-6 w-full appearance-none bg-transparent outline-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#c5a880] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 active:[&::-webkit-slider-thumb]:cursor-grabbing active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#c5a880] [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110 active:[&::-moz-range-thumb]:cursor-grabbing active:[&::-moz-range-thumb]:scale-110"
                aria-label="Minimum price"
              />

              {/* Input for Max Price with Figma-styled handle (White circle with #C5A880 stroke) */}
              <input
                type="range"
                min={MIN_PRICE_LIMIT}
                max={MAX_PRICE_LIMIT}
                step={5}
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="pointer-events-none absolute h-6 w-full appearance-none bg-transparent outline-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#c5a880] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 active:[&::-webkit-slider-thumb]:cursor-grabbing active:[&::-webkit-slider-thumb]:scale-110 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#c5a880] [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110 active:[&::-moz-range-thumb]:cursor-grabbing active:[&::-moz-range-thumb]:scale-110"
                aria-label="Maximum price"
              />
            </div>

            {/* Min / Max Labels & Numerical Inputs */}
            <div className="flex w-full items-center justify-between text-[12px] text-[#605a54]">
              <div className="flex items-center gap-1 rounded border border-[#ebe6de] bg-white px-2 py-1">
                <span>$</span>
                <input
                  type="number"
                  min={MIN_PRICE_LIMIT}
                  max={maxPrice - 10}
                  value={minPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= MIN_PRICE_LIMIT && val <= maxPrice - 10) {
                      setMinPrice(val);
                    }
                  }}
                  className="w-10 bg-transparent text-xs font-medium text-[#1a1a1a] outline-none"
                />
              </div>
              <span className="text-[#8a857f]">—</span>
              <div className="flex items-center gap-1 rounded border border-[#ebe6de] bg-white px-2 py-1">
                <span>$</span>
                <input
                  type="number"
                  min={minPrice + 10}
                  max={MAX_PRICE_LIMIT}
                  value={maxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val <= MAX_PRICE_LIMIT && val >= minPrice + 10) {
                      setMaxPrice(val);
                    }
                  }}
                  className="w-10 bg-transparent text-xs font-medium text-[#1a1a1a] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
