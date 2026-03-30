import Image from "next/image";
import Link from "next/link";

import type { AppDownloadData } from "./types";

export function AppDownloadBand({ section }: { section: AppDownloadData }) {
  if (section.status === "error" || section.status === "empty") {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border/40 bg-card">
      <div className="grid gap-8 px-6 py-8 md:grid-cols-[minmax(0,1fr)_260px] md:px-8 md:py-9">
        <div className="space-y-4">
          <h2 className="text-title-sm text-foreground">{section.title}</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            {section.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {section.stores.map((store) => (
              <Link
                key={store.label}
                href={store.href}
                target="_blank"
                rel="noreferrer"
                data-analytics-id="home-download-store"
                className="inline-flex min-h-12 items-center gap-3 rounded-2xl border border-border/50 bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                <Image
                  src={store.media.src}
                  alt={store.media.alt}
                  width={108}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
                <span className="sr-only">{store.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {section.media ? (
          <div className="relative min-h-52 overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_center,_rgba(113,199,4,0.22),_transparent_65%)]">
            <Image
              src={section.media.src}
              alt={section.media.alt}
              fill
              sizes="(max-width: 768px) 100vw, 260px"
              className="object-contain p-4"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
