# Arquitetura

## Decisão principal

A página usa arquitetura modular por feature, com Server Components como padrão e ilhas Client apenas para animação, vídeo e WebGL.

```text
Browser
  |
  v
Next.js App Router
  |
  +-- Server composition
  |     +-- content/
  |     +-- config/
  |     +-- layout/
  |     +-- showcase/
  |
  +-- Client islands
        +-- GSAP reveal/scroll
        +-- Video player
        +-- Three.js ambient scene
```

## Limites

### `src/config`
Identidade do site, WhatsApp e dados legais. Nenhuma regra visual.

### `src/content`
Copy e cases tipados. Nenhum acesso a DOM.

### `src/features`
Composição por intenção: hero, storytelling, showcase, engenharia, contato.

### `src/motion`
GSAP isolado. Componentes não devem importar GSAP diretamente se um helper compartilhado resolver.

### `src/three`
Runtime WebGL isolado. Sem dependência da regra de negócio e sem bloquear conteúdo.

### `src/lib`
Funções puras como criação de URL de WhatsApp.

## SOLID aplicado com pragmatismo

- **SRP:** cada feature tem uma razão de mudança.
- **OCP:** novos cases entram via `src/content/cases.ts`.
- **LSP:** componentes de mídia devem aceitar contratos estáveis e não depender de um case específico.
- **ISP:** contratos pequenos para imagem, vídeo e case.
- **DIP:** UI usa dados tipados/configuração; integrações futuras entram por adapters sem contaminar a apresentação.

## Clean Architecture

Não aplicar camadas artificiais onde não existe domínio complexo. A página é majoritariamente de apresentação. A separação mais importante é: conteúdo/configuração → apresentação → runtime de browser.

## Segurança arquitetural

- sem DB por padrão;
- sem API de contato por padrão;
- sem secrets;
- sem rota administrativa;
- CSP pode ser endurecida depois que a estratégia final de scripts estiver definida;
- headers básicos já estão no `next.config.ts`;
- qualquer analytics exige ADR e revisão de privacidade.
