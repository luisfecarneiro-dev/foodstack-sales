import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-[rgb(245_239_228/0.06)] py-14">
      <div className="fs-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/foodstack-logo-source.png"
            alt=""
            width={34}
            height={34}
            className="rounded-full"
          />
          <p className="text-sm text-[var(--fs-muted)]">
            FoodStack · tecnologia e desenvolvimento por{" "}
            {siteConfig.companyLabel}
          </p>
        </div>
        <nav
          aria-label="Legal"
          className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-[var(--fs-muted)]"
        >
          {[
            { href: "/privacidade", label: "Privacidade" },
            { href: "/lgpd", label: "LGPD" },
            { href: "/termos", label: "Termos" }
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[var(--fs-text)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
