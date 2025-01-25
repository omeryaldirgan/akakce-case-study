import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, test, expect, vi } from "vitest";
import Header from "~/components/Header";

describe("Header Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  test("renders the header with logo and navigation links", () => {
    render(<Header />);

    expect(screen.getByAltText("Akakçe")).toBeInTheDocument();
    expect(screen.getByText("Hesap Aç")).toBeInTheDocument();
    expect(screen.getByText("Giriş Yap")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent(/☀️/);
  });

  test("toggles dark mode on button click", () => {
    render(<Header />);
    const themeButton = screen.getByRole("button");

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(themeButton.textContent).toBe("☀️");

    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(themeButton.textContent).toBe("🌙");

    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(themeButton.textContent).toBe("☀️");
  });

  test("persists dark mode preference in localStorage", () => {
    vi.spyOn(Storage.prototype, "setItem");

    render(<Header />);
    const themeButton = screen.getByRole("button");

    fireEvent.click(themeButton);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");

    fireEvent.click(themeButton);
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
  });

  test("initializes dark mode correctly from localStorage", () => {
    localStorage.setItem("theme", "dark");
    render(<Header />);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByRole("button").textContent).toBe("🌙");
  });
});
