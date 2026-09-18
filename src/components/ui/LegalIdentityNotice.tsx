import Link from "next/link";
import { legalIdentity } from "@/config/legal";

/** Identity + version card shown on all legal pages. */
export function LegalIdentityNotice() {
  return (
    <div className="rounded-[1.25rem] bg-[rgb(231_176_91/0.05)] p-6 text-sm leading-relaxed text-[var(--fs-muted)] ring-1 ring-[rgb(231_176_91/0.18)]">
      <p>
        <strong className="text-[var(--fs-gold)]">Controlador:</strong>{" "}
        {legalIdentity.controllerName} — {legalIdentity.legalName} (
        {legalIdentity.address}).
      </p>
      <p className="mt-2">
        <strong className="text-[var(--fs-gold)]">Canal de privacidade/suporte:</strong>{" "}
        <a
          href={`mailto:${legalIdentity.privacyEmail}`}
          className="underline decoration-[var(--fs-gold)]/40 underline-offset-4"
        >
          {legalIdentity.privacyEmail}
        </a>
      </p>
      <p className="mt-2">{legalIdentity.documentNote}</p>
      <p className="mt-3 text-xs text-[var(--fs-muted)]/70">
        Política versão {legalIdentity.policyVersion} — atualizada em{" "}
        {legalIdentity.lastUpdated}.
      </p>
    </div>
  );
}

export function LegalBack() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm text-[var(--fs-gold)] transition-colors duration-500 hover:text-[var(--fs-text)]"
    >
      <span aria-hidden="true">←</span> Voltar para FoodStack
    </Link>
  );
}
