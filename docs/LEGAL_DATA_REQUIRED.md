# Dados legais — estado atual

> Atualizado em 2026-09-18. Este arquivo registrou os dados pendentes e agora
> documenta o estado confirmado. Ele permanece como guardrail: qualquer
> regressão a valor nulo/pendente quebra o build de produção
> (`npm run audit:legal-data`).

## Confirmado (fonte: `src/config/legal.ts`)

- **Controlador:** Luís Felipe Guimarães — responsável pela marca FoodStack.
- **Operador:** 07Dev Desenvolvimento de Software (mesmo operador da 07Dev, publicado em produção).
- **Endereço público:** Rio Piracicaba, MG — Brasil.
- **Canal de privacidade/suporte:** 07devsuporte@gmail.com (também em `/.well-known/security.txt`).
- **Documento fiscal:** nenhum CPF/CNPJ publicado nesta versão — declaração
  explícita na política (`documentNote`), igual ao padrão público do operador.
  Documento pode ser solicitado no canal de contato antes da contratação.
- **Política:** versão 2026-09, com estrutura completa (10 seções LGPD).

## Pendente (não bloqueia go-live, revisar antes de escala comercial)

- Relação jurídica formal FoodStack × 07Dev em contrato.
- Política comercial padrão de orçamento/contratação.
- Confirmação escrita de permissão de uso comercial das screenshots dos cases.

## Proibido (permanente)

- Preencher campos com estimativas ou dados de operadores distintos.
- Publicar CNPJ/CPF não confirmado pelo responsável.
- Retirar o gate `audit:legal-data` do pipeline de build.
