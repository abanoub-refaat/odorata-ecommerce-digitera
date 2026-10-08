"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { productPaths } from "@/features/products/paths";

type CategoryCard = {
  id: string;
  name: string;
  number: string;
  description: string;
  image: string;
  count: number;
  href: string;
};

const CATEGORIES_DATA: CategoryCard[] = [
  {
    id: "floral",
    name: "Floral",
    number: "01",
    description: "Night-blooming jasmine, Grasse tuberose, and dewy white blossoms.",
    image: "/images/products/fleur-de-lune.png",
    count: 6,
    href: `${productPaths.list}?scentFamily=floral`,
  },
  {
    id: "woody",
    name: "Woody",
    number: "02",
    description: "Sacred sandalwood, smoky papyrus, and Atlas cedarwood.",
    image: "/images/products/santal-parchment.png",
    count: 8,
    href: `${productPaths.list}?scentFamily=woody`,
  },
  {
    id: "oriental",
    name: "Oriental",
    number: "03",
    description: "Molten golden amber, Burley tobacco, and Madagascar tonka bean.",
    image: "/images/products/noir-cocoon.png",
    count: 5,
    href: `${productPaths.list}?scentFamily=oriental`,
  },
  {
    id: "fresh",
    name: "Fresh",
    number: "04",
    description: "Calabrian bergamot, coastal sea salt, and maritime cypress.",
    image: "/images/products/sol-dor.png",
    count: 7,
    href: `${productPaths.list}?scentFamily=fresh`,
  },
  {
    id: "pure-extractions",
    name: "Pure Extractions",
    number: "05",
    description: "Cold-distilled botanical extraits crafted for atmospheric wear.",
    image: "/images/products/rose-absolute.png",
    count: 9,
    href: `${productPaths.list}?category=pure-extractions`,
  },
  {
    id: "private-reserve",
    name: "Private Reserve",
    number: "06",
    description: "Limited vintage batches formulated with rare macerated resins.",
    image: "/images/products/atelier-oud.png",
    count: 4,
    href: `${productPaths.list}?category=private-reserve`,
  },
  {
    id: "atelier-oils",
    name: "Atelier Oils",
    number: "07",
    description: "Alcohol-free pure perfume oils with intimate longevity on skin.",
    image: "/images/products/santal-parchment.png",
    count: 5,
    href: `${productPaths.list}?category=atelier-oils`,
  },
  {
    id: "discovery-vault",
    name: "Discovery Vault & Sets",
    number: "08",
    description: "Curated discovery wardrobes encased in bespoke linen packaging.",
    image: "/images/products/sol-dor.png",
    count: 3,
    href: `${productPaths.list}?category=discovery-vault`,
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a]">
      {/* Breadcrumbs */}
      <ProductBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: productPaths.list },
          { label: "Fragrance Categories" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:px-10 lg:px-16 lg:pb-28">
        {/* Header Title Section */}
        <div className="border-b border-[#ebe6de] pb-8 pt-2 sm:pb-10">
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[38px] leading-tight text-[#1a1a1a] sm:text-[52px] lg:text-[60px]">
            Fragrance Categories
          </h1>
          <p className="mt-2 max-w-2xl text-xs font-normal text-[#605a54] sm:text-sm">
            Explore our curated fragrance collections categorized by botanical families, distillation processes, and bespoke curations.
          </p>
        </div>

        {/* 8-Card Grid matching Figma Node 9-309 */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {CATEGORIES_DATA.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-[#ebe6de] bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/60 hover:shadow-md"
            >
              {/* Card Image Container with Corner Badge */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#f5f2eb]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                />

                {/* Number / Count Pill */}
                <span className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-white/90 text-[11px] font-semibold text-[#1a1a1a] shadow-xs backdrop-blur-xs transition-transform group-hover:scale-110">
                  {category.number}
                </span>
              </div>

              {/* Card Metadata */}
              <div className="mt-4 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between">
                    <h2 className="font-[family-name:var(--font-instrument-serif)] text-[22px] text-[#1a1a1a] transition-colors group-hover:text-[#c5a880]">
                      {category.name}
                    </h2>
                    <span className="text-[11px] font-medium text-[#8a857f]">
                      {category.count} items
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#605a54]">
                    {category.description}
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="mt-4 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#c5a880] transition-colors group-hover:text-[#1a1a1a]">
                  <span>Explore Collection</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
