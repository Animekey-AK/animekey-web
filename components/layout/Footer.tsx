import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Help Centre", href: "/help" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Preferences", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-screen-2xl px-4 py-10 md:px-8">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AnimeKey. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
