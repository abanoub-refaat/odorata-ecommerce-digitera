"use client";

import { useState } from "react";
import { useCart } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";
import type { ProductDetailsActionsContext } from "@/features/products";

type ProductDetailsWithCartProps = {
  productId: string;
};

function ProductCartActions({
  product,
  selectedOptions,
}: ProductDetailsActionsContext) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        selectedOptions,
      });
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5 pt-2">
      {/* Quantity & Add to Cart Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Quantity Stepper */}
        <div className="flex h-12 w-full sm:w-36 items-center justify-between rounded-md border border-[#ebe6de] bg-white px-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
            className="flex size-8 cursor-pointer items-center justify-center text-lg font-light text-[#1a1a1a] transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-[14px] font-semibold text-[#1a1a1a]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex size-8 cursor-pointer items-center justify-center text-lg font-light text-[#1a1a1a] transition-opacity hover:opacity-70"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex h-12 flex-1 cursor-pointer items-center justify-center rounded-md bg-[#1a1a1a] px-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-black active:scale-[0.99]"
        >
          {isAdded ? "Added to Cart ✓" : "Add to Cart"}
        </button>
      </div>

      {/* Reassurance Copy */}
      <div className="flex flex-col gap-2 rounded-lg bg-[#f5f2eb]/70 p-3.5 text-[12px] text-[#605a54]">
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
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.25V3.75m0 0a1.125 1.125 0 0 0-1.125-1.125H5.625A1.125 1.125 0 0 0 4.5 3.75v10.5m12 0h-12"
            />
          </svg>
          <span>Complimentary delivery on all orders over $150</span>
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
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
          <span>Includes two complimentary olfactory discovery samples</span>
        </div>
      </div>
    </div>
  );
}

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  return (
    <ProductDetailsPage
      productId={productId}
      actions={(context) => <ProductCartActions {...context} />}
    />
  );
}
