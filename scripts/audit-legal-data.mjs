import { readFileSync } from "node:fs";

/**
 * Gate de go-live legal (padrão 07Dev).
 * Falha em produção se qualquer campo obrigatório da identidade legal
 * estiver nulo, vazio ou marcado como pendente.
 */
const source = readFileSync("src/config/legal.ts", "utf8");

const requiredFields = [
  ["controllerName", /controllerName:\s*"([^"]+)"/],
  ["legalName", /legalName:\s*"([^"]+)"/],
  ["address", /address:\s*"([^"]+)"/],
  ["privacyEmail", /privacyEmail:\s*"([^"]+)"/],
  ["supportEmail", /supportEmail:\s*"([^"]+)"/],
  ["documentNote", /documentNote:\s*"([^"]+)"/]
];

const failures = [];
for (const [field, pattern] of requiredFields) {
  const match = pattern.exec(source);
  const value = match?.[1]?.trim() ?? "";
  if (!value || /null|PENDING|TBD|CONFIRMAR/i.test(value)) {
    failures.push(field);
  }
}

if (
  !/privacyEmail:\s*"07devsuporte@gmail\.com"/.test(source) ||
  !/supportEmail:\s*"07devsuporte@gmail\.com"/.test(source)
) {
  failures.push("contact-email-must-be-07devsuporte@gmail.com");
}

if (process.env.NODE_ENV === "production" && failures.length) {
  console.error(
    "Legal identity is incomplete or unconfirmed. Production go-live is blocked.\n" +
      `Pending: ${failures.join(", ")}`
  );
  process.exit(1);
}

console.log(
  failures.length
    ? `Legal identity incomplete in development (pending: ${failures.join(", ")}).`
    : `Legal identity complete. Controlador + contato confirmados (07devsuporte@gmail.com).`
);
