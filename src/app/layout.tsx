import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Fraunces, Sora } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK"],
  display: "swap"
});

const body = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "FoodStack | Cardápios digitais e sistemas de pedidos",
    template: "%s | FoodStack"
  },
  description: siteConfig.description,
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: "#1c1814",
  colorScheme: "dark"
};

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  // Padrão 07Dev (07DevPage RP): ler headers() torna o render dinâmico
  // e permite ao Next.js propagar o nonce do middleware aos scripts
  // bootstrap — sem isso, o HTML estático nasce sem nonce e o CSP
  // bloqueia toda a hidratação em produção.
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable}`}
      data-nonce={nonce}
    >
      <body>
        <div className="fs-field" aria-hidden="true" />
        <div className="fs-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
