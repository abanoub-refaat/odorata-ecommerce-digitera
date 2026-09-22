"use client";

import { useProducts } from "@/features/products/hooks/useProducts";
import { ProductCard } from "@/features/products/components/ProductCard";

type OlfactoryCompanionsProps = {
  currentProductId: string;
};

export function OlfactoryCompanions({
  currentProductId,
}: OlfactoryCompanionsProps) {
  const productsQuery = useProducts({ pageSize: 12 });
  const companions = (productsQuery.data?.items ?? [])
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (companions.length === 0 && !productsQuery.isLoading) {
    return null;
  }

  return (
    <section className="mt-16 sm:mt-24 border-t border-[#ebe6de] pt-14 pb-8 sm:pb-16">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] sm:text-[40px] text-[#1a1a1a]">
          Olfactory Companions
        </h2>
        <p className="mt-2 max-w-md text-[13px] sm:text-[14px] text-[#605a54]">
          Cultivated creations that harmoniously complement or intrigue
          alongside this scent.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {productsQuery.isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[380px] animate-pulse rounded-lg bg-[#f5f2eb]"
              />
            ))
          : companions.map((companion) => (
              <ProductCard key={companion.id} product={companion} />
            ))}
      </div>
    </section>
  );
}
