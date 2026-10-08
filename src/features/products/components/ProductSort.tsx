"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { ProductSort } from "@/features/products/types/product.types";

type ProductSortControlProps = {
  value?: ProductSort;
  availableCount: number;
  onSortChange?: (sort: ProductSort) => void;
};

const SORT_OPTIONS: Array<{ value: ProductSort; label: string }> = [
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export function ProductSortControl({
  value = "price-desc",
  availableCount,
  onSortChange,
}: ProductSortControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as ProductSort;
    if (onSortChange) {
      onSortChange(newSort);
    } else {
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      params.set("sort", newSort);
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="flex w-full flex-col gap-3 border-b border-solid border-[#ebe6de] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-[12px] font-normal uppercase tracking-wider text-[#605a54]">
        {availableCount} fragrances available
      </p>
      <label className="relative flex shrink-0 items-center gap-2">
        <span className="text-[12px] font-semibold tracking-wider whitespace-nowrap text-[#1a1a1a]">
          Sort by:
        </span>
        <select
          aria-label="Sort products"
          value={value}
          onChange={handleSortChange}
          className="cursor-pointer appearance-none bg-transparent pr-6 text-[12px] font-semibold whitespace-nowrap text-[#c5a880] outline-none hover:text-[#b08e62]"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value} className="text-[#1a1a1a]">
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-0 top-1/2 size-3.5 -translate-y-1/2 text-[#c5a880]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </label>
    </div>
  );
}
