import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect } from "vitest";
import ProductRating from "~/components/ProductRating";

describe("ProductRating Component", () => {
  test("renders all stars as empty when rating is 0", () => {
    render(<ProductRating rating={0} />);

    const emptyStars = screen.getAllByRole("img", {
      name: "star-empty",
      hidden: true,
    });

    expect(emptyStars.length).toBe(5); // Tüm yıldızlar boş olmalı
  });

  test("renders all stars as filled when rating is 5", () => {
    render(<ProductRating rating={5} />);

    const filledStars = screen.getAllByRole("img", {
      name: "star-filled",
      hidden: true,
    });

    expect(filledStars.length).toBe(5); // Tüm yıldızlar dolu olmalı
  });

  test("renders correct number of filled and empty stars", () => {
    render(<ProductRating rating={3} />);

    const filledStars = screen.getAllByRole("img", {
      name: "star-filled",
      hidden: true,
    });
    const emptyStars = screen.getAllByRole("img", {
      name: "star-empty",
      hidden: true,
    });

    expect(filledStars.length).toBe(3);
    expect(emptyStars.length).toBe(2);
  });
});
