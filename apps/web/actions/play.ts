"use server";

import { apiAuthHeaders } from "@/lib/apiHeaders";
import { env } from "@/lib/env.server";

export type EpisodePlayResult =
  | { granted: true; hls: { type: string; url: string } }
  | { granted: false; reason: "auth_required" | "subscription_required" }
  | { error: true };

export type MoviePlayResult =
  | { granted: true; hls: { type: string; url: string } }
  | {
      granted: false;
      reason: "auth_required" | "subscription_required";
      trailer: { type: string; url: string } | null;
    }
  | { error: true };

export async function playEpisode(videoId: string): Promise<EpisodePlayResult> {
  try {
    const headers = await apiAuthHeaders();
    const res = await fetch(
      `${env.API_BASE_URL}/media/v1/contents/episode/play?episode=${videoId}`,
      { method: "POST", headers },
    );

    if (res.status === 403) {
      const body = (await res.json()) as { message: string };
      const reason =
        body.message === "CONTENT.AUTH_REQUIRED"
          ? ("auth_required" as const)
          : ("subscription_required" as const);
      return { granted: false, reason };
    }

    if (!res.ok) return { error: true };

    const body = (await res.json()) as { result: { streamUrl: { hls: { type: string; url: string } } } };
    return { granted: true, hls: body.result.streamUrl.hls };
  } catch {
    return { error: true };
  }
}

export async function playMovie(contentId: string): Promise<MoviePlayResult> {
  try {
    const headers = await apiAuthHeaders();
    const res = await fetch(
      `${env.API_BASE_URL}/media/v1/contents/${contentId}/play`,
      { method: "POST", headers },
    );

    if (!res.ok) return { error: true };

    const body = (await res.json()) as {
      result: {
        accessDenied: boolean;
        reason?: string;
        streamUrl?: { hls: { type: string; url: string } };
        trailerUrl?: { type: string; url: string } | null;
      };
    };
    const result = body.result;

    if (result.accessDenied) {
      const reason =
        result.reason === "CONTENT.AUTH_REQUIRED"
          ? ("auth_required" as const)
          : ("subscription_required" as const);
      return { granted: false, reason, trailer: result.trailerUrl ?? null };
    }

    return { granted: true, hls: result.streamUrl!.hls };
  } catch {
    return { error: true };
  }
}
