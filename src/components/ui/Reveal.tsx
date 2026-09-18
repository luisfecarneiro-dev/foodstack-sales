"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  id?: string;
};

/**
 * IntersectionObserver-driven entrance: translate-y + blur + opacity
 * resolve once when the element crosses the viewport. GPU-safe and
 * disabled under prefers-reduced-motion (CSS forces final state).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  id
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-revealed");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      className={cn("fs-io-reveal", className)}
    >
      {children}
    </Tag>
  );
}
