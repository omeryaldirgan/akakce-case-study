import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import ProductCard from "~/components/ProductCard";
import { Product } from "~/models/Product";

vi.mock("@remix-run/react", async () => {
  const actual = await vi.importActual("@remix-run/react");
  return {
    ...actual,
    Link: ({
      to,
      className,
      children,
    }: {
      to: string;
      className?: string;
      children: React.ReactNode;
    }) => (
      <a href={to} className={className}>
        {children}
      </a>
    ),
  };
});

vi.mock("~/utils/common", () => ({
  formatPrice: vi.fn((price) => `20.567`),
}));

const mockProduct: Product = {
  code: 102,
  name: "iPhone 13 128GB",
  imageUrl: "https://cdn.akakce.com/x/apple/iphone-13.jpg",
  price: 20567,
  countOfPrices: 96,
  dropRatio: 5,
  followCount: 5000,
  url: "/products/102",
};

describe("ProductCard Component", () => {
  test("renders product name and price correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();

    expect(screen.getByText("20.567 TL")).toBeInTheDocument();
  });

  test("displays dropRatio badge when dropRatio > 0", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(`%${mockProduct.dropRatio}`)).toBeInTheDocument();
  });

  test("hides dropRatio badge when dropRatio is 0", () => {
    render(<ProductCard product={{ ...mockProduct, dropRatio: 0 }} />);

    expect(
      screen.queryByText(`%${mockProduct.dropRatio}`)
    ).not.toBeInTheDocument();
  });
});
