import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("uses the configured FoodStack WhatsApp number", () => {
    const url = buildWhatsAppUrl("Quero um cardápio");
    expect(url).toContain("https://wa.me/5531972198583");
    expect(url).toContain("Quero+um+card%C3%A1pio");
  });
});
