import { test, expect } from "@playwright/test";

/**
 * Security contract (padrão 07DevPage RP) verificado contra produção.
 * Executa após o webServer do Playwright subir o build completo com
 * middleware + CSP nonce ativos.
 */

test.describe("security headers", () => {
  test("serves CSP with per-request nonce and no external hosts", async ({
    request
  }) => {
    const res = await request.get("/");
    const csp = res.headers()["content-security-policy"] ?? "";
    expect(csp).toContain("script-src 'self' 'nonce-");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("upgrade-insecure-requests");
    expect(csp).not.toContain("strict-dynamic");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).not.toMatch(/script-src[^;]*https?:\/\//);
  });

  test("serves the full 07Dev security header set", async ({ request }) => {
    const res = await request.get("/");
    const h = res.headers();
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["strict-transport-security"]).toContain("max-age=63072000");
    expect(h["permissions-policy"]).toContain("camera=()");
    expect(h["cross-origin-opener-policy"]).toBe("same-origin-allow-popups");
    expect(h["cross-origin-resource-policy"]).toBe("same-origin");
    expect(h["origin-agent-cluster"]).toBe("?1");
    expect(h["x-powered-by"]).toBeUndefined();
  });

  test("nonce rotates between requests", async ({ request }) => {
    const a = (await request.get("/")).headers()["content-security-policy"];
    const b = (await request.get("/")).headers()["content-security-policy"];
    const nonceA = /'nonce-([^']+)'/.exec(a ?? "")?.[1];
    const nonceB = /'nonce-([^']+)'/.exec(b ?? "")?.[1];
    expect(nonceA).toBeTruthy();
    expect(nonceB).toBeTruthy();
    expect(nonceA).not.toBe(nonceB);
  });
});

test.describe("CSP runtime compliance", () => {
  test("page executes scripts with zero CSP violations", async ({ page }) => {
    const violations: string[] = [];
    page.on("console", (m) => {
      if (
        m.type() === "error" &&
        /Content Security Policy|Refused to/i.test(m.text())
      ) {
        violations.push(m.text());
      }
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForSelector('a:has-text("Quero conversar")');
    // Leva um bloco de reveal ao viewport — prova de hidratação sob CSP.
    await page.locator("#como-funciona").scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
    expect(violations).toEqual([]);

    // Reveal choreography still executes under CSP (IntersectionObserver)
    const revealed = await page.evaluate(
      () => document.querySelectorAll(".fs-io-reveal.is-revealed").length
    );
    expect(revealed).toBeGreaterThan(0);
  });
});

test.describe("public security surface", () => {
  test("serves security.txt with the confirmed contact", async ({ request }) => {
    const res = await request.get("/.well-known/security.txt");
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain("07devsuporte@gmail.com");
  });

  test("robots.txt allows public indexing", async ({ request }) => {
    const res = await request.get("/robots.txt");
    expect(res.status()).toBe(200);
    expect(await res.text()).toContain("Allow: /");
  });

  test("sitemap lists public routes", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("/privacidade");
    expect(body).toContain("/termos");
  });
});
