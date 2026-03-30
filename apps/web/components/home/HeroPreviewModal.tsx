"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import type { HeroSlide } from "./types";

interface HeroPreviewModalProps {
  slide: HeroSlide | null;
  onClose: () => void;
}

export function HeroPreviewModal({ slide, onClose }: HeroPreviewModalProps) {
  useEffect(() => {
    if (!slide) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [slide, onClose]);

  if (!slide) return null;

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-black/88 backdrop-blur-[16px]"
      onClick={onClose}
    >
      <div
        className="relative mx-4 w-full max-w-[660px] rounded-[28px] border border-white/8 bg-[linear-gradient(145deg,#0e0e0e,#080808)] p-10 shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[16px] text-white/50 transition-colors hover:bg-white/30 hover:text-white"
          aria-label="Close"
        >
          ×
        </button>

        {/* Content row */}
        <div className="flex gap-5">
          {/* Show artwork */}
          <div className="relative h-[140px] w-[100px] flex-shrink-0 overflow-hidden rounded-[14px] border border-white/8 bg-white/5">
            <Image
              src={slide.posterImage}
              alt={slide.showName}
              fill
              className="object-cover"
              sizes="100px"
            />
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-[10px] border border-primary/25 bg-primary/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-primary">
              🔴 New episode
            </div>

            <h2 className="mb-1.5 text-[28px] font-black tracking-[-0.02em]">
              {slide.showName}
            </h2>

            <div className="mb-2.5 flex items-center gap-2 text-[12px] text-white/50">
              <span>{slide.modalMeta}</span>
              <span className="font-extrabold text-primary">
                {slide.pills[0]?.label}
              </span>
              <span>Sub &amp; Dub</span>
            </div>

            <p className="mb-5 text-[13px] leading-[1.7] text-white/50">
              {slide.modalDescription}
            </p>

            <div className="flex flex-wrap gap-2.5">
              <Link
                href={slide.watchHref}
                prefetch={false}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-[14px] font-extrabold text-background shadow-[0_12px_32px_rgba(113,199,4,.35)] transition-transform hover:scale-[1.03]"
              >
                <span>▶</span> Watch Episode 1 Free
              </Link>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/10 px-5 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/20"
              >
                🎬 Watch trailer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
