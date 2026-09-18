import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { applySecurityHeaders, cspHeader, generateNonce } from "@/lib/security/headers";

/**
 * Padrão 07Dev (07DevPage RP): nonce por request + CSP + headers
 * completos aplicados na borda do App Router.
 *
 * Esta landing não possui API, formulários nem cookies — o middleware
 * existe exclusivamente para a camada de segurança de conteúdo.
 */
export function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const csp = cspHeader(nonce);

  const requestHeaders = new Headers(request.headers);
  // Next.js extrai o nonce do CSP de request e aplica aos próprios scripts.
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders }
  });

  applySecurityHeaders(response, nonce, request);
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2)).*)"
  ]
};
