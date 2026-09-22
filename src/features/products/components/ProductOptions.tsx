"use client";

import type { Product } from "@/features/products/types/product.types";

type ProductOptionsProps = {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionId: string, value: string) => void;
};

/** Selectable luxury product options (e.g., Size pills) matching Figma design */
export function ProductOptions({
  product,
  selectedOptions,
  onChange,
}: ProductOptionsProps) {
  if (product.options.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {product.options.map((option) => {
        const selectedValue = selectedOptions[option.id] ?? option.values[0];

        return (
          <div key={option.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#605a54]">
                {option.name}:
              </span>
              <span className="text-[12px] font-medium text-[#1a1a1a]">
                {selectedValue}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {option.values.map((value) => {
                const isSelected = value === selectedValue;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onChange(option.id, value)}
                    className={`min-w-[72px] rounded-md px-4 py-2 text-[13px] font-medium transition-all ${
                      isSelected
                        ? "border-2 border-[#1a1a1a] bg-white text-[#1a1a1a] shadow-xs"
                        : "border border-[#ebe6de] bg-white text-[#605a54] hover:border-[#1a1a1a]/40 hover:text-[#1a1a1a]"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
