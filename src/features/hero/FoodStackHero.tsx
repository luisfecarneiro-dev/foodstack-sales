"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useGsapReveal } from "@/motion/useGsapReveal";
import { CTAButton } from "@/components/ui/CTAButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { homeCopy } from "@/content/copy";

// Three.js isola-se em chunk lazy: o hero renderiza instantaneamente e
// a cena 3D hidrata depois (progressiva por design — SDD 06).
const FoodStackScene = dynamic(
  () => import("@/three/FoodStackScene").then((m) => m.FoodStackScene),
  { ssr: false }
);

export function FoodStackHero() {
  const scope = useGsapReveal<HTMLElement>();

  return (
    <section
      ref={scope}
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pb-24 pt-32 md:pb-28 md:pt-36"
    >
      {/* Progressive WebGL ambience — decorative, lazy, safe to fail */}
      <FoodStackScene className="absolute inset-0 -z-10 opacity-70" />

      <div className="fs-container relative grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div data-reveal>
            <Eyebrow>{homeCopy.hero.eyebrow}</Eyebrow>
          </div>

          <h1 className="mt-8 max-w-[13ch] font-[family-name:var(--font-display)] text-[length:var(--fs-text-hero)] font-medium leading-[1.02] tracking-[-0.02em]">
            <span data-reveal className="block">
              {homeCopy.hero.titleLead}
            </span>
            <span
              data-reveal
              className="fs-serif block italic text-[var(--fs-gold)]"
            >
              {homeCopy.hero.titleAccent}
            </span>
          </h1>

          <p
            data-reveal
            className="mt-8 max-w-xl text-[length:var(--fs-text-body-lg)] leading-relaxed text-[var(--fs-muted)]"
          >
            {homeCopy.hero.body}
          </p>

          <div data-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CTAButton>{homeCopy.hero.primaryCta}</CTAButton>
            <CTAButton target="anchor" href="#projetos" variant="ghost">
              {homeCopy.hero.secondaryCta}
            </CTAButton>
          </div>
        </div>

        {/* Machined emblem plate — double-bezel, gently rotated */}
        <div data-reveal className="relative mx-auto w-full max-w-[440px]">
          <div className="absolute -inset-4 -z-10 rounded-full bg-[radial-gradient(circle,rgb(231_176_91/0.14),transparent_70%)] blur-2xl" />
          <div className="rotate-3 rounded-[2.5rem] bg-[rgb(245_239_228/0.035)] p-2 ring-1 ring-[rgb(245_239_228/0.09)] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.7)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:rotate-[1.5deg]">
            <div className="overflow-hidden rounded-[calc(2.5rem-0.5rem)] bg-[#211c15] p-6 shadow-[inset_0_1px_0_rgb(245_239_228/0.07)]">
              <Image
                src="/brand/foodstack-logo-source.png"
                alt="Logotipo FoodStack — Culinary Software"
                width={640}
                height={640}
                className="h-auto w-full"
                sizes="(max-width: 768px) 85vw, 34vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
