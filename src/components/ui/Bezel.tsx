import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Double-Bezel (Doppelrand): every premium surface is a glass plate
 * sitting in a machined tray — outer shell with hairline ring, inner
 * core with its own radius and top-light inset.
 */
export function Bezel({
  children,
  className,
  innerClassName,
  radius = 2
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** Outer radius in rem (2rem default squircle). */
  radius?: 1.5 | 2;
}) {
  const outerRadius =
    radius === 1.5 ? "rounded-[1.75rem]" : "rounded-[2rem]";
  const innerRadius =
    radius === 1.5
      ? "rounded-[calc(1.75rem-0.375rem)]"
      : "rounded-[calc(2rem-0.375rem)]";

  return (
    <div
      className={cn(
        "p-1.5",
        outerRadius,
        "bg-[rgb(245_239_228/0.035)] ring-1 ring-[rgb(245_239_228/0.08)]",
        className
      )}
    >
      <div
        className={cn(
          innerRadius,
          "h-full bg-[#242019] shadow-[inset_0_1px_0_rgb(245_239_228/0.07)]",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
