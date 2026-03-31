import Image from "next/image";
import Link from "next/link";

import { routes } from "@/constants/routes";

import type { Episode } from "./show.data";

interface Props {
  episode: Episode;
  showSlug: string;
}

export function EpisodeCard({ episode, showSlug }: Props) {
  return (
    <Link
      href={routes.watch(showSlug)}
      prefetch={false}
      className="group w-[280px] shrink-0"
    >
      <div className="space-y-3">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,15,15,0.98),rgba(8,8,8,0.96))]">
          <Image
            src={episode.imageSrc}
            alt={episode.title}
            fill
            sizes="280px"
            className="object-cover opacity-65 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-85"
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

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
              <span className="ml-0.5 text-white">▶</span>
            </div>
          </div>

          {/* Duration bottom-right */}
          <span className="absolute bottom-2 right-2.5 text-[0.6rem] font-medium text-white/55">
            {episode.duration}
          </span>
        </div>

        {/* Info */}
        <div className="px-0.5 space-y-1">
          <p className="line-clamp-1 text-[13px] font-semibold text-foreground/90">
            {episode.title}
          </p>
          <p className="line-clamp-2 text-[11px] leading-[1.55] text-foreground/50">
            {episode.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
