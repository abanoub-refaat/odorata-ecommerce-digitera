"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart";
import { productPaths } from "@/features/products";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const router = useRouter();
  const { quantity: cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${productPaths.list}?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#ebe6de] bg-white/95 backdrop-blur-md transition-all">
      {/* 1. Top Announcement Banner */}
      <div className="flex h-8 w-full items-center justify-center bg-[#1a1a1a] px-4 text-center">
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#f5f2eb] sm:text-[11px]">
          Complimentary shipping on all domestic orders over $150 &bull; Two luxury samples with every order
        </p>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Left Navigation (Desktop) */}
        <nav className="hidden items-center gap-7 text-[12px] font-medium tracking-[0.15em] uppercase text-[#1a1a1a] lg:flex">
          <Link
            href={productPaths.list}
            className="transition-colors hover:text-[#c5a880]"
          >
            Shop
          </Link>
          <Link
            href="/categories"
            className="transition-colors hover:text-[#c5a880]"
          >
            Collections
          </Link>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Our Story & Philosophy - Coming soon to Odorata Maison.");
            }}
            className="transition-colors hover:text-[#c5a880]"
          >
            About
          </Link>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Olfactory Journal - Volume IV is currently being published.");
            }}
            className="transition-colors hover:text-[#c5a880]"
          >
            Journal
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex size-10 items-center justify-center rounded-md text-[#1a1a1a] hover:bg-[#faf8f5] lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>

        {/* Center Brand Logo */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="font-[family-name:var(--font-instrument-serif)] text-[26px] tracking-[0.25em] text-[#1a1a1a] transition-opacity hover:opacity-85 sm:text-[30px]"
          >
            ODORATA
          </Link>
        </div>

        {/* Right Action Icons & Search */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search trigger (Desktop) */}
          <div className="relative hidden sm:block">
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search fragrances..."
                  className="w-48 rounded-md border border-[#ebe6de] bg-[#faf8f5] px-3 py-1.5 text-xs text-[#1a1a1a] placeholder-[#8a857f] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880] md:w-56"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-1.5 text-xs text-[#605a54] hover:text-[#1a1a1a]"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex cursor-pointer items-center gap-2 rounded-full px-2.5 py-1.5 text-[12px] font-medium text-[#605a54] transition-colors hover:text-[#1a1a1a]"
                aria-label="Search"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <span className="hidden md:inline text-xs tracking-wider uppercase">Search</span>
              </button>
            )}
          </div>

          {/* Account Icon Button */}
          <button
            type="button"
            onClick={() => setAccountModalOpen(true)}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full text-[#1a1a1a] transition-colors hover:bg-[#faf8f5]"
            aria-label="User Account"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>

          {/* Cart Icon & Live Count */}
          <Link
            href="/cart"
            className="relative flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-2 text-[#1a1a1a] transition-colors hover:bg-[#faf8f5]"
            aria-label="View Shopping Cart"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.188-.578-1.119-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="flex size-5 items-center justify-center rounded-full bg-[#1a1a1a] text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#ebe6de] bg-white px-6 py-6 lg:hidden">
          <form onSubmit={handleSearchSubmit} className="mb-6 flex w-full items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fragrances..."
              className="w-full rounded border border-[#ebe6de] bg-[#faf8f5] px-4 py-2.5 text-xs text-[#1a1a1a] placeholder-[#8a857f] outline-none focus:border-[#c5a880]"
            />
            <button
              type="submit"
              className="ml-2 rounded bg-[#1a1a1a] px-4 py-2.5 text-xs font-semibold uppercase text-white"
            >
              Search
            </button>
          </form>

          <nav className="flex flex-col gap-4 text-xs font-semibold tracking-[0.15em] uppercase text-[#1a1a1a]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#c5a880]"
            >
              Home
            </Link>
            <Link
              href={productPaths.list}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#c5a880]"
            >
              All Fragrances
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#c5a880]"
            >
              Categories
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between border-t border-[#ebe6de] pt-4 text-[#c5a880]"
            >
              <span>Shopping Cart</span>
              <span className="rounded bg-[#1a1a1a] px-2 py-0.5 text-[10px] text-white">
                {cartCount} items
              </span>
            </Link>
          </nav>
        </div>
      )}

      {/* Account Modal Mockup */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <button
              type="button"
              onClick={() => setAccountModalOpen(false)}
              className="absolute right-4 top-4 text-sm text-[#8a857f] hover:text-[#1a1a1a]"
            >
              ✕
            </button>
            <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-[#1a1a1a]">
              Maison Member
            </h3>
            <p className="mt-1 text-xs text-[#605a54]">
              Sign in to manage your orders, discovery consultations, and private reserve wishlist.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded border border-[#ebe6de] px-3.5 py-2.5 text-xs outline-none focus:border-[#c5a880]"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full rounded border border-[#ebe6de] px-3.5 py-2.5 text-xs outline-none focus:border-[#c5a880]"
              />
              <button
                type="button"
                onClick={() => {
                  alert("Logged into Odorata Maison account.");
                  setAccountModalOpen(false);
                }}
                className="mt-1 w-full rounded bg-[#1a1a1a] py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-black"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
