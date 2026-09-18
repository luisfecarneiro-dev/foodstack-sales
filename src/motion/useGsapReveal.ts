"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

/**
 * Scoped hero entrance: staged rise + blur resolution with a heavy
 * physical curve. Each animated feature owns and cleans up its own
 * timeline via useGSAP context.
 */
export function useGsapReveal<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-reveal]", { clearProps: "all", opacity: 1 });
        return;
      }
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 56, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.11,
          clearProps: "filter,transform"
        }
      );
    },
    { scope }
  );

  return scope;
}
