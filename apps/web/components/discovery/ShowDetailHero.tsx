import Image from "next/image";
import Link from "next/link";

import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

import type { ShowDetail } from "./show.data";

interface Props {
  show: ShowDetail;
}

export function ShowDetailHero({ show }: Props) {
  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      {/* Atmospheric backdrop */}
      <div className="absolute inset-0 scale-110">
        <Image
          src={show.backdropSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 blur-2xl"
        />
      </div>

      {/* Dark directional gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,5,5,0.97)_0%,rgba(5,5,5,0.88)_55%,rgba(5,5,5,0.35)_100%)]" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Content */}
      <div className="relative z-[1] grid items-end gap-8 px-6 py-16 md:grid-cols-[minmax(0,1fr)_auto] md:px-10 md:py-20">
        {/* Left: info */}
        <div className="space-y-6 max-w-2xl">
          {/* Genre pills */}
          <div className="flex flex-wrap gap-2">
            {show.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60"
              >
                {genre}
              </span>
            ))}
            <span
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]",
                show.type === "movie"
                  ? "border border-sky-400/30 bg-sky-400/10 text-sky-300"
                  : "border border-primary/30 bg-primary/10 text-primary",
              )}
            >
              {show.type === "movie" ? "Film" : "Series"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-black leading-[0.92] tracking-tight text-foreground md:text-6xl xl:text-7xl">
            {show.title}
          </h1>

          {/* Tagline */}
          <p className="text-[15px] font-medium italic text-foreground/50">
            "{show.tagline}"
          </p>

          {/* Metadata row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-foreground/55">
            <span className="font-bold text-primary">★ {show.rating.toFixed(1)}</span>
            <span className="text-white/20">·</span>
            <span>{show.year}</span>
            <span className="text-white/20">·</span>
            <span>{show.studio}</span>
            {show.type === "series" && show.episodes.length > 0 && (
              <>
                <span className="text-white/20">·</span>
                <span>{show.episodes.length} episodes shown</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-[15px] leading-7 text-foreground/68 line-clamp-3">
            {show.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href={routes.watch(show.slug)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[14px] font-bold text-primary-foreground shadow-[0_16px_48px_rgba(113,199,4,0.28)] transition-all hover:-translate-y-px hover:shadow-[0_20px_56px_rgba(113,199,4,0.38)]"
            >
              <span>▶</span>
              <span>Watch Episode 1 Free</span>
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 text-[14px] font-medium text-foreground/80 transition-colors hover:bg-white/[0.08]"
            >
              <span>＋</span>
              <span>Add to Watchlist</span>
            </button>
          </div>
        </div>

        {/* Right: poster */}
        <div className="hidden md:block">
          <div className="relative w-48 overflow-hidden rounded-[1.8rem] border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.65)]" style={{ aspectRatio: "2/3" }}>
            <Image
              src={show.imageSrc}
              alt={show.title}
              fill
              priority
              sizes="192px"
              className="object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
