import { Bezel } from "@/components/ui/Bezel";
import { CTAButton } from "@/components/ui/CTAButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { homeCopy } from "@/content/copy";

export function FinalCTA() {
  return (
    <section id="contato" className="fs-section scroll-mt-28">
      <div className="fs-container">
        <Reveal>
          <Bezel radius={2} className="overflow-hidden">
            <div className="relative overflow-hidden px-8 py-16 md:px-16 md:py-24">
              {/* Ember glow — pure background, no blur filters */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-32 size-[28rem] rounded-full bg-[radial-gradient(circle,rgb(216_135_50/0.28),transparent_65%)]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-16 size-[22rem] rounded-full bg-[radial-gradient(circle,rgb(148_148_90/0.16),transparent_65%)]"
              />

              <Eyebrow>PROJETO SOB MEDIDA</Eyebrow>
              <h2 className="fs-serif mt-7 max-w-3xl text-[length:var(--fs-text-h2)] font-medium leading-[1.06] tracking-[-0.02em]">
                {homeCopy.finalCta.title}
              </h2>
              <p className="mt-6 max-w-xl text-[length:var(--fs-text-body-lg)] leading-relaxed text-[var(--fs-muted)]">
                {homeCopy.finalCta.body}
              </p>
              <CTAButton
                className="mt-10"
                message="Olá! Vi a apresentação da FoodStack e quero conversar sobre um cardápio digital para meu negócio."
                ariaLabel="Conversar com a FoodStack no WhatsApp"
              >
                Falar com a FoodStack
              </CTAButton>
            </div>
          </Bezel>
        </Reveal>
      </div>
    </section>
  );
}
