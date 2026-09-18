export type ShowcaseCase = {
  id: "take-joao" | "capivara";
  title: string;
  eyebrow: string;
  summary: string;
  capabilities: readonly string[];
  images: readonly {
    src: string;
    alt: string;
    caption: string;
  }[];
};

export const showcaseCases: readonly ShowcaseCase[] = [
  {
    id: "take-joao",
    title: "Take Burguer & João Gastrobar",
    eyebrow: "Experiência multi-marca",
    summary:
      "Uma mesma base de pedidos pode assumir identidades distintas e preservar fluxos consistentes para o cliente.",
    capabilities: [
      "Seleção entre marcas",
      "Cardápios com identidade própria",
      "Carrinho e pedidos",
      "Mesa por QR",
      "PWA e acompanhamento"
    ],
    images: [
      {
        src: "/showcase/take-joao-selector.png",
        alt: "Tela de seleção entre João Gastrobar e Take Burguer.",
        caption: "Entrada multi-marca com escolhas claras de operação."
      },
      {
        src: "/showcase/joao-gastrobar-menu.png",
        alt: "Cardápio escuro do João Gastrobar com produtos e sacola lateral.",
        caption: "Identidade editorial escura aplicada ao cardápio."
      },
      {
        src: "/showcase/take-burguer-menu.png",
        alt: "Cardápio claro do Take Burguer com produtos e sacola lateral.",
        caption: "Mesma lógica de produto com linguagem visual própria."
      }
    ]
  },
  {
    id: "capivara",
    title: "Chalezinho do Capivara",
    eyebrow: "Operação completa de pedidos",
    summary:
      "Fluxo voltado a delivery, retirada e consumo em mesa, com navegação de cardápio, checkout e histórico no dispositivo.",
    capabilities: [
      "Delivery e retirada",
      "Seleção de mesa",
      "QR para atendimento",
      "Carrinho e checkout",
      "Meus pedidos",
      "Acompanhamento"
    ],
    images: [
      {
        src: "/showcase/capivara-home.png",
        alt: "Página inicial do Chalezinho do Capivara com opções de delivery, retirada e mesa.",
        caption: "Entrada comercial e operacional em uma mesma experiência."
      },
      {
        src: "/showcase/capivara-table-selection.png",
        alt: "Tela de seleção de mesa do Chalezinho do Capivara.",
        caption: "Fluxo direto para consumo presencial."
      },
      {
        src: "/showcase/capivara-menu-cart.png",
        alt: "Cardápio do Chalezinho do Capivara com busca, categorias e carrinho.",
        caption: "Catálogo responsivo com carrinho persistente."
      },
      {
        src: "/showcase/capivara-checkout.png",
        alt: "Checkout do Chalezinho do Capivara com dados, forma de consumo e resumo do pedido.",
        caption: "Checkout orientado a reduzir atrito na finalização."
      },
      {
        src: "/showcase/capivara-my-orders.png",
        alt: "Tela Meus pedidos do Chalezinho do Capivara.",
        caption: "Histórico local para o cliente acompanhar pedidos."
      }
    ]
  }
] as const;
