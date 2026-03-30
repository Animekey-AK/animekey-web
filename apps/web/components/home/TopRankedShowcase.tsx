import Image from "next/image";
import Link from "next/link";

import type { TopRankedData } from "./types";

export function TopRankedShowcase({ section }: { section: TopRankedData }) {
  if (section.status !== "ready" || section.items.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="text-title-sm text-foreground">{section.title}</h2>
        {section.description ? (
          <p className="max-w-2xl text-sm text-muted-foreground">
            {section.description}
          </p>
        ) : null}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {section.items.map((item) => (
          <Link
            key={item.rank}
            href={item.href}
            prefetch={false}
            data-analytics-id="home-top-ranked"
            className="group relative flex w-56 shrink-0 items-end gap-3 rounded-[1.75rem] border border-border/30 bg-card px-4 pb-4 pt-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
          >
            <div className="absolute inset-x-0 top-0 h-24 rounded-t-[1.75rem] bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="relative flex min-w-0 flex-1 items-end gap-3">
              <div className="relative h-28 w-16 shrink-0">
                <Image
                  src={item.media.src}
                  alt={item.media.alt}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 space-y-1">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">
                  #{item.rank}
                </p>
                <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                {item.label ? (
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                ) : null}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
