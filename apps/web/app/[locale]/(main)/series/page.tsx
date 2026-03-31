import { BrowsePage } from "@/components/discovery/BrowsePage";

export default function SeriesPage() {
  return (
    <BrowsePage
      type="series"
      hero={{
        badge: "Series",
        headline: "Every arc.\nEvery season.",
        subtext:
          "From weekly simulcasts to complete classics — filter by mood, genre, or just browse and let something find you.",
      }}
    />
  );
}
