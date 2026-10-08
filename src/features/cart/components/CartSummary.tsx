"use client";

import { useState } from "react";
import Link from "next/link";
import { productPaths } from "@/features/products";
import { formatWholePrice } from "@/features/products/utils/product.utils";

import { useRouter } from "next/navigation";

type CartSummaryProps = {
  total: number;
  quantity: number;
};

const FREE_SHIPPING_THRESHOLD = 150;

export function CartSummary({ total, quantity }: CartSummaryProps) {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const isFreeShipping = total >= FREE_SHIPPING_THRESHOLD || quantity === 0;
  const shippingCost = isFreeShipping ? 0 : 15;
  const discountAmount = promoApplied ? total * 0.1 : 0;
  const finalTotal = Math.max(0, total - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      promoCode.trim().toUpperCase() === "ODORATA10" ||
      promoCode.trim().length > 0
    ) {
      setPromoApplied(true);
      alert("Promotional code applied: 10% Maison courtesy discount.");
    }
  };

  const handleCheckout = () => {
    if (quantity === 0) return;
    router.push("/checkout");
  };

  const freeShippingProgress = Math.min(
    100,
    (total / FREE_SHIPPING_THRESHOLD) * 100,
  );

  return (
    <aside className="flex flex-col gap-6 rounded-xl border border-[#ebe6de] bg-white p-6 shadow-xs lg:p-7">
      <h2 className="font-[family-name:var(--font-instrument-serif)] text-[26px] text-[#1a1a1a]">
        Order Summary
      </h2>

      {/* Pricing Breakdown */}
      <div className="flex flex-col gap-3 border-b border-[#ebe6de] pb-5 text-[13px] text-[#605a54]">
        <div className="flex justify-between">
          <span>Subtotal ({quantity} items)</span>
          <span className="font-medium text-[#1a1a1a]">
            {formatWholePrice(total)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span
            className={
              isFreeShipping ? "font-medium text-emerald-800" : "text-[#1a1a1a]"
            }
          >
            {isFreeShipping ? "Complimentary" : "$15.00"}
          </span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-[#c5a880]">
            <span>Maison Courtesy (10%)</span>
            <span>-{formatWholePrice(Math.round(discountAmount))}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Estimated Taxes</span>
          <span>Calculated at checkout</span>
        </div>
      </div>

      {/* Promo Code Form */}
      {quantity > 0 && (
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Promo or gift code"
            className="w-full rounded-md border border-[#ebe6de] bg-[#faf8f5] px-3 py-2 text-xs uppercase placeholder-normal outline-none focus:border-[#c5a880]"
          />
          <button
            type="submit"
            className="cursor-pointer rounded-md border border-[#ebe6de] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1a1a1a] transition-colors hover:border-[#1a1a1a] hover:bg-[#faf8f5]"
          >
            Apply
          </button>
        </form>
      )}

      {/* Final Total */}
      <div className="flex items-baseline justify-between pt-1">
        <span className="text-sm font-semibold text-[#1a1a1a]">
          Estimated Total
        </span>
        <span className="text-2xl font-bold text-[#1a1a1a]">
          {formatWholePrice(Math.round(finalTotal))}
        </span>
      </div>

      {/* Primary Checkout Button */}
      <button
        type="button"
        disabled={quantity === 0}
        onClick={handleCheckout}
        className="flex w-full cursor-pointer items-center justify-center rounded-md bg-[#1a1a1a] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Proceed to Checkout
      </button>

      {/* Reassurance Features */}
      <div className="flex flex-col gap-2.5 border-t border-[#ebe6de] pt-4 text-xs text-[#8a857f]">
        <div className="flex items-center gap-2">
          <svg
            className="size-4 shrink-0 text-[#c5a880]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          <span>Guaranteed 100% Authentic & Hand-Bottled</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="size-4 shrink-0 text-[#c5a880]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
          <span>256-bit Encrypted SSL Secure Checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="size-4 shrink-0 text-[#c5a880]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
          <span>Two complimentary luxury samples with every order</span>
        </div>
      </div>

      <Link
        href={productPaths.list}
        className="text-center text-xs font-semibold tracking-wider uppercase text-[#c5a880] transition-colors hover:text-[#b08e62]"
      >
        ← Continue Shopping
      </Link>
    </aside>
  );
}
