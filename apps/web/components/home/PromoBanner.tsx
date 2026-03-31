import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { CountdownTimer } from "./CountdownTimer";
import type { CallToActionIntent, PromoData } from "./types";

const ctaClasses: Record<CallToActionIntent, string> = {
  primary: "bg-primary text-primary-foreground hover:opacity-90",
  secondary:
    "border border-white/15 bg-white/10 text-foreground hover:bg-white/15",
  tertiary: "text-foreground hover:underline underline-offset-4",
};

export function PromoBanner({ promo }: { promo: PromoData }) {
  if (promo.status === "error" || promo.status === "empty") {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border/40 bg-[linear-gradient(135deg,_rgba(113,199,4,0.16),_rgba(113,199,4,0.03)_30%,_rgba(255,255,255,0.02)_100%)]">
      <div className="grid gap-8 px-6 py-8 md:grid-cols-[minmax(0,1fr)_280px] md:px-8 md:py-9">
        <div className="space-y-5">
          {promo.badge ? (
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {promo.badge}
            </p>
          ) : null}
          {promo.countdownTarget && (
            <CountdownTimer targetDate={promo.countdownTarget} />
          )}
          <div className="space-y-3">
            <h2 className="max-w-2xl text-title text-foreground">
              {promo.title}
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
              {promo.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[promo.primaryCta, promo.secondaryCta].filter(Boolean).map((cta) => {
              if (!cta) return null;
              return (
                <Link
                  key={cta.label}
                  href={cta.href}
                  prefetch={false}
                  data-analytics-id={`home-promo-${cta.intent}`}
                  className={cn(
                    "inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition-all",
                    ctaClasses[cta.intent],
                  )}
                >
                  {cta.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-56 overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
          <Image
            src={promo.media.src}
            alt={promo.media.alt}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            className="object-contain p-6"
          />
        </div>
      </div>
    </section>
  );
}
