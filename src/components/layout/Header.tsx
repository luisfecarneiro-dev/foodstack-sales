"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const links = [
  ...siteConfig.nav,
  { label: "Contato", href: "#contato" }
];

/**
 * Floating glass island. Detached from the viewport top, doubly
 * bezeled, and expands into a full-screen staggered modal on mobile.
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center pt-5">
        <div className="pointer-events-auto rounded-full bg-[rgb(28_24_20/0.42)] p-1.5 ring-1 ring-[rgb(245_239_228/0.09)] backdrop-blur-2xl">
          <nav
            aria-label="Navegação principal"
            className="flex items-center gap-1 rounded-full bg-[rgb(36_32_25/0.55)] px-5 py-2 shadow-[inset_0_1px_0_rgb(245_239_228/0.07)]"
          >
            <Link
              href="/"
              aria-label="FoodStack — início"
              className="mr-3 flex items-center gap-2.5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
            >
              <Image
                src="/brand/foodstack-logo-source.png"
                alt=""
                width={30}
                height={30}
                className="rounded-full"
                priority
              />
              <span className="fs-serif text-[17px] font-semibold tracking-tight">
                FoodStack
              </span>
            </Link>

            <div className="hidden items-center gap-0.5 md:flex">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3.5 py-1.5 text-[13.5px] text-[var(--fs-muted)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[rgb(245_239_228/0.05)] hover:text-[var(--fs-text)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="ml-3 hidden rounded-full bg-[var(--fs-gold)] px-4 py-2 text-[13px] font-semibold text-[var(--fs-ink)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-px hover:shadow-[0_8px_28px_-8px_rgb(231_176_91/0.6)] active:scale-[0.97] md:block"
            >
              Falar no WhatsApp
            </a>

            <button
              ref={buttonRef}
              type="button"
              aria-expanded={open}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative ml-2 flex size-9 items-center justify-center rounded-full bg-[rgb(245_239_228/0.05)] ring-1 ring-[rgb(245_239_228/0.08)] md:hidden"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute h-px w-4 bg-[var(--fs-text)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "translate-y-0 rotate-45" : "-translate-y-[3px]"
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute h-px w-4 bg-[var(--fs-text)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open ? "translate-y-0 -rotate-45" : "translate-y-[3px]"
                )}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile full-screen modal — heavy glass, staggered mask reveal */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col justify-center bg-[rgb(23_19_13/0.82)] px-8 backdrop-blur-3xl md:hidden",
          "transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <nav aria-label="Menu" className="flex flex-col gap-2">
          {links.map((link, i) => (
            <div key={link.href} className="overflow-hidden py-1">
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "fs-serif block text-5xl font-semibold tracking-tight",
                  "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  open
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                )}
                style={{ transitionDelay: open ? `${90 + i * 70}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            </div>
          ))}
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            className={cn(
              "mt-8 inline-flex w-fit items-center rounded-full bg-[var(--fs-gold)] px-7 py-3.5 text-[15px] font-semibold text-[var(--fs-ink)]",
              "transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
              open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            )}
            style={{ transitionDelay: open ? `${90 + links.length * 70}ms` : "0ms" }}
          >
            Falar no WhatsApp
          </a>
        </nav>
      </div>
    </>
  );
}
