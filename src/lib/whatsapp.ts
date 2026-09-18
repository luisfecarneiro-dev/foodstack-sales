import { siteConfig } from "@/config/site";

export function buildWhatsAppUrl(message?: string) {
  const query = new URLSearchParams({
    text: message ?? siteConfig.whatsapp.defaultMessage
  });
  return `https://wa.me/${siteConfig.whatsapp.e164}?${query.toString()}`;
}
