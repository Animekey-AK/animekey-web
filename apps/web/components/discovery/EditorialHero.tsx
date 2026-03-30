import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface EditorialAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface EditorialStat {
  label: string;
  value: string;
}

export function EditorialHero({
  badge,
  title,
  description,
  actions,
  stats,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  actions: ReadonlyArray<EditorialAction>;
  stats: ReadonlyArray<EditorialStat>;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(113,199,4,0.22),_transparent_36%),linear-gradient(135deg,_rgba(11,11,11,0.96),_rgba(5,5,5,0.98))] shadow-[0_32px_120px_rgba(0,0,0,0.45)]">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,_transparent_0%,_transparent_40%,_rgba(113,199,4,0.08)_100%)]" />
      <div className="relative grid gap-8 p-6 md:p-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] xl:p-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              {badge}
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight text-foreground md:text-5xl xl:text-6xl">
              {title}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-foreground/70 md:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {actions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={cn(
                  "inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold transition-all",
                  action.variant === "secondary"
                    ? "border border-white/12 bg-white/[0.03] text-foreground hover:bg-white/[0.08]"
                    : "bg-primary text-primary-foreground shadow-[0_18px_50px_rgba(113,199,4,0.26)] hover:opacity-90",
                )}
              >
                {action.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.4rem] border border-white/10 bg-black/25 p-4 backdrop-blur-xl"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground/50">
                  {item.label}
                </p>
                <p className="mt-3 text-base font-semibold text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {children}
        </div>

        <div className="grid gap-4">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(113,199,4,0.22),_transparent_36%),linear-gradient(180deg,_rgba(255,255,255,0.03),_rgba(0,0,0,0.2))]">
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <div className="w-fit rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-foreground/72 backdrop-blur-xl">
                Programming board
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/35 p-4 backdrop-blur-xl">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
                    Editor&apos;s note
                  </p>
                  <p className="mt-3 text-lg font-semibold leading-7 text-foreground">
                    Built to feel like a real browse destination, not a sprint placeholder.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {stats.slice(0, 2).map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4"
                    >
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground/48">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-foreground">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {["Curated", "Premium-ready", "Browse-first"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-foreground/76"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialCardGrid({
  items,
}: {
  items: ReadonlyArray<{
    title: string;
    body: string;
    icon?: ReactNode;
  }>;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="rounded-[1.6rem] border border-white/10 bg-card/[0.9] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)]"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
            {item.icon}
          </div>
          <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {item.body}
          </p>
        </article>
      ))}
    </section>
  );
}
