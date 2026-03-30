import Link from "next/link";
import { routes } from "@/constants/routes";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href={routes.home} className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">
            AnimeKey
          </span>
        </Link>

        {/* Primary nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href={routes.home}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href={routes.movies}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Movies
          </Link>
          <Link
            href={routes.series}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Series
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Auth buttons — wired up in Sprint 3 (ANI-96) */}
          <Link
            href={routes.login}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            href={routes.register}
            className="rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
