"use client";

import Link from "next/link";

import { AnimatedSection } from "@/components/home/AnimatedSection";
import { routes } from "@/constants/routes";

import { CatalogCard } from "../discovery/CatalogCard";
import { EpisodeList } from "../discovery/EpisodeList";
import type { CatalogItem } from "../discovery/catalog.data";
import type { ShowDetail } from "../discovery/show.data";
import { VideoPlayer } from "./VideoPlayer";

// Dev placeholder — Apple's public HLS test stream
const DEV_STREAM =
  "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";

interface Props {
  show: ShowDetail;
  relatedShows: ReadonlyArray<CatalogItem>;
}

export function WatchPageClient({ show, relatedShows }: Props) {
  const episode = show.episodes[0];

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:px-8 md:py-10">
      {/* Player */}
      <AnimatedSection delay={0}>
        <VideoPlayer
          src={DEV_STREAM}
          poster={episode?.imageSrc}
          title={episode ? `${show.title} — ${episode.title}` : show.title}
        />
      </AnimatedSection>

      {/* Episode info */}
      {episode && (
        <AnimatedSection delay={0.03}>
          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-foreground/55">
                  E{episode.number}
                </span>
                {episode.isFree && (
                  <span className="rounded-full bg-primary/12 border border-primary/25 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    Free
                  </span>
                )}
              </div>
              <h1 className="text-lg font-bold text-foreground">{episode.title}</h1>
              <p className="max-w-2xl text-[13px] leading-6 text-foreground/55">
                {episode.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-foreground/40">
              <span>{episode.duration}</span>
              <span className="text-white/20">·</span>
              <span>{show.studio}</span>
              <span className="text-white/20">·</span>
              <span className="font-bold text-primary">★ {show.rating.toFixed(1)}</span>
            </div>
          </div>
        </AnimatedSection>
      )}

      <div className="mt-10 flex flex-col gap-12">
        {/* Episode list */}
        <AnimatedSection delay={0.05}>
          <EpisodeList
            episodes={show.episodes}
            showSlug={show.slug}
            totalEpisodes={show.episodes.length}
            type={show.type}
          />
        </AnimatedSection>

        {/* Paywall strip */}
        {show.episodes.some((e) => !e.isFree) && (
          <AnimatedSection delay={0.07}>
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.02] px-5 py-4">
              <p className="text-[13px] text-foreground/55">
                🔒 Episodes 2+ require a subscription — 7-day free trial, no card needed.
              </p>
              <Link
                href={routes.plans}
                className="text-[13px] font-semibold text-primary hover:underline"
              >
                Start free trial →
              </Link>
            </div>
          </AnimatedSection>
        )}

        {/* More like this */}
        {relatedShows.length > 0 && (
          <AnimatedSection delay={0.09}>
            <section className="space-y-5">
              <h2 className="text-xl font-bold text-foreground">More like this</h2>
              <div className="flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {relatedShows.map((item) => (
                  <div key={item.id} className="w-44 shrink-0 sm:w-48">
                    <CatalogCard item={item} />
                  </div>
                ))}
              </div>
            </section>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
