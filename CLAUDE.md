# AGENTS.md — FoodStack

Estas instruções valem para agentes de IA e desenvolvedores trabalhando neste pacote.

## Princípios

1. Leia `docs/01-SDD.md` e o plano em `docs/superpowers/plans/` antes de editar.
2. Não invente dados comerciais ou jurídicos.
3. Não exponha rotas administrativas, secrets, nomes internos de tabelas, peppers, tokens ou detalhes de autenticação dos sistemas demonstrados.
4. Server Components por padrão. Client Components somente nas folhas que precisam de DOM, motion, vídeo ou Three.js.
5. TypeScript strict. `any` é proibido sem justificativa documentada.
6. Componentes devem ter uma responsabilidade clara.
7. Conteúdo comercial fica em `src/content/`; identidade/configuração em `src/config/`.
8. GSAP controla narrativa/scroll. Three.js é decoração progressiva, não requisito funcional.
9. `prefers-reduced-motion` deve remover scrub, parallax e animação contínua.
10. A página deve funcionar sem WebGL, sem JavaScript de animação e com rede lenta.
11. WhatsApp é a conversão primária. Não criar formulário de captura por padrão.
12. Toda imagem usa `next/image` quando possível, com `sizes`, `alt` e dimensões previsíveis.
13. Não usar métricas absolutas de marketing sem fonte verificável.
14. Não alegar “LGPD compliant” como garantia jurídica. Descrever medidas técnicas e manter revisão humana.
15. Antes do go-live, executar os gates de `docs/11-GO-LIVE-CHECKLIST.md`.

## Arquitetura

- `src/app`: composição e rotas.
- `src/features`: unidades de produto/comunicação independentes.
- `src/components/ui`: primitivos premium (`Bezel`, `CTAButton`, `Reveal`, `Eyebrow`).
- `src/content`: dados editoriais tipados.
- `src/config`: configuração de site, contato e identidade legal.
- `src/motion`: utilitários GSAP.
- `src/three`: runtime 3D isolado.
- `src/lib`: funções puras.
- `scripts`: auditorias determinísticas.

## Design (padrão premium obrigatório)

Detalhes em `docs/04-DESIGN-SYSTEM.md`. Regras não negociáveis:

1. Fontes: apenas `--font-display` (Fraunces) e `--font-body` (Sora). Nunca Inter/Roboto/Arial/Helvetica.
2. Superfícies premium usam `<Bezel>` (arquitetura nested shell+core com raios concêntricos). Nada "flutuando" plano sobre o fundo.
3. CTAs primários usam `<CTAButton>` — pill com ícone aninhado em círculo próprio ("button-in-button").
4. Toda transição usa `var(--fs-ease-out)` ou curva custom. `linear`/`ease-in-out` são proibidos.
5. Seções respiram com `fs-section`; hero usa `min-h-[100dvh]`, nunca `h-screen`.
6. Entradas por scroll usam `<Reveal>` (IntersectionObserver). Nenhum elemento aparece estaticamente.
7. `backdrop-blur` apenas em camadas fixed/sticky; grain e field-glow são fixed + `pointer-events:none`.
8. Ícones Lucide com `strokeWidth={1.25}` (ultrafinos).
9. Abaixo de 768px: colunas assimétricas colapsam para 1 coluna, tilts/overlaps removidos, `px-4`-equivalente.
10. Variância: não repetir o mesmo archetype de layout em seções consecutivas (bento ≠ split ≠ cascade).

## Motion

Não transforme a página inteira em Client Component. Cada seção animada deve encapsular sua própria timeline e limpar contexto no unmount.

## Segurança

A landing não precisa de banco. Não adicionar backend, CMS, analytics ou cookies sem necessidade explícita e atualização do modelo de privacidade.
