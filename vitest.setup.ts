import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Her testten sonra temizleme işlemi
afterEach(() => {
  cleanup();
});
