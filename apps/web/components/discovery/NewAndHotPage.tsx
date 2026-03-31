"use client";

import { AnimatedSection } from "@/components/home/AnimatedSection";

import { CatalogCard } from "./CatalogCard";
import { catalogItems } from "./catalog.data";
import type { CatalogItem } from "./catalog.data";

const TRENDING_BADGES = new Set(["trending", "top 10", "editor's pick", "cult hit"]);
const NEW_BADGES = new Set(["new", "masterpiece", "all-time best", "legendary"]);

function isTrending(item: CatalogItem): boolean {
  return (
    (item.badge !== undefined && TRENDING_BADGES.has(item.badge.toLowerCase())) ||
    item.rating >= 8.8
  );
}

function isNew(item: CatalogItem): boolean {
  return (
    (item.badge !== undefined && NEW_BADGES.has(item.badge.toLowerCase())) ||
    item.year >= 2022
  );
}

const trending = [...catalogItems]
  .filter(isTrending)
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 12);

const trendingIds = new Set(trending.map((i) => i.id));

const newReleases = [...catalogItems]
  .filter((item) => !trendingIds.has(item.id) && isNew(item))
  .sort((a, b) => b.year - a.year || b.rating - a.rating)
  .slice(0, 12);

export function NewAndHotPage() {
  return (
    <>
      {/* Hero strip */}
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(5,14,3,0.98)_0%,rgba(7,18,4,0.97)_55%,rgba(5,12,2,0.98)_100%)] px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
        {/* Green glow accents */}
        <div className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-primary/12 blur-[80px]" />
        <div className="pointer-events-none absolute right-16 top-8 h-48 w-48 rounded-full bg-primary/8 blur-[60px]" />

        <div className="relative mx-auto max-w-screen-2xl">
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            New &amp; Hot
          </span>
          <h1 className="text-4xl font-black leading-[0.92] tracking-tight text-foreground md:text-5xl xl:text-6xl">
            What&apos;s hot
            <br />
            <span className="text-primary">right now.</span>
          </h1>
          <p className="mt-4 max-w-lg text-[15px] text-foreground/55">
            Trending picks and the freshest additions — hand-curated for the most obsessive anime fans.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-16 px-4 py-10 md:px-8 md:py-14">
        {/* Trending Now */}
        <AnimatedSection delay={0}>
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-foreground">🔥 Trending Now</h2>
              <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-foreground/55">
                {trending.length} titles
              </span>
            </div>
            <p className="text-[13px] text-foreground/45">What fans are watching this week</p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {trending.map((item, i) => (
                <CatalogCard key={item.id} item={item} priority={i < 5} />
              ))}
            </div>
          </section>
        </AnimatedSection>

        {/* New Releases */}
        {newReleases.length > 0 && (
          <AnimatedSection delay={0.05}>
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-foreground">🆕 New Releases</h2>
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-foreground/55">
                  {newReleases.length} titles
                </span>
              </div>
              <p className="text-[13px] text-foreground/45">Just added to AnimeKey</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {newReleases.map((item, i) => (
                  <CatalogCard key={item.id} item={item} priority={i < 5} />
                ))}
              </div>
            </section>
          </AnimatedSection>
        )}
      </div>
    </>
  );
}
