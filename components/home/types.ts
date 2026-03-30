export type HomepageCtaVariant = "primary" | "secondary" | "tertiary";

export interface HomepageLink {
  label: string;
  href: string;
}

export interface HomepageCta extends HomepageLink {
  variant: HomepageCtaVariant;
  iconSrc?: string;
  iconAlt?: string;
}

export interface HomepageMediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface HomepageHeroStat {
  label: string;
  value: string;
  detail?: string;
}

export interface HomepageHeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HomepageCta;
  secondaryCta: HomepageCta;
  artwork: HomepageMediaAsset;
  stats: ReadonlyArray<HomepageHeroStat>;
}

export interface HomepageProofPoint {
  title: string;
  description: string;
  iconSrc?: string;
  iconAlt?: string;
}

export interface HomepageRailItem {
  id: string;
  title: string;
  href: string;
  posterSrc: string;
  posterAlt: string;
  eyebrow?: string;
  description?: string;
  badge?: string;
}

export interface HomepageRail {
  id: string;
  title: string;
  description?: string;
  href: string;
  items: ReadonlyArray<HomepageRailItem>;
}

export interface HomepagePromoBanner {
  badge?: string;
  title: string;
  description: string;
  cta: HomepageCta;
  artwork: HomepageMediaAsset;
}

export interface HomepageTopRankedItem {
  rank: number;
  title: string;
  href: string;
  posterSrc: string;
  posterAlt: string;
  label?: string;
}

export interface HomepageAppDownloadStore {
  label: string;
  href: string;
  iconSrc: string;
  iconAlt: string;
}

export interface HomepageAppDownload {
  title: string;
  description: string;
  stores: ReadonlyArray<HomepageAppDownloadStore>;
  artwork?: HomepageMediaAsset;
}

export interface HomepageContentData {
  hero: HomepageHeroContent;
  proofPoints: ReadonlyArray<HomepageProofPoint>;
  rails: ReadonlyArray<HomepageRail>;
  promo: HomepagePromoBanner;
  topRanked: ReadonlyArray<HomepageTopRankedItem>;
  appDownload: HomepageAppDownload;
}
