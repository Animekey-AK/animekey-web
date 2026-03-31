import type { ProofStripData } from "./types";

export function ProofStrip({ section }: { section: ProofStripData }) {
  if (section.status === "error" || section.status === "empty") {
    return null;
  }

  return (
    <div className="overflow-x-auto border-y border-[rgba(113,199,4,0.1)] bg-[linear-gradient(90deg,rgba(113,199,4,0.06)_0%,rgba(113,199,4,0.02)_50%,rgba(113,199,4,0.06)_100%)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max items-center justify-center px-12 py-[14px]">
        {section.items.map((item, i) => (
          <div key={i} className="flex items-center">
            <div className="flex items-center gap-2 px-8 text-[13px] text-white/70">
              <span className="text-[15px]">{item.emoji}</span>
              <span>{item.stat}</span>
            </div>
            {i < section.items.length - 1 && (
              <div className="h-[14px] w-px bg-white/8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
