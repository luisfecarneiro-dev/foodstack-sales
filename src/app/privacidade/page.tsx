import type { Metadata } from "next";
import { LegalBack, LegalIdentityNotice } from "@/components/ui/LegalIdentityNotice";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacyPage() {
  return (
    <main className="fs-container max-w-3xl pb-24 pt-32 md:pt-36">
      <LegalBack />
      <h1 className="fs-serif mt-8 text-4xl font-medium tracking-tight md:text-5xl">
        Política de Privacidade
      </h1>
      <p className="mt-5 leading-relaxed text-[var(--fs-muted)]">
        Esta página resume como a FoodStack trata dados pessoais no site
        institucional. A versão completa, com bases legais, retenção e
        direitos do titular, está na página{" "}
        <a
          href="/lgpd"
          className="text-[var(--fs-gold)] underline decoration-[var(--fs-gold)]/40 underline-offset-4"
        >
          Privacidade e LGPD
        </a>
        .
      </p>

      <div className="mt-10">
        <LegalIdentityNotice />
      </div>

      <div className="mt-12 space-y-10 leading-7 text-[var(--fs-muted)]">
        <section>
          <h2 className="text-xl font-semibold text-[var(--fs-text)]">1. Dados coletados por esta página</h2>
          <p className="mt-3">
            Esta landing não possui formulário de captura, não instala
            analytics e não grava cookies de rastreamento. O único canal de
            contato é um link externo para o WhatsApp do atendimento
            comercial. Ao usá-lo, o usuário sai desta página e passa a
            utilizar serviço de terceiro, sujeito aos termos e à política
            de privacidade do provedor correspondente.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--fs-text)]">2. Dados técnicos</h2>
          <p className="mt-3">
            A hospedagem em nuvem pode processar registros técnicos
            mínimos (como IP e marcação temporal) necessários para
            segurança, entrega de conteúdo e operação do site. Não há
            utilizização desses registros para perfilamento ou marketing.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-[var(--fs-text)]">3. Alterações nesta política</h2>
          <p className="mt-3">
            Se analytics, formulários, chat ou qualquer nova coleta for
            adicionada no futuro, esta política será atualizada antes da
            publicação, com inventário de dados, finalidade e base legal.
          </p>
        </section>
      </div>
    </main>
  );
}
