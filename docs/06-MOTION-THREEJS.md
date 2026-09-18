# Motion, GSAP e Three.js

## Princípio

Motion deve aumentar clareza e percepção de acabamento. Não deve impedir leitura, criar atraso artificial ou transformar o site em uma demo pesada.

## GSAP

Usos:
- entrada do hero;
- reveals de headings;
- transições entre capítulos do storytelling;
- progressão sutil de screenshots;
- micro-parallax em desktop.

Evitar:
- scroll-jacking;
- pin longo no mobile;
- animação de todos os elementos;
- loops sem finalidade.

## Three.js

Uso restrito ao hero/ambiente. A cena deve:
- ser `aria-hidden`;
- não conter conteúdo essencial;
- limitar DPR a 1.5;
- liberar geometria/material/renderer no unmount;
- parar quando o componente deixa de existir;
- falhar silenciosamente se WebGL não estiver disponível.

## Adaptive quality

Nível A:
- desktop potente: cena completa.

Nível B:
- mobile/intermediário: geometria reduzida, DPR <= 1.25.

Nível C:
- reduced motion, WebGL indisponível ou falha: fundo CSS estático.

## Orçamento

- 1 contexto WebGL persistente no máximo.
- sem vídeo e Three.js disputando autoplay acima da dobra.
- sem texture atlas pesado no hero.
- evitar pós-processamento inicialmente.
