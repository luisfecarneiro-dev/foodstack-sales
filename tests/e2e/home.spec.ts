import { test, expect } from "@playwright/test";

test("renders core FoodStack sales content", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Seu cardápio");
  await expect(page.getByText("Take Burguer & João Gastrobar")).toBeVisible();
  await expect(page.getByText("Chalezinho do Capivara")).toBeVisible();
});

test("primary WhatsApp CTA targets the FoodStack number", async ({ page }) => {
  await page.goto("/");
  const cta = page.getByRole("link", { name: "Quero conversar sobre meu projeto" });
  await expect(cta).toHaveAttribute("href", /wa\.me\/5531972198583/);
});

test("reveal elements resolve to visible state", async ({ page }) => {
  await page.goto("/");
  const caseSection = page.locator("#projetos");
  await caseSection.scrollIntoViewIfNeeded();
  await expect(caseSection.locator(".fs-io-reveal.is-revealed").first()).toBeVisible();
});
