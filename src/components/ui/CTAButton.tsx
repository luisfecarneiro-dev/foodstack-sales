import { ArrowUpRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export type CTATarget = "whatsapp" | "anchor";

/**
 * Magnetic pill CTA — the trailing icon never sits naked; it lives in
 * its own concentric circle, flush with the button inner padding.
 */
export function CTAButton({
  children,
  href,
  target = "whatsapp",
  variant = "primary",
  tone = "neutral",
  className,
  ariaLabel,
  message
}: {
  children: React.ReactNode;
  href?: string;
  target?: CTATarget;
  variant?: "primary" | "ghost";
  tone?: "neutral" | "capivara";
  className?: string;
  /** Accessible name when visible text alone is ambiguous. */
  ariaLabel?: string;
  /** Pre-filled WhatsApp message when target is whatsapp. */
  message?: string;
}) {
  const resolvedHref =
    href ?? (target === "whatsapp" ? buildWhatsAppUrl(message) : "#");
  const external = target === "whatsapp";

  const tintMap: Record<"primary" | "ghost", Record<"neutral" | "capivara", string>> = {
    primary: {
      neutral:
        "bg-[var(--fs-gold)] text-[var(--fs-ink)] shadow-[0_10px_38px_-12px_rgb(231_176_91/0.55)] hover:shadow-[0_16px_48px_-10px_rgb(231_176_91/0.6)]",
      capivara:
        "bg-[#caa46f] text-[#1c1814] shadow-[0_10px_38px_-12px_rgb(202_164_111/0.5)] hover:shadow-[0_16px_48px_-10px_rgb(202_164_111/0.55)]"
    },
    ghost: {
      neutral:
        "bg-[rgb(245_239_228/0.04)] text-[var(--fs-text)] ring-1 ring-[rgb(245_239_228/0.12)] hover:ring-[rgb(231_176_91/0.35)]",
      capivara:
        "bg-[rgb(245_239_228/0.04)] text-[var(--fs-text)] ring-1 ring-[rgb(245_239_228/0.12)] hover:ring-[#caa46f66]"
    }
  };

  const iconTint =
    variant === "primary"
      ? "bg-black/10 text-[var(--fs-ink)]"
      : "bg-[rgb(245_239_228/0.07)] text-[var(--fs-gold)]";

  return (
    <a
      href={resolvedHref}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      aria-label={ariaLabel}
      className={cn(
        "group fs-ease inline-flex items-center gap-3 rounded-full py-2 pl-7 pr-2",
        "text-[15px] font-semibold tracking-tight",
        "transition-[transform,box-shadow,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:-translate-y-px active:scale-[0.98] active:translate-y-0",
        tintMap[variant][tone],
        className
      )}
    >
      <span className="py-1.5">{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          "flex size-9 items-center justify-center rounded-full",
          iconTint,
          "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105"
        )}
      >
        {target === "whatsapp" ? (
          <MessageCircle strokeWidth={1.5} className="size-4" />
        ) : (
          <ArrowUpRight strokeWidth={1.5} className="size-4" />
        )}
      </span>
    </a>
  );
}
