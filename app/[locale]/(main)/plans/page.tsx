import Link from "next/link";

import { EditorialHero } from "@/components/discovery/EditorialHero";
import { routes } from "@/constants/routes";

const planCards = [
  {
    name: "Starter",
    price: "Free",
    note: "Best for first-time visitors who want to browse before upgrading.",
    points: ["Browse curated catalog", "Save titles to continue later", "Create your account in minutes"],
    cta: "Create free account",
    href: routes.register,
    featured: false,
  },
  {
    name: "Premium",
    price: "Best value",
    note: "Designed for anime fans who want a cleaner, deeper streaming experience.",
    points: ["Expanded premium catalog", "Smoother conversion path from discovery", "Priority access to featured collections"],
    cta: "Start premium",
    href: routes.register,
    featured: true,
  },
  {
    name: "Household",
    price: "Shared",
    note: "Ideal when multiple profiles and family-safe control matter most.",
    points: ["Up to five profiles", "Kids-friendly profile support", "Built for device switching"],
    cta: "Compare options",
    href: routes.home,
    featured: false,
  },
];

export default function PlansPage() {
  return (
    <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-10 px-4 py-6 md:px-8 md:py-8">
      <EditorialHero
        badge="Plans"
        title="A plans page should convert with confidence, not pressure."
        description="This screen now frames pricing as a natural next step after discovery, with clearer packaging, better hierarchy, and a more premium feel."
        actions={[
          { label: "Create account", href: routes.register },
          { label: "Back to home", href: routes.home, variant: "secondary" },
        ]}
        stats={[
          { label: "Browse-first", value: "Visitors can understand value before committing" },
          { label: "Premium-ready", value: "Stronger packaging and CTA placement" },
          { label: "Household fit", value: "Profiles and shared viewing stay visible" },
        ]}
      />

      <section className="grid gap-5 xl:grid-cols-3">
        {planCards.map((plan) => (
          <article
            key={plan.name}
            className={[
              "rounded-[1.8rem] border p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
              plan.featured
                ? "border-primary/40 bg-[radial-gradient(circle_at_top,_rgba(113,199,4,0.18),_transparent_55%),linear-gradient(180deg,_rgba(16,24,4,0.92),_rgba(7,7,7,0.98))]"
                : "border-white/10 bg-card/[0.92]",
            ].join(" ")}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  {plan.name}
                </p>
                <h2 className="text-3xl font-black tracking-tight text-foreground">
                  {plan.price}
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">{plan.note}</p>
              </div>

              <ul className="space-y-3 text-sm text-foreground/80">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12l5 5L20 7" />
                      </svg>
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={plan.href}
              className={[
                "mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition-all",
                plan.featured
                  ? "bg-primary text-primary-foreground shadow-[0_18px_50px_rgba(113,199,4,0.26)] hover:opacity-90"
                  : "border border-white/12 bg-white/[0.03] text-foreground hover:bg-white/[0.08]",
              ].join(" ")}
            >
              {plan.cta}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
