import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { routes } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface AuthHighlight {
  label: string;
  value: string;
}

interface AuthShowcaseShellProps {
  title: string;
  description: string;
  artworkSrc: string;
  artworkAlt: string;
  artworkPosition?: "left" | "right";
  eyebrow?: string;
  highlights?: ReadonlyArray<AuthHighlight>;
  footer?: ReactNode;
  children: ReactNode;
}

export function AuthShowcaseShell({
  title,
  description,
  artworkSrc,
  artworkAlt,
  artworkPosition = "right",
  eyebrow = "AnimeKey access",
  highlights = [
    { label: "Profiles", value: "Kids + family ready" },
    { label: "Devices", value: "Web, mobile, TV" },
    { label: "Experience", value: "Clean cinematic browsing" },
  ],
  footer,
  children,
}: AuthShowcaseShellProps) {
  const showcase = (
    <div className="relative hidden overflow-hidden lg:flex">
      <Image
        src={artworkSrc}
        alt={artworkAlt}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(113,199,4,0.22),_transparent_48%),linear-gradient(135deg,_rgba(0,0,0,0.15),_rgba(0,0,0,0.82)_65%)]" />
      <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-b from-background/10 via-transparent to-background/80" />

      <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
        <div className="space-y-8">
          <Link href={routes.home} className="inline-flex items-center">
            <Image
              src="/images/logo.svg"
              alt="AnimeKey"
              width={144}
              height={44}
              priority
              className="h-auto w-36"
            />
          </Link>

          <div className="max-w-xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-primary">
              {eyebrow}
            </p>
            <h1 className="font-display text-5xl leading-[0.94] tracking-tight text-foreground xl:text-6xl">
              {title}
            </h1>
            <p className="max-w-lg text-base leading-8 text-foreground/72">
              {description}
            </p>
          </div>
        </div>

        <div className="grid gap-3 xl:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.6rem] border border-white/10 bg-black/35 p-4 backdrop-blur-xl"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-foreground/50">
                {item.label}
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(113,199,4,0.15),_transparent_32%),linear-gradient(180deg,_#040404_0%,_#090909_100%)] text-foreground">
      <div className="mx-auto grid min-h-screen max-w-[1700px] lg:grid-cols-[minmax(520px,0.95fr)_minmax(0,1.05fr)]">
        {artworkPosition === "left" ? showcase : null}

        <div className="flex items-center px-5 py-8 sm:px-8 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-[34rem]">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/[0.88] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-8">
              <div className="absolute inset-x-10 top-0 h-28 bg-[radial-gradient(circle,_rgba(113,199,4,0.16),_transparent_72%)]" />

              <div className="relative z-10">
                <Link href={routes.home} className="inline-flex items-center lg:hidden">
                  <Image
                    src="/images/logo.svg"
                    alt="AnimeKey"
                    width={140}
                    height={42}
                    priority
                    className="mb-8 h-auto w-36"
                  />
                </Link>

                <div className="mb-8 space-y-3 lg:hidden">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                    {eyebrow}
                  </p>
                  <h1 className="text-4xl font-black leading-tight tracking-tight text-foreground">
                    {title}
                  </h1>
                  <p className="text-sm leading-7 text-foreground/70">
                    {description}
                  </p>
                </div>

                {children}
                {footer ? <div className="mt-8">{footer}</div> : null}
              </div>
            </div>
          </div>
        </div>

        {artworkPosition === "right" ? showcase : null}
      </div>
    </div>
  );
}

export function AuthInlineLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "font-semibold text-primary transition-colors hover:text-primary/80 hover:underline",
        className,
      )}
    >
      {children}
    </Link>
  );
}
