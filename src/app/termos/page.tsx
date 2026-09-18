import type { Metadata } from "next";
import { LegalBack, LegalIdentityNotice } from "@/components/ui/LegalIdentityNotice";
import { legalIdentity } from "@/config/legal";

export const metadata: Metadata = { title: "Termos de Uso" };

export default function TermsPage() {
  return (
    <main className="fs-container max-w-3xl pb-24 pt-32 md:pt-36">
      <LegalBack />
      <h1 className="fs-serif mt-8 text-4xl font-medium tracking-tight md:text-5xl">
        Termos de Uso
      </h1>

      <div className="mt-10">
        <LegalIdentityNotice />
      </div>

      <div className="mt-12 space-y-10 leading-7 text-[var(--fs-muted)]">
        <section>
          <h2 className="text-xl font-semibold text-[var(--fs-text)]">1. Natureza do site</h2>
          <p className="mt-3">
            Esta página tem finalidade institucional e comercial: apresentar
            os serviços de desenvolvimento de cardápios digitais e sistemas
            de pedidos operados pela FoodStack ({legalIdentity.legalName}).
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--fs-text)]">2. Projetos demonstrados</h2>
          <p className="mt-3">
            As imagens exibidas demonstram projetos e fluxos de software
            reais, publicados como referência de capacidade. Elas não
            representam uma oferta padronizada: a presença de uma
            funcionalidade em uma referência visual não cria obrigação
            automática de incluí-la em outro projeto.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--fs-text)]">3. Propriedade intelectual</h2>
          <p className="mt-3">
            A marca FoodStack, os textos, o código e o design desta página
            pertencem ao seu operador. Marcas, logotipos e interfaces de
            clientes aparecem exclusivamente como referência autorizada de
            projetos entregues e não podem ser reutilizados sem
            autorização dos respectivos titulares.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--fs-text)]">4. Contratação</h2>
          <p className="mt-3">
            Escopo, preço, prazo, propriedade intelectual, suporte,
            integrações e responsabilidades são definidos em proposta ou
            contrato específico, negociados caso a caso. Nada nesta página
            constitui vinculação contratual.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--fs-text)]">5. Isenções</h2>
          <p className="mt-3">
            O site é fornecido {"\u201c"}no estado em que se encontra{"\u201d"}. Não há
            garantia de disponibilidade ininterrupta. Conteúdo pode ser
            atualizado sem aviso prévio.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--fs-text)]">6. Contato</h2>
          <p className="mt-3">
            Dúvidas sobre estes termos:{" "}
            <a
              href={`mailto:${legalIdentity.supportEmail}`}
              className="text-[var(--fs-gold)] underline decoration-[var(--fs-gold)]/40 underline-offset-4"
            >
              {legalIdentity.supportEmail}
            </a>
            .
          </p>
        </section>
      </div>

      <p className="pt-6 text-xs text-[var(--fs-muted)]/70">
        Última atualização: {legalIdentity.lastUpdated} — Versão{" "}
        {legalIdentity.policyVersion}
      </p>
    </main>
  );
}
