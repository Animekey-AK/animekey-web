import Link from "next/link";

import type { FooterCtaData } from "./types";

interface Props {
  section: FooterCtaData;
}

export function FooterCta({ section }: Props) {
  if (section.status !== "ready") return null;

  return (
    <div className="relative overflow-hidden py-20 text-center sm:py-28">
      {/* Radial glow from bottom */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(113,199,4,0.08),transparent_60%)]" />
      {/* Top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(113,199,4,0.2),transparent)]" />

      <div className="relative">
        {/* Eyebrow */}
        {section.eyebrow && (
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
            {section.eyebrow}
          </p>
        )}

        {/* Headline */}
        <h2 className="whitespace-pre-line text-[38px] font-black leading-[1.05] tracking-[-0.03em] sm:text-[52px] lg:text-[60px]">
          {section.headlineAccent ? (
            <>
              {section.headline}
              <span className="text-primary">{section.headlineAccent}</span>
            </>
          ) : (
            section.headline
          )}
        </h2>

        {/* Description */}
        {section.description && (
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.7] text-white/45 sm:text-[16px]">
            {section.description}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={section.cta.href}
            prefetch={false}
            className="animate-cta-pulse inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-[15px] font-extrabold text-black shadow-[0_16px_48px_rgba(113,199,4,.38)] transition-transform hover:scale-[1.03] sm:px-10 sm:py-4 sm:text-[16px]"
          >
            {section.cta.label}
          </Link>

          {section.secondaryCta && (
            <Link
              href={section.secondaryCta.href}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-8 py-4 text-[15px] font-semibold text-white/80 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/10 sm:px-10 sm:text-[16px]"
            >
              {section.secondaryCta.label}
            </Link>
          )}
        </div>

        {/* Fine print */}
        {section.finePrint && (
          <p className="mt-6 text-[12px] text-white/25">{section.finePrint}</p>
        )}
      </div>
    </div>
  );
}
