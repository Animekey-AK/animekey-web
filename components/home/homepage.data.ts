import { routes } from "@/constants/routes";

import type { HomepageContentData } from "./types";

export const homepageData = {
  hero: {
    eyebrow: "ANIKEY HOME",
    title: "Watch anime, movies, and series with one smooth home screen.",
    description:
      "A compact homepage built for discovery: featured picks, ranked titles, and quick paths into the catalog.",
    primaryCta: {
      label: "Start watching",
      href: routes.register,
      variant: "primary",
    },
    secondaryCta: {
      label: "Browse the catalog",
      href: routes.movies,
      variant: "secondary",
    },
    artwork: {
      src: "/images/home/watchnowcard.svg",
      alt: "Featured playback card preview",
    },
    stats: [
      {
        label: "Featured collections",
        value: "12+",
        detail: "ready for launch",
      },
      {
        label: "Fast access routes",
        value: "3",
        detail: "movies, series, plans",
      },
      {
        label: "Ranking spotlight",
        value: "Top 5",
        detail: "highlight rail",
      },
    ],
  },
  proofPoints: [
    {
      title: "No clutter, just discovery",
      description:
        "The homepage keeps the high-value entry points visible without burying the catalog.",
      iconSrc: "/images/home/premiumIcon.svg",
      iconAlt: "Premium icon",
    },
    {
      title: "Built for fast browsing",
      description:
        "Rail sections and ranked lists give the next screen enough context to feel curated.",
      iconSrc: "/images/home/like.svg",
      iconAlt: "Like icon",
    },
    {
      title: "Easy to share and resume",
      description:
        "Mock content paths point straight into watch pages so later UI can wire up real playback states.",
      iconSrc: "/images/home/share.svg",
      iconAlt: "Share icon",
    },
    {
      title: "Route-backed navigation",
      description:
        "Primary links already use the shared route constants so the homepage stays in sync with the app shell.",
      iconSrc: "/images/home/next.svg",
      iconAlt: "Next arrow icon",
    },
  ],
  rails: [
    {
      id: "trending-now",
      title: "Trending now",
      description: "The titles people are most likely to open first.",
      href: routes.series,
      items: [
        {
          id: "solo-leveling",
          title: "Solo Leveling",
          href: routes.watch("solo-leveling"),
          posterSrc: "/images/card.png",
          posterAlt: "Solo Leveling poster",
          badge: "Popular",
        },
        {
          id: "jujutsu-kaisen",
          title: "Jujutsu Kaisen",
          href: routes.watch("jujutsu-kaisen"),
          posterSrc: "/images/placeholder1.png",
          posterAlt: "Jujutsu Kaisen poster",
          badge: "New episode",
        },
        {
          id: "attack-on-titan",
          title: "Attack on Titan",
          href: routes.watch("attack-on-titan"),
          posterSrc: "/images/placeholder.png",
          posterAlt: "Attack on Titan poster",
          badge: "Top rated",
        },
      ],
    },
    {
      id: "continue-watching",
      title: "Continue watching",
      description: "A second rail for the watch-later and resume states.",
      href: routes.series,
      items: [
        {
          id: "demon-slayer",
          title: "Demon Slayer",
          href: routes.watch("demon-slayer"),
          posterSrc: "/images/promo.png",
          posterAlt: "Demon Slayer poster",
          eyebrow: "Episode 8",
        },
        {
          id: "my-hero-academia",
          title: "My Hero Academia",
          href: routes.watch("my-hero-academia"),
          posterSrc: "/images/card.png",
          posterAlt: "My Hero Academia poster",
          eyebrow: "Episode 3",
        },
        {
          id: "one-piece",
          title: "One Piece",
          href: routes.watch("one-piece"),
          posterSrc: "/images/placeholder1.png",
          posterAlt: "One Piece poster",
          eyebrow: "Episode 1120",
        },
      ],
    },
    {
      id: "staff-picks",
      title: "Staff picks",
      description: "A small editorial rail for launch-day recommendations.",
      href: routes.movies,
      items: [
        {
          id: "spy-family",
          title: "Spy x Family",
          href: routes.watch("spy-x-family"),
          posterSrc: "/images/placeholder.png",
          posterAlt: "Spy x Family poster",
          badge: "Family favorite",
        },
        {
          id: "chainsaw-man",
          title: "Chainsaw Man",
          href: routes.watch("chainsaw-man"),
          posterSrc: "/images/card.png",
          posterAlt: "Chainsaw Man poster",
          badge: "Editor pick",
        },
        {
          id: "vinland-saga",
          title: "Vinland Saga",
          href: routes.watch("vinland-saga"),
          posterSrc: "/images/promo.png",
          posterAlt: "Vinland Saga poster",
          badge: "Binge-worthy",
        },
      ],
    },
  ],
  promo: {
    badge: "Limited launch promo",
    title: "Upgrade paths stay visible without breaking the flow.",
    description:
      "The promo slot is reserved for a single high-value message, like premium access or a seasonal offer.",
    cta: {
      label: "See plans",
      href: routes.plans,
      variant: "primary",
    },
    artwork: {
      src: "/images/home/premium.svg",
      alt: "Premium promo artwork",
    },
  },
  topRanked: [
    {
      rank: 1,
      title: "Frieren: Beyond Journey's End",
      href: routes.watch("frieren-beyond-journeys-end"),
      posterSrc: "/images/home/top5/1.svg",
      posterAlt: "Frieren poster",
      label: "Most watched",
    },
    {
      rank: 2,
      title: "Demon Slayer",
      href: routes.watch("demon-slayer"),
      posterSrc: "/images/home/top5/2.svg",
      posterAlt: "Demon Slayer poster",
      label: "Trending fast",
    },
    {
      rank: 3,
      title: "Jujutsu Kaisen",
      href: routes.watch("jujutsu-kaisen"),
      posterSrc: "/images/home/top5/3.svg",
      posterAlt: "Jujutsu Kaisen poster",
      label: "Hot pick",
    },
    {
      rank: 4,
      title: "Attack on Titan",
      href: routes.watch("attack-on-titan"),
      posterSrc: "/images/home/top5/4.svg",
      posterAlt: "Attack on Titan poster",
      label: "Fan favorite",
    },
    {
      rank: 5,
      title: "Spy x Family",
      href: routes.watch("spy-x-family"),
      posterSrc: "/images/home/top5/5.svg",
      posterAlt: "Spy x Family poster",
      label: "Rising now",
    },
  ],
  appDownload: {
    title: "Take AniKey with you on any screen.",
    description:
      "A simple download block that can later point to the real mobile app stores without changing the homepage contract.",
    stores: [
      {
        label: "Download on the App Store",
        href: "https://www.apple.com/app-store/",
        iconSrc: "/images/footer/apple_store.svg",
        iconAlt: "Apple App Store badge",
      },
      {
        label: "Get it on Google Play",
        href: "https://play.google.com/store/games",
        iconSrc: "/images/footer/play-store.svg",
        iconAlt: "Google Play badge",
      },
    ],
    artwork: {
      src: "/images/onboarding/phone-tv.svg",
      alt: "Mobile and TV device preview",
    },
  },
} satisfies HomepageContentData;
