import Link from "next/link";

import type { FrictionKillerData } from "./types";

interface Props {
  section: FrictionKillerData;
}

export function FrictionKiller({ section }: Props) {
  if (section.status !== "ready") return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[linear-gradient(135deg,rgba(113,199,4,0.07),rgba(0,0,0,0))] px-6 py-10 sm:px-10 sm:py-12">
      {/* Radial glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        {/* Left: headline + signals */}
        <div className="min-w-0">
          <h2 className="text-[28px] font-black tracking-[-0.02em] sm:text-[36px]">
            {section.headline}
          </h2>
          {section.subline && (
            <p className="mt-2 text-[14px] text-white/50 sm:text-[15px]">
              {section.subline}
            </p>
          )}
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {section.signals.map((signal, i) => (
              <li key={i} className="flex items-center gap-2 text-[13px] text-white/70">
                <span className="font-black text-primary">{signal.icon}</span>
                {signal.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: CTA + live count */}
        <div className="flex flex-shrink-0 flex-col items-start gap-3 md:items-end">
          <Link
            href={section.cta.href}
            prefetch={false}
            className="animate-cta-pulse inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-[15px] font-extrabold text-background shadow-[0_12px_32px_rgba(113,199,4,.35)] transition-transform hover:scale-[1.03]"
          >
            {section.cta.label}
          </Link>
          {section.liveCount !== undefined && (
            <p className="text-[12px] text-white/35">
              🔴 {section.liveCount.toLocaleString()} fans watching right now
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
