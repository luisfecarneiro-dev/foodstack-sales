import Image from "next/image";
import { Bezel } from "@/components/ui/Bezel";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { showcaseCases } from "@/content/cases";
import { cn } from "@/lib/cn";

/** Subtle editorial variance between consecutive case figures. */
const frameTilt = ["md:rotate-[0.6deg]", "md:-rotate-[0.4deg]", "md:rotate-[0.3deg]"];

export function CaseShowcase() {
  return (
    <section id="projetos" className="fs-section scroll-mt-28">
      <div className="fs-container">
        <Reveal>
          <Eyebrow>PROJETOS / REFERÊNCIAS</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="fs-serif mt-7 max-w-4xl text-[length:var(--fs-text-h2)] font-medium leading-[1.06] tracking-[-0.02em]">
            Sistemas reais mostram o que um cardápio pode se tornar.
          </h2>
        </Reveal>

        <div className="mt-24 space-y-32 md:space-y-40">
          {showcaseCases.map((item, caseIndex) => (
            <article key={item.id}>
              <div
                className={cn(
                  "grid items-start gap-10 md:gap-14 lg:grid-cols-[0.85fr_1.15fr]",
                  caseIndex % 2 === 1 && "lg:grid-cols-[1.15fr_0.85fr] lg:[&>:first-child]:order-2"
                )}
              >
                {/* Sticky copy on desktop */}
                <Reveal className="lg:sticky lg:top-28">
                  <p className="text-[13px] font-semibold tracking-wide text-[var(--fs-orange)]">
                    {item.eyebrow}
                  </p>
                  <h3 className="fs-serif mt-4 text-[length:var(--fs-text-h3)] font-medium leading-[1.15] tracking-[-0.015em]">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-md leading-relaxed text-[var(--fs-muted)]">
                    {item.summary}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2" aria-label="Capacidades demonstradas">
                    {item.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="rounded-full bg-[rgb(245_239_228/0.035)] px-3.5 py-1.5 text-[12px] text-[#d8ccba] ring-1 ring-[rgb(245_239_228/0.08)]"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Figure rail — machined frames, slight editorial tilt */}
                <div className="space-y-8 md:space-y-12">
                  {item.images.map((image, imageIndex) => (
                    <Reveal key={image.src} delay={imageIndex * 60}>
                      <figure
                        className={cn(
                          "transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:rotate-0",
                          frameTilt[imageIndex % frameTilt.length]
                        )}
                      >
                        <Bezel className="hover:rotate-0">
                          <div className="overflow-hidden">
                            <div className="relative aspect-video w-full">
                              <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 56vw"
                              />
                            </div>
                            <figcaption className="border-t border-[rgb(245_239_228/0.06)] px-6 py-4 text-[13.5px] leading-relaxed text-[var(--fs-muted)]">
                              {image.caption}
                            </figcaption>
                          </div>
                        </Bezel>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
