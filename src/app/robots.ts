import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/env";

/** robots — rotas públicas apenas; nenhum caminho privado existe no projeto. */
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${base}/sitemap.xml`
  };
}
