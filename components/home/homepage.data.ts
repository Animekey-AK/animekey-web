import { routes } from "@/constants/routes";

import type {
  AppDownloadData,
  HomepageData,
  HeroData,
  HomeSection,
  MediaItem,
  ProofPoint,
  ProofStripData,
  PromoData,
  RailData,
  SectionStatus,
  TopRankedData,
} from "./types";

const ready: SectionStatus = "ready";

const heroMedia: MediaItem = {
  src: "/images/login/login-right.svg",
  alt: "Featured AnimeKey hero artwork",
};

const heroCtas: HeroData["ctas"] = [
  {
    label: "Browse the catalog",
    href: routes.movies,
    intent: "primary",
  },
  {
    label: "Start free",
    href: routes.register,
    intent: "secondary",
  },
  {
    label: "See plans",
    href: routes.plans,
    intent: "tertiary",
  },
];

const proofPoints: ReadonlyArray<ProofPoint> = [
  {
    title: "No clutter, just discovery",
    description:
      "The homepage keeps the high-value entry points visible without burying the catalog.",
    media: {
      src: "/images/home/premiumIcon.svg",
      alt: "Premium icon",
    },
  },
  {
    title: "Built for fast browsing",
    description:
      "Rail sections and ranked lists give the next screen enough context to feel curated.",
    media: {
      src: "/images/home/like.svg",
      alt: "Like icon",
    },
  },
  {
    title: "Easy to share and resume",
    description:
      "Mock content paths point straight into watch pages so later UI can wire up real playback states.",
    media: {
      src: "/images/home/share.svg",
      alt: "Share icon",
    },
  },
  {
    title: "Route-backed navigation",
    description:
      "Primary links already use the shared route constants so the homepage stays in sync with the app shell.",
    media: {
      src: "/images/home/next.svg",
      alt: "Next arrow icon",
    },
  },
];

const proofStrip: ProofStripData = {
  status: ready,
  items: proofPoints,
};

const rails: ReadonlyArray<RailData> = [
  {
    status: ready,
    variant: "poster",
    id: "trending-now",
    title: "Trending now",
    description: "The titles people are most likely to open first.",
    href: routes.series,
    items: [
      {
        id: "solo-leveling",
        title: "Solo Leveling",
        href: routes.watch("solo-leveling"),
        media: {
          src: "/images/card.png",
          alt: "Solo Leveling poster",
        },
        badge: "Popular",
      },
      {
        id: "jujutsu-kaisen",
        title: "Jujutsu Kaisen",
        href: routes.watch("jujutsu-kaisen"),
        media: {
          src: "/images/placeholder1.png",
          alt: "Jujutsu Kaisen poster",
        },
        badge: "New episode",
      },
      {
        id: "attack-on-titan",
        title: "Attack on Titan",
        href: routes.watch("attack-on-titan"),
        media: {
          src: "/images/placeholder.png",
          alt: "Attack on Titan poster",
        },
        badge: "Top rated",
      },
    ],
  },
  {
    status: ready,
    variant: "landscape",
    id: "continue-watching",
    title: "Continue watching",
    description: "A second rail for the watch-later and resume states.",
    href: routes.series,
    items: [
      {
        id: "demon-slayer",
        title: "Demon Slayer",
        href: routes.watch("demon-slayer"),
        media: {
          src: "/images/promo.png",
          alt: "Demon Slayer poster",
        },
        eyebrow: "Episode 8",
      },
      {
        id: "my-hero-academia",
        title: "My Hero Academia",
        href: routes.watch("my-hero-academia"),
        media: {
          src: "/images/card.png",
          alt: "My Hero Academia poster",
        },
        eyebrow: "Episode 3",
      },
      {
        id: "one-piece",
        title: "One Piece",
        href: routes.watch("one-piece"),
        media: {
          src: "/images/placeholder1.png",
          alt: "One Piece poster",
        },
        eyebrow: "Episode 1120",
      },
    ],
  },
  {
    status: ready,
    variant: "compact",
    id: "staff-picks",
    title: "Staff picks",
    description: "A small editorial rail for launch-day recommendations.",
    href: routes.movies,
    items: [
      {
        id: "spy-x-family",
        title: "Spy x Family",
        href: routes.watch("spy-x-family"),
        media: {
          src: "/images/placeholder.png",
          alt: "Spy x Family poster",
        },
        badge: "Family favorite",
      },
      {
        id: "chainsaw-man",
        title: "Chainsaw Man",
        href: routes.watch("chainsaw-man"),
        media: {
          src: "/images/card.png",
          alt: "Chainsaw Man poster",
        },
        badge: "Editor pick",
      },
      {
        id: "vinland-saga",
        title: "Vinland Saga",
        href: routes.watch("vinland-saga"),
        media: {
          src: "/images/promo.png",
          alt: "Vinland Saga poster",
        },
        badge: "Binge-worthy",
      },
    ],
  },
];

const promoBanner: PromoData = {
  status: ready,
  badge: "Limited launch promo",
  title: "Upgrade paths stay visible without breaking the flow.",
  description:
    "The promo slot is reserved for a single high-value message, like premium access or a seasonal offer.",
  primaryCta: {
    label: "See plans",
    href: routes.plans,
    intent: "primary",
  },
  secondaryCta: {
    label: "Browse the catalog",
    href: routes.movies,
    intent: "secondary",
  },
  media: {
    src: "/images/home/premium.svg",
    alt: "Premium promo artwork",
  },
};

const topRanked: TopRankedData = {
  status: ready,
  title: "Top ranked",
  description: "The five most visible titles in the launch plan.",
  items: [
    {
      rank: 1,
      title: "Frieren: Beyond Journey's End",
      href: routes.watch("frieren-beyond-journeys-end"),
      media: {
        src: "/images/home/top5/1.svg",
        alt: "Frieren poster",
      },
      label: "Most watched",
    },
    {
      rank: 2,
      title: "Demon Slayer",
      href: routes.watch("demon-slayer"),
      media: {
        src: "/images/home/top5/2.svg",
        alt: "Demon Slayer poster",
      },
      label: "Trending fast",
    },
    {
      rank: 3,
      title: "Jujutsu Kaisen",
      href: routes.watch("jujutsu-kaisen"),
      media: {
        src: "/images/home/top5/3.svg",
        alt: "Jujutsu Kaisen poster",
      },
      label: "Hot pick",
    },
    {
      rank: 4,
      title: "Attack on Titan",
      href: routes.watch("attack-on-titan"),
      media: {
        src: "/images/home/top5/4.svg",
        alt: "Attack on Titan poster",
      },
      label: "Fan favorite",
    },
    {
      rank: 5,
      title: "Spy x Family",
      href: routes.watch("spy-x-family"),
      media: {
        src: "/images/home/top5/5.svg",
        alt: "Spy x Family poster",
      },
      label: "Rising now",
    },
  ],
};

const appDownload: AppDownloadData = {
  status: ready,
  title: "Take Animekey with you on any screen.",
  description:
    "A simple download block that can later point to the real mobile app stores without changing the homepage contract.",
  stores: [
    {
      label: "Download on the App Store",
      href: "https://www.apple.com/app-store/",
      media: {
        src: "/images/footer/apple_store.svg",
        alt: "Apple App Store badge",
      },
    },
    {
      label: "Get it on Google Play",
      href: "https://play.google.com/store/games",
      media: {
        src: "/images/footer/play-store.svg",
        alt: "Google Play badge",
      },
    },
  ],
  media: {
    src: "/images/onboarding/phone-tv.svg",
    alt: "Mobile and TV device preview",
  },
};

export const homepageData: HomepageData = {
  hero: {
    status: ready,
    eyebrow: "ANIMEKEY HOME",
    title: "Watch anime, movies, and series with one smooth home screen.",
    description:
      "A compact homepage built for discovery: featured picks, ranked titles, and quick paths into the catalog.",
    ctas: heroCtas,
    media: heroMedia,
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
  proofStrip,
  rails,
  promoBanner,
  topRanked,
  appDownload,
};

export const homeSections: HomeSection[] = [
  { type: "hero", data: homepageData.hero },
  { type: "proofStrip", data: homepageData.proofStrip },
  { type: "rails", data: homepageData.rails },
  { type: "promoBanner", data: homepageData.promoBanner },
  { type: "topRanked", data: homepageData.topRanked },
  { type: "appDownload", data: homepageData.appDownload },
];
