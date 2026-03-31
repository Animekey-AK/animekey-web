import Link from "next/link";

import { AnimatedSection } from "@/components/home/AnimatedSection";
import { routes } from "@/constants/routes";

import { CatalogCard } from "./CatalogCard";
import { EpisodeList } from "./EpisodeList";
import { ShowDetailHero } from "./ShowDetailHero";
import type { CatalogItem } from "./catalog.data";
import type { ShowDetail as ShowDetailType } from "./show.data";

interface Props {
  show: ShowDetailType;
  relatedShows: ReadonlyArray<CatalogItem>;
}

export function ShowDetail({ show, relatedShows }: Props) {
  const hasLockedEpisodes = show.episodes.some((e) => !e.isFree);

  return (
    <>
      <ShowDetailHero show={show} />

      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-12 px-4 py-10 md:px-8">
        {/* Episode list */}
        <AnimatedSection delay={0}>
          <EpisodeList
            episodes={show.episodes}
            showSlug={show.slug}
            totalEpisodes={show.episodes.length}
            type={show.type}
          />
        </AnimatedSection>

        {/* Paywall note */}
        {hasLockedEpisodes && (
          <AnimatedSection delay={0.05}>
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
          <AnimatedSection delay={0.08}>
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
    </>
  );
}
