"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** Interactive luxury product image gallery with thumbnail previews */
export function ProductImages({ product }: ProductImagesProps) {
  const images = product.images.length > 0 ? product.images : [];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const activeImage = images[selectedImageIndex] ?? images[0];

  if (!activeImage) {
    return (
      <div className="flex aspect-[4/5] w-full items-center justify-center rounded-xl bg-[#ebe6de] text-[#605a54]">
        No product images available
      </div>
    );
  }

  // Display up to 3 thumbnails as seen in the design
  const thumbnails = images.slice(0, 3);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Hero Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f5f2eb]">
        <Image
          src={activeImage}
          alt={product.name}
          fill
          priority
          className="object-cover transition-all duration-300"
          sizes="(min-width: 1024px) 48vw, 100vw"
        />
      </div>

      {/* Thumbnails Row */}
      {thumbnails.length > 1 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {thumbnails.map((img, index) => {
            const isSelected = index === selectedImageIndex;
            return (
              <button
                key={`${img}-${index}`}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#f5f2eb] transition-all focus:outline-none ${
                  isSelected
                    ? "ring-2 ring-[#1a1a1a] ring-offset-2 ring-offset-[#faf8f5]"
                    : "border border-[#ebe6de] opacity-75 hover:opacity-100"
                }`}
                aria-label={`View ${product.name} image ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 15vw, 30vw"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
