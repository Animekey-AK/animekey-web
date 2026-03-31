"use client";

import { useState } from "react";

import type { GenreChipsData } from "./types";

interface Props {
  section: GenreChipsData;
}

export function GenreChips({ section }: Props) {
  const [active, setActive] = useState<string>("trending");

  if (section.status !== "ready" || section.items.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">
        What are you in the mood for?
      </p>
      <div className="flex flex-wrap gap-2.5">
        {section.items.map((chip) => {
          const isActive = active === chip.id;
          return (
            <button
              key={chip.id}
              type="button"
              onClick={() => setActive(chip.id)}
              className={
                isActive
                  ? "inline-flex items-center gap-1.5 rounded-full border border-[rgba(113,199,4,0.38)] bg-[rgba(113,199,4,0.14)] px-4 py-2 text-[13px] font-semibold text-primary transition-all"
                  : "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white/70 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-primary/8 hover:text-primary/90"
              }
            >
              <span className="text-[15px] leading-none">{chip.emoji}</span>
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
