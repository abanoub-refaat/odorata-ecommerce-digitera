import { render, screen, fireEvent } from "@testing-library/react";
import { ProductDetails } from "./ProductDetails";
import type { Product } from "@/features/products/types/product.types";

const mockProduct: Product = {
  id: "santal-parchment",
  name: "Santal Parchment",
  description: "Warm sandalwood layered with crushed cardamom.",
  notes: "Woody / Sandalwood & Cardamom",
  price: 220,
  images: ["/images/products/santal-parchment.png"],
  category: "pure-extractions",
  scentFamily: "woody",
  occasion: "personal-use",
  options: [{ id: "size", name: "Size", values: ["50ml", "100ml"] }],
  details: {
    scentAnatomy: {
      top: "Cardamom, Bergamot",
      heart: "Sandalwood, Papyrus",
      base: "Cedarwood, Amber",
      narrative: "An evocative study of sacred woods.",
    },
    concentration: "Extrait de Parfum (28%)",
    longevity: "9–12 hours",
    sillage: "Moderate to captivating",
    ingredients: "Alcohol Denat., Parfum, Aqua.",
  },
};

describe("ProductDetails component", () => {
  it("renders product name, notes, price, and stock status", () => {
    render(<ProductDetails product={mockProduct} />);

    expect(
      screen.getByRole("heading", { name: "Santal Parchment" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Woody / Sandalwood & Cardamom"),
    ).toBeInTheDocument();
    expect(screen.getByText("$220")).toBeInTheDocument();
    expect(screen.getByText("In Stock")).toBeInTheDocument();
    expect(
      screen.getByText("Warm sandalwood layered with crushed cardamom."),
    ).toBeInTheDocument();
  });

  it("renders and toggles accordions", () => {
    render(<ProductDetails product={mockProduct} />);

    // Scent Anatomy should be open by default
    expect(
      screen.getByText(/An evocative study of sacred woods/i),
    ).toBeInTheDocument();

    // Longevity accordion toggle
    const longevityButton = screen.getByRole("button", {
      name: /longevity & sillage/i,
    });
    fireEvent.click(longevityButton);
    expect(screen.getByText("Extrait de Parfum (28%)")).toBeInTheDocument();

    // Ingredients accordion toggle
    const ingredientsButton = screen.getByRole("button", {
      name: /ingredients & care/i,
    });
    fireEvent.click(ingredientsButton);
    expect(
      screen.getByText(/Alcohol Denat., Parfum, Aqua/),
    ).toBeInTheDocument();
  });
});
