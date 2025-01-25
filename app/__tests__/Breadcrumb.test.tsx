import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import Breadcrumb from "~/components/Breadcrumb";

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

describe("Breadcrumb Component", () => {
  const productName = "iPhone 15 Pro Max";

  test("renders breadcrumb correctly", () => {
    render(<Breadcrumb productName={productName} />);

    const homeLink = screen.getByText("Ürünler");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
    expect(screen.getByText("/")).toBeInTheDocument();
    expect(screen.getByText(productName)).toBeInTheDocument();
  });
});
