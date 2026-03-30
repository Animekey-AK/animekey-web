export type SectionStatus = "active" | "hidden" | "disabled";

export type RailVariant = "carousel" | "stacked" | "ranked";

export interface MediaItem {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeroData {
  status: SectionStatus;
  eyebrow: string;
  title: string;
  description: string;
  actions: ReadonlyArray<{
    label: string;
    href: string;
  }>;
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
    meta?: string;
  }>;
}

export interface PromoData {
  status: SectionStatus;
  badge?: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
  };
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

export type HomeSection =
  | {
      key: "hero";
      status: SectionStatus;
    }
  | {
      key: "proofStrip";
      status: SectionStatus;
    }
  | {
      key: "rails";
      status: SectionStatus;
      variant: RailVariant;
    }
  | {
      key: "promoBanner";
      status: SectionStatus;
    }
  | {
      key: "topRanked";
      status: SectionStatus;
    }
  | {
      key: "appDownload";
      status: SectionStatus;
    };
