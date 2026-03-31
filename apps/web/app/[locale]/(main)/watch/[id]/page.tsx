import { WatchPageClient } from "@/components/player/WatchPageClient";
import { catalogItems } from "@/components/discovery/catalog.data";
import { getShow } from "@/components/discovery/show.data";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const show = getShow(id);

  const relatedShows = catalogItems
    .filter(
      (item) =>
        item.slug !== id &&
        item.genres.some((g) => show.genres.includes(g)),
    )
    .slice(0, 8);

  return <WatchPageClient show={show} relatedShows={relatedShows} />;
}
