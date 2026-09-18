# Segurança — FoodStack

Modelo de ameaça, controles e gates da landing. Padrão derivado do 07DevPage RP (produção 07Dev), adaptado a um site sem backend.

## Superfície de ataque

| Superfície | Risco | Controle |
|---|---|---|
| HTML/JS público | XSS, injeção de script | CSP nonce por request, sem `unsafe-inline`/`unsafe-eval` em `script-src`, zero scripts de terceiros |
| Headers HTTP | clickjacking, sniffing, downgrade | X-Frame-Options DENY, nosniff, HSTS preload, COOP/CORP, Permissions-Policy |
| Dependências | supply chain | Lockfile auditado; deps mínimas; sem runtime externo |
| Mídia | vazamento de dados internos | screenshots curadas; `audit:public-exposure` bloqueia padrões sensíveis em `src`+`docs` |
| Contato | abuso/spam | link externo wa.me apenas — nenhum endpoint POST no projeto |
| Dados pessoais | LGPD | site não coleta dados; política publica controlador + canal (07devsuporte@gmail.com); `audit:legal-data` bloqueia prod sem identidade confirmada |

## Camadas

1. **Middleware (`src/middleware.ts`)** — nonce crypto por request, CSP aplicada na resposta; Next propaga o nonce aos próprios scripts via header de request (padrão oficial Next.js).
2. **`src/lib/security/headers.ts`** — fonte única da CSP. Proibições: `strict-dynamic`, hosts externos em `script-src`, `unsafe-eval`. `style-src 'unsafe-inline'` é necessário e consciente (SSR/GSAP escrevem style attrs não-hasheáveis).
3. **`next.config.ts` + `vercel.json`** — headers estáticos em duas camadas (build + edge) para defesa em profundidade.
4. **`src/lib/env.ts`** — validação zod do ambiente. Nenhum secret é exigido nem tolerado com prefixo `NEXT_PUBLIC_` + `SECRET`/`KEY`.
5. **`tests/e2e/security.spec.ts`** — contrato verificado contra o build real: presença de CSP/headers, rotação de nonce, zero violações CSP em runtime, security.txt, robots, sitemap.
6. **`scripts/audit-security-config.mjs`** — análise estática: diretivas obrigatórias, headers em ambos os configs, matcher do middleware, padrões proibidos (secrets, strict-dynamic, unsafe-inline em script-src).

## LGPD

- A landing **não coleta** dados pessoais: sem formulário, sem cookies, sem analytics, sem storage.
- Identidade legal confirmada em `src/config/legal.ts` (controlador: Luís Felipe Guimarães — 07Dev Desenvolvimento de Software).
- Canal de privacidade/suporte: **07devsuporte@gmail.com** (também em `/.well-known/security.txt`).
- Qualquer nova coleta (analytics, form, chat) exige: atualização da política, inventário, base legal e novo gate antes do deploy.

## Divulgação responsável

Reporte falhas de segurança via `07devsuporte@gmail.com` (referenciado em `/.well-known/security.txt`).

## Hardening futuro (quando aplicável)

- CSP `report-only` → `report-uri` próprio se adicionar scripts dinâmicos.
- CSP `require-trusted-types-for 'script'` após auditoria de DOM sinks.
- Rate limit de borda (padrão Upstash do RP) apenas se algum endpoint POST for introduzido.
