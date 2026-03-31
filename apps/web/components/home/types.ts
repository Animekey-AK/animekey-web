export type SectionStatus = "loading" | "ready" | "empty" | "error";

export type RailVariant = "poster" | "landscape" | "ranked" | "compact";

export type CallToActionIntent = "primary" | "secondary" | "tertiary";

export interface MediaItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CallToAction {
  label: string;
  href: string;
  intent: CallToActionIntent;
}

// ── Hero (cinematic full-screen) ──────────────────────────────────────────────

export interface HeroPill {
  label: string;
  /** true = render in lime green */
  accent?: boolean;
}

export interface HeroSlide {
  id: string;
  showName: string;
  /** e.g. "Season 2, Episode 12 just dropped" */
  showSub: string;
  pills: ReadonlyArray<HeroPill>;
  description: string;
  /** Route to watch page for episode 1 */
  watchHref: string;
  /** Initial live viewer count — drifts client-side */
  liveViewerCount: number;
  /** Controls the color-shifted gradient background */
  colorVariant: "lime" | "purple" | "pink" | "amber";
  /** Show poster image path */
  posterImage: string;
  /** Short meta for modal e.g. "Season 2 • 24 eps" */
  modalMeta: string;
  modalDescription: string;
}

export interface HeroCinematicData {
  status: SectionStatus;
  slides: ReadonlyArray<HeroSlide>;
}

// ── Proof strip ───────────────────────────────────────────────────────────────

export interface ProofPoint {
  title: string;
  description: string;
  media: MediaItem;
}

export interface ProofStripData {
  status: SectionStatus;
  items: ReadonlyArray<ProofPoint>;
}

// ── Content rails ─────────────────────────────────────────────────────────────

export interface RailData {
  status: SectionStatus;
  variant: RailVariant;
  id: string;
  title: string;
  description?: string;
  href: string;
  items: ReadonlyArray<{
    id: string;
    title: string;
    href: string;
    media: MediaItem;
    badge?: string;
    description?: string;
    eyebrow?: string;
  }>;
}

// ── Promo banner ──────────────────────────────────────────────────────────────

export interface PromoData {
  status: SectionStatus;
  badge?: string;
  title: string;
  description: string;
  primaryCta: CallToAction;
  secondaryCta?: CallToAction;
  media: MediaItem;
  /** ISO date string — renders a live countdown timer when set */
  countdownTarget?: string;
}

// ── Top ranked ────────────────────────────────────────────────────────────────

export interface TopRankedData {
  status: SectionStatus;
  title: string;
  description?: string;
  items: ReadonlyArray<{
    rank: number;
    title: string;
    href: string;
    media: MediaItem;
    label?: string;
  }>;
}

// ── App download ──────────────────────────────────────────────────────────────

export interface AppDownloadData {
  status: SectionStatus;
  title: string;
  description: string;
  stores: ReadonlyArray<{
    label: string;
    href: string;
    media: MediaItem;
  }>;
  media?: MediaItem;
}

// ── Genre chips ───────────────────────────────────────────────────────────────

export interface GenreChip {
  id: string;
  label: string;
  emoji: string;
  href: string;
}

export interface GenreChipsData {
  status: SectionStatus;
  items: ReadonlyArray<GenreChip>;
}

// ── Friction killer ───────────────────────────────────────────────────────────

export interface TrustSignal {
  icon: string;
  label: string;
}

export interface FrictionKillerData {
  status: SectionStatus;
  headline: string;
  subline?: string;
  signals: ReadonlyArray<TrustSignal>;
  cta: CallToAction;
  liveCount?: number;
}

// ── Footer CTA ────────────────────────────────────────────────────────────────

export interface FooterCtaData {
  status: SectionStatus;
  headline: string;
  subline?: string;
  cta: CallToAction;
}

// ── Homepage root ─────────────────────────────────────────────────────────────

export interface HomepageData {
  hero: HeroCinematicData;
  genreChips: GenreChipsData;
  proofStrip: ProofStripData;
  rails: ReadonlyArray<RailData>;
  frictionKiller: FrictionKillerData;
  promoBanner: PromoData;
  topRanked: TopRankedData;
  appDownload: AppDownloadData;
  footerCta: FooterCtaData;
}

export type HomeSection =
  | {
      type: "hero";
      data: HeroCinematicData;
    }
  | {
      type: "genreChips";
      data: GenreChipsData;
    }
  | {
      type: "proofStrip";
      data: ProofStripData;
    }
  | {
      type: "rails";
      data: ReadonlyArray<RailData>;
    }
  | {
      type: "frictionKiller";
      data: FrictionKillerData;
    }
  | {
      type: "promoBanner";
      data: PromoData;
    }
  | {
      type: "topRanked";
      data: TopRankedData;
    }
  | {
      type: "appDownload";
      data: AppDownloadData;
    }
  | {
      type: "footerCta";
      data: FooterCtaData;
    };
