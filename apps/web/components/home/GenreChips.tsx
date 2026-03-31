import Link from "next/link";

import type { GenreChipsData } from "./types";

interface Props {
  section: GenreChipsData;
}

export function GenreChips({ section }: Props) {
  if (section.status !== "ready" || section.items.length === 0) return null;

  return (
    <nav aria-label="Browse by genre">
      <div className="flex gap-2.5 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {section.items.map((chip) => (
          <Link
            key={chip.id}
            href={chip.href}
            prefetch={false}
            className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[13px] font-semibold text-white/80 backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
          >
            <span className="text-[16px] leading-none">{chip.emoji}</span>
            <span className="whitespace-nowrap">{chip.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
