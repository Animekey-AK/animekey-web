import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { routes } from "@/constants/routes";

import type { Episode } from "./show.data";

interface Props {
  episode: Episode;
  showSlug: string;
  isSelected?: boolean;
  onSelect?: (episode: Episode) => void;
}

export function EpisodeCard({ episode, showSlug, isSelected, onSelect }: Props) {
  const inner = (
    <div className="space-y-3">
      {/* Thumbnail */}
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-[1.2rem] border bg-[linear-gradient(180deg,rgba(15,15,15,0.98),rgba(8,8,8,0.96))]",
          isSelected ? "border-primary/60 ring-2 ring-primary/40" : "border-white/10",
        )}
      >
        <Image
          src={episode.imageSrc}
          alt={episode.title}
          fill
          sizes="280px"
          className={cn(
            "object-cover transition-all duration-500",
            isSelected ? "opacity-85" : "opacity-65 group-hover:scale-[1.03] group-hover:opacity-85",
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Episode number */}
        <span className="absolute left-2.5 top-2.5 rounded-full border border-white/15 bg-black/60 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
          E{episode.number}
        </span>

        {/* Free badge */}
        {episode.isFree && (
          <span className="absolute right-2.5 top-2.5 rounded-full bg-primary px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-primary-foreground">
            Free
          </span>
        )}

        {/* Lock overlay for non-free */}
        {!episode.isFree && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm ring-1 ring-white/15">
              <svg className="h-5 w-5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
              </svg>
            </div>
          </div>
        )}

        {/* Play button (free episodes, on hover) */}
        {episode.isFree && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
              <span className="ml-0.5 text-white">▶</span>
            </div>
          </div>
        )}

        {/* Now playing indicator */}
        {isSelected && (
          <div className="absolute bottom-2 left-2.5 flex items-center gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[0.55rem] font-bold uppercase tracking-widest text-primary">Now playing</span>
          </div>
        )}

        {/* Duration bottom-right */}
        <span className="absolute bottom-2 right-2.5 text-[0.6rem] font-medium text-white/55">
          {episode.duration}
        </span>
      </div>

      {/* Info */}
      <div className="px-0.5 space-y-1">
        <p className={cn("line-clamp-1 text-[13px] font-semibold", isSelected ? "text-primary" : "text-foreground/90")}>
          {episode.title}
        </p>
        <p className="line-clamp-2 text-[11px] leading-[1.55] text-foreground/50">
          {episode.description}
        </p>
      </div>
    </div>
  );

  // If onSelect is provided (watch page context) — use button
  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(episode)}
        className="group w-[280px] shrink-0 text-left"
      >
        {inner}
      </button>
    );
  }

  // Default: link to watch page
  return (
    <Link
      href={routes.watch(showSlug)}
      prefetch={false}
      className="group w-[280px] shrink-0"
    >
      {inner}
    </Link>
  );
}
