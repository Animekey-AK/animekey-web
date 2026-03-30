import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "About Us", href: "/about" },
  { label: "Help Centre", href: "/help" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/animekeytv", icon: "/images/footer/white/facebook.svg" },
  { label: "Instagram", href: "https://www.instagram.com/animekeytv", icon: "/images/footer/white/instagram.svg" },
  { label: "X", href: "https://x.com/animekeytv", icon: "/images/footer/white/x.svg" },
  { label: "TikTok", href: "https://www.tiktok.com/@animekeytv", icon: "/images/footer/white/tiktok.svg" },
];

const storeLinks = [
  {
    label: "App Store",
    href: "https://apps.apple.com/in/app/animekey/id1615781926",
    icon: "/images/footer/apple_store.svg",
  },
  {
    label: "Google Play",
    href: "https://play.google.com/store/apps/details?id=com.animekey",
    icon: "/images/footer/play-store.svg",
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[linear-gradient(180deg,_rgba(5,5,5,0.96),_rgba(2,2,2,1))]">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div className="space-y-6">
          <Image
            src="/images/logo.svg"
            alt="AnimeKey"
            width={128}
            height={28}
            className="h-auto w-32"
          />
          <p className="max-w-xl text-sm leading-7 text-muted-foreground">
            AnimeKey is being rebuilt around cleaner discovery, stronger
            editorial curation, and a streaming experience that feels premium
            before the subscription pitch ever shows up.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/30 bg-card transition-colors hover:border-primary/50"
              >
                <Image
                  src={link.icon}
                  alt={link.label}
                  width={18}
                  height={18}
                  className="h-auto w-[18px]"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">
              Company
            </h2>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">
              Download
            </h2>
            <div className="flex flex-col gap-3">
              {storeLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center rounded-2xl border border-border/30 bg-card px-4 py-3 transition-colors hover:border-primary/50"
                >
                  <Image
                    src={link.icon}
                    alt={link.label}
                    width={110}
                    height={32}
                    className="h-7 w-auto object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
