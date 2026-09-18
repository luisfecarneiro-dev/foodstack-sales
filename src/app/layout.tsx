import type { Metadata, Viewport } from "next";
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

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="fs-field" aria-hidden="true" />
        <div className="fs-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
