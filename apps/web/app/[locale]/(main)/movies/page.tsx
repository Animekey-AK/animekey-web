import { EditorialCardGrid, EditorialHero } from "@/components/discovery/EditorialHero";
import { PosterStrip } from "@/components/discovery/PosterStrip";
import { routes } from "@/constants/routes";

const movieCollections = [
  {
    title: "Solo Leveling: ReAwakening",
    subtitle: "Action premiere",
    href: routes.watch("solo-leveling-reawakening"),
    imageSrc: "/images/placeholder.png",
  },
  {
    title: "Your Forma",
    subtitle: "Cyber mystery",
    href: routes.watch("your-forma"),
    imageSrc: "/images/placeholder1.png",
  },
  {
    title: "Devil May Cry",
    subtitle: "Dark fantasy event",
    href: routes.watch("devil-may-cry"),
    imageSrc: "/images/card.png",
  },
  {
    title: "Suzume",
    subtitle: "Emotional journey",
    href: routes.watch("suzume"),
    imageSrc: "/images/promo.png",
  },
];

export default function MoviesPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-10 px-4 py-6 md:px-8 md:py-8">
      <EditorialHero
        badge="Movies"
        title="Movie nights deserve more than a placeholder grid."
        description="AnimeKey movies now open with a real editorial landing layout: hero programming, browse collections, and stronger conversion paths without feeling like a dead-end route."
        actions={[
          { label: "Start exploring", href: routes.watch("devil-may-cry") },
          { label: "Browse series", href: routes.series, variant: "secondary" },
        ]}
        stats={[
          { label: "Editorial picks", value: "Curated for action, fantasy, and event titles" },
          { label: "Browse mode", value: "Fast-glance posters with cleaner rhythm" },
          { label: "Conversion", value: "Soft signup prompts, not hard stops" },
        ]}
      />

      <PosterStrip
        title="Tonight's featured picks"
        description="A tighter poster strip with stronger hierarchy so this route feels alive even before live catalog data arrives."
        items={movieCollections}
      />

      <EditorialCardGrid
        items={[
          {
            title: "Fast genre starts",
            body: "Visitors get meaningful entry points immediately instead of being dropped onto a blank browse shell.",
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 5l7 7-7 7M4 12h16" />
              </svg>
            ),
          },
          {
            title: "Stronger discovery rhythm",
            body: "The page alternates hero, posters, and supporting notes so it feels like a streaming product, not a holding page.",
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h10M4 18h16" />
              </svg>
            ),
          },
          {
            title: "Premium look without clutter",
            body: "The visual system stays dark, sharp, and cinematic while keeping actions obvious and readable.",
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3l2.8 5.68 6.27.91-4.54 4.43 1.07 6.23L12 17.77 6.4 20.25l1.07-6.23L2.93 9.59l6.27-.91L12 3z" />
              </svg>
            ),
          },
        ]}
      />
    </div>
  );
}
