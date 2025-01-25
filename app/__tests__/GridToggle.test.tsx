import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import GridToggle from "~/components/GridToggle";

describe("GridToggle Component", () => {
  test("renders all grid buttons correctly", () => {
    const mockSetGridCols = vi.fn();
    render(<GridToggle gridCols={3} setGridCols={mockSetGridCols} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3);
  });

  test("correct button is highlighted based on gridCols prop", () => {
    const mockSetGridCols = vi.fn();
    render(<GridToggle gridCols={3} setGridCols={mockSetGridCols} />);

    const buttons = screen.getAllByRole("button");

    expect(buttons[1]).toHaveClass("bg-blue-600 text-white");
    expect(buttons[0]).not.toHaveClass("bg-blue-600 text-white");
    expect(buttons[2]).not.toHaveClass("bg-blue-600 text-white");
  });

  test("calls setGridCols when a button is clicked", () => {
    const mockSetGridCols = vi.fn();
    render(<GridToggle gridCols={3} setGridCols={mockSetGridCols} />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[2]);

    expect(mockSetGridCols).toHaveBeenCalledTimes(1);
    expect(mockSetGridCols).toHaveBeenCalledWith(4);
  });
});
