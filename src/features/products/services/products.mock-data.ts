import type { Product } from "@/features/products/types/product.types";

export const mockProducts: Product[] = [
  {
    id: "fleur-de-lune",
    name: "Fleur de Lune",
    description:
      "A luminous floral composition of night-blooming jasmine and velvety white musk.",
    notes: "Floral / Jasmine & White Musk",
    price: 195,
    images: [
      "/images/products/fleur-de-lune.png",
      "/images/products/rose-absolute.png",
      "/images/products/sol-dor.png",
    ],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "personal-use",
    options: [
      {
        id: "size",
        name: "Size",
        values: ["50ml", "100ml"],
      },
    ],
    details: {
      scentAnatomy: {
        top: "Neroli Petals, Dewy Bergamot, White Peach",
        heart: "Night-blooming Jasmine, Grasse Tuberose, Muguet",
        base: "White Musk, Soft Amber, Blonde Cedar",
        narrative:
          "Harvested at twilight to preserve the ethereal sweetness of nocturnal white blossoms.",
      },
      concentration: "Eau de Parfum (22% concentration)",
      longevity: "7–10 hours with delicate sillage",
      sillage: "Soft to moderate trail",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Benzyl Salicylate, Hydroxycitronellal, Geraniol, Citronellol. Vegan & cruelty-free.",
    },
  },
  {
    id: "santal-parchment",
    name: "Santal Parchment",
    description:
      "Warm sandalwood layered with crushed cardamom, smoky papyrus, and radiant cedar.",
    notes: "Woody / Sandalwood & Cardamom",
    price: 220,
    images: [
      "/images/products/santal-parchment.png",
      "/images/products/atelier-oud.png",
      "/images/products/noir-cocoon.png",
    ],
    category: "pure-extractions",
    scentFamily: "woody",
    occasion: "personal-use",
    options: [
      {
        id: "size",
        name: "Size",
        values: ["50ml", "100ml"],
      },
    ],
    details: {
      scentAnatomy: {
        top: "Guatemalan Cardamom, Italian Bergamot, Cracked Coriander",
        heart: "Sandalwood Album, Papyrus Smoke, Tuscan Orris",
        base: "Atlas Cedarwood, Warm Amber, Soft Benzoin",
        narrative:
          "An evocative study of sacred woods, antique bindings, and handwritten manuscripts resting in quiet afternoon sun.",
      },
      concentration: "Extrait de Parfum (28% concentration)",
      longevity: "9–12 hours of distinguished wear",
      sillage: "Moderate to captivating sillage",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Santalum Album Wood Oil, Cardamom Seed Extract, Alpha-Isomethyl Ionone, Eugenol, Limonene. Ethically harvested.",
    },
  },
  {
    id: "noir-cocoon",
    name: "Noir Cocoon",
    description:
      "An opulent oriental blend of pipe tobacco, tonka bean, and molten golden amber.",
    notes: "Oriental / Tobacco & Amber",
    price: 240,
    images: [
      "/images/products/noir-cocoon.png",
      "/images/products/santal-parchment.png",
      "/images/products/atelier-oud.png",
    ],
    category: "private-reserve",
    scentFamily: "oriental",
    occasion: "wedding",
    options: [
      {
        id: "size",
        name: "Size",
        values: ["50ml", "100ml"],
      },
    ],
    details: {
      scentAnatomy: {
        top: "Bitter Almond, Rum Absolute, Clove Bud",
        heart: "Burley Tobacco Leaf, Tonka Bean, Cocoa Pod",
        base: "Golden Amber, Madagascar Vanilla, Dark Patchouli",
      },
      concentration: "Extrait de Parfum (30% concentration)",
      longevity: "12+ hours with rich projection",
      sillage: "Bold and memorable",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Coumarin, Cinnamal, Linalool, Eugenol. Formulated in Grasse.",
    },
  },
  {
    id: "sol-dor",
    name: "Sol d'Or",
    description:
      "A fresh coastal blend of sunlit bergamot, mineral sea salt, and maritime cypress.",
    notes: "Fresh / Bergamot & Sea Salt",
    price: 185,
    images: [
      "/images/products/sol-dor.png",
      "/images/products/fleur-de-lune.png",
      "/images/products/rose-absolute.png",
    ],
    category: "pure-extractions",
    scentFamily: "fresh",
    occasion: "personal-use",
    options: [
      {
        id: "size",
        name: "Size",
        values: ["50ml", "100ml"],
      },
    ],
    details: {
      scentAnatomy: {
        top: "Calabrian Bergamot, Sea Salt, Pink Grapefruit",
        heart: "Maritime Pine, Rosemary, Neroli",
        base: "Driftwood, White Musk, Vetiver",
      },
      concentration: "Eau de Parfum (20% concentration)",
      longevity: "6–8 hours of radiant freshness",
      sillage: "Crisp and airy",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool, Citral. Hand-bottled.",
    },
  },
  {
    id: "atelier-oud",
    name: "Atelier Oud",
    description:
      "Rich Cambodian oud deepened with Persian saffron, smoky incense, and dark rose.",
    notes: "Woody / Rich Oud & Saffron",
    price: 310,
    images: [
      "/images/products/atelier-oud.png",
      "/images/products/santal-parchment.png",
      "/images/products/noir-cocoon.png",
    ],
    category: "atelier-oils",
    scentFamily: "woody",
    occasion: "gift-sets",
    options: [
      {
        id: "size",
        name: "Size",
        values: ["50ml", "100ml"],
      },
    ],
    details: {
      scentAnatomy: {
        top: "Red Saffron, Incense, Bergamot",
        heart: "Wild Cambodian Oud, Taif Rose, Leather",
        base: "Smoky Amber, Castoreum Accord, Birch Tar",
      },
      concentration: "Pure Perfume Oil (32% concentration)",
      longevity: "14+ hours of enduring presence",
      sillage: "Deep and enveloping",
      ingredients:
        "Parfum (Fragrance), Dipropylene Glycol, Aquilaria Agallocha Oil, Saffron Extract. Alcohol-free oil base.",
    },
  },
  {
    id: "rose-absolute",
    name: "Rose Absolute",
    description:
      "Centifolia rose petals balanced with virginian cedarwood and pink peppercorn.",
    notes: "Floral / Damask Rose & Cedar",
    price: 205,
    images: [
      "/images/products/rose-absolute.png",
      "/images/products/fleur-de-lune.png",
      "/images/products/sol-dor.png",
    ],
    category: "private-reserve",
    scentFamily: "floral",
    occasion: "birthday",
    options: [
      {
        id: "size",
        name: "Size",
        values: ["50ml", "100ml"],
      },
    ],
    details: {
      scentAnatomy: {
        top: "Pink Pepper, Blackcurrant Bud, Raspberry",
        heart: "Centifolia Rose, Damask Rose Absolute, Geranium",
        base: "Virginian Cedarwood, Cashmeran, White Musk",
      },
      concentration: "Eau de Parfum (24% concentration)",
      longevity: "8–10 hours",
      sillage: "Romantic and graceful",
      ingredients:
        "Alcohol Denat., Parfum (Fragrance), Aqua, Citronellol, Geraniol, Eugenol. 100% Recyclable packaging.",
    },
  },
];
