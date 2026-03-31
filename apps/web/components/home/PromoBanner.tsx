import Link from "next/link";

import { cn } from "@/lib/utils";

import { CountdownTimer } from "./CountdownTimer";
import type { CallToActionIntent, PromoData } from "./types";

const ctaClasses: Record<CallToActionIntent, string> = {
  primary:
    "bg-primary text-black font-extrabold shadow-[0_8px_28px_rgba(113,199,4,.40)] hover:opacity-90",
  secondary:
    "border border-white/20 bg-white/8 text-foreground hover:bg-white/14",
  tertiary: "text-foreground hover:underline underline-offset-4",
};

export function PromoBanner({ promo }: { promo: PromoData }) {
  if (promo.status === "error" || promo.status === "empty") {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-[rgba(113,199,4,0.16)]">
      {/* Animated dark gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0b1d01,#060f00,#040404)] animate-[promoBg_8s_ease_infinite]" />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-primary/6 blur-2xl" />

      {/* Floating emoji art */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-8 pr-10 text-[52px] opacity-[0.07] select-none">
        <span className="translate-y-2">⚔</span>
        <span className="-translate-y-3">🌊</span>
        <span className="translate-y-1">💀</span>
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 py-10 sm:px-10 sm:py-12">
        {promo.badge && (
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
            {promo.badge}
          </p>
        )}

        {/* Compact countdown */}
        {promo.countdownTarget && (
          <div className="mb-5 flex items-center gap-2 text-[13px] text-white/50">
            <span>⌛</span>
            <span>Offer expires in</span>
            <CountdownTimer targetDate={promo.countdownTarget} compact />
          </div>
        )}

        <h2 className="max-w-lg whitespace-pre-line text-[34px] font-black leading-[1.08] tracking-[-0.03em] text-white sm:text-[42px]">
          {promo.title}
        </h2>

        <p className="mt-3 max-w-md text-[14px] leading-[1.7] text-white/50">
          {promo.description}
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-wrap gap-3">
          {[promo.primaryCta, promo.secondaryCta].filter(Boolean).map((cta) => {
            if (!cta) return null;
            return (
              <Link
                key={cta.label}
                href={cta.href}
                prefetch={false}
                data-analytics-id={`home-promo-${cta.intent}`}
                className={cn(
                  "inline-flex items-center rounded-full px-6 py-3 text-[14px] font-semibold transition-all",
                  ctaClasses[cta.intent],
                )}
              >
                {cta.label}
              </Link>
            );
          })}
        </div>

        {/* Trust fine print */}
        {promo.finePrint && (
          <p className="mt-5 text-[12px] text-white/30">{promo.finePrint}</p>
        )}
      </div>
    </section>
  );
}
