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

export interface HeroData {
  status: SectionStatus;
  eyebrow: string;
  title: string;
  description: string;
  ctas: ReadonlyArray<CallToAction>;
  media: MediaItem;
  stats: ReadonlyArray<{
    label: string;
    value: string;
    detail?: string;
  }>;
}

export interface ProofPoint {
  title: string;
  description: string;
  media: MediaItem;
}

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

export interface PromoData {
  status: SectionStatus;
  badge?: string;
  title: string;
  description: string;
  primaryCta: CallToAction;
  secondaryCta?: CallToAction;
  media: MediaItem;
}

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

export interface ProofStripData {
  status: SectionStatus;
  items: ReadonlyArray<ProofPoint>;
}

export interface HomepageData {
  hero: HeroData;
  proofStrip: ProofStripData;
  rails: ReadonlyArray<RailData>;
  promoBanner: PromoData;
  topRanked: TopRankedData;
  appDownload: AppDownloadData;
}

export type HomeSection =
  | {
      type: "hero";
      data: HeroData;
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
    };
