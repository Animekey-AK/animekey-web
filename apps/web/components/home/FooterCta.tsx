import Link from "next/link";

import type { FooterCtaData } from "./types";

interface Props {
  section: FooterCtaData;
}

export function FooterCta({ section }: Props) {
  if (section.status !== "ready") return null;

  return (
    <div className="relative overflow-hidden py-20 text-center sm:py-28">
      {/* Centered radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(113,199,4,0.09),transparent_65%)]" />
      {/* Top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative">
        <h2 className="text-[36px] font-black leading-[1.05] tracking-[-0.03em] sm:text-[52px] lg:text-[64px]">
          {section.headline}
        </h2>
        {section.subline && (
          <p className="mt-4 text-[15px] font-medium text-white/45 sm:text-[17px]">
            {section.subline}
          </p>
        )}
        <Link
          href={section.cta.href}
          prefetch={false}
          className="animate-cta-pulse mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-[15px] font-extrabold text-background shadow-[0_16px_48px_rgba(113,199,4,.4)] transition-transform hover:scale-[1.03] sm:px-10 sm:py-5 sm:text-[17px]"
        >
          {section.cta.label}
        </Link>
      </div>
    </div>
  );
}
