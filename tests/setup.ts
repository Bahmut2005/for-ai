import "@testing-library/jest-dom";
import { beforeAll, afterAll } from "vitest";

const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const msg = typeof args[0] === "string" ? args[0] : "";
    if (msg.includes("Warning:") || msg.includes("act(")) return;
    originalError(...args);
  };
});
afterAll(() => {
  console.error = originalError;
});
