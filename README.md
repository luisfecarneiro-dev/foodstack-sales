# FoodStack — Página Comercial

Página comercial da **FoodStack**, operação de cardápios digitais e sistemas de pedidos desenvolvida pela **07Dev**. Landing premium, animada e orientada a conversão via WhatsApp, com segurança de borda no padrão 07Dev.

**Stack:** Next.js 15 (App Router, Server Components) · React 19 · TypeScript strict · Tailwind CSS 4 · GSAP · Three.js (lazy) · Vitest · Playwright.

## Início rápido

```bash
npm install
npm run dev          # http://localhost:3000
npm run verify       # typecheck + lint + test + 4 audits
npm run build        # verify + build de produção
npm run test:e2e     # Playwright (sob o build de produção, porta 3100)
```

> Se a porta 3000 estiver ocupada, o dev reclamará — use `-p <porta>`.
> E2E sobe o próprio servidor de produção na porta 3100 (`E2E_BASE_URL` sobrescreve).

## Arquitetura

```
src/app/            composição e rotas (Server Components por padrão)
src/components/ui/  primitivos premium: Bezel, CTAButton, Reveal, Eyebrow
src/features/       hero, storytelling, showcase, engenharia, contato
src/content/        copy e cases tipados (fonte editorial única)
src/config/         identidade do site, contato e identidade legal CONFIRMADA
src/lib/            funções puras + security/ (CSP, headers)
src/motion/         utilitário GSAP (escopo + cleanup)
src/three/          runtime WebGL isolado (lazy chunk, dispose total)
src/middleware.ts   nonce por request + CSP + headers (borda)
scripts/            audits determinísticas (executam no verify)
docs/               SDD completo (01–11) + planos
```

### Princípios

1. Server Components por padrão; Client Islands só para DOM/motion/WebGL.
2. TypeScript strict; `any` proibido.
3. Conteúdo comercial em `src/content/`; configuração em `src/config/`.
4. Nenhum dado comercial/jurídico inventado. A identidade legal em `src/config/legal.ts` é a fonte única de verdade e o audit `audit:legal-data` **bloqueia o build de produção** se regredir.
5. WhatsApp é a única conversão (`+55 31 97219-8583`). Sem formulário, sem cookies, sem analytics.
6. `prefers-reduced-motion` desativa toda animação contínua; a página funciona sem WebGL e sem JS de animação.

## Design System

Padrão premium documentado em `docs/04-DESIGN-SYSTEM.md`:

- **Fontes:** Fraunces (display serif) + Sora (corpo) via `next/font` — self-hosted, zero origem remota.
- **Double-Bezel (Doppelrand):** toda superfície premium é casca externa com hairline + núcleo concêntrico (`<Bezel>`).
- **CTA "button-in-button":** `<CTAButton>` — pill com ícone aninhado em círculo próprio, física magnética no hover.
- **Motion:** apenas `cubic-bezier(0.32,0.72,0,1)`; reveals via `<Reveal>` (IntersectionObserver, blur + rise); hero com GSAP `expo.out` stagger; hamburger morfa para X; nav mobile em overlay `blur-3xl` com máscara escalonada.
- **Performance:** anima só `transform`/`opacity`; `backdrop-blur` apenas em camadas fixed; grain e field-glow são `fixed + pointer-events:none`; Three.js em chunk lazy (First Load JS ≈ 153 kB); `min-h-[100dvh]` (nunca `h-screen`); mobile <768px colapsa para 1 coluna.

## Segurança (padrão 07Dev — 07DevPage RP)

Portada integralmente do padrão de produção 07Dev:

| Camada | Implementação |
|---|---|
| CSP | Nonce por request (`src/middleware.ts`), sem `strict-dynamic`, sem `unsafe-eval`, **zero hosts externos**; `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'` |
| Headers | HSTS preload, X-Frame-Options DENY, nosniff, Referrer-Policy, COOP `same-origin-allow-popups`, CORP `same-origin`, Origin-Agent-Cluster, Permissions-Policy completo — em `next.config.ts` + `vercel.json` (defesa em profundidade) |
| Surface | Sem backend, sem API, sem DB, sem cookies, sem storage; `x-powered-by` removido |
| Validação | Ambiente via zod (`src/lib/env.ts`) |
| Divulgação responsável | `/.well-known/security.txt` → 07devsuporte@gmail.com |
| Gates | `audit:public-exposure`, `audit:legal-data`, `audit:security-config`, `audit:media` — todos no `verify` (bloqueiam build de produção) |
| E2E | `tests/e2e/security.spec.ts` valida CSP/headers/nonce-runtime contra o build real |

## Comandos de qualidade

```bash
npm run verify                  # typecheck + lint + vitest + 4 audits
npm run typecheck               # tsc --noEmit (strict)
npm run lint                    # eslint (next/core-web-vitals + ts)
npm run test                    # vitest (unit)
npm run test:e2e                # playwright (desktop + Pixel 7)
npm run audit:public-exposure   # sem secrets/rotas internas em src+docs
npm run audit:legal-data        # gate de identidade legal (bloqueia prod se vazio)
npm run audit:security-config   # contrato CSP/headers/middleware
npm run audit:media             # assets obrigatórios presentes
```

## Implantação (Vercel)

Deploy contínuo via Git (GitHub) — ver `DEPLOYMENT.md`. O build no Vercel executa `npm run verify` completo como gate pré-build (inclusive o gate legal), então produção só publica com todos os audits verdes.

## Rotas públicas

| Rota | Descrição |
|---|---|
| `/ | Home comercial (hero, jornada, cases, engenharia, CTA)
| `/privacidade | Política de Privacidade (resumo)
| `/lgpd | Privacidade e LGPD (política completa, 10 seções)
| `/termos | Termos de Uso
| `/.well-known/security.txt | Canal de segurança
| `/robots.txt`, `/sitemap.xml | SEO (canonical via `NEXT_PUBLIC_SITE_URL`) |
