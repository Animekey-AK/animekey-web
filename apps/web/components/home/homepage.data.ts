import { routes } from "@/constants/routes";

import type {
  AppDownloadData,
  FooterCtaData,
  FrictionKillerData,
  GenreChipsData,
  HeroCinematicData,
  HomepageData,
  HomeSection,
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

// ── Proof strip (thin stat band) ──────────────────────────────────────────────

const proofStrip: ProofStripData = {
  status: ready,
  items: [
    { emoji: "⭐", stat: "4.9/5 from 12K+ reviews" },
    { emoji: "📺", stat: "12,000+ episodes" },
    { emoji: "👥", stat: "50,000+ subscribers" },
    { emoji: "🚫", stat: "Zero ads, ever" },
    { emoji: "🎏", stat: "Sub & Dub every show" },
  ],
};

// ── Start watching instantly (friction killer) ────────────────────────────────

const frictionKiller: FrictionKillerData = {
  status: ready,
  headline: "Start watching instantly",
  badge: "⚡ No signup needed · First episode always free",
  cards: [
    {
      id: "solo-leveling",
      title: "Solo Leveling",
      href: routes.watch("solo-leveling"),
      emoji: "⚔",
      rating: "9.2",
      badge: "Free E1",
      badgeVariant: "green",
      colorVariant: "lime",
    },
    {
      id: "demon-slayer",
      title: "Demon Slayer",
      href: routes.watch("demon-slayer"),
      emoji: "🌊",
      rating: "9.0",
      badge: "Free E1",
      badgeVariant: "green",
      colorVariant: "purple",
    },
    {
      id: "jujutsu-kaisen",
      title: "Jujutsu Kaisen",
      href: routes.watch("jujutsu-kaisen"),
      emoji: "💀",
      rating: "9.1",
      badge: "Free E1",
      badgeVariant: "green",
      colorVariant: "pink",
    },
    {
      id: "frieren",
      title: "Frieren",
      href: routes.watch("frieren-beyond-journeys-end"),
      emoji: "✨",
      rating: "9.4",
      badge: "Free E1",
      badgeVariant: "green",
      colorVariant: "amber",
    },
    {
      id: "attack-on-titan",
      title: "Attack on Titan",
      href: routes.watch("attack-on-titan"),
      emoji: "🎯",
      rating: "9.3",
      badge: "New ep",
      badgeVariant: "red",
      colorVariant: "green-dark",
    },
    {
      id: "chainsaw-man",
      title: "Chainsaw Man",
      href: routes.watch("chainsaw-man"),
      emoji: "🔥",
      rating: "8.8",
      badge: "Free E1",
      badgeVariant: "green",
      colorVariant: "pink",
    },
  ],
};

// ── Genre chips (client-side toggle, no navigation) ───────────────────────────

const genreChips: GenreChipsData = {
  status: ready,
  items: [
    { id: "trending",     label: "Trending",      emoji: "🔥" },
    { id: "action",       label: "Action",         emoji: "⚔️" },
    { id: "romance",      label: "Romance",        emoji: "🌸" },
    { id: "psychological", label: "Psychological", emoji: "🧠" },
    { id: "comedy",       label: "Comedy",         emoji: "😂" },
    { id: "school-life",  label: "School life",    emoji: "🏫" },
    { id: "fantasy",      label: "Fantasy",        emoji: "🧝" },
    { id: "classics",     label: "Classics",       emoji: "🎏" },
    { id: "new-episodes", label: "New episodes",   emoji: "📅" },
  ],
};

// ── Content rails ─────────────────────────────────────────────────────────────

const rails: ReadonlyArray<RailData> = [
  {
    status: ready,
    variant: "poster",
    id: "trending-now",
    title: "🔥 Trending",
    titleBadge: undefined,
    description: "Most-watched this week",
    href: routes.series,
    items: [
      {
        id: "solo-leveling",
        title: "Solo Leveling",
        href: routes.watch("solo-leveling"),
        media: { src: "/images/card.png", alt: "Solo Leveling poster" },
        badge: "#1 This week",
      },
      {
        id: "demon-slayer",
        title: "Demon Slayer",
        href: routes.watch("demon-slayer"),
        media: { src: "/images/placeholder1.png", alt: "Demon Slayer poster" },
        badge: "New ep",
      },
      {
        id: "jujutsu-kaisen",
        title: "Jujutsu Kaisen",
        href: routes.watch("jujutsu-kaisen"),
        media: { src: "/images/placeholder.png", alt: "Jujutsu Kaisen poster" },
        badge: "S3 New",
      },
      {
        id: "frieren",
        title: "Frieren",
        href: routes.watch("frieren-beyond-journeys-end"),
        media: { src: "/images/card.png", alt: "Frieren poster" },
        badge: "Top rated",
      },
      {
        id: "attack-on-titan",
        title: "Attack on Titan",
        href: routes.watch("attack-on-titan"),
        media: { src: "/images/placeholder.png", alt: "Attack on Titan poster" },
        badge: "Staff pick",
      },
      {
        id: "chainsaw-man",
        title: "Chainsaw Man",
        href: routes.watch("chainsaw-man"),
        media: { src: "/images/card.png", alt: "Chainsaw Man poster" },
        badge: "Hot",
      },
    ],
  },
  {
    status: ready,
    variant: "landscape",
    id: "new-this-week",
    title: "New this week",
    titleBadge: "🔴 Updated today",
    description: "Fresh episodes & first drops",
    href: routes.series,
    items: [
      {
        id: "demon-slayer-s3e8",
        title: "Demon Slayer",
        href: routes.watch("demon-slayer"),
        media: { src: "/images/promo.png", alt: "Demon Slayer" },
        eyebrow: "S3 E8 · Resume",
        badge: "62%",
      },
      {
        id: "jujutsu-kaisen-s3e12",
        title: "Jujutsu Kaisen",
        href: routes.watch("jujutsu-kaisen"),
        media: { src: "/images/card.png", alt: "Jujutsu Kaisen" },
        eyebrow: "S3 E12 · New",
      },
      {
        id: "solo-leveling-s2e12",
        title: "Solo Leveling",
        href: routes.watch("solo-leveling"),
        media: { src: "/images/placeholder1.png", alt: "Solo Leveling" },
        eyebrow: "S2 E12 · Just dropped",
      },
      {
        id: "spy-x-family-finale",
        title: "Spy x Family",
        href: routes.watch("spy-x-family"),
        media: { src: "/images/placeholder.png", alt: "Spy x Family" },
        eyebrow: "Finale · S2 E13",
        badge: "Finale",
      },
    ],
  },
];

// ── Promo banner ──────────────────────────────────────────────────────────────

const promoBanner: PromoData = {
  status: ready,
  badge: "⚡ Limited launch offer",
  title: "7 days free.\nNo card. No catch.",
  description:
    "Every episode. Every season. Ad-free. In 4K. Cancel in 30 seconds if it's not for you — but it will be.",
  primaryCta: {
    label: "▶ Start free trial",
    href: routes.plans,
    intent: "primary",
  },
  secondaryCta: {
    label: "Browse catalog →",
    href: routes.series,
    intent: "secondary",
  },
  countdownTarget: "2026-04-07T00:00:00Z",
  finePrint: "✓ No credit card   ✓ Cancel anytime   ✓ Ad-free forever   ✓ 4K streaming",
};

// ── Top ranked ────────────────────────────────────────────────────────────────

const topRanked: TopRankedData = {
  status: ready,
  title: "Top 5",
  description: "What fans are watching this week",
  items: [
    {
      rank: 1,
      title: "Solo Leveling",
      href: routes.watch("solo-leveling"),
      media: { src: "/images/home/top5/1.svg", alt: "Solo Leveling" },
      label: "Action · Fantasy · Season 2",
    },
    {
      rank: 2,
      title: "Frieren: Beyond Journey's End",
      href: routes.watch("frieren-beyond-journeys-end"),
      media: { src: "/images/home/top5/2.svg", alt: "Frieren" },
      label: "Fantasy · Slice of life · Complete",
    },
    {
      rank: 3,
      title: "Jujutsu Kaisen",
      href: routes.watch("jujutsu-kaisen"),
      media: { src: "/images/home/top5/3.svg", alt: "Jujutsu Kaisen" },
      label: "Action · Supernatural · Season 3",
    },
    {
      rank: 4,
      title: "Demon Slayer",
      href: routes.watch("demon-slayer"),
      media: { src: "/images/home/top5/4.svg", alt: "Demon Slayer" },
      label: "Action · Drama · Season 3",
    },
    {
      rank: 5,
      title: "Attack on Titan",
      href: routes.watch("attack-on-titan"),
      media: { src: "/images/home/top5/5.svg", alt: "Attack on Titan" },
      label: "Action · Drama · Complete",
    },
  ],
};

// ── App download ──────────────────────────────────────────────────────────────

const appDownload: AppDownloadData = {
  status: ready,
  title: "Take AnimeKey with you on any screen.",
  description: "Watch on mobile, tablet, TV, or web. Your watchlist syncs everywhere.",
  stores: [
    {
      label: "Download on the App Store",
      href: "https://www.apple.com/app-store/",
      media: { src: "/images/footer/apple_store.svg", alt: "Apple App Store badge" },
    },
    {
      label: "Get it on Google Play",
      href: "https://play.google.com/store/games",
      media: { src: "/images/footer/play-store.svg", alt: "Google Play badge" },
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
  eyebrow: "✦ You've scrolled this far. You already know.",
  headline: "Your next obsession\nis ",
  headlineAccent: "one click away.",
  description:
    "Join 50,000 fans who stopped scrolling and started watching. First 7 days on us.",
  cta: {
    label: "▶ Start free trial",
    href: routes.plans,
    intent: "primary",
  },
  secondaryCta: {
    label: "Browse all anime",
    href: routes.series,
    intent: "secondary",
  },
  finePrint: "No credit card · Cancel anytime · Ad-free forever",
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

// Section order matches mockup: hero → proof → instant → genre → rails → promo → top5 → app → fcta
export const homeSections: HomeSection[] = [
  { type: "hero",           data: homepageData.hero },
  { type: "proofStrip",    data: homepageData.proofStrip },
  { type: "frictionKiller", data: homepageData.frictionKiller },
  { type: "genreChips",    data: homepageData.genreChips },
  { type: "rails",         data: homepageData.rails },
  { type: "promoBanner",   data: homepageData.promoBanner },
  { type: "topRanked",     data: homepageData.topRanked },
  { type: "appDownload",   data: homepageData.appDownload },
  { type: "footerCta",     data: homepageData.footerCta },
];
