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
  compact: "w-32 sm:w-36",
};

const imageClasses: Record<RailData["variant"], string> = {
  poster: "aspect-poster",
  landscape: "aspect-thumbnail",
  ranked: "aspect-poster",
  compact: "aspect-poster",
};

export function MediaCard({
  item,
  variant,
  priority = false,
}: MediaCardProps) {
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
            "relative overflow-hidden rounded-[1.5rem] border border-border/30 bg-card shadow-[0_24px_60px_rgba(0,0,0,0.35)]",
            imageClasses[variant],
          )}
        >
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
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
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
        </div>

        <div className="space-y-1 px-1">
          <h3 className="line-clamp-1 text-sm font-semibold text-foreground">
            {item.title}
          </h3>
          {item.description ? (
            <p className="line-clamp-2 text-xs text-muted-foreground">
              {item.description}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
