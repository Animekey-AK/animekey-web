"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { routes } from "@/constants/routes";

import { catalogItems } from "./catalog.data";
import type { CatalogItem } from "./catalog.data";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results: CatalogItem[] =
    query.trim().length === 0
      ? catalogItems.slice(0, 6)
      : catalogItems
          .filter(
            (item) =>
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.genres.some((g) => g.toLowerCase().includes(query.toLowerCase())),
          )
          .slice(0, 8);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlighted(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Reset highlight when results change
  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlighted((h) => Math.min(h + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlighted((h) => Math.max(h - 1, 0));
      } else if (e.key === "Enter" && results[highlighted]) {
        const item = results[highlighted];
        if (item) {
          window.location.href = routes.watch(item.slug);
          onClose();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, highlighted, results, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[490] bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="search-panel"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-24 z-[500] mx-auto w-full max-w-xl -translate-x-1/2 px-4"
          >
            <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(8,8,8,0.99))] shadow-[0_32px_120px_rgba(0,0,0,0.65)]">
              {/* Input row */}
              <div className="flex items-center gap-3 px-5 py-4">
                <svg
                  className="h-4 w-4 shrink-0 text-white/35"
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
                  placeholder="Search anime, movies, genres…"
                  className="flex-1 bg-transparent text-[15px] text-foreground placeholder:text-white/30 focus:outline-none"
                />
                <kbd className="hidden rounded-md border border-white/10 bg-white/[0.05] px-2 py-1 text-[10px] font-medium text-white/35 sm:block">
                  ESC
                </kbd>
              </div>

              {/* Divider */}
              <div className="border-t border-white/8" />

              {/* Results */}
              <ul className="py-2">
                {results.map((item, i) => (
                  <li key={item.id}>
                    <Link
                      href={routes.watch(item.slug)}
                      onClick={onClose}
                      className={`flex items-center gap-3.5 px-4 py-3 transition-colors ${
                        highlighted === i ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"
                      }`}
                      onMouseEnter={() => setHighlighted(i)}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-10 w-[27px] shrink-0 overflow-hidden rounded-[6px] bg-white/5">
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          sizes="27px"
                          className="object-cover opacity-75"
                        />
                      </div>

                      {/* Info */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-semibold text-foreground/90">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-foreground/40">
                          {item.year} · {item.type === "series" ? `${item.episodes ?? "?"} eps` : "Movie"}
                        </p>
                      </div>

                      {/* Genre tag */}
                      <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/45">
                        {item.genres[0]}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="border-t border-white/6 px-5 py-3">
                <p className="text-[11px] text-white/25">
                  {query.trim()
                    ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
                    : `${catalogItems.length} titles available — start typing to search`}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
