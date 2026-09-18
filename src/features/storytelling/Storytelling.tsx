import { Compass, MousePointerClick, MapPin, CheckCheck } from "lucide-react";
import { Bezel } from "@/components/ui/Bezel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { homeCopy } from "@/content/copy";
import { cn } from "@/lib/cn";

/**
 * Asymmetrical Bento: the four journey stages break the grid with
 * varying spans on desktop and collapse to a single column on mobile.
 */
const stages = [
  {
    number: "01",
    icon: Compass,
    title: "Descoberta",
    body: "Seu cliente encontra o cardápio e entende rapidamente como pedir.",
    // Largest tile on desktop
    card: "md:col-span-7 md:row-span-2",
    pad: "p-8 md:p-12"
  },
  {
    number: "02",
    icon: MousePointerClick,
    title: "Escolha",
    body: "Categorias, busca, personalização e carrinho organizam a decisão.",
    card: "md:col-span-5",
    pad: "p-8"
  },
  {
    number: "03",
    icon: MapPin,
    title: "Contexto",
    body: "Delivery, retirada ou mesa entram no fluxo conforme a operação.",
    card: "md:col-span-5",
    pad: "p-8"
  },
  {
    number: "04",
    icon: CheckCheck,
    title: "Finalização",
    body: "Checkout e acompanhamento mantêm o pedido conectado ao cliente.",
    card: "md:col-span-12",
    pad: "p-8 md:px-12"
  }
] as const;

export function Storytelling() {
  return (
    <section id="como-funciona" className="fs-section scroll-mt-28">
      <div className="fs-container">
        <Reveal>
          <Eyebrow>{homeCopy.intro.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="fs-serif mt-7 max-w-3xl text-[length:var(--fs-text-h2)] font-medium leading-[1.06] tracking-[-0.02em]">
            {homeCopy.intro.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 max-w-2xl text-[length:var(--fs-text-body-lg)] leading-relaxed text-[var(--fs-muted)]">
            {homeCopy.intro.body}
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <Reveal
                key={stage.number}
                delay={i * 70}
                className={stage.card}
              >
                <Bezel className="h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1.5">
                  <div className={cn("flex h-full flex-col", stage.pad)}>
                    <div className="flex items-center justify-between">
                      <span className="fs-serif text-sm italic text-[var(--fs-orange)]">
                        {stage.number}
                      </span>
                      <span className="flex size-10 items-center justify-center rounded-full bg-[rgb(245_239_228/0.05)] ring-1 ring-[rgb(245_239_228/0.08)]">
                        <Icon strokeWidth={1.25} className="size-4.5 text-[var(--fs-gold)]" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-auto pt-14 text-[length:var(--fs-text-h3)] font-semibold tracking-tight md:pt-20">
                      {stage.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-[var(--fs-muted)]">
                      {stage.body}
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
