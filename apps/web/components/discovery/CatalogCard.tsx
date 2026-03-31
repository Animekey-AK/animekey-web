import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { routes } from "@/constants/routes";

import type { CatalogItem } from "./catalog.data";

const accentPalettes = [
  {
    glow: "from-primary/22 via-primary/6 to-transparent",
    panel: "bg-[linear-gradient(180deg,rgba(113,199,4,0.18),rgba(0,0,0,0))]",
  },
  {
    glow: "from-emerald-400/18 via-cyan-400/6 to-transparent",
    panel: "bg-[linear-gradient(180deg,rgba(16,185,129,0.16),rgba(0,0,0,0))]",
  },
  {
    glow: "from-lime-300/14 via-yellow-200/6 to-transparent",
    panel: "bg-[linear-gradient(180deg,rgba(190,242,100,0.16),rgba(0,0,0,0))]",
  },
];

function getAccent(seed: string) {
  const index = Array.from(seed).reduce((sum, c) => sum + c.charCodeAt(0), 0) % accentPalettes.length;
  return accentPalettes[index];
}

interface Props {
  item: CatalogItem;
  priority?: boolean;
}

export function CatalogCard({ item, priority = false }: Props) {
  const accent = getAccent(item.id);

  return (
    <Link
      href={routes.watch(item.slug)}
      prefetch={false}
      data-analytics-id="browse-catalog-card"
      data-media-title={item.title}
      className="group"
    >
      <article className="space-y-3">
        <div
          className={cn(
            "relative overflow-hidden rounded-[1.5rem] border border-border/30 bg-[linear-gradient(180deg,rgba(15,15,15,0.98),rgba(8,8,8,0.96))] shadow-[0_24px_60px_rgba(0,0,0,0.35)]",
            "aspect-[2/3]",
          )}
        >
          <div className={cn("absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b", accent.glow)} />
          <div className={cn("absolute inset-0", accent.panel)} />
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-[1.04] group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          {/* Shimmer sweep on hover */}
          <div className="shimmer-sweep absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Year badge */}
          <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
            {item.year}
          </span>

          {/* Rating pill */}
          <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[0.6rem] font-bold text-primary backdrop-blur-md">
            ★ {item.rating.toFixed(1)}
          </span>

          {/* Bottom info */}
          <div className="absolute inset-x-0 bottom-0 p-3">
            <h3 className="line-clamp-2 text-sm font-bold leading-[1.35] text-foreground">
              {item.title}
            </h3>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {item.genres.slice(0, 2).map((g) => (
                <span
                  key={g}
                  className="rounded-full bg-white/10 px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-white/60"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Badge */}
          {item.badge ? (
            <span className="absolute left-3 bottom-[5.5rem] rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-primary-foreground">
              {item.badge}
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-2 px-1">
          <div className="min-w-0">
            <p className="line-clamp-1 text-xs font-semibold text-foreground/90">{item.title}</p>
            <p className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-foreground/40">
              {item.type === "series" ? (item.episodes ? `${item.episodes} eps` : "Series") : "Movie"}
            </p>
          </div>
          <span className="shrink-0 text-sm text-primary transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
