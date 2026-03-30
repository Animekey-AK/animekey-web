import { EditorialCardGrid, EditorialHero } from "@/components/discovery/EditorialHero";
import { PosterStrip } from "@/components/discovery/PosterStrip";
import { routes } from "@/constants/routes";

const relatedTitles = [
  {
    title: "Attack on Titan",
    subtitle: "Epic finale energy",
    href: routes.watch("attack-on-titan"),
    imageSrc: "/images/placeholder.png",
  },
  {
    title: "Chainsaw Man",
    subtitle: "Dark momentum",
    href: routes.watch("chainsaw-man"),
    imageSrc: "/images/card.png",
  },
  {
    title: "Spy x Family",
    subtitle: "Lighter palate cleanse",
    href: routes.watch("spy-x-family"),
    imageSrc: "/images/placeholder1.png",
  },
];

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const title = id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-10 px-4 py-6 md:px-8 md:py-8">
      <EditorialHero
        badge="Watch"
        title={title}
        description="Even before full playback lands, this route now feels like a title destination with stronger hierarchy, action framing, and room for upsell without killing the mood."
        actions={[
          { label: "Sign in to continue", href: routes.login },
          { label: "Back to home", href: routes.home, variant: "secondary" },
        ]}
        stats={[
          { label: "Title detail", value: `Slug: ${id}` },
          { label: "Intent", value: "Bridge hero click into a real title page" },
          { label: "Next step", value: "Smooth move into login or playback" },
        ]}
      >
        <div className="rounded-[1.6rem] border border-white/10 bg-black/30 p-4 text-sm text-foreground/70">
          This screen is now framed like a title page instead of a stub, so when
          playback arrives the structure is already working in the right visual
          language.
        </div>
      </EditorialHero>

      <PosterStrip
        title="Keep the momentum going"
        description="Related titles help the watch screen feel like part of a streaming journey instead of a dead end."
        items={relatedTitles}
      />

      <EditorialCardGrid
        items={[
          {
            title: "Title-first composition",
            body: "The route now gives the featured title real visual weight rather than collapsing into plain text and one CTA.",
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 5h16v14H4z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 9l5 3-5 3V9z" />
              </svg>
            ),
          },
          {
            title: "Smarter conversion moment",
            body: "Signing in or upgrading now feels contextual to the content, not like the page forgot what product it was.",
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3v18M3 12h18" />
              </svg>
            ),
          },
          {
            title: "Reusable path forward",
            body: "The structure leaves room for synopsis, cast, reviews, paywall states, and playback once backend work catches up.",
            icon: (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 8h10M7 12h10M7 16h6" />
              </svg>
            ),
          },
        ]}
      />
    </div>
  );
}
