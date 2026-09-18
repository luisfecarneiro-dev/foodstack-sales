import {
  Smartphone,
  Puzzle,
  Type,
  FlaskConical,
  ShieldCheck,
  BookOpenText
} from "lucide-react";
import { Bezel } from "@/components/ui/Bezel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { homeCopy } from "@/content/copy";
import { cn } from "@/lib/cn";

const principles = [
  {
    icon: Smartphone,
    title: "Responsivo",
    body: "Fluxos pensados para celular e desktop, sem tratar o mobile como versão reduzida.",
    card: "md:col-span-4"
  },
  {
    icon: Puzzle,
    title: "Modular",
    body: "Componentes e domínios separados para permitir evolução sem concentrar responsabilidades.",
    card: "md:col-span-4"
  },
  {
    icon: Type,
    title: "Tipado",
    body: "Contratos explícitos em TypeScript reduzem ambiguidade entre conteúdo, UI e integrações.",
    card: "md:col-span-4"
  },
  {
    icon: FlaskConical,
    title: "Testável",
    body: "Fluxos críticos cobertos por testes unitários e E2E antes do go-live.",
    card: "md:col-span-4"
  },
  {
    icon: ShieldCheck,
    title: "Seguro",
    body: "Menor superfície pública, validação no servidor quando houver backend e nenhum segredo no cliente.",
    card: "md:col-span-4"
  },
  {
    icon: BookOpenText,
    title: "Documentado",
    body: "Decisões, limites, dados legais e processo de release ficam registrados no projeto.",
    card: "md:col-span-4"
  }
] as const;

export function Engineering() {
  return (
    <section id="engenharia" className="fs-section scroll-mt-28 border-y border-[rgb(245_239_228/0.06)] bg-[rgb(245_239_228/0.02)]">
      <div className="fs-container">
        <Reveal>
          <Eyebrow>ENGENHARIA</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="fs-serif mt-7 max-w-4xl text-[length:var(--fs-text-h2)] font-medium leading-[1.06] tracking-[-0.02em]">
            {homeCopy.engineering.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-[length:var(--fs-text-body-lg)] leading-relaxed text-[var(--fs-muted)]">
            {homeCopy.engineering.body}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-12 md:gap-6">
          {principles.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <Reveal key={principle.title} delay={i * 55} className={principle.card}>
                <Bezel className="h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5">
                  <div className="flex h-full flex-col p-8">
                    <span className="flex size-10 items-center justify-center rounded-full bg-[rgb(245_239_228/0.05)] ring-1 ring-[rgb(245_239_228/0.08)]">
                      <Icon strokeWidth={1.25} className="size-4.5 text-[var(--fs-gold)]" aria-hidden="true" />
                    </span>
                    <h3 className={cn("mt-10 text-lg font-semibold tracking-tight")}>
                      {principle.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-relaxed text-[var(--fs-muted)]">
                      {principle.body}
                    </p>
                  </div>
                </Bezel>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
