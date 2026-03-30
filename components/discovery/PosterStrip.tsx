import Image from "next/image";
import Link from "next/link";

const accentPalettes = [
  {
    glow: "from-primary/24 via-primary/7 to-transparent",
    line: "bg-primary/70",
  },
  {
    glow: "from-emerald-400/20 via-cyan-400/7 to-transparent",
    line: "bg-emerald-400/70",
  },
  {
    glow: "from-lime-300/18 via-yellow-200/7 to-transparent",
    line: "bg-lime-300/70",
  },
];

function getAccentPalette(seed: string) {
  const index = Array.from(seed).reduce((sum, character) => sum + character.charCodeAt(0), 0) %
    accentPalettes.length;

  return accentPalettes[index];
}

export function PosterStrip({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: ReadonlyArray<{
    title: string;
    subtitle: string;
    href: string;
    imageSrc: string;
  }>;
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => {
          const accent = getAccentPalette(item.title);

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group w-44 shrink-0 space-y-3"
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,15,15,0.98),rgba(8,8,8,0.96))] shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                <div className={`absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b ${accent.glow}`} />
                <div className="absolute inset-0">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    sizes="176px"
                    className="object-cover opacity-25 blur-md transition-transform duration-500 group-hover:scale-[1.04] group-hover:opacity-35"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/38 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <span className="rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-foreground/72">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`h-1.5 w-12 rounded-full ${accent.line}`} />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-foreground/50">
                    Featured title
                  </p>
                  <h3 className="mt-2 line-clamp-3 text-xl font-black leading-6 text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-foreground/64">{item.subtitle}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-foreground/46">
                  Browse details
                </p>
                <span className="text-sm text-primary transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
