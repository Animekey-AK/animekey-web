"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import type { FrictionKillerData, InstantCard } from "./types";
import { TiltCard } from "./TiltCard";

const gradients: Record<InstantCard["colorVariant"], string> = {
  lime:         "linear-gradient(145deg, #0c1c03, #050c01)",
  purple:       "linear-gradient(145deg, #0e0018, #06000d)",
  pink:         "linear-gradient(145deg, #0f0015, #060009)",
  amber:        "linear-gradient(145deg, #14100a, #080600)",
  "green-dark": "linear-gradient(145deg, #0d1a0a, #050d03)",
};

interface Props {
  section: FrictionKillerData;
}

export function FrictionKiller({ section }: Props) {
  if (section.status !== "ready") return null;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h2 className="text-[20px] font-black tracking-[-0.02em] text-foreground sm:text-[22px]">
          {section.headline}
        </h2>
        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
          {section.badge}
        </span>
      </div>

      {/* Scrollable card track */}
      <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {section.cards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
          >
          <Link
            href={card.href}
            prefetch={false}
            data-analytics-id="home-instant-card"
            className="group shrink-0"
          >
            <TiltCard className="w-[140px]">
              {/* Poster */}
              <div
                className="relative flex h-[185px] w-[140px] flex-col items-center justify-center overflow-hidden rounded-[14px] border border-white/8"
                style={{ background: gradients[card.colorVariant] }}
              >
                {/* Big emoji art */}
                <span className="select-none text-[64px] opacity-70 transition-transform duration-300 group-hover:scale-110">
                  {card.emoji}
                </span>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                <span
                  className={
                    card.badgeVariant === "green"
                      ? "absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-black"
                      : "absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-white"
                  }
                >
                  {card.badge}
                </span>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                    <span className="ml-0.5 text-white">▶</span>
                  </div>
                </div>

                {/* Title + rating overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="line-clamp-1 text-[12px] font-bold text-white">
                    {card.title}
                  </p>
                  <p className="text-[11px] text-primary/80">★ {card.rating}</p>
                </div>
              </div>

              {/* Below card */}
              <div className="mt-2 px-0.5">
                <p className="line-clamp-1 text-[12px] font-semibold text-white/85">
                  {card.title}
                </p>
                <p className="text-[11px] text-white/40">Free ep</p>
              </div>
            </TiltCard>
          </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
