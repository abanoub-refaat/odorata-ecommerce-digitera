"use client";

import Image from "next/image";
import Link from "next/link";
import { productPaths } from "@/features/products/paths";
import type { CartLine } from "@/features/cart/types/cart.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type CartItemProps = {
  line: CartLine;
  onIncrement: (lineId: string) => void;
  onDecrement: (lineId: string) => void;
  onRemove: (lineId: string) => void;
};

export function CartItem({
  line,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemProps) {
  const options = Object.entries(line.selectedOptions)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  const lineTotal = line.price * line.quantity;

  return (
    <article className="flex flex-col gap-4 border-b border-[#ebe6de] py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 sm:gap-5">
        <Link
          href={productPaths.detail(line.productId)}
          className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-[#f5f2eb] sm:size-24"
        >
          {line.image ? (
            <Image
              src={line.image}
              alt={line.name}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 96px, 80px"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-xs text-[#8a857f]">
              No img
            </div>
          )}
        </Link>

        <div className="flex flex-col items-start gap-1">
          <Link
            href={productPaths.detail(line.productId)}
            className="font-[family-name:var(--font-instrument-serif)] text-[20px] text-[#1a1a1a] transition-colors hover:text-[#c5a880] sm:text-[22px]"
          >
            {line.name}
          </Link>
          {options ? (
            <p className="text-xs text-[#8a857f]">{options}</p>
          ) : (
            <p className="text-xs uppercase tracking-wider text-[#c5a880]">
              Eau de Parfum
            </p>
          )}
          <p className="text-xs font-medium text-[#605a54]">
            {formatWholePrice(line.price)} each
          </p>
          <button
            type="button"
            onClick={() => onRemove(line.id)}
            className="mt-1 cursor-pointer text-xs font-medium text-[#8a857f] underline transition-colors hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Quantity Controls & Line Total */}
      <div className="flex items-center justify-between sm:gap-8">
        {/* Quantity Stepper */}
        <div className="flex h-10 w-28 items-center justify-between rounded-md border border-[#ebe6de] bg-white px-2.5">
          <button
            type="button"
            onClick={() => onDecrement(line.id)}
            disabled={line.quantity <= 1}
            className="flex size-6 cursor-pointer items-center justify-center text-base font-light text-[#1a1a1a] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-xs font-semibold text-[#1a1a1a]">
            {line.quantity}
          </span>
          <button
            type="button"
            onClick={() => onIncrement(line.id)}
            className="flex size-6 cursor-pointer items-center justify-center text-base font-light text-[#1a1a1a] transition-opacity hover:opacity-70"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Total Price */}
        <div className="text-right">
          <p className="text-base font-semibold text-[#1a1a1a]">
            {formatWholePrice(lineTotal)}
          </p>
        </div>
      </div>
    </article>
  );
}
