import { SearchResults } from "@/components/discovery/SearchResults";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;

  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-8 md:px-8 md:py-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          {q ? `"${q}"` : "Search"}
        </h1>
        <p className="text-sm text-foreground/45">
          Browse the AnimeKey catalogue
        </p>
      </div>

      <SearchResults initialQuery={q} />
    </div>
  );
}
