import Link from "next/link";

import { routes } from "@/constants/routes";

export default function SeriesPage() {
  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-10 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        Series
      </p>
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Series discovery now has a real landing route.
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          The homepage rails and browse actions can safely land here while we
          continue building the richer catalog filtering and server-backed data.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href={routes.home}
          className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href={routes.movies}
          className="inline-flex items-center rounded-full border border-border/40 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
        >
          Browse movies
        </Link>
      </div>
    </section>
  );
}
