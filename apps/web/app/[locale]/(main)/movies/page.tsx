import { BrowsePage } from "@/components/discovery/BrowsePage";

export default function MoviesPage() {
  return (
    <BrowsePage
      type="movie"
      hero={{
        badge: "Movies",
        headline: "One night.\nOne masterpiece.",
        subtext:
          "Studio Ghibli legends, action events, and hidden gems. Every film hand-picked for the AnimeKey catalogue.",
      }}
    />
  );
}
