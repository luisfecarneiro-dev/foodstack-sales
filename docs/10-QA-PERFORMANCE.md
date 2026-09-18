# QA, Acessibilidade e Performance

## Matriz mínima

Viewports:
- 360x800
- 390x844
- 430x932
- 768x1024
- 1366x768
- 1440x900
- 1920x1080

Browsers:
- Chrome/Chromium
- Safari/iOS
- Firefox
- Edge

## E2E

Fluxos:
1. abrir home;
2. CTA hero abre WhatsApp correto;
3. âncora Projetos navega;
4. todas as screenshots têm `alt`;
5. rotas legais respondem;
6. reduced motion não dispara motion contínuo;
7. sem erro de console em fluxo comum.

## Performance

- logo hero com priority;
- screenshots abaixo da dobra lazy;
- vídeos com `preload=metadata` ou `none`;
- Three.js carregado apenas no client;
- um único contexto WebGL;
- sem fontes excessivas;
- layout reservado para imagens/vídeo;
- chunk de animação não deve contaminar todas as rotas legais.

## Acessibilidade

- heading hierarchy;
- foco visível;
- navegação por teclado;
- CTAs com texto claro;
- sem informação codificada só por cor;
- legenda textual para vídeos relevantes;
- motion reduzido respeitado.
