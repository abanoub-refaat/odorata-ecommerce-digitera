"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { OlfactoryCompanions } from "@/features/products/components/OlfactoryCompanions";
import { useProduct } from "@/features/products/hooks/useProduct";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    return Object.fromEntries(
      product.options.map((option) => [
        option.id,
        selectedOptions[option.id] ?? option.values[0],
      ]),
    );
  }, [product, selectedOptions]);

  if (productQuery.isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm font-medium text-[#605a54] animate-pulse">
          Unveiling fragrance formulation...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <p className="text-base font-medium text-[#1a1a1a]">
          Fragrance not found.
        </p>
        <a
          href={productPaths.list}
          className="text-sm text-[#c5a880] underline underline-offset-4 hover:text-[#1a1a1a]"
        >
          Return to All Fragrances
        </a>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: productPaths.list },
    { label: "Fragrances", href: productPaths.list },
    { label: product.name },
  ];

  return (
    <div className="bg-[#faf8f5] text-[#1a1a1a]">
      {/* Breadcrumbs */}
      <ProductBreadcrumbs items={breadcrumbs} />

      {/* Main Product Showcase */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:px-10 lg:px-20 lg:py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7">
            <ProductImages product={product} />
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <ProductDetails product={product} />

            <ProductOptions
              product={product}
              selectedOptions={resolvedOptions}
              onChange={(optionId, value) =>
                setSelectedOptions((current) => ({
                  ...current,
                  [optionId]: value,
                }))
              }
            />

            {actions?.({ product, selectedOptions: resolvedOptions })}
          </div>
        </div>

        {/* Bottom Recommendations Section */}
        <OlfactoryCompanions currentProductId={product.id} />
      </div>
    </div>
  );
}
