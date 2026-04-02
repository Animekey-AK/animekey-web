import { auth } from "@/lib/auth";
import { fetchShow } from "@/lib/show";
import { getShow } from "@/components/discovery/show.data";
import { WatchPageClient } from "@/components/player/WatchPageClient";
import { catalogItems } from "@/components/discovery/catalog.data";

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  await auth();

  // Try real API first; fall back to mock data during transition
  const show = (await fetchShow(id)) ?? getShow(id);

  const relatedShows = catalogItems
    .filter(
      (item) =>
        item.slug !== id &&
        item.genres.some((g) => show.genres.includes(g)),
    )
    .slice(0, 8);

  return <WatchPageClient show={show} relatedShows={relatedShows} />;
}
