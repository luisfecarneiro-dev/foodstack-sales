# Guia de Implantação — FoodStack

## Visão geral

A landing é **100% estática + middleware de borda**: sem banco, sem API, sem formulários. O deploy é Vercel via integração Git.

## Pipeline de release

```bash
npm run verify     # typecheck + lint + unit + 4 audits (gate pré-build)
npm run test:e2e   # playwright contra build real (porta 3100)
npm run build      # verify + next build
```

No Vercel, `npm run build` executa `npm run verify` como parte do build — produção **nunca** publica com:
- erro de tipo/lint;
- teste quebrado;
- identidade legal vazia (`audit:legal-data` falha com `NODE_ENV=production`);
- config de segurança fora do contrato (`audit:security-config`);
- exposição pública de dados sensíveis (`audit:public-exposure`).

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | produção | URL pública (ex.: `https://foodstack.vercel.app`). Gera canonical/sitemap/robots. Sem ela, E2E/SEO usam localhost |

A landing **não exige nenhum secret**. Não adicione `NEXT_PUBLIC_*SECRET*` ou `*KEY*` — o audit de segurança reprová o build.

## Primeiro deploy (CLI)

```bash
npm i -g vercel
vercel login
vercel link          # vincula/cria o projeto
vercel --prod        # build + deploy de produção
```

Recomendado: conectar o repositório GitHub ao projeto no dashboard Vercel para preview por PR + deploy contínuo em `main`.

## Pós-deploy — checklist

- [ ] Headers visíveis: `curl -sI https://<url>/ | grep -i content-security` (CSP com nonce) e `strict-transport-security`.
- [ ] `/.well-known/security.txt` acessível.
- [ ] `/robots.txt` e `/sitemap.xml` apontam para o domínio correto (`NEXT_PUBLIC_SITE_URL`).
- [ ] CTA WhatsApp abre `wa.me/5531972198583` com a mensagem padrão.
- [ ] Páginas legais renderizam controlador + 07devsuporte@gmail.com.
- [ ] Lighthouse mobile (sem JS extra: CSP/JS zero terceiros).

## Domínio próprio (quando confirmado)

1. `NEXT_PUBLIC_SITE_URL=https://<domínio>` (env de produção no Vercel).
2. Adicionar domínio no Vercel + DNS conforme instrução.
3. Opcional: redirect apex→www no middleware (padrão 07DevPage RP) quando houver domínio canônico.

## Rollback

Vercel → Deployments → Promote (instantâneo). O gate `verify` garante que qualquer deploy que passou tem o mesmo contrato de qualidade.
