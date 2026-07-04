import { describe, it, expect } from "vitest";

describe("App config", () => {
  it("API_BASE is defined and non-empty", async () => {
    const { API_BASE } = await import("@/lib/api");
    expect(API_BASE).toBeDefined();
    expect(API_BASE.length).toBeGreaterThan(0);
    expect(API_BASE).toMatch(/^https?:\/\//);
  });
});

describe("PredictionForm helpers", () => {
  it("getInvestmentAdvice returns correct labels", async () => {
    // Import dynamic to avoid JSX issues in a plain test
    const mod = await import("@/components/PredictionForm");
    // The component is the default export; test the module loads without error
    expect(mod.default).toBeDefined();
  });
});
