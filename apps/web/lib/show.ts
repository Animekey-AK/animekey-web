import "server-only";
import type { ShowDetail, Episode } from "@/components/discovery/show.data";
import { apiAuthHeaders } from "./apiHeaders";
import { env } from "./env.server";

// ─── Backend API response shapes ─────────────────────────────────────────────

interface ApiEpisode {
  episodeNumber: number;
  title: string;
  duration?: number; // seconds
  description?: string;
  isFree: boolean;
  thumbnailUrl?: string;
}

interface ApiShow {
  _id: string;
  slug?: string;
  title: string;
  tagline?: string;
  description?: string;
  rating?: number;
  releaseYear?: number;
  studio?: string;
  genres?: string[];
  posterUrl?: string;
  backdropUrl?: string;
  type: "series" | "movie";
  episodes?: ApiEpisode[];
}

interface ApiResponse {
  data: ApiShow;
}

// ─── Mappers ─────────────────────────────────────────────────────────────────

function formatDuration(seconds?: number): string {
  if (!seconds) return "24 min";
  const m = Math.round(seconds / 60);
  return `${m} min`;
}

function mapEpisode(ep: ApiEpisode, fallbackImage: string): Episode {
  return {
    number: ep.episodeNumber,
    title: ep.title,
    duration: formatDuration(ep.duration),
    description: ep.description ?? "",
    isFree: ep.isFree,
    imageSrc: ep.thumbnailUrl ?? fallbackImage,
  };
}

function mapShow(raw: ApiShow): ShowDetail {
  const poster = raw.posterUrl ?? "/images/placeholder.png";
  const episodes: ReadonlyArray<Episode> =
    raw.episodes && raw.episodes.length > 0
      ? raw.episodes.map((ep) => mapEpisode(ep, poster))
      : [{ number: 1, title: "Episode 1", duration: "24 min", description: "", isFree: true, imageSrc: poster }];

  return {
    slug: raw.slug ?? raw._id,
    title: raw.title,
    tagline: raw.tagline ?? "",
    description: raw.description ?? "",
    rating: raw.rating ?? 0,
    year: raw.releaseYear ?? new Date().getFullYear(),
    studio: raw.studio ?? "",
    genres: raw.genres ?? [],
    imageSrc: poster,
    backdropSrc: raw.backdropUrl ?? poster,
    type: raw.type,
    episodes,
  };
}

// ─── Fetcher ─────────────────────────────────────────────────────────────────

/**
 * Fetches a show from the backend API by its content ID or slug.
 * Returns null on any error so callers can fall back gracefully.
 */
export async function fetchShow(contentId: string): Promise<ShowDetail | null> {
  try {
    const headers = await apiAuthHeaders();
    const res = await fetch(`${env.API_BASE_URL}/media/v1/content/${contentId}`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as ApiResponse;
    return mapShow(json.data);
  } catch {
    return null;
  }
}
