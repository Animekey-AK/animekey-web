import Link from "next/link";

import { routes } from "@/constants/routes";

export default function PlansPage() {
  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 px-4 py-10 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        Plans
      </p>
      <div className="space-y-4">
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          Subscription entry points are now wired to a real page.
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
          This keeps the conversion path intact from the homepage while the
          final pricing and packaging content is still being rebuilt.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link
          href={routes.register}
          className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Create account
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
