import { cn } from "@/lib/cn";

/** Microscopic uppercase pill that precedes every major heading. */
export function Eyebrow({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("fs-eyebrow", className)}>{children}</p>;
}
