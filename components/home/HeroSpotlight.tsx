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
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(113,199,4,0.3),_transparent_38%),linear-gradient(135deg,_#111_0%,_#050505_45%,_#0c0c0c_100%)] px-6 py-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)] md:px-10 md:py-12">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_transparent_0%,_transparent_52%,_rgba(113,199,4,0.08)_100%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] lg:items-end">
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

        <div className="grid gap-4">
          <div className="relative min-h-[20rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(160deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.01))] shadow-[0_24px_80px_rgba(0,0,0,0.36)]">
            <Image
              src={hero.media.src}
              alt={hero.media.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="scale-105 object-cover opacity-12 blur-md"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/42 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="w-fit rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-foreground/72 backdrop-blur-xl">
                Featured drop
              </span>

              <div className="space-y-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
                    Tonight on AnimeKey
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-7 text-foreground">
                    Browse-first curation with premium energy and clearer next steps.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground/48">
                      Programming
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                      Trending, continue watching, staff picks, and premium offers stay visible.
                    </p>
                  </div>
                  <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground/48">
                      Browse flow
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                      Discovery wins first. Subscription prompts support the path instead of blocking it.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["New picks", "Top 5", "Premium", "Watch everywhere"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-foreground/76"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
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
      </div>
    </section>
  );
}
