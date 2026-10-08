"use client";

import { useState } from "react";
import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
};

type AccordionKey = "scent" | "longevity" | "ingredients";

export function ProductDetails({ product }: ProductDetailsProps) {
  const [openAccordions, setOpenAccordions] = useState<
    Record<AccordionKey, boolean>
  >({
    scent: true,
    longevity: false,
    ingredients: false,
  });

  const toggleAccordion = (key: AccordionKey) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const categoryLabel = product.category.replace(/-/g, " ");

  return (
    <div className="flex flex-col gap-6">
      {/* Category Eyebrow */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c5a880]">
          {categoryLabel}
        </span>
        <span className="text-[#ebe6de]">/</span>
        <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#605a54]">
          {product.scentFamily}
        </span>
      </div>

      {/* Product Title */}
      <div className="flex flex-col gap-2">
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[38px] sm:text-[46px] leading-[1.1] text-[#1a1a1a]">
          {product.name}
        </h1>
        <p className="text-[13px] font-medium tracking-wide text-[#605a54]">
          {product.notes}
        </p>
      </div>

      {/* Price & Availability */}
      <div className="flex items-baseline justify-between border-b border-[#ebe6de] pb-5">
        <div className="flex items-baseline gap-3">
          <span className="text-[26px] font-semibold text-[#1a1a1a]">
            {formatWholePrice(product.price)}
          </span>
          <span className="text-[12px] text-[#605a54]">Tax included</span>
        </div>
        <div className="flex items-center gap-2 text-[12px] font-medium text-emerald-800">
          <span className="size-2 rounded-full bg-emerald-600" />
          <span>In Stock</span>
        </div>
      </div>

      {/* Short Narrative Description */}
      <p className="text-[14px] leading-relaxed text-[#605a54]">
        {product.description}
      </p>

      {/* Collapsible Accordions (Scent Anatomy, Longevity, Ingredients) */}
      <div className="mt-2 divide-y divide-[#ebe6de] border-y border-[#ebe6de]">
        {/* Accordion 1: Scent Anatomy */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion("scent")}
            className="flex w-full cursor-pointer items-center justify-between text-left text-[14px] font-semibold text-[#1a1a1a] transition-colors hover:text-[#c5a880]"
          >
            <span>Scent Anatomy</span>
            <span className="text-[18px] font-light text-[#605a54]">
              {openAccordions.scent ? "−" : "+"}
            </span>
          </button>
          {openAccordions.scent && (
            <div className="mt-3 flex flex-col gap-2 text-[13px] leading-relaxed text-[#605a54]">
              {product.details?.scentAnatomy?.narrative && (
                <p className="italic text-[#1a1a1a]/80 mb-2">
                  &ldquo;{product.details.scentAnatomy.narrative}&rdquo;
                </p>
              )}
              <div className="grid grid-cols-3 gap-2 border-t border-[#ebe6de]/60 pt-2 text-[12px]">
                <div>
                  <span className="block font-semibold text-[#1a1a1a]">
                    Top
                  </span>
                  <span className="mt-0.5 block text-[#605a54]">
                    {product.details?.scentAnatomy?.top ?? "Cardamom, Bergamot"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold text-[#1a1a1a]">
                    Heart
                  </span>
                  <span className="mt-0.5 block text-[#605a54]">
                    {product.details?.scentAnatomy?.heart ??
                      "Sandalwood, Papyrus"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold text-[#1a1a1a]">
                    Base
                  </span>
                  <span className="mt-0.5 block text-[#605a54]">
                    {product.details?.scentAnatomy?.base ?? "Cedarwood, Amber"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Longevity & Sillage */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion("longevity")}
            className="flex w-full cursor-pointer items-center justify-between text-left text-[14px] font-semibold text-[#1a1a1a] transition-colors hover:text-[#c5a880]"
          >
            <span>Longevity & Sillage</span>
            <span className="text-[18px] font-light text-[#605a54]">
              {openAccordions.longevity ? "−" : "+"}
            </span>
          </button>
          {openAccordions.longevity && (
            <div className="mt-3 flex flex-col gap-2.5 text-[13px] text-[#605a54]">
              <div className="flex justify-between border-b border-[#ebe6de]/50 pb-1.5">
                <span className="font-medium text-[#1a1a1a]">
                  Concentration
                </span>
                <span>
                  {product.details?.concentration ?? "Extrait de Parfum (28%)"}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#ebe6de]/50 pb-1.5">
                <span className="font-medium text-[#1a1a1a]">Longevity</span>
                <span>
                  {product.details?.longevity ?? "8–12 hours on skin"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-[#1a1a1a]">Projection</span>
                <span>
                  {product.details?.sillage ?? "Moderate to intimate sillage"}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: Ingredients & Care */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleAccordion("ingredients")}
            className="flex w-full cursor-pointer items-center justify-between text-left text-[14px] font-semibold text-[#1a1a1a] transition-colors hover:text-[#c5a880]"
          >
            <span>Ingredients & Care</span>
            <span className="text-[18px] font-light text-[#605a54]">
              {openAccordions.ingredients ? "−" : "+"}
            </span>
          </button>
          {openAccordions.ingredients && (
            <div className="mt-3 text-[12px] leading-relaxed text-[#605a54]">
              <p>
                {product.details?.ingredients ??
                  "Alcohol Denat., Parfum (Fragrance), Aqua (Water). Formulated without parabens, phthalates, or artificial colorants. Store in a cool, dry place away from direct sunlight."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
