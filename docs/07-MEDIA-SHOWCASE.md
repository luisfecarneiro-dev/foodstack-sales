# Mídia e Showcase

## Assets fornecidos

| Arquivo semântico | Uso |
|---|---|
| `take-joao-selector.png` | apresentação multi-marca |
| `joao-gastrobar-menu.png` | cardápio João |
| `take-burguer-menu.png` | cardápio Take |
| `capivara-home.png` | landing/entrada |
| `capivara-table-selection.png` | mesa |
| `capivara-menu-cart.png` | catálogo/carrinho |
| `capivara-checkout.png` | checkout |
| `capivara-my-orders.png` | histórico/acompanhamento |

Todos foram preservados em `public/showcase/`.

## Direção visual

Desktop:
- sticky copy + coluna de screenshots;
- alternância entre enquadramento frontal e leve perspectiva;
- legendas curtas.

Mobile:
- mídia full-width;
- uma captura por bloco;
- sem zoom automático;
- sequência vertical.

## Vídeos

Adicionar somente capturas limpas, sem:
- dados pessoais reais;
- notificações;
- terminal;
- DevTools;
- chaves;
- rotas internas;
- tokens;
- dados administrativos.

Componente futuro `DemoVideo`:
```ts
type DemoVideoProps = {
  src: string;
  poster: string;
  title: string;
  caption: string;
  mobileSrc?: string;
};
```

Nunca tocar áudio automaticamente.
