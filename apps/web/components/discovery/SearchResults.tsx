"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AnimatedSection } from "@/components/home/AnimatedSection";
import { routes } from "@/constants/routes";

import { CatalogCard } from "./CatalogCard";
import { catalogItems } from "./catalog.data";

interface Props {
  initialQuery: string;
}

export function SearchResults({ initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Update URL when query changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const url = routes.search(query.trim() || undefined);
      router.replace(url, { scroll: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, router]);

  const results =
    query.trim().length === 0
      ? catalogItems
      : catalogItems.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.genres.some((g) => g.toLowerCase().includes(query.toLowerCase())),
        );

  return (
    <div className="space-y-8">
      {/* Search input */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, genre, mood…"
          className="w-full rounded-[1.2rem] border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-[15px] text-foreground placeholder:text-white/30 focus:border-white/20 focus:bg-white/[0.05] focus:outline-none transition-colors"
          autoFocus
        />
      </div>

      {/* Result count */}
      <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-foreground/35">
        {query.trim()
          ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
          : `${results.length} titles in catalogue`}
      </p>

      {/* Grid */}
      <AnimatedSection delay={0}>
        {results.length === 0 ? (
          <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 rounded-[1.8rem] border border-white/6 bg-white/[0.02]">
            <span className="text-5xl opacity-40">🎌</span>
            <p className="text-sm text-foreground/40">No results for "{query}" — try a different title or genre</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {results.map((item, i) => (
              <CatalogCard key={item.id} item={item} priority={i < 5} />
            ))}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
