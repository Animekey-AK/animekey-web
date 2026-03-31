"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { routes } from "@/constants/routes";

const navLinks = [
  { label: "Home", href: routes.home },
  { label: "Movies", href: routes.movies },
  { label: "Series", href: routes.series },
  { label: "New & Hot", href: routes.series },
];

export function HomeHeader() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[300] flex h-16 items-center justify-between px-5 transition-all duration-300 md:px-10",
        solid
          ? "border-b border-white/8 bg-background/90 backdrop-blur-[28px]"
          : "",
      )}
    >
      {/* Logo */}
      <Link href={routes.home} className="flex items-center gap-3">
        <Image
          src="/images/logo.svg"
          alt="AnimeKey"
          width={116}
          height={26}
          className="h-8 w-auto"
        />
      </Link>

      {/* Nav */}
      <nav className="hidden items-center gap-0.5 rounded-full border border-white/8 bg-white/[0.02] p-1 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              "rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors",
              pathname === link.href
                ? "bg-white/8 text-foreground"
                : "text-white/50 hover:bg-white/6 hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <Link
          href={routes.login}
          className="rounded-full px-4 py-2 text-[13px] font-medium text-white/50 transition-colors hover:bg-white/[0.04] hover:text-foreground"
        >
          Sign in
        </Link>
        <Link
          href={routes.register}
          className="animate-cta-pulse inline-flex items-center gap-1.5 rounded-full bg-primary px-[18px] py-[9px] text-[13px] font-bold text-primary-foreground transition-all hover:-translate-y-px hover:shadow-[0_12px_32px_rgba(113,199,4,.45)]"
        >
          ▶ Watch free for 7 days
        </Link>
      </div>
    </header>
  );
}
