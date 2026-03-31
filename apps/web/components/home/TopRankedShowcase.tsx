"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { TopRankedData } from "./types";

const rankEmojis = ["⚔", "✨", "💀", "🌊", "🎯"];

export function TopRankedShowcase({ section }: { section: TopRankedData }) {
  if (section.status !== "ready" || section.items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-title-sm text-foreground">
          Top 5 <span className="text-primary">right now</span>
        </h2>
        {section.description && (
          <p className="text-sm text-muted-foreground">{section.description}</p>
        )}
      </div>

      <div className="flex flex-col divide-y divide-white/[0.06]">
        {section.items.map((item, i) => (
          <motion.div
            key={item.rank}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
          >
            <Link
              href={item.href}
              prefetch={false}
              data-analytics-id="home-top-ranked"
              className="group flex items-center gap-4 py-4 transition-colors hover:bg-primary/5 rounded-xl px-3 -mx-3"
            >
              {/* Rank */}
              <span className="w-8 shrink-0 text-center text-[13px] font-black tabular-nums text-white/20 group-hover:text-primary/60">
                {String(item.rank).padStart(2, "0")}
              </span>

              {/* Emoji poster */}
              <div className="flex h-14 w-10 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-[rgba(255,255,255,0.04)] text-[26px]">
                {rankEmojis[i] ?? "▶"}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-[14px] font-bold text-white group-hover:text-primary">
                  {item.title}
                </p>
                {item.label && (
                  <p className="text-[12px] text-white/38">{item.label}</p>
                )}
              </div>

              {/* Play arrow */}
              <span className="shrink-0 text-[18px] text-white/20 transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary">
                ▶
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
