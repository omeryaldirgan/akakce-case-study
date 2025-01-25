import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import StorageOptions from "~/components/StorageOptions";

describe("StorageOptions Component", () => {
  const options = ["64GB", "128GB", "256GB"];
  const mockOnChange = vi.fn();

  test("renders all options correctly", () => {
    render(<StorageOptions options={options} onChange={mockOnChange} />);

    options.forEach((option) => {
      expect(
        screen.getByTestId(`storage-option-${option}`)
      ).toBeInTheDocument();
    });
  });

  test("selects an option when clicked", async () => {
    render(<StorageOptions options={options} onChange={mockOnChange} />);

    const optionToSelect = screen.getByTestId("storage-option-128GB");

    fireEvent.click(optionToSelect);

    // `waitFor` kullanarak class değişikliğini bekliyoruz
    await screen.findByTestId("storage-option-128GB");

    expect(optionToSelect).toHaveClass(
      "border-indigo-500 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-white"
    );
    expect(mockOnChange).toHaveBeenCalledWith("128GB");
  });

  test("ensures only one option is selected at a time", async () => {
    render(<StorageOptions options={options} onChange={mockOnChange} />);

    const firstOption = screen.getByTestId("storage-option-64GB");
    const secondOption = screen.getByTestId("storage-option-256GB");

    fireEvent.click(firstOption);
    await screen.findByTestId("storage-option-64GB");

    expect(firstOption).toHaveClass("border-indigo-500");

    fireEvent.click(secondOption);
    await screen.findByTestId("storage-option-256GB");

    expect(secondOption).toHaveClass("border-indigo-500");
    expect(firstOption).not.toHaveClass("border-indigo-500"); // İlk seçeneğin seçili olmaması gerekiyor
  });
});
