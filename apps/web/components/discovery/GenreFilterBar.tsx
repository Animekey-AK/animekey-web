"use client";

import { cn } from "@/lib/utils";

interface Genre {
  id: string;
  label: string;
  emoji: string;
}

interface Props {
  genres: ReadonlyArray<Genre>;
  active: string;
  onSelect: (id: string) => void;
}

export function GenreFilterBar({ genres, active, onSelect }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {genres.map((genre) => {
        const isActive = active === genre.id;
        return (
          <button
            key={genre.id}
            type="button"
            onClick={() => onSelect(genre.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all duration-200",
              isActive
                ? "border-primary/40 bg-primary/12 text-primary shadow-[0_0_18px_rgba(113,199,4,0.12)]"
                : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80",
            )}
          >
            <span className="text-[13px] leading-none">{genre.emoji}</span>
            <span>{genre.label}</span>
          </button>
        );
      })}
    </div>
  );
}
