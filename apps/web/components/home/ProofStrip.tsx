import Image from "next/image";

import type { ProofStripData } from "./types";

export function ProofStrip({ section }: { section: ProofStripData }) {
  if (section.status === "error" || section.status === "empty") {
    return null;
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {section.items.map((item) => (
        <article
          key={item.title}
          className="rounded-[1.5rem] border border-border/30 bg-card/80 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.18)]"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12">
            <Image
              src={item.media.src}
              alt={item.media.alt}
              width={28}
              height={28}
              className="h-auto w-7 object-contain"
            />
          </div>
          <h2 className="text-base font-semibold text-foreground">{item.title}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </article>
      ))}
    </section>
  );
}
