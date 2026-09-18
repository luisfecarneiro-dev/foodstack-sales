/**
 * Identidade legal FoodStack — fonte única de verdade.
 *
 * Dados confirmados pelo responsável em 2026-09-18, alinhados ao
 * controlador publicado em produção pelo mesmo operador (07Dev).
 * Nenhum CNPJ/CPF é publicado nesta versão (decisão consciente,
 * igual à política pública do operador) — o campo `documentNote`
 * é uma declaração explícita, não uma lacuna.
 */
export type LegalIdentity = {
  brand: string;
  operatorLabel: string;
  controllerName: string;
  legalName: string;
  documentNote: string;
  address: string;
  privacyEmail: string;
  supportEmail: string;
  policyVersion: string;
  lastUpdated: string;
};

export const legalIdentity: LegalIdentity = {
  brand: "FoodStack",
  operatorLabel: "07Dev / FoodStack",
  controllerName: "Luís Felipe Guimarães",
  legalName: "07Dev Desenvolvimento de Software",
  documentNote:
    "Nenhum CPF/CNPJ é publicado nesta versão da página. Documento fiscal pode ser solicitado no canal de contato antes da contratação.",
  address: "Rio Piracicaba, MG — Brasil",
  privacyEmail: "07devsuporte@gmail.com",
  supportEmail: "07devsuporte@gmail.com",
  policyVersion: "2026-09",
  lastUpdated: "18 de setembro de 2026"
} as const;

export const legalDataReady = Boolean(
  legalIdentity.controllerName &&
    legalIdentity.legalName &&
    legalIdentity.address &&
    legalIdentity.privacyEmail
);
