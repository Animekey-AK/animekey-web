import { EditorialCardGrid, EditorialHero } from "@/components/discovery/EditorialHero";
import { PosterStrip } from "@/components/discovery/PosterStrip";
import { routes } from "@/constants/routes";

const seriesCollections = [
  {
    title: "Demon Slayer",
    subtitle: "Weekly release",
    href: routes.watch("demon-slayer"),
    imageSrc: "/images/promo.png",
  },
  {
    title: "Jujutsu Kaisen",
    subtitle: "Top action favorite",
    href: routes.watch("jujutsu-kaisen"),
    imageSrc: "/images/placeholder1.png",
  },
  {
    title: "Frieren",
    subtitle: "Critically loved fantasy",
    href: routes.watch("frieren-beyond-journeys-end"),
    imageSrc: "/images/card.png",
  },
  {
    title: "Spy x Family",
    subtitle: "Comfort binge",
    href: routes.watch("spy-x-family"),
    imageSrc: "/images/placeholder.png",
  },
];

export default function SeriesPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-10 px-4 py-6 md:px-8 md:py-8">
      <EditorialHero
        badge="Series"
        title="Series discovery should feel binge-worthy before the first click."
        description="This route now opens like a proper streaming browse page: stronger hero framing, clearer collections, and a better sense of what to watch next."
        actions={[
          { label: "Browse top series", href: routes.watch("demon-slayer") },
          { label: "See movies", href: routes.movies, variant: "secondary" },
        ]}
        stats={[
          { label: "Weekly energy", value: "Built for continuing series and new episodes" },
          { label: "Curation", value: "Better visual grouping for genres and moods" },
          { label: "Flow", value: "Cleaner path from browse to title detail" },
        ]}
      />

      <PosterStrip
        title="Series momentum"
        description="Use this route to spotlight current favorites, new-episode pressure, and the titles that keep people coming back."
        items={seriesCollections}
      />

      <EditorialCardGrid
        items={[
          {
            title: "Continue-watching ready",
            body: "The layout leaves space for future personalized rails without having to redesign the shell again.",
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 8l6 4-6 4V8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16v12H4z" />
              </svg>
            ),
          },
          {
            title: "Less dead space",
            body: "The route now earns the full viewport instead of leaving the footer to do most of the work.",
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7h16M4 12h16M4 17h9" />
              </svg>
            ),
          },
          {
            title: "Premium brand fit",
            body: "Typography, spacing, and contrast now feel closer to a real entertainment product instead of a sprint stub.",
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2l3 7h7l-5.5 4.2L18.5 22 12 17.6 5.5 22l2-8.8L2 9h7l3-7z" />
              </svg>
            ),
          },
        ]}
      />
    </div>
  );
}
