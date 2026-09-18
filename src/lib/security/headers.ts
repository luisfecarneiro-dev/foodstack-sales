import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Padrão 07Dev (lib/security/headers.ts do 07DevPage RP) adaptado:
 * - nonce como portão primário de script-src (sem strict-dynamic);
 * - sem hosts externos: esta landing não usa Turnstile, Cloudflare
 *   nem nenhum script third-party;
 * - fonts self-hosted via next/font (nenhuma origem remota);
 * - style-src 'unsafe-inline' necessário: GSAP/SSR gravam style attrs
 *   que não são allowlistáveis por hash.
 */
export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

export function cspHeader(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "form-action 'self'",
    "frame-src 'none'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "upgrade-insecure-requests"
  ].join("; ");
}

export function applySecurityHeaders(
  response: NextResponse,
  nonce: string,
  request: NextRequest
) {
  response.headers.set("Content-Security-Policy", cspHeader(nonce));
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set(
    "Referrer-Policy",
    "strict-origin-when-cross-origin"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), gyroscope=(), magnetometer=(), accelerometer=()"
  );
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("Origin-Agent-Cluster", "?1");

  const pathname = request.nextUrl.pathname;
  if (
    !pathname.startsWith("/_next/static/") &&
    !pathname.match(/\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)$/)
  ) {
    response.headers.delete("access-control-allow-origin");
  }
}
