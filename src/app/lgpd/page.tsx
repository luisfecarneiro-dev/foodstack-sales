import type { Metadata } from "next";
import { LegalBack, LegalIdentityNotice } from "@/components/ui/LegalIdentityNotice";
import { legalIdentity } from "@/config/legal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacidade e LGPD" };

const Section = ({
  n,
  title,
  children
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) => (
  <section>
    <h2 className="text-xl font-semibold text-[var(--fs-text)]">
      {n}. {title}
    </h2>
    <div className="mt-3 space-y-3">{children}</div>
  </section>
);

const List = ({ items }: { items: readonly string[] }) => (
  <ul className="list-inside list-disc space-y-1.5 pl-1">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default function LgpdPage() {
  return (
    <main className="fs-container max-w-3xl pb-24 pt-32 md:pt-36">
      <LegalBack />
      <h1 className="fs-serif mt-8 text-4xl font-medium tracking-tight md:text-5xl">
        Privacidade e LGPD
      </h1>
      <p className="mt-5 leading-relaxed text-[var(--fs-muted)]">
        Esta política descreve como a FoodStack, operada por{" "}
        {legalIdentity.legalName}, trata dados pessoais em seu site
        institucional, em conformidade com a Lei nº 13.709/2018 (LGPD).
      </p>

      <div className="mt-10">
        <LegalIdentityNotice />
      </div>

      <div className="mt-12 space-y-10 leading-7 text-[var(--fs-muted)]">
        <Section n={1} title="Controlador">
          <p>
            O controlador dos dados é{" "}
            <strong className="text-[var(--fs-text)]">
              {legalIdentity.controllerName}
            </strong>
            , responsável pela marca FoodStack e pela operação de
            desenvolvimento {legalIdentity.legalName} (
            {legalIdentity.address}). Canal de privacidade e suporte:{" "}
            <a
              href={`mailto:${legalIdentity.privacyEmail}`}
              className="text-[var(--fs-gold)] underline decoration-[var(--fs-gold)]/40 underline-offset-4"
            >
              {legalIdentity.privacyEmail}
            </a>
            .
          </p>
          <p>{legalIdentity.documentNote}</p>
        </Section>

        <Section n={2} title="Dados coletados por este site">
          <p>
            Este site institucional <strong>não coleta dados pessoais</strong> de
            forma ativa. Não possui formulário de captura, não instala
            cookies de rastreamento, não utiliza analytics e não exige
            cadastro para navegação. O único canal de contato é o link
            externo para o WhatsApp {siteConfig.whatsapp.display}.
          </p>
        </Section>

        <Section n={3} title="Dados técnicos de hospedagem">
          <p>
            A infraestrutura de hospedagem em nuvem pode registrar dados
            técnicos mínimos (endereço IP, marcação temporal, agente do
            navegador) estritamente necessários para entrega de conteúdo,
            segurança da plataforma e continuidade do serviço. Esses
            registros não são utilizados para perfilamento.
          </p>
        </Section>

        <Section n={4} title="Contato via WhatsApp">
          <p>
            Ao iniciar uma conversa pelo WhatsApp, o usuário passa a
            utilizar serviço operado por terceiro, e os dados
            compartilhados na conversa são tratados conforme os termos e a
            política de privacidade desse provedor. Recomenda-se
            compartilhar apenas as informações necessárias ao contexto
            comercial.
          </p>
        </Section>

        <Section n={5} title="Bases legais">
          <List
            items={[
              "Necessidade de segurança da infraestrutura e prevenção a abuso, para os registros técnicos de hospedagem;",
              "Procedimentos preliminares à contratação, para informações trocadas voluntariamente no canal comercial;",
              "Obrigação legal ou regulatória, quando aplicável."
            ]}
          />
        </Section>

        <Section n={6} title="Operadores e apoio técnico">
          <p>
            O tratamento descrito pode envolver exclusivamente o
            provedor de hospedagem do site. Não há CRM, ferramenta de
            e-mail marketing, pixel de publicidade ou serviço de análise
            de comportamento conectado a esta página.
          </p>
        </Section>

        <Section n={7} title="Transferência internacional">
          <p>
            A hospedagem em nuvem pode processar os registros técnicos
            fora do Brasil. O provedor utilizado segue padrões técnicos
            reconhecidos e os registros permanecem mínimos e sem
            finalidade comercial.
          </p>
        </Section>

        <Section n={8} title="Retenção">
          <p>
            Registros técnicos de hospedagem são mantidos pelo prazo
            estritamente necessário para segurança e operação, seguindo a
            política do provedor. Conversas iniciadas no WhatsApp seguem
            a retenção do serviço correspondente e da relação comercial.
          </p>
        </Section>

        <Section n={9} title="Direitos do titular">
          <List
            items={[
              "Confirmação da existência de tratamento;",
              "Acesso, correção e atualização de dados;",
              "Anonimização, bloqueio ou eliminação de dados desnecessários;",
              "Informação sobre compartilhamentos;",
              "Revogação de consentimento, quando aplicável."
            ]}
          />
          <p>
            Solicitações podem ser encaminhadas para{" "}
            <a
              href={`mailto:${legalIdentity.privacyEmail}`}
              className="text-[var(--fs-gold)] underline decoration-[var(--fs-gold)]/40 underline-offset-4"
            >
              {legalIdentity.privacyEmail}
            </a>
            .
          </p>
        </Section>

        <Section n={10} title="Segurança, incidentes e atualizações">
          <p>
            O site adota HTTPS, política de segurança de conteúdo (CSP)
            com nonce por requisição, headers de segurança de navegador,
            sem execução de scripts de terceiros. Em caso de incidente
            relevante envolvendo dados pessoais, serão adotadas medidas
            de contenção, avaliação e comunicação conforme a legislação
            aplicável. Esta política pode ser atualizada para refletir
            mudanças operacionais ou legais.
          </p>
        </Section>
      </div>

      <p className="pt-6 text-xs text-[var(--fs-muted)]/70">
        Última atualização: {legalIdentity.lastUpdated} — Versão{" "}
        {legalIdentity.policyVersion}
      </p>
    </main>
  );
}
