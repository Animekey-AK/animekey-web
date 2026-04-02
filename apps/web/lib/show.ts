import "server-only";
import { apiAuthHeaders } from "@/lib/apiHeaders";
import { env } from "@/lib/env.server";
import type { ShowDetail, Episode } from "@/components/discovery/show.data";

interface BackendEpisode {
  _id: string;
  videoId: string;
  episode: number;
  title: string;
  duration: number;
  description: string;
  isFree: boolean;
  thumbnails?: Array<{ path: string }>;
}

interface BackendContent {
  _id: string;
  id: string;
  title: string;
  description: string;
  imdb: number;
  year: number;
  isFree: boolean;
  hasFreeEpisodes: boolean;
  type: string;
  genres: Array<{ name: string }>;
  thumbnails?: Array<{ path: string }>;
  banners?: Array<{ path: string }>;
  seasons?: Array<{ episodes: BackendEpisode[] }>;
}

function msToReadable(ms: number): string {
  const minutes = Math.round(ms / 60000);
  return `${minutes} min`;
}

function mapEpisode(ep: BackendEpisode): Episode {
  return {
    number: ep.episode,
    title: ep.title,
    duration: msToReadable(ep.duration ?? 0),
    description: ep.description ?? "",
    isFree: ep.isFree ?? false,
    imageSrc: ep.thumbnails?.[0]?.path ?? "/images/placeholder.png",
    videoId: ep.videoId ?? ep._id,
  };
}

export async function fetchShow(contentId: string): Promise<ShowDetail | null> {
  try {
    const headers = await apiAuthHeaders();
    for (const type of ["SERIES", "VIDEO"] as const) {
      const res = await fetch(
        `${env.API_BASE_URL}/media/v1/contents/view/${contentId}?type=${type}`,
        { headers },
      );
      if (!res.ok) continue;

      const body = (await res.json()) as { result: BackendContent };
      const c = body.result;

      const episodes: Episode[] =
        type === "SERIES"
          ? (c.seasons ?? []).flatMap((s) => s.episodes.map(mapEpisode))
          : [
              {
                number: 1,
                title: c.title,
                duration: msToReadable(0),
                description: c.description ?? "",
                isFree: c.isFree ?? false,
                imageSrc: c.thumbnails?.[0]?.path ?? "/images/placeholder.png",
                videoId: c._id,
              },
            ];

      return {
        slug: contentId,
        title: c.title,
        tagline: "",
        description: c.description ?? "",
        rating: c.imdb ?? 8.0,
        year: c.year ?? 2024,
        studio: "",
        genres: (c.genres ?? []).map((g) => g.name),
        episodes,
        imageSrc: c.thumbnails?.[0]?.path ?? "/images/placeholder.png",
        backdropSrc: c.banners?.[0]?.path ?? "/images/placeholder.png",
        type: type === "SERIES" ? "series" : "movie",
        hasFreeEpisodes: c.hasFreeEpisodes ?? false,
        contentId: c._id,
      };
    }
    return null;
  } catch {
    return null;
  }
}
