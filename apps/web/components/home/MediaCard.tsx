import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { RailData } from "./types";

type MediaCardItem = RailData["items"][number];

interface MediaCardProps {
  item: MediaCardItem;
  variant: RailData["variant"];
  priority?: boolean;
}

const variantClasses: Record<RailData["variant"], string> = {
  poster: "w-40 sm:w-44",
  landscape: "w-[18rem] sm:w-[20rem]",
  ranked: "w-44 sm:w-48",
  compact: "w-36 sm:w-40",
};

const imageClasses: Record<RailData["variant"], string> = {
  poster: "aspect-poster",
  landscape: "aspect-thumbnail",
  ranked: "aspect-poster",
  compact: "aspect-poster",
};

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

function getAccentPalette(seed: string) {
  const index = Array.from(seed).reduce((sum, character) => sum + character.charCodeAt(0), 0) %
    accentPalettes.length;

  return accentPalettes[index];
}

export function MediaCard({
  item,
  variant,
  priority = false,
}: MediaCardProps) {
  const accent = getAccentPalette(item.id);

  return (
    <Link
      href={item.href}
      prefetch={false}
      data-analytics-id="home-media-card"
      data-media-title={item.title}
      className={cn("group shrink-0", variantClasses[variant])}
    >
      <article className="space-y-3">
        <div
          className={cn(
            "relative overflow-hidden rounded-[1.5rem] border border-border/30 bg-[linear-gradient(180deg,rgba(15,15,15,0.98),rgba(8,8,8,0.96))] shadow-[0_24px_60px_rgba(0,0,0,0.35)]",
            imageClasses[variant],
          )}
        >
          <div className={cn("absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b", accent.glow)} />
          <div className={cn("absolute inset-0", accent.panel)} />
          <Image
            src={item.media.src}
            alt={item.media.alt}
            fill
            priority={priority}
            sizes={
              variant === "landscape"
                ? "(max-width: 768px) 72vw, 20rem"
                : "(max-width: 768px) 40vw, 11rem"
            }
            className="object-cover opacity-60 transition-transform duration-500 group-hover:scale-[1.04] group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/38 to-transparent" />
          {item.badge ? (
            <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              {item.badge}
            </span>
          ) : null}
          {item.eyebrow ? (
            <span className="absolute bottom-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
              {item.eyebrow}
            </span>
          ) : null}

          {(variant === "poster" || variant === "ranked") && (
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="line-clamp-2 text-sm font-bold leading-5 text-foreground">
                {item.title}
              </h3>
              {item.description ? (
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-foreground/62">
                  {item.description}
                </p>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-1">
          <div className="space-y-1">
            <p className="line-clamp-1 text-sm font-semibold text-foreground/94">
              {item.title}
            </p>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/45">
              {item.badge ?? item.eyebrow ?? "Catalog entry"}
            </p>
          </div>
          <span className="text-sm text-primary transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </article>
    </Link>
  );
}
