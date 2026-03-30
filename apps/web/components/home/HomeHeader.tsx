"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { routes } from "@/constants/routes";

const navLinks = [
  { label: "Home", href: routes.home },
  { label: "Movies", href: routes.movies },
  { label: "Series", href: routes.series },
];

export function HomeHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between gap-4 px-4 md:px-8">
        <Link href={routes.home} className="flex items-center gap-3">
          <Image
            src="/images/logo.svg"
            alt="AnimeKey"
            width={116}
            height={26}
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] p-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-white/[0.08] text-foreground"
                  : "text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={routes.login}
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/[0.04] hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            href={routes.register}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_16px_40px_rgba(113,199,4,0.24)] transition-opacity hover:opacity-90"
          >
            Start free
          </Link>
        </div>
      </div>
    </header>
  );
}
