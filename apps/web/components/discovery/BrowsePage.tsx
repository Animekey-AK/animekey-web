"use client";

import { useState } from "react";

import { AnimatedSection } from "@/components/home/AnimatedSection";

import { CatalogCard } from "./CatalogCard";
import { GenreFilterBar } from "./GenreFilterBar";
import { catalogItems, genres } from "./catalog.data";

interface BrowseHero {
  badge: string;
  headline: string;
  subtext: string;
}

interface Props {
  type: "series" | "movie";
  hero: BrowseHero;
}

export function BrowsePage({ type, hero }: Props) {
  const [activeGenre, setActiveGenre] = useState("all");

  const allOfType = catalogItems.filter((item) => item.type === type);
  const filtered =
    activeGenre === "all"
      ? allOfType
      : allOfType.filter((item) => item.genres.includes(activeGenre));

  const totalGenres = new Set(allOfType.flatMap((i) => i.genres)).size;

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-6 md:px-8 md:py-8">
      {/* Cinematic hero strip */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(11,28,3,0.97),rgba(5,8,3,0.98))] p-8 shadow-[0_32px_100px_rgba(0,0,0,0.5)] md:p-10">
        {/* Green glow blob */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-[80px]" />
        <div className="pointer-events-none absolute bottom-0 right-10 h-48 w-48 rounded-full bg-primary/6 blur-[60px]" />

        <div className="relative z-[1] max-w-2xl space-y-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            {hero.badge}
          </p>
          <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-foreground md:text-5xl">
            {hero.headline}
          </h1>
          <p className="text-sm leading-7 text-foreground/58 md:text-[15px]">
            {hero.subtext}
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            {[
              `${allOfType.length} titles`,
              `${totalGenres} genres`,
              "Free episode",
              "No ads",
            ].map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium text-white/60"
              >
                {stat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Genre filter */}
      <GenreFilterBar genres={genres} active={activeGenre} onSelect={setActiveGenre} />

      {/* Results */}
      <AnimatedSection delay={0}>
        {filtered.length === 0 ? (
          <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 rounded-[1.8rem] border border-white/6 bg-white/[0.02]">
            <span className="text-5xl opacity-40">🎌</span>
            <p className="text-sm text-foreground/40">Nothing in this genre yet — try another mood</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {filtered.map((item, i) => (
              <CatalogCard key={item.id} item={item} priority={i < 5} />
            ))}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
