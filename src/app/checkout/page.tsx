"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hooks/useCart";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { productPaths } from "@/features/products/paths";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type DeliveryMethod = "standard" | "express";
type PaymentMethod = "card" | "apple_pay" | "paypal";

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, total, quantity, clearCart } = useCart();

  // Form states
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [phone, setPhone] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");

  // Promo code
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Submitting / completed state
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const shippingPrice = deliveryMethod === "express" ? 25 : total >= 150 ? 0 : 15;
  const discountAmount = promoApplied ? total * 0.1 : 0;
  const finalTotal = Math.max(0, total - discountAmount + shippingPrice);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setPromoApplied(true);
      alert("Promotional code applied: 10% Maison courtesy discount.");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (lines.length === 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrder = `OD-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrder);
      setIsProcessing(false);
      setIsOrderPlaced(true);
      if (clearCart) {
        clearCart();
      }
    }, 1500);
  };

  if (isOrderPlaced) {
    return (
      <div className="min-h-[70vh] bg-[#faf8f5] px-4 py-20 text-[#1a1a1a]">
        <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-[#ebe6de] bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#f5f2eb] text-[#c5a880]">
            <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>

          <span className="mt-6 text-[11px] font-semibold tracking-[0.25em] uppercase text-[#c5a880]">
            Order Confirmed
          </span>

          <h1 className="mt-2 font-[family-name:var(--font-instrument-serif)] text-3xl text-[#1a1a1a] sm:text-4xl">
            Thank You for Your Order
          </h1>

          <p className="mt-3 text-xs leading-relaxed text-[#605a54] sm:text-sm">
            Your creation has been received by our atelier in Grasse. An order receipt and tracking notification have been sent to{" "}
            <strong>{email || "your email"}</strong>.
          </p>

          <div className="mt-6 w-full rounded-lg bg-[#faf8f5] p-4 text-xs text-[#605a54]">
            <div className="flex justify-between border-b border-[#ebe6de] pb-2">
              <span>Order Reference</span>
              <span className="font-semibold text-[#1a1a1a]">{orderNumber}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span>Estimated Delivery</span>
              <span className="font-medium text-[#1a1a1a]">
                {deliveryMethod === "express" ? "1–2 Business Days" : "3–5 Business Days"}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/"
              className="cursor-pointer rounded-md bg-[#1a1a1a] px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all hover:bg-black"
            >
              Return Home
            </Link>
            <Link
              href={productPaths.list}
              className="cursor-pointer rounded-md border border-[#ebe6de] bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#1a1a1a] transition-all hover:bg-[#faf8f5]"
            >
              Continue Exploring
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="min-h-[60vh] bg-[#faf8f5] px-4 py-20 text-[#1a1a1a]">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl text-[#1a1a1a]">
            Your Bag is Empty
          </h1>
          <p className="mt-2 text-xs text-[#605a54]">
            Add items to your cart before proceeding to checkout.
          </p>
          <Link
            href={productPaths.list}
            className="mt-6 inline-flex cursor-pointer rounded-md bg-[#1a1a1a] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-black"
          >
            Explore Fragrances
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1a1a1a]">
      {/* Breadcrumbs */}
      <ProductBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:px-10 lg:px-16 lg:pb-28">
        {/* Header */}
        <div className="border-b border-[#ebe6de] pb-6">
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-[36px] sm:text-[46px] text-[#1a1a1a]">
            Checkout
          </h1>
          <p className="mt-1 text-xs text-[#605a54] sm:text-[13px]">
            Complete your order with secure 256-bit encryption and complimentary packaging.
          </p>
        </div>

        {/* 2-Column Grid */}
        <form onSubmit={handlePlaceOrder} className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px]">
          {/* Left Column: Form Steps */}
          <div className="flex flex-col gap-10">
            {/* Step 1: Contact Information */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                  1. Contact Information
                </h2>
                <span className="text-xs text-[#8a857f]">
                  Have an account?{" "}
                  <button
                    type="button"
                    onClick={() => alert("Sign In Modal")}
                    className="cursor-pointer text-[#c5a880] underline hover:text-[#b08e62]"
                  >
                    Sign In
                  </button>
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address for order confirmation"
                  className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] placeholder-[#8a857f] outline-none transition-colors focus:border-[#c5a880]"
                />
                <label className="flex cursor-pointer items-center gap-2 text-xs text-[#605a54]">
                  <input
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="size-4 accent-[#1a1a1a]"
                  />
                  <span>Keep me informed of private vault releases and olfactory essays</span>
                </label>
              </div>
            </div>

            <div className="h-px w-full bg-[#ebe6de]" />

            {/* Step 2: Shipping Address */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                2. Shipping Address
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                />
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                />
              </div>

              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address"
                className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
              />

              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Apartment, suite, unit (optional)"
                className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                />
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="State / Region"
                  className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                />
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Postal code"
                  className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Japan">Japan</option>
                </select>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone for delivery updates"
                  className="w-full rounded-md border border-[#ebe6de] bg-white px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                />
              </div>
            </div>

            <div className="h-px w-full bg-[#ebe6de]" />

            {/* Step 3: Delivery Options */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                3. Delivery Method
              </h2>

              <div className="flex flex-col gap-3">
                <label
                  onClick={() => setDeliveryMethod("standard")}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${
                    deliveryMethod === "standard"
                      ? "border-[#1a1a1a] bg-white shadow-xs"
                      : "border-[#ebe6de] bg-white/60 hover:border-[#1a1a1a]/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "standard"}
                      onChange={() => setDeliveryMethod("standard")}
                      className="size-4 accent-[#1a1a1a]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#1a1a1a]">
                        Maison Complimentary Standard
                      </p>
                      <p className="text-[11px] text-[#605a54]">
                        3–5 business days &bull; Handcrafted protective packaging
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-800">
                    {total >= 150 ? "Free" : "$15.00"}
                  </span>
                </label>

                <label
                  onClick={() => setDeliveryMethod("express")}
                  className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all ${
                    deliveryMethod === "express"
                      ? "border-[#1a1a1a] bg-white shadow-xs"
                      : "border-[#ebe6de] bg-white/60 hover:border-[#1a1a1a]/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryMethod === "express"}
                      onChange={() => setDeliveryMethod("express")}
                      className="size-4 accent-[#1a1a1a]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#1a1a1a]">
                        Concierge Express Courier
                      </p>
                      <p className="text-[11px] text-[#605a54]">
                        1–2 business days &bull; Priority tracking &amp; signature
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#1a1a1a]">
                    $25.00
                  </span>
                </label>
              </div>
            </div>

            <div className="h-px w-full bg-[#ebe6de]" />

            {/* Step 4: Payment Information */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">
                4. Payment Method
              </h2>

              {/* Payment Tabs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "card", label: "Credit Card" },
                  { id: "apple_pay", label: "Apple Pay" },
                  { id: "paypal", label: "PayPal" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setPaymentMethod(tab.id as PaymentMethod)}
                    className={`cursor-pointer rounded-md border py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                      paymentMethod === tab.id
                        ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                        : "border-[#ebe6de] bg-white text-[#605a54] hover:border-[#1a1a1a]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {paymentMethod === "card" && (
                <div className="flex flex-col gap-3 rounded-lg border border-[#ebe6de] bg-white p-4">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card number (e.g. 4532 •••• •••• ••••)"
                    className="w-full rounded-md border border-[#ebe6de] bg-[#faf8f5] px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full rounded-md border border-[#ebe6de] bg-[#faf8f5] px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                    />
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC / CVV"
                      className="w-full rounded-md border border-[#ebe6de] bg-[#faf8f5] px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name on card"
                    className="w-full rounded-md border border-[#ebe6de] bg-[#faf8f5] px-4 py-3 text-xs text-[#1a1a1a] outline-none focus:border-[#c5a880]"
                  />
                </div>
              )}

              {paymentMethod !== "card" && (
                <div className="rounded-lg border border-[#ebe6de] bg-[#faf8f5] p-6 text-center text-xs text-[#605a54]">
                  You will be securely redirected to {paymentMethod === "apple_pay" ? "Apple Pay" : "PayPal"} upon clicking Place Order.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: In Your Bag & Order Summary */}
          <div className="flex flex-col gap-6">
            {/* Bag Review Section */}
            <div className="rounded-xl border border-[#ebe6de] bg-white p-6 shadow-xs">
              <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-[#1a1a1a]">
                In Your Bag ({quantity})
              </h3>

              <div className="mt-4 flex max-h-[300px] flex-col divide-y divide-[#ebe6de] overflow-y-auto pr-1">
                {lines.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-3">
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-[#f5f2eb]">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <div className="size-full bg-[#f5f2eb]" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <span className="font-[family-name:var(--font-instrument-serif)] text-base text-[#1a1a1a]">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-[#8a857f]">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[#1a1a1a]">
                      {formatWholePrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown Card */}
            <div className="rounded-xl border border-[#ebe6de] bg-white p-6 shadow-xs">
              <h3 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-[#1a1a1a]">
                Order Summary
              </h3>

              {/* Promo code field */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo or gift code"
                  className="w-full rounded-md border border-[#ebe6de] bg-[#faf8f5] px-3 py-2 text-xs uppercase outline-none focus:border-[#c5a880]"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="cursor-pointer rounded-md border border-[#ebe6de] bg-white px-4 py-2 text-xs font-semibold uppercase text-[#1a1a1a] transition-colors hover:border-[#1a1a1a]"
                >
                  Apply
                </button>
              </div>

              {/* Pricing breakdown */}
              <div className="mt-5 flex flex-col gap-3 border-b border-[#ebe6de] pb-4 text-xs text-[#605a54]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1a1a1a]">{formatWholePrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping ({deliveryMethod === "express" ? "Express" : "Standard"})</span>
                  <span className={shippingPrice === 0 ? "font-medium text-emerald-800" : "text-[#1a1a1a]"}>
                    {shippingPrice === 0 ? "Complimentary" : formatWholePrice(shippingPrice)}
                  </span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-[#c5a880]">
                    <span>Courtesy Discount (10%)</span>
                    <span>-{formatWholePrice(Math.round(discountAmount))}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Taxes</span>
                  <span>Calculated</span>
                </div>
              </div>

              {/* Total & Submit Button */}
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm font-semibold text-[#1a1a1a]">Total</span>
                <span className="text-2xl font-bold text-[#1a1a1a]">
                  {formatWholePrice(Math.round(finalTotal))}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-md bg-[#1a1a1a] py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-black active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isProcessing ? "Processing Secure Order..." : `Place Order • ${formatWholePrice(Math.round(finalTotal))}`}
              </button>

              {/* Security Trust Badges */}
              <div className="mt-5 flex flex-col gap-2 border-t border-[#ebe6de] pt-4 text-[11px] text-[#8a857f]">
                <div className="flex items-center gap-2">
                  <svg className="size-4 shrink-0 text-[#c5a880]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span>256-Bit SSL Encrypted Concierge Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="size-4 shrink-0 text-[#c5a880]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  <span>Includes two complimentary luxury discovery samples</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
