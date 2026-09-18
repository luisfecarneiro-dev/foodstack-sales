# SDD — FoodStack Sales Experience

**Data:** 2026-09-18  
**Status:** aprovado para implementação de base  
**Produto:** página comercial para venda de projetos de cardápio digital e sistemas de pedidos.

## 1. Problema

A oferta precisa mostrar, de forma visual e compreensível, que a 07Dev/FoodStack não vende apenas uma página com itens de menu. A página deve demonstrar como um projeto pode conectar cardápio, pedido, mesa, checkout e acompanhamento, mantendo linguagem acessível para donos e gestores de estabelecimentos.

## 2. Objetivos

- gerar percepção de produto e engenharia sem excesso de jargão;
- apresentar casos reais por screenshots e vídeos;
- converter interesse em conversa via WhatsApp;
- permitir leitura rápida no celular;
- preservar performance e acessibilidade mesmo com motion/Three.js;
- manter informações legais e comerciais estritamente verificáveis.

## 3. Não objetivos

- criar SaaS self-service;
- permitir contratação/pagamento direto na página;
- expor painel administrativo real;
- copiar integralmente a UI dos clientes;
- criar formulário de lead por padrão;
- instalar analytics/cookies por padrão;
- prometer integrações, prazos ou resultados não confirmados.

## 4. Público

Proprietários e gestores de lanchonetes, hamburguerias, pizzarias, bares, restaurantes e operações gastronômicas que precisam digitalizar cardápio e pedidos.

## 5. Conversão

CTA principal: abrir conversa em `https://wa.me/5531972198583`.

Mensagem padrão:
> Olá! Quero conversar sobre um projeto de cardápio digital com a FoodStack.

CTAs contextuais podem mencionar o case visualizado, sem enviar dados do usuário automaticamente.

## 6. Requisitos funcionais

### RF-01 — Hero
Logo FoodStack, proposta de valor, CTA primário, CTA secundário e ambientação Three.js progressiva.

### RF-02 — Storytelling
Explicar a jornada descoberta → escolha → contexto de consumo → finalização.

### RF-03 — Showcase de projetos
Exibir Take/João e Chalezinho do Capivara com screenshots fornecidas. Cada imagem terá legenda, alt e contexto do que está sendo demonstrado.

### RF-04 — Vídeo
Suportar vídeos de usabilidade em componente lazy, com poster, controles e fallback.

### RF-05 — Engenharia
Explicar em linguagem comercial: responsividade, modularização, tipagem, testes, segurança e documentação.

### RF-06 — Contato
CTA para WhatsApp em hero, header e encerramento.

### RF-07 — Legal
Rotas de privacidade, LGPD e termos com identidade legal configurável e gate de go-live para dados ainda não confirmados.

## 7. Requisitos não funcionais

- mobile-first;
- TypeScript strict;
- Server Components por padrão;
- LCP alvo < 2,5 s em conexão/CPU razoáveis de referência;
- CLS alvo < 0,1;
- INP alvo < 200 ms;
- sem WebGL obrigatório para entender/converter;
- respeito a `prefers-reduced-motion`;
- navegação completa por teclado;
- contraste mínimo WCAG AA para textos relevantes;
- imagens responsivas e lazy abaixo da dobra;
- nenhuma informação sensível de outros sistemas no bundle público.

## 8. Critérios de aceite

1. O usuário entende em até uma dobra o que a FoodStack oferece.
2. O CTA de WhatsApp funciona em mobile e desktop.
3. Os casos reais são claramente apresentados como referências, não escopos universais.
4. A página mantém conteúdo utilizável sem Three.js.
5. Em reduced motion, não existe scrub, parallax agressivo ou loop contínuo.
6. As screenshots fornecidas aparecem com boa leitura em desktop e mobile.
7. Nenhum dado legal inventado aparece em produção.
8. Nenhuma rota/admin/secret dos projetos demonstrados é publicada.
