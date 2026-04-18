"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

import { AnimatedSection } from "@/components/home/AnimatedSection";
import { cn } from "@/lib/utils";
import { routes } from "@/constants/routes";

import { CatalogCard } from "../discovery/CatalogCard";
import { EpisodeList } from "../discovery/EpisodeList";
import type { CatalogItem } from "../discovery/catalog.data";
import type { Episode, ShowDetail } from "../discovery/show.data";
import { VideoPlayer } from "./VideoPlayer";

// Dev placeholder — Apple's public HLS test stream
const DEV_STREAM =
  "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";

const RESUME_DEBOUNCE_MS = 5000;

interface Props {
  show: ShowDetail;
  relatedShows: ReadonlyArray<CatalogItem>;
  isGuest: boolean;
}

function getResumeKey(showSlug: string, episodeNumber: number) {
  return `resume:${showSlug}:${episodeNumber}`;
}

function readResumeTime(showSlug: string, episodeNumber: number): number {
  try {
    const val = localStorage.getItem(getResumeKey(showSlug, episodeNumber));
    return val ? parseFloat(val) : 0;
  } catch {
    return 0;
  }
}

function saveResumeTime(showSlug: string, episodeNumber: number, time: number) {
  try {
    localStorage.setItem(getResumeKey(showSlug, episodeNumber), time.toString());
  } catch {
    // localStorage unavailable
  }
}

export function WatchPageClient({ show, relatedShows, isGuest }: Props) {
  const [activeEpisode, setActiveEpisode] = useState<Episode>(show.episodes[0]);
  const [language, setLanguage] = useState<"sub" | "dub">("sub");
  const [initialTime, setInitialTime] = useState(() =>
    readResumeTime(show.slug, show.episodes[0]?.number ?? 1),
  );

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTimeUpdate = useCallback(
    (currentTime: number) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        saveResumeTime(show.slug, activeEpisode.number, currentTime);
      }, RESUME_DEBOUNCE_MS);
    },
    [show.slug, activeEpisode.number],
  );

  const handleSelectEpisode = useCallback(
    (episode: Episode) => {
      if (!episode.isFree) {
        // Scroll to paywall strip — don't switch player
        document.getElementById("paywall-strip")?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      setActiveEpisode(episode);
      setInitialTime(readResumeTime(show.slug, episode.number));
    },
    [show.slug],
  );

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 md:px-8 md:py-10">
      {/* Player */}
      <AnimatedSection delay={0}>
        <VideoPlayer
          src={DEV_STREAM}
          poster={activeEpisode?.imageSrc}
          title={activeEpisode ? `${show.title} — ${activeEpisode.title}` : show.title}
          language={language}
          initialTime={initialTime}
          onTimeUpdate={handleTimeUpdate}
        />
      </AnimatedSection>

      {/* Episode info */}
      {activeEpisode && (
        <AnimatedSection delay={0.03}>
          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-foreground/55">
                  E{activeEpisode.number}
                </span>
                {activeEpisode.isFree && (
                  <span className="rounded-full bg-primary/12 border border-primary/25 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                    Free
                  </span>
                )}
              </div>
              <h1 className="text-lg font-bold text-foreground">{activeEpisode.title}</h1>
              <p className="max-w-2xl text-[13px] leading-6 text-foreground/55">
                {activeEpisode.description}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-foreground/40">
              <span>{activeEpisode.duration}</span>
              <span className="text-white/20">·</span>
              <span>{show.studio}</span>
              <span className="text-white/20">·</span>
              <span className="font-bold text-primary">★ {show.rating.toFixed(1)}</span>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Sub/Dub toggle */}
      <AnimatedSection delay={0.04}>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-[12px] text-foreground/40">Audio</span>
          <div className="flex gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-1">
            {(["sub", "dub"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-wide transition-colors",
                  language === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-white/40 hover:text-foreground",
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <div className="mt-10 flex flex-col gap-12">
        {/* Episode list */}
        <AnimatedSection delay={0.05}>
          <EpisodeList
            episodes={show.episodes}
            showSlug={show.slug}
            totalEpisodes={show.episodes.length}
            type={show.type}
            selectedEpisode={activeEpisode.number}
            onSelectEpisode={handleSelectEpisode}
          />
        </AnimatedSection>

        {/* Paywall strip */}
        {show.episodes.some((e) => !e.isFree) && (
          <AnimatedSection delay={0.07}>
            <div
              id="paywall-strip"
              className="flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.02] px-5 py-4"
            >
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
