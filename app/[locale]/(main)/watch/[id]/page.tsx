import Link from "next/link";

import { routes } from "@/constants/routes";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const title = id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-10 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        Watch
      </p>
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          This watch route is live so hero and rail cards resolve to a valid
          destination while the full playback experience is integrated.
        </p>
      </div>
      <div className="rounded-[1.75rem] border border-border/30 bg-card/80 p-6">
        <p className="text-sm font-semibold text-foreground">Selected title</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Slug: <span className="font-mono text-foreground">{id}</span>
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href={routes.login}
          className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Sign in to continue
        </Link>
        <Link
          href={routes.home}
          className="inline-flex items-center rounded-full border border-border/40 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-card"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
