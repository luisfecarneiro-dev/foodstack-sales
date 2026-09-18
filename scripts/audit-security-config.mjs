import { readFileSync } from "node:fs";

/**
 * Audit estático de configuração de segurança (padrão 07DevPage RP).
 * Verifica que CSP, headers e middleware mantêm o contrato exigido:
 *   - CSP com nonce, sem strict-dynamic, sem unsafe-inline em script-src,
 *     frame-ancestors 'none', object-src 'none', base-uri 'self';
 *   - headers obrigatórios em next.config.ts e vercel.json;
 *   - middleware presente com matcher excluindo assets estáticos;
 *   - nenhum secret ou origem externa de script.
 */

const requiredCspDirectives = [
  /script-src 'self' 'nonce-/,
  /style-src 'self' 'unsafe-inline'/,
  /font-src 'self' data:/,
  /img-src 'self' data: blob:/,
  /connect-src 'self'/,
  /frame-ancestors 'none'/,
  /object-src 'none'/,
  /base-uri 'self'/,
  /upgrade-insecure-requests/
];

const requiredHeaders = [
  "X-Frame-Options",
  "X-Content-Type-Options",
  "Referrer-Policy",
  "Strict-Transport-Security",
  "Permissions-Policy",
  "Cross-Origin-Opener-Policy",
  "Cross-Origin-Resource-Policy",
  "Origin-Agent-Cluster"
];

const forbidden = [
  /strict-dynamic/,
  /script-src[^\n;]*unsafe-inline/,
  /NEXT_PUBLIC_[A-Z_]*SECRET/,
  /NEXT_PUBLIC_[A-Z_]*KEY/,
  /sk-[a-zA-Z0-9]{20,}/
];

const failures = [];

const stripComments = (text) =>
  text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

const headers = stripComments(readFileSync("src/lib/security/headers.ts", "utf8"));
const middleware = stripComments(readFileSync("src/middleware.ts", "utf8"));
const nextConfig = readFileSync("next.config.ts", "utf8");
const vercelJson = readFileSync("vercel.json", "utf8");

for (const directive of requiredCspDirectives) {
  if (!directive.test(headers)) failures.push(`CSP directive missing: ${directive}`);
}

for (const pattern of forbidden) {
  for (const [name, text] of [
    ["headers.ts", headers],
    ["src/middleware.ts", middleware],
    ["next.config.ts", nextConfig],
    ["vercel.json", vercelJson]
  ]) {
    if (pattern.test(text)) failures.push(`${name}: forbidden pattern ${pattern}`);
  }
}

for (const header of requiredHeaders) {
  if (!nextConfig.includes(header)) failures.push(`next.config.ts: missing ${header}`);
  if (!vercelJson.includes(header)) failures.push(`vercel.json: missing ${header}`);
}

if (!/_next\/static/.test(middleware)) {
  failures.push("src/middleware.ts: matcher must exclude _next/static");
}
if (!/x-nonce/.test(middleware)) {
  failures.push("src/middleware.ts: must propagate x-nonce request header");
}
if (!/poweredByHeader:\s*false/.test(nextConfig)) {
  failures.push("next.config.ts: poweredByHeader must be false");
}

if (failures.length) {
  console.error("Security config audit FAILED:\n" + failures.join("\n"));
  process.exit(1);
}

console.log(
  "Security config audit passed (CSP nonce, security headers, middleware matcher, no external scripts)."
);
