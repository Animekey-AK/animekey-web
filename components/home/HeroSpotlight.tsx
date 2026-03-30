import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { CallToActionIntent, HeroData } from "./types";

const ctaClasses: Record<CallToActionIntent, string> = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 shadow-[0_16px_40px_rgba(113,199,4,0.28)]",
  secondary:
    "border border-white/15 bg-white/8 text-foreground hover:bg-white/12",
  tertiary:
    "text-foreground/80 underline-offset-4 hover:text-foreground hover:underline",
};

export function HeroSpotlight({ hero }: { hero: HeroData }) {
  if (hero.status === "error") {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-border/40 bg-[radial-gradient(circle_at_top_left,_rgba(113,199,4,0.25),_transparent_42%),linear-gradient(135deg,_#111_0%,_#070707_45%,_#101010_100%)] px-6 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)] md:px-10 md:py-12">
      <div className="absolute inset-y-0 right-0 hidden w-[42%] md:block">
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/30 to-transparent" />
        <div className="absolute inset-0">
          <Image
            src={hero.media.src}
            alt={hero.media.alt}
            fill
            priority
            sizes="(max-width: 1024px) 0px, 40vw"
            className="object-contain object-right"
          />
        </div>
      </div>

      <div className="relative grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(260px,0.55fr)] md:items-end">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
            {hero.eyebrow}
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-black leading-none tracking-tight text-foreground md:text-6xl">
              {hero.title}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-foreground/75 md:text-base">
              {hero.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {hero.ctas.map((cta) => (
              <Link
                key={cta.label}
                href={cta.href}
                prefetch={false}
                data-analytics-id={`home-hero-${cta.intent}`}
                className={cn(
                  "inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition-all",
                  ctaClasses[cta.intent],
                )}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.35rem] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/55">
                {stat.label}
              </p>
              <p className="mt-2 text-2xl font-black text-foreground">
                {stat.value}
              </p>
              {stat.detail ? (
                <p className="mt-1 text-xs text-foreground/60">{stat.detail}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
