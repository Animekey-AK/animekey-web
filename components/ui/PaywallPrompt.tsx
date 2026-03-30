import Link from "next/link";
import { routes } from "@/constants/routes";

/**
 * Shown when a guest tries to access premium (watch) content.
 * Rendered server-side — no client JS needed.
 */
export function PaywallPrompt() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="rounded-full border border-primary/20 bg-primary/10 p-5">
        <svg
          className="h-10 w-10 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 10l4.553-2.069A1 1 0 0121 8.869v6.262a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
          />
        </svg>
      </div>

      <div>
        <h2 className="text-3xl font-black tracking-tight text-foreground">
          Start watching now
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-7 text-muted-foreground">
          Create a free account or sign in to watch this content.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={routes.register}
          className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_20px_50px_rgba(113,199,4,0.24)] transition-opacity hover:opacity-90"
        >
          Create Account
        </Link>
        <Link
          href={routes.login}
          className="rounded-full border border-white/10 px-8 py-3.5 text-sm font-medium transition-colors hover:bg-white/[0.05]"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
