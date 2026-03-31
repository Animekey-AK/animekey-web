import { routes } from "@/constants/routes";

import type {
  AppDownloadData,
  FooterCtaData,
  FrictionKillerData,
  GenreChipsData,
  HeroCinematicData,
  HomepageData,
  HomeSection,
  ProofPoint,
  ProofStripData,
  PromoData,
  RailData,
  SectionStatus,
  TopRankedData,
} from "./types";

const ready: SectionStatus = "ready";

// ── Hero (cinematic, 4 slides) ────────────────────────────────────────────────

const heroCinematic: HeroCinematicData = {
  status: ready,
  slides: [
    {
      id: "solo-leveling",
      showName: "Solo Leveling",
      showSub: "Season 2, Episode 12 just dropped",
      pills: [
        { label: "★ 9.2", accent: true },
        { label: "24 episodes" },
        { label: "Season 2" },
        { label: "Sub & Dub" },
      ],
      description:
        "A weak hunter awakens the power to level up alone — and becomes the strongest in the world.",
      watchHref: routes.watch("solo-leveling"),
      liveViewerCount: 52800,
      colorVariant: "lime",
      posterImage: "/images/onboarding/landingOnboardingBackground.svg",
      modalMeta: "Season 2 • 24 eps",
      modalDescription:
        "A weak hunter awakens the power to level up alone — and becomes the strongest in the world. The most-watched anime this season.",
    },
    {
      id: "demon-slayer",
      showName: "Demon Slayer",
      showSub: "Season 3, Episode 8 — Infinity Castle Arc",
      pills: [
        { label: "★ 9.0", accent: true },
        { label: "44 episodes" },
        { label: "Season 3" },
        { label: "Sub & Dub" },
      ],
      description:
        "A boy becomes a demon slayer to avenge his family. The most stunning animation ever made.",
      watchHref: routes.watch("demon-slayer"),
      liveViewerCount: 38172,
      colorVariant: "purple",
      posterImage: "/images/login/login-right.svg",
      modalMeta: "Season 3 • 44 eps",
      modalDescription:
        "A young boy becomes a demon slayer to avenge his family and cure his sister. The most beautiful animation in anime history.",
    },
    {
      id: "jujutsu-kaisen",
      showName: "Jujutsu Kaisen",
      showSub: "Season 3, Episode 12 just dropped",
      pills: [
        { label: "★ 9.1", accent: true },
        { label: "60+ episodes" },
        { label: "Season 3" },
        { label: "Sub & Dub" },
      ],
      description:
        "Cursed energy. Death matches. A boy who consumed a curse and became something else entirely.",
      watchHref: routes.watch("jujutsu-kaisen"),
      liveViewerCount: 44200,
      colorVariant: "pink",
      posterImage: "/images/onboarding/forgot-reset-passoword.png",
      modalMeta: "Season 3 • 60+ eps",
      modalDescription:
        "Cursed energy. Death matches. A boy who consumed a powerful curse and became something else entirely.",
    },
    {
      id: "frieren",
      showName: "Frieren: Beyond Journey's End",
      showSub: "Complete series — All 28 episodes",
      pills: [
        { label: "★ 9.4", accent: true },
        { label: "28 episodes" },
        { label: "Complete" },
        { label: "Sub & Dub" },
      ],
      description:
        "A centuries-old elf mage slowly learns what it means to feel. The most-rated anime of the year.",
      watchHref: routes.watch("frieren-beyond-journeys-end"),
      liveViewerCount: 29600,
      colorVariant: "amber",
      posterImage: "/images/onboarding/landingOnboardingBackground.svg",
      modalMeta: "Complete • 28 eps",
      modalDescription:
        "A centuries-old elf mage retraces a journey that meant nothing to her — and slowly learns what it means to feel.",
    },
  ],
};

// ── Genre chips ───────────────────────────────────────────────────────────────

const genreChips: GenreChipsData = {
  status: ready,
  items: [
    { id: "action",       label: "Action",       emoji: "⚔️",  href: `${routes.series}?genre=action` },
    { id: "romance",      label: "Romance",      emoji: "💕",  href: `${routes.series}?genre=romance` },
    { id: "comedy",       label: "Comedy",       emoji: "😂",  href: `${routes.series}?genre=comedy` },
    { id: "fantasy",      label: "Fantasy",      emoji: "🔮",  href: `${routes.series}?genre=fantasy` },
    { id: "thriller",     label: "Thriller",     emoji: "🕵️", href: `${routes.series}?genre=thriller` },
    { id: "sci-fi",       label: "Sci-Fi",       emoji: "🤖",  href: `${routes.series}?genre=sci-fi` },
    { id: "horror",       label: "Horror",       emoji: "👹",  href: `${routes.series}?genre=horror` },
    { id: "sports",       label: "Sports",       emoji: "🏆",  href: `${routes.series}?genre=sports` },
    { id: "slice-of-life", label: "Slice of Life", emoji: "🌸", href: `${routes.series}?genre=slice-of-life` },
    { id: "isekai",       label: "Isekai",       emoji: "🌀",  href: `${routes.series}?genre=isekai` },
  ],
};

// ── Proof strip ───────────────────────────────────────────────────────────────

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

// ── Content rails ─────────────────────────────────────────────────────────────

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

// ── Promo banner ──────────────────────────────────────────────────────────────

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
  countdownTarget: "2026-04-07T00:00:00Z",
};

// ── Top ranked ────────────────────────────────────────────────────────────────

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

// ── Friction killer ───────────────────────────────────────────────────────────

const frictionKiller: FrictionKillerData = {
  status: ready,
  headline: "Start watching instantly.",
  subline: "Join thousands of anime fans — no credit card needed to start.",
  signals: [
    { icon: "✓", label: "Free 7-day trial" },
    { icon: "✓", label: "No credit card required" },
    { icon: "✓", label: "Cancel anytime" },
    { icon: "✓", label: "HD & 4K quality" },
  ],
  cta: {
    label: "Watch free for 7 days",
    href: routes.plans,
    intent: "primary",
  },
  liveCount: 12_400,
};

// ── App download ──────────────────────────────────────────────────────────────

const appDownload: AppDownloadData = {
  status: ready,
  title: "Take AnimeKey with you on any screen.",
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

// ── Footer CTA ────────────────────────────────────────────────────────────────

const footerCta: FooterCtaData = {
  status: ready,
  headline: "Watch free for 7 days.",
  subline: "No credit card needed. Cancel anytime.",
  cta: {
    label: "Start watching free",
    href: routes.plans,
    intent: "primary",
  },
};

// ── Exports ───────────────────────────────────────────────────────────────────

export const homepageData: HomepageData = {
  hero: heroCinematic,
  genreChips,
  proofStrip,
  rails,
  frictionKiller,
  promoBanner,
  topRanked,
  appDownload,
  footerCta,
};

export const homeSections: HomeSection[] = [
  { type: "hero",           data: homepageData.hero },
  { type: "genreChips",    data: homepageData.genreChips },
  { type: "proofStrip",    data: homepageData.proofStrip },
  { type: "rails",         data: homepageData.rails },
  { type: "frictionKiller", data: homepageData.frictionKiller },
  { type: "promoBanner",   data: homepageData.promoBanner },
  { type: "topRanked",     data: homepageData.topRanked },
  { type: "appDownload",   data: homepageData.appDownload },
  { type: "footerCta",     data: homepageData.footerCta },
];
