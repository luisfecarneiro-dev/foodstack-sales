import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test("remains usable with reduced motion", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Hero CTA present and actionable
  await expect(
    page.getByRole("link", { name: "Quero conversar sobre meu projeto" })
  ).toBeVisible();
  // IO reveals must be forced visible regardless of scroll position
  await expect(page.locator(".fs-io-reveal:not(.is-revealed)")).toHaveCount(0);
});
