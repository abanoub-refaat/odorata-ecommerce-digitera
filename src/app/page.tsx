"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/features/products/components/ProductCard";
import { mockProducts } from "@/features/products/services/products.mock-data";
import { productPaths } from "@/features/products/paths";

export default function HomePage() {
  const [consultEmail, setConsultEmail] = useState("");
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const featuredProducts = mockProducts.slice(0, 4);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (consultEmail.trim()) {
      setConsultSubmitted(true);
      setConsultEmail("");
      setTimeout(() => setConsultSubmitted(false), 4000);
    }
  };

  return (
    <div className="flex flex-col bg-[#faf8f5] text-[#1a1a1a]">
      {/* 1. Hero Section (Figma Node 1-2) */}
      <section className="relative flex min-h-[540px] w-full items-center justify-start overflow-hidden bg-[#2b2723] px-6 sm:min-h-[640px] sm:px-12 lg:min-h-[720px] lg:px-24">
        {/* Background Image with Ambient Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products/sol-dor.png"
            alt="Odorata Haute Parfumerie"
            fill
            priority
            className="object-cover opacity-35 filter brightness-75 contrast-125 transition-transform duration-1000 scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
        </div>

        {/* Hero Copy */}
        <div className="relative z-10 flex max-w-xl flex-col items-start gap-4 text-left">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#c5a880]">
            Haute Parfumerie &bull; Grasse
          </span>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[44px] leading-[1.08] text-[#f5f2eb] sm:text-[60px] lg:text-[72px]">
            Narrative in a Glass
          </h1>
          <p className="text-xs leading-relaxed tracking-wide text-[#d4cfc7] sm:text-[14px]">
            Cultivated formulations curated to command atmospheric space. Hand-blended extrait de parfum formulated with rare botanical essences.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link
              href={productPaths.list}
              className="cursor-pointer rounded-md bg-[#c5a880] px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#141414] transition-all hover:bg-[#d6bc96] active:scale-[0.98]"
            >
              Explore Scents
            </Link>
            <Link
              href="/categories"
              className="cursor-pointer rounded-md border border-[#f5f2eb]/40 bg-white/5 px-7 py-3.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#f5f2eb] backdrop-blur-xs transition-all hover:border-[#f5f2eb] hover:bg-white/10"
            >
              Categories
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Atmospheric Formulations (Featured Products) */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] sm:text-[40px] text-[#1a1a1a]">
              Atmospheric Formulations
            </h2>
            <p className="mt-1 text-xs text-[#605a54] sm:text-sm">
              Hand-blended extrait de parfum and cold-distilled botanical extractions.
            </p>
          </div>
          <Link
            href={productPaths.list}
            className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#c5a880] transition-colors hover:text-[#1a1a1a]"
          >
            <span>View All ({mockProducts.length})</span>
            <span>→</span>
          </Link>
        </div>

        {/* 4 Featured Products Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Scent Landscapes (Olfactory Notes) */}
      <section className="w-full border-y border-[#ebe6de] bg-[#f5f2eb]/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c5a880]">
              Sensory Horizons
            </span>
            <h2 className="mt-1 font-[family-name:var(--font-instrument-serif)] text-[32px] sm:text-[40px] text-[#1a1a1a]">
              Scent Landscapes
            </h2>
            <p className="mt-2 max-w-lg text-xs text-[#605a54] sm:text-sm">
              Journey through sensory territories from nocturnal white blossoms to ancient resinous woods.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Floral",
                notes: "Jasmine & White Musk",
                image: "/images/products/fleur-de-lune.png",
                href: `${productPaths.list}?scentFamily=floral`,
              },
              {
                title: "Woody",
                notes: "Sandalwood & Papyrus",
                image: "/images/products/santal-parchment.png",
                href: `${productPaths.list}?scentFamily=woody`,
              },
              {
                title: "Oriental",
                notes: "Amber & Dark Tobacco",
                image: "/images/products/noir-cocoon.png",
                href: `${productPaths.list}?scentFamily=oriental`,
              },
              {
                title: "Fresh",
                notes: "Bergamot & Sea Salt",
                image: "/images/products/sol-dor.png",
                href: `${productPaths.list}?scentFamily=fresh`,
              },
            ].map((landscape) => (
              <Link
                key={landscape.title}
                href={landscape.href}
                className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-xl border border-[#ebe6de] p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={landscape.image}
                  alt={landscape.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="relative z-10 flex flex-col text-white">
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-[#f5f2eb]">
                    {landscape.title}
                  </h3>
                  <p className="text-[11px] text-[#c5a880]">{landscape.notes}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Curations of Scent Occasions */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16">
        <div className="flex flex-col items-center text-center">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c5a880]">
            Moments of Note
          </span>
          <h2 className="mt-1 font-[family-name:var(--font-instrument-serif)] text-[32px] sm:text-[40px] text-[#1a1a1a]">
            Curations of Scent Occasions
          </h2>
          <p className="mt-2 max-w-md text-xs text-[#605a54] sm:text-sm">
            Composed formulations tuned to intimacy, ceremonial gatherings, and thoughtful offerings.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Personal Ritual",
              tagline: "Intimate signature wear for daily presence.",
              image: "/images/products/fleur-de-lune.png",
              href: `${productPaths.list}?occasion=personal-use`,
            },
            {
              title: "The Ceremonial",
              tagline: "Opulent compositions for celebrations and galas.",
              image: "/images/products/noir-cocoon.png",
              href: `${productPaths.list}?occasion=wedding`,
            },
            {
              title: "Curated Gift Sets",
              tagline: "Artisanal pairings encased in keepsake boxes.",
              image: "/images/products/atelier-oud.png",
              href: `${productPaths.list}?occasion=gift-sets`,
            },
            {
              title: "Milestone Bouquets",
              tagline: "Unforgettable fragrances to commemorate new eras.",
              image: "/images/products/rose-absolute.png",
              href: `${productPaths.list}?occasion=birthday`,
            },
          ].map((occ) => (
            <Link
              key={occ.title}
              href={occ.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#ebe6de] bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a880]/60 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#f5f2eb]">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                />
              </div>
              <div className="mt-4 flex flex-col">
                <h3 className="font-[family-name:var(--font-instrument-serif)] text-[22px] text-[#1a1a1a] transition-colors group-hover:text-[#c5a880]">
                  {occ.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#605a54]">
                  {occ.tagline}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#c5a880]">
                  <span>Discover Curations</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. The Atelier Split Banner ("Inspiration of the Secret Collection") */}
      <section className="mx-auto mb-16 w-full max-w-7xl px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[#ebe6de] bg-white shadow-sm lg:grid-cols-2">
          {/* Left Imagery */}
          <div className="relative min-h-[320px] w-full bg-[#2b2723] lg:min-h-[440px]">
            <Image
              src="/images/products/atelier-oud.png"
              alt="The Grasse Atelier"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
          </div>

          {/* Right Narrative Copy */}
          <div className="flex flex-col items-start justify-center p-8 sm:p-12 lg:p-16">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a880]">
              The Grasse Atelier
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-instrument-serif)] text-[34px] leading-tight text-[#1a1a1a] sm:text-[44px]">
              Inspiration of the Secret Collection
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-[#605a54] sm:text-sm">
              Rooted in the timeless traditions of Grasse, our noses extract the volatile soul of rare flora and ancient resins. Each numbered flacon undergoes six months of slow maceration in dark glass to achieve distinguished depth and harmonic projection.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={`${productPaths.list}?category=private-reserve`}
                className="cursor-pointer rounded-md bg-[#1a1a1a] px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-white transition-all hover:bg-black active:scale-[0.98]"
              >
                Explore Private Reserve
              </Link>
              <Link
                href="/categories"
                className="cursor-pointer rounded-md border border-[#ebe6de] bg-white px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#1a1a1a] transition-all hover:bg-[#faf8f5]"
              >
                All Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Order & Scent Consultation Strip */}
      <section className="border-t border-[#ebe6de] bg-[#f5f2eb]/70 py-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c5a880]">
            Personal Concierge
          </span>
          <h2 className="mt-1 font-[family-name:var(--font-instrument-serif)] text-3xl text-[#1a1a1a] sm:text-4xl">
            Order &amp; Scent Consultation
          </h2>
          <p className="mt-2 max-w-md text-xs leading-relaxed text-[#605a54] sm:text-sm">
            Receive personalized olfactory guidance from our resident noses to find or formulate your signature aura.
          </p>

          <form
            onSubmit={handleConsultSubmit}
            className="mt-6 flex w-full max-w-md flex-col gap-2.5 sm:flex-row"
          >
            <input
              type="email"
              required
              value={consultEmail}
              onChange={(e) => setConsultEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] placeholder-[#8a857f] outline-none focus:border-[#c5a880]"
            />
            <button
              type="submit"
              className="shrink-0 cursor-pointer rounded-md bg-[#1a1a1a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-black active:scale-[0.98]"
            >
              {consultSubmitted ? "Requested ✓" : "Consult"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
