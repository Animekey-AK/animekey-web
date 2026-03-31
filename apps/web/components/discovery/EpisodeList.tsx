import { EpisodeCard } from "./EpisodeCard";
import type { Episode } from "./show.data";

interface Props {
  episodes: ReadonlyArray<Episode>;
  showSlug: string;
  totalEpisodes?: number;
  type?: "series" | "movie";
  selectedEpisode?: number;
  onSelectEpisode?: (episode: Episode) => void;
}

export function EpisodeList({ episodes, showSlug, totalEpisodes, type = "series", selectedEpisode, onSelectEpisode }: Props) {
  const remaining = totalEpisodes ? totalEpisodes - episodes.length : 0;
  const label = type === "movie" ? "The Film" : "Episodes";

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-foreground">{label}</h2>
        <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-foreground/55">
          {episodes.length} {type === "movie" ? "film" : `ep${episodes.length !== 1 ? "s" : ""}`}
        </span>
        {episodes.some((e) => e.isFree) && (
          <span className="rounded-full bg-primary/12 border border-primary/25 px-2.5 py-1 text-[11px] font-semibold text-primary">
            Ep 1 always free
          </span>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.number}
            episode={episode}
            showSlug={showSlug}
            isSelected={selectedEpisode === episode.number}
            onSelect={onSelectEpisode}
          />
        ))}

        {remaining > 0 && (
          <div className="flex w-[280px] shrink-0 flex-col items-center justify-center gap-3 rounded-[1.2rem] border border-dashed border-white/12 bg-white/[0.02] aspect-video">
            <span className="text-2xl text-foreground/25">+{remaining}</span>
            <p className="text-[11px] text-foreground/35">more episodes</p>
          </div>
        )}
      </div>
    </section>
  );
}
