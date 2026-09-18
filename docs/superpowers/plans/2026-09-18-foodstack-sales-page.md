# FoodStack Sales Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a premium, responsive FoodStack sales page using real case media, progressive motion and WhatsApp conversion.

**Architecture:** Next.js App Router, Server Components by default, typed content/config modules, client islands for GSAP/Three.js/video, and no backend/data store in v1.

**Tech Stack:** Next.js 15+, React 19, TypeScript strict, Tailwind CSS 4, GSAP, Three.js, Motion, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-18-foodstack-sales-page-design.md`

## Global Constraints

- WhatsApp destination: `+55 31 97219-8583`.
- No invented legal/commercial data.
- No admin routes, secrets, auth internals or database details from showcased projects in public content.
- Server Components by default.
- One persistent WebGL context maximum.
- `prefers-reduced-motion` must disable continuous/scrubbed motion.
- No analytics or lead form in v1.
- Supplied screenshots are canonical showcase media.

---

### Task 1: Foundation and contracts

**Files:**
- Create/verify: `src/config/site.ts`
- Create/verify: `src/config/legal.ts`
- Create/verify: `src/content/cases.ts`
- Create/verify: `src/content/copy.ts`
- Test: `tests/unit/whatsapp.test.ts`

**Interfaces:**
- Consumes: none.
- Produces: `siteConfig`, `legalIdentity`, `showcaseCases`, `homeCopy`, `buildWhatsAppUrl(message?: string): string`.

- [ ] **Step 1: Write the failing WhatsApp URL test**

```ts
import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("uses the FoodStack WhatsApp number and encodes the message", () => {
    const url = buildWhatsAppUrl("Quero um cardápio");
    expect(url).toContain("https://wa.me/5531972198583");
    expect(url).toContain("Quero+um+card%C3%A1pio");
  });
});
```

- [ ] **Step 2: Run the test and verify failure**

Run: `npm test -- tests/unit/whatsapp.test.ts`  
Expected: FAIL if the helper/config is missing.

- [ ] **Step 3: Implement the config and URL helper**

Use the exact interfaces already scaffolded in `src/config/site.ts` and `src/lib/whatsapp.ts`. Do not duplicate the number in components.

- [ ] **Step 4: Run test**

Run: `npm test -- tests/unit/whatsapp.test.ts`  
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/config src/content src/lib tests/unit/whatsapp.test.ts
git commit -m "feat: define FoodStack content and contact contracts"
```

### Task 2: Static shell and responsive storytelling

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`
- Create/verify: `src/components/layout/Header.tsx`
- Create/verify: `src/components/layout/Footer.tsx`
- Create/verify: `src/features/storytelling/Storytelling.tsx`
- Create/verify: `src/features/storytelling/Engineering.tsx`

**Interfaces:**
- Consumes: `siteConfig`, `homeCopy`.
- Produces: semantic page shell with `#como-funciona`, `#projetos`, `#engenharia`.

- [ ] **Step 1: Add Playwright smoke assertion for page landmarks**

```ts
import { test, expect } from "@playwright/test";

test("renders the FoodStack narrative", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Seu cardápio");
  await expect(page.locator("#como-funciona")).toBeVisible();
  await expect(page.locator("#engenharia")).toBeVisible();
});
```

- [ ] **Step 2: Run E2E and verify it fails before sections exist**

Run: `npm run test:e2e -- --grep "FoodStack narrative"`

- [ ] **Step 3: Implement semantic sections**

Keep headings hierarchical, ensure keyboard focus, avoid client boundaries unless interaction is required.

- [ ] **Step 4: Run E2E**

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app src/components/layout src/features/storytelling tests/e2e
git commit -m "feat: build FoodStack responsive narrative shell"
```

### Task 3: Case-study media

**Files:**
- Verify: `public/showcase/*`
- Modify: `src/features/showcase/CaseShowcase.tsx`
- Test: `tests/e2e/showcase.spec.ts`

**Interfaces:**
- Consumes: `showcaseCases`.
- Produces: responsive case gallery with accessible image descriptions.

- [ ] **Step 1: Write media assertions**

```ts
import { test, expect } from "@playwright/test";

test("shows real case references", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Take Burguer & João Gastrobar")).toBeVisible();
  await expect(page.getByText("Chalezinho do Capivara")).toBeVisible();
  await expect(page.locator('img[alt*="João Gastrobar"]')).toHaveCount(1);
  await expect(page.locator('img[alt*="Chalezinho"]')).toHaveCount(5);
});
```

- [ ] **Step 2: Run and verify failure if gallery is incomplete**

Run: `npm run test:e2e -- tests/e2e/showcase.spec.ts`

- [ ] **Step 3: Implement gallery**

Use `next/image`, `sizes`, stable aspect ratios, captions and semantic figures.

- [ ] **Step 4: Verify desktop and 390px viewport**

Run the same E2E in configured desktop/mobile projects.

- [ ] **Step 5: Commit**

```bash
git add public/showcase src/features/showcase src/content/cases.ts tests/e2e/showcase.spec.ts
git commit -m "feat: add real FoodStack case showcase"
```

### Task 4: GSAP and Three.js progressive enhancement

**Files:**
- Modify: `src/features/hero/FoodStackHero.tsx`
- Modify: `src/motion/useGsapReveal.ts`
- Modify: `src/three/FoodStackScene.tsx`
- Test: `tests/e2e/reduced-motion.spec.ts`

**Interfaces:**
- Consumes: static hero markup.
- Produces: progressive hero animation and one disposable Three.js runtime.

- [ ] **Step 1: Add reduced-motion test**

```ts
import { test, expect } from "@playwright/test";

test.use({ reducedMotion: "reduce" });

test("remains usable with reduced motion", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /projeto/i })).toBeVisible();
});
```

- [ ] **Step 2: Run test**

Run: `npm run test:e2e -- tests/e2e/reduced-motion.spec.ts`

- [ ] **Step 3: Implement motion**

GSAP reveal only inside the hero scope. Three.js must catch renderer creation failure, cap DPR, dispose resources and remain `aria-hidden`.

- [ ] **Step 4: Test with WebGL disabled manually or via browser launch flag**

Acceptance: copy and CTA remain visible.

- [ ] **Step 5: Commit**

```bash
git add src/features/hero src/motion src/three tests/e2e/reduced-motion.spec.ts
git commit -m "feat: add progressive FoodStack motion"
```

### Task 5: Video showcase

**Files:**
- Create: `src/features/showcase/DemoVideo.tsx`
- Modify: `src/content/cases.ts` only after real video files exist.
- Modify: `public/videos/`
- Test: `tests/e2e/video.spec.ts`

**Interfaces:**
- Consumes: `DemoVideoProps`.
- Produces: lazy video player with poster, controls and no autoplay audio.

- [ ] **Step 1: Define exact prop contract**

```ts
export type DemoVideoProps = {
  src: string;
  poster: string;
  title: string;
  caption: string;
  mobileSrc?: string;
};
```

- [ ] **Step 2: Add E2E assertion**

The video element must have `controls`, `preload="metadata"` and no `autoplay`.

- [ ] **Step 3: Implement only after real media is supplied**

Do not create fake demo files.

- [ ] **Step 4: Verify network behavior**

Below-fold video must not download full content during initial page load.

- [ ] **Step 5: Commit**

```bash
git add src/features/showcase public/videos tests/e2e/video.spec.ts
git commit -m "feat: add lazy demo video showcase"
```

### Task 6: Legal routes and launch gate

**Files:**
- Modify: `src/app/privacidade/page.tsx`
- Modify: `src/app/lgpd/page.tsx`
- Modify: `src/app/termos/page.tsx`
- Modify: `src/config/legal.ts`
- Modify: `scripts/audit-legal-data.mjs`

**Interfaces:**
- Consumes: confirmed legal identity.
- Produces: truthful public policies; production gate.

- [ ] **Step 1: Verify gate fails while mandatory production fields are null**

Run: `NODE_ENV=production npm run audit:legal-data`  
Expected: FAIL until confirmed legal fields are configured.

- [ ] **Step 2: Confirm data with project owner**

Do not source legal identity from another project.

- [ ] **Step 3: Update `src/config/legal.ts` with confirmed values**

Only confirmed values.

- [ ] **Step 4: Re-run gate**

Expected: PASS after valid data exists.

- [ ] **Step 5: Commit**

```bash
git add src/app/privacidade src/app/lgpd src/app/termos src/config/legal.ts scripts/audit-legal-data.mjs
git commit -m "feat: finalize FoodStack legal identity and policies"
```

### Task 7: SEO, security and release QA

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `next.config.ts`
- Modify/create: `src/app/robots.ts`
- Modify/create: `src/app/sitemap.ts`
- Modify: `scripts/audit-public-exposure.mjs`
- Modify: `scripts/audit-media.mjs`

**Interfaces:**
- Consumes: final domain and release configuration.
- Produces: indexable public site with no sensitive path leakage.

- [ ] **Step 1: Run static audits**

```bash
npm run audit:public-exposure
npm run audit:media
```

- [ ] **Step 2: Add canonical only after final domain exists**

Do not invent a FoodStack domain.

- [ ] **Step 3: Add structured data using only confirmed fields**

Never fabricate address, price range, reviews or area served.

- [ ] **Step 4: Run full gate**

```bash
npm run verify
npm run test:e2e
npm run build
```

Expected: all exit 0 before release.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: harden and release FoodStack sales page"
```
