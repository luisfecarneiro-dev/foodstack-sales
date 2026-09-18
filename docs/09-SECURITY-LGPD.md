# Segurança e LGPD

## Modelo de ameaça da landing

Superfícies:
- dependências JavaScript;
- links externos;
- mídia;
- headers;
- futura instrumentação;
- eventual CMS/formulário futuro.

A página não precisa de banco, autenticação ou armazenamento próprio para cumprir o objetivo inicial.

## Regras

- nenhum secret com `NEXT_PUBLIC_`;
- não adicionar formulário só para “parecer completo”;
- links externos com `rel="noreferrer"` quando aplicável;
- evitar HTML não confiável e `dangerouslySetInnerHTML`;
- atualizar dependências com revisão e auditoria;
- CSP de produção deve ser definida depois de inventariar scripts finais;
- não exibir rotas/admin de cases no conteúdo público;
- remover metadados das capturas se houver risco de informação interna.

## LGPD

Minimização é a principal decisão: o starter não coleta lead diretamente.

Se forem adicionados:
- analytics;
- pixel;
- formulário;
- CRM;
- chat;
- newsletter;
- cookies não essenciais;

então é obrigatório atualizar:
1. inventário de dados;
2. finalidade;
3. base legal;
4. operadores;
5. retenção;
6. consentimento quando necessário;
7. política pública;
8. mecanismo de revogação quando aplicável.

## Legal

Não usar texto jurídico como substituto de revisão profissional. O SDD define estrutura e controles técnicos; dados legais finais e adequação contratual precisam ser confirmados antes do go-live.
