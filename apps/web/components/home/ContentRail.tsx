import Link from "next/link";

import { MediaCard } from "./MediaCard";
import type { RailData } from "./types";

export function ContentRail({ rail }: { rail: RailData }) {
  if (rail.status === "error" || rail.status === "empty") {
    return null;
  }

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h2 className="text-title-sm text-foreground">{rail.title}</h2>
            {rail.titleBadge && (
              <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-red-400">
                {rail.titleBadge}
              </span>
            )}
          </div>
          {rail.description ? (
            <p className="max-w-2xl text-sm text-muted-foreground">
              {rail.description}
            </p>
          ) : null}
        </div>

        <Link
          href={rail.href}
          prefetch={false}
          data-analytics-id="home-see-all"
          className="shrink-0 text-sm font-medium text-primary transition-opacity hover:opacity-80"
        >
          See all
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {rail.status === "loading"
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-poster w-40 shrink-0 animate-pulse rounded-[1.5rem] bg-card sm:w-44"
              />
            ))
          : rail.items.map((item, index) => (
              <MediaCard
                key={item.id}
                item={item}
                variant={rail.variant}
                priority={index < 2}
              />
            ))}
      </div>
    </section>
  );
}
