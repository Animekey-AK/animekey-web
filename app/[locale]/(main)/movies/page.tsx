import Link from "next/link";

import { routes } from "@/constants/routes";

export default function MoviesPage() {
  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-10 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        Movies
      </p>
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Movie browsing is ready for the next data slice.
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          This route is live so homepage CTAs and content rails land on a valid
          catalog page instead of a 404 while the full movie experience is being
          rebuilt.
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
          href={routes.series}
          className="inline-flex items-center rounded-full border border-border/40 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
        >
          Browse series
        </Link>
      </div>
    </section>
  );
}
