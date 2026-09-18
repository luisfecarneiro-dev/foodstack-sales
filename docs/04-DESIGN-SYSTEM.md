# Design System FoodStack

## Direção

FoodStack combina gastronomia artesanal e engenharia de software. O visual não deve parecer template de restaurante nem landing genérica de SaaS. O padrão implementado segue a linguagem "Apple-esque / Linear-tier": profundidade háptica, ritmo espacial cinematográfico e micro-interações obsessivas.

## Paleta base derivada da logo fornecida

- `--fs-bg: #1C1814`
- `--fs-surface: #242019`
- `--fs-surface-soft: #2D271F`
- `--fs-text: #F5EFE4`
- `--fs-muted: #BDB09C`
- `--fs-gold: #E7B05B`
- `--fs-orange: #D88732`
- `--fs-rust: #A55D32`
- `--fs-olive: #94945A`

Tokens de extensão (ver `globals.css`):

- `--fs-hairline`: hairlines em `rgb(245 239 228 / 0.08)` — nunca cinza genérico.
- `--fs-hairline-strong`: gold hairline para destaque.
- `--fs-ease-out`: `cubic-bezier(0.32, 0.72, 0, 1)` — curva de massa física (obrigatória).
- `--fs-ease-spring`: `cubic-bezier(0.34, 1.4, 0.4, 1)`.

## Tipografia

- **Display:** `Fraunces` (serif editorial variável, eixos SOFT/WONK) via `next/font`.
- **Corpo:** `Sora` (grotesk geométrica legível) via `next/font`.
- **Mono:** não carregada; rótulos técnicos usam `Sora` com tracking.

Proibido: Inter, Roboto, Arial, Open Sans, Helvetica. As variáveis `--font-display` e `--font-body` são as únicas fontes do projeto.

## Escala tipográfica

Definida em clamps CSS (`--fs-text-hero`, `--fs-text-h2`, `--fs-text-h3`, `--fs-text-body-lg`) para tipografia fluida sem media queries manuais.

## Raio

- **Double-Bezel (Doppelrand):** toda superfície premium é um "prato de vidro em bandeja de alumínio" — casca externa com hairline + padding `p-1.5` + raio `rounded-[2rem]` (ou `1.75rem`), núcleo interno com raio concêntrico `calc(raio - 0.375rem)` e inset highlight `inset 0 1px 0 rgb(245 239 228/0.07)`. Use o componente `<Bezel>`.
- Pills (`rounded-full`) ficam restritos a CTAs, eyebrow tags e tags de capacidade.

## Imagens

Screenshots são prova visual: sem filtros pesados. Molduras usam `<Bezel>` com leve tilt editorial (`±0.6deg`) apenas em desktop, revertendo a `0deg` no hover.

## Iconografia

Lucide com `strokeWidth={1.25}` (linhas ultrafinas) dentro de círculos de 40px. Nunca usar stroke padrão grosso.

## Motion

- Curva padrão: `var(--fs-ease-out)` — nunca `linear`/`ease-in-out`.
- Entrada por scroll: componente `<Reveal>` (IntersectionObserver) — `translate3d(0,4rem,0) + blur(8px) + opacity 0` resolvendo em ~900ms. Nada aparece estaticamente.
- Hero: choreografia GSAP (`useGsapReveal`) com stagger 0.11 e `expo.out`.
- Nav mobile: hamburger morfa para X via rotate/translate (500ms); overlay `backdrop-blur-3xl` com links em máscara escalonada (delay 90ms + i*70ms).
- CTAs: `group` com `active:scale-[0.98]`; ícone aninhado desloca `group-hover:translate-x-1 -translate-y-[1px] scale-105`.

## Performance guardrails

- Anima apenas `transform` e `opacity` (+`filter` em reveals pontuais). Nunca `top/left/width/height`.
- `backdrop-blur` somente em camadas fixed/sticky (nav, overlay modal).
- Grain e background-field são `position: fixed`, `pointer-events: none`, fora dos containers de scroll.
- Z-index reservado a camadas sistêmicas: field `-1`, grain `40`, nav `40`, modal `50`.
- Seções usam `fs-section` (padding `clamp(7rem,14vw,12.5rem)`); hero usa `min-h-[100dvh]`, nunca `h-screen`.
- Mobile (<768px): layouts assimétricos colapsam para 1 coluna, tilts e overlaps são removidos, container usa `calc(100% - 32px)`.

## Reduced motion

`prefers-reduced-motion: reduce` desativa scrub, parallax, loops (`.fs-field`), transições (>0.01ms) e força `.fs-io-reveal` ao estado final. A página permanece 100% utilizável.
