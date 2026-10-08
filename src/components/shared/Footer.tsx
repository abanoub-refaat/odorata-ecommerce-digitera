"use client";

import { useState } from "react";
import Link from "next/link";
import { productPaths } from "@/features/products";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#141414] text-[#a39f99]">
      {/* Top Newsletter Strip */}
      <div className="border-b border-[#262626]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:px-10 lg:flex-row lg:px-20 lg:py-12">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-wide text-[#f5f2eb] sm:text-3xl">
              Join the Odorata Circle
            </h3>
            <p className="mt-1 max-w-md text-xs tracking-wide text-[#8a857f] sm:text-[13px]">
              Receive private vault release notices, olfactory journal essays, and exclusive invitations.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md flex-col items-center gap-2.5 sm:flex-row"
          >
            <div className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded border border-[#333333] bg-[#1c1c1c] px-4 py-3 text-xs text-[#f5f2eb] placeholder-[#666] outline-none transition-colors focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]"
              />
            </div>
            <button
              type="submit"
              className="w-full shrink-0 cursor-pointer rounded bg-[#c5a880] px-6 py-3 text-xs font-semibold tracking-[0.15em] uppercase text-[#141414] transition-all hover:bg-[#d6bc96] active:scale-[0.99] sm:w-auto"
            >
              {subscribed ? "Joined ✓" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* Main 4-Column Navigation */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-20 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link
              href={productPaths.list}
              className="font-[family-name:var(--font-instrument-serif)] text-2xl tracking-[0.2em] text-[#f5f2eb] transition-opacity hover:opacity-90"
            >
              ODORATA
            </Link>
            <p className="text-xs leading-relaxed text-[#8a857f]">
              Curated artisanal formulations formulated with rare botanical essences and timeless alchemy. Handcrafted in Grasse, France.
            </p>
            {/* Social Icons */}
            <div className="mt-2 flex items-center gap-3">
              {[
                { name: "Instagram", label: "IG", href: "#" },
                { name: "Pinterest", label: "PT", href: "#" },
                { name: "X (Twitter)", label: "X", href: "#" },
                { name: "Journal", label: "JN", href: "#" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-label={item.name}
                  className="flex size-8 items-center justify-center rounded border border-[#2a2a2a] text-[11px] font-medium tracking-wider text-[#a39f99] transition-colors hover:border-[#c5a880] hover:text-[#f5f2eb]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="flex flex-col gap-3.5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c5a880]">
              Collections
            </p>
            <ul className="flex flex-col gap-2.5 text-xs text-[#8a857f]">
              <li>
                <Link
                  href={`${productPaths.list}?category=pure-extractions`}
                  className="transition-colors hover:text-[#f5f2eb]"
                >
                  Pure Extractions
                </Link>
              </li>
              <li>
                <Link
                  href={`${productPaths.list}?category=private-reserve`}
                  className="transition-colors hover:text-[#f5f2eb]"
                >
                  Private Reserve
                </Link>
              </li>
              <li>
                <Link
                  href={`${productPaths.list}?category=atelier-oils`}
                  className="transition-colors hover:text-[#f5f2eb]"
                >
                  Atelier Oils
                </Link>
              </li>
              <li>
                <Link
                  href={`${productPaths.list}?category=discovery-vault`}
                  className="transition-colors hover:text-[#f5f2eb]"
                >
                  Discovery Vault
                </Link>
              </li>
              <li>
                <Link
                  href={productPaths.list}
                  className="transition-colors hover:text-[#f5f2eb]"
                >
                  Gift Sets & Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: The Maison */}
          <div className="flex flex-col gap-3.5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c5a880]">
              The Maison
            </p>
            <ul className="flex flex-col gap-2.5 text-xs text-[#8a857f]">
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Our Story & Philosophy
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Artisanal Formulation
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Sustainable Sourcing
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Olfactory Journal
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Boutiques & Flagships
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Client Care */}
          <div className="flex flex-col gap-3.5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c5a880]">
              Client Care
            </p>
            <ul className="flex flex-col gap-2.5 text-xs text-[#8a857f]">
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Concierge & Consultation
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Complimentary Shipping
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-[#262626]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-[#736e68] sm:flex-row sm:px-10 lg:px-20">
          <p>© 2026 ODORATA Parfums. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
              Terms of Service
            </Link>
            <Link href="#" className="transition-colors hover:text-[#f5f2eb]">
              Cookie Settings
            </Link>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-[#c5a880]"
            >
              <span>Back to Top</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
