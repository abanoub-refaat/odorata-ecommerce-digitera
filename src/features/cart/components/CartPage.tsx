"use client";

import Link from "next/link";
import { CartItem } from "@/features/cart/components/CartItem";
import { CartSummary } from "@/features/cart/components/CartSummary";
import { useCart } from "@/features/cart/hooks/useCart";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { productPaths } from "@/features/products/paths";

export function CartPage() {
  const { lines, total, quantity, increment, decrement, removeItem } =
    useCart();

  return (
    <section className="min-h-[70vh] bg-[#faf8f5] text-[#1a1a1a]">
      {/* Breadcrumbs */}
      <ProductBreadcrumbs
        items={[
          { label: "Home", href: productPaths.list },
          { label: "Shop", href: productPaths.list },
          { label: "Your Cart" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:px-10 lg:px-16 lg:pb-24">
        {/* Page Header */}
        <div className="border-b border-[#ebe6de] pb-6 sm:pb-8">
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[36px] sm:text-[48px] text-[#1a1a1a]">
            Your Cart
          </h1>
          <p className="mt-1 text-xs sm:text-[13px] text-[#605a54]">
            {quantity > 0
              ? `${quantity} ${quantity === 1 ? "creation" : "creations"} in your personal selection`
              : "Review your selected fragrances before proceeding to checkout."}
          </p>
        </div>

        {lines.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex size-20 items-center justify-center rounded-full bg-[#f5f2eb] text-[#c5a880]">
              <svg className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.188-.578-1.119-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-2xl text-[#1a1a1a] sm:text-3xl">
              Your Cart is Empty
            </h2>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-[#605a54] sm:text-sm">
              Discover our curated collection of pure extractions, private reserve scents, and atelier oils handcrafted in Grasse.
            </p>
            <Link
              href={productPaths.list}
              className="mt-8 inline-flex cursor-pointer items-center justify-center rounded-md bg-[#1a1a1a] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-black active:scale-[0.99]"
            >
              Explore Fragrances
            </Link>
          </div>
        ) : (
          /* Active Cart Grid */
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px] lg:gap-12 xl:grid-cols-[1fr_400px]">
            {/* Cart Items List */}
            <div className="flex flex-col">
              {/* Table Column Labels (Desktop) */}
              <div className="hidden justify-between border-b border-[#ebe6de] pb-3 text-[11px] font-semibold tracking-wider uppercase text-[#605a54] sm:flex">
                <span>Product</span>
                <div className="flex gap-20 pr-4">
                  <span>Quantity</span>
                  <span>Subtotal</span>
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-col">
                {lines.map((line) => (
                  <CartItem
                    key={line.id}
                    line={line}
                    onIncrement={increment}
                    onDecrement={decrement}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary Aside */}
            <div>
              <CartSummary total={total} quantity={quantity} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
