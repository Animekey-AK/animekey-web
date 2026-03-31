"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { HeroCinematicData } from "./types";

// ── Slide gradient backgrounds ────────────────────────────────────────────────

const slideBackgrounds: Record<
  "lime" | "purple" | "pink" | "amber",
  React.CSSProperties
> = {
  lime: {
    background:
      "radial-gradient(ellipse at 70% 40%, rgba(113,199,4,.18) 0%, transparent 55%), linear-gradient(135deg, #020901 0%, #061200 40%, #091a02 70%, #030801 100%)",
  },
  purple: {
    background:
      "radial-gradient(ellipse at 70% 40%, rgba(139,92,246,.18) 0%, transparent 55%), linear-gradient(135deg, #040008 0%, #0b0013 40%, #160022 70%, #050009 100%)",
  },
  pink: {
    background:
      "radial-gradient(ellipse at 70% 40%, rgba(192,38,211,.16) 0%, transparent 55%), linear-gradient(135deg, #060009 0%, #0e000e 40%, #1c001e 70%, #07000a 100%)",
  },
  amber: {
    background:
      "radial-gradient(ellipse at 70% 40%, rgba(251,191,36,.14) 0%, transparent 55%), linear-gradient(135deg, #07050a 0%, #120d18 40%, #1c1628 70%, #090710 100%)",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatCountdown(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sc = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sc).padStart(2, "0")}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function HeroSpotlight({ hero }: { hero: HeroCinematicData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [urgencyVisible, setUrgencyVisible] = useState(false);
  const [countdown, setCountdown] = useState(2 * 3600 + 47 * 60 + 33);
  const [liveCount, setLiveCount] = useState(
    hero.slides[0]?.liveViewerCount ?? 1247,
  );
  const [watchCount, setWatchCount] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const curRef = useRef(0);

  const disabled = hero.status === "error" || hero.slides.length === 0;

  // ── goSlide ────────────────────────────────────────────────────────────────

  function goSlide(idx: number) {
    if (busy) return;
    setBusy(true);
    setContentVisible(false);
    setTimeout(() => {
      curRef.current = idx;
      setActiveIndex(idx);
      setLiveCount(hero.slides[idx]?.liveViewerCount ?? 1247);
      setWatchCount(0);
      setTimeout(() => {
        setContentVisible(true);
        setBusy(false);
      }, 60);
    }, 420);
  }

  function startTimer() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = (curRef.current + 1) % hero.slides.length;
      goSlide(next);
    }, 6500);
  }

  // ── Entrance animation ─────────────────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setContentVisible(true), 200);
    const t2 = setTimeout(() => setUrgencyVisible(true), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // ── Auto-rotation ──────────────────────────────────────────────────────────
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Countdown ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(
      () => setCountdown((t) => (t > 0 ? t - 1 : 0)),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  // ── Live count drift ───────────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setLiveCount((n) => {
        const next = n + Math.floor(Math.random() * 7) - 3;
        return Math.max(1200, Math.min(1320, next));
      });
    }, 3600);
    return () => clearInterval(id);
  }, []);

  // ── Watch count animation ──────────────────────────────────────────────────
  useEffect(() => {
    const target = hero.slides[activeIndex]?.liveViewerCount ?? 0;
    if (target === 0) return;
    const step = target / 80;
    let count = 0;
    const id = setInterval(() => {
      count = Math.min(count + step, target);
      setWatchCount(Math.floor(count));
      if (count >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // ── Particle canvas ────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Capture narrowed non-null references so nested functions don't re-widen
    const cv: HTMLCanvasElement = canvas;
    const cx: CanvasRenderingContext2D = ctx;

    type Particle = {
      x: number;
      y: number;
      dx: number;
      dy: number;
      r: number;
      a: number;
      da: number;
    };

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];

    function resize() {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
      particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.1 + 0.1,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.004,
        dx: (Math.random() - 0.5) * 0.12,
        dy: -Math.random() * 0.06,
      }));
    }

    function draw() {
      cx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        p.a += p.da;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.a < 0) p.da = Math.abs(p.da);
        if (p.a > 1) p.da = -Math.abs(p.da);
        cx.beginPath();
        cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(113, 199, 4, ${p.a * 0.5})`;
        cx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  if (disabled) return null;

  const slide = hero.slides[activeIndex];
  if (!slide) return null;

  return (
    <section
      className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-16 sm:justify-center sm:pb-20 lg:justify-end"
      style={slideBackgrounds[slide.colorVariant]}
    >
      {/* Slide transition overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-20 bg-background transition-opacity duration-[420ms]",
          busy ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      />

      {/* Full-bleed hero image */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <Image
          src={slide.posterImage}
          alt={slide.showName}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Gradient overlays */}
      {/* ov1: left-to-right directional fade — stronger to keep text legible over image */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,6,6,1) 0%, rgba(6,6,6,.97) 28%, rgba(6,6,6,.7) 55%, rgba(6,6,6,.15) 75%, transparent 88%)",
        }}
      />
      {/* ov2: bottom scrim */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(0deg, rgba(6,6,6,1) 0%, rgba(6,6,6,.65) 22%, transparent 50%)",
        }}
      />
      {/* ov3: top scrim (under header) */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-[2] h-36"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,6,6,.8) 0%, transparent 100%)",
        }}
      />

      {/* ── MAIN CONTENT (left) ── */}
      <div
        className={cn(
          "relative z-10 max-w-[640px] px-5 pb-20 sm:px-8 sm:pb-0 md:px-12",
          "transition-all duration-[550ms]",
          contentVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0",
        )}
      >
        {/* Featured badge */}
        <div className="mb-3 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:mb-5">
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
          <span className="flex-shrink-0">🎏 Now streaming</span>
          <span className="flex-shrink-0 text-white/40">•</span>
          <span className="min-w-0 truncate font-black tracking-[0.04em] text-white">
            {slide.showName}
          </span>
        </div>

        {/* Platform-first headline — fixed across all slides */}
        <h1 className="mb-2 font-black leading-[.95] tracking-[-0.04em] sm:mb-3.5" style={{ fontSize: "clamp(28px, 6.5vw, 68px)" }}>
          Your next anime
          <br className="hidden sm:inline" />
          {" "}obsession{" "}
          <span className="text-primary">starts now.</span>
        </h1>

        {/* Show-specific sub-headline */}
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-white/50 sm:mb-4 sm:text-[13px]">
          Watching:{" "}
          <span className="font-extrabold text-white/72">{slide.showName}</span>
          <span className="mx-2 text-white/30">•</span>
          {slide.showSub}
        </p>

        {/* Rating pills */}
        <div className="mb-3 flex flex-wrap items-center gap-1 sm:mb-5 sm:gap-1.5">
          {slide.pills.map((pill, i) => (
            <span
              key={i}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-semibold",
                pill.accent
                  ? "border-primary/28 bg-primary/8 font-bold text-primary"
                  : "border-white/8 bg-white/5 text-white/50",
              )}
            >
              {pill.label}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mb-4 max-w-[460px] text-[13px] leading-[1.8] text-white/50 sm:mb-6 sm:text-[14px]">
          {slide.description}
        </p>

        {/* CTAs */}
        <div className="mb-4">
          <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
            <Link
              href={slide.watchHref}
              prefetch={false}
              className="animate-cta-pulse inline-flex items-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-black text-background transition-transform hover:scale-[1.04] hover:-translate-y-0.5 sm:px-9 sm:py-[18px] sm:text-base"
            >
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black/25 text-[11px]">
                ▶
              </span>
              Watch Episode 1 Free
            </Link>
            <Link
              href={slide.watchHref}
              prefetch={false}
              className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/7 px-4 py-3 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:px-5 sm:py-3.5 sm:text-[14px]"
            >
              ▶ Watch trailer
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 sm:gap-4">
            <div className="flex items-center gap-1.5 text-[12px] text-white/50">
              <span className="h-1.5 w-1.5 flex-shrink-0 animate-pulse rounded-full bg-red-400" />
              <span>
                <strong className="font-bold text-white">
                  {watchCount.toLocaleString()}
                </strong>{" "}
                watching this week
              </span>
            </div>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-1.5 text-[12px] text-white/50">
              <span>⏱</span>
              <span>
                Free trial ends in{" "}
                <strong className="font-bold text-white">3 days</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Avatar stack */}
        <div className="hidden items-center gap-2.5 sm:flex">
          <div className="flex">
            {["👨‍💻", "👩", "🧑", "👨", "👩"].map((emoji, i) => (
              <div
                key={i}
                className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-white/10 text-[12px]"
                style={{ marginLeft: i === 0 ? 0 : "-6px" }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-white/50">
            Join{" "}
            <strong className="font-bold text-primary">50,000+ fans</strong>{" "}
            already watching
          </span>
        </div>
      </div>

      {/* ── URGENCY PANEL (bottom-right, desktop only) ── */}
      <div
        className={cn(
          "absolute bottom-20 right-12 z-10 hidden flex-col items-end gap-2 lg:flex",
          "transition-all delay-500 duration-[600ms]",
          urgencyVisible
            ? "translate-x-0 opacity-100"
            : "translate-x-4 opacity-0",
        )}
      >
        {/* Live viewers */}
        <div className="min-w-[176px] rounded-[14px] border border-white/8 bg-black/85 p-3 backdrop-blur-2xl">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
            🔥 Live viewers
          </p>
          <p className="text-[12px] font-bold text-primary">
            {liveCount.toLocaleString()} watching now
          </p>
        </div>
        {/* Countdown */}
        <div className="min-w-[176px] rounded-[14px] border border-white/8 bg-black/85 p-3 backdrop-blur-2xl">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
            ⏱ Trial offer
          </p>
          <p className="text-[12px] font-bold">
            Ends in{" "}
            <span className="text-red-400">{formatCountdown(countdown)}</span>
          </p>
          <div className="mt-1.5 h-0.5 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-[#b5e64a] transition-[width] duration-1000"
              style={{ width: `${(countdown / (3 * 3600)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── SLIDE DOTS (bottom-left) ── */}
      <div className="absolute bottom-6 left-5 z-10 flex items-center gap-1.5 sm:bottom-8 sm:left-8 lg:bottom-20 lg:left-12">
        {hero.slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              curRef.current = i;
              goSlide(i);
              startTimer();
            }}
            className={cn(
              "h-[2.5px] rounded-full transition-all duration-300",
              i === activeIndex ? "w-9 bg-primary" : "w-5 bg-white/18",
            )}
          />
        ))}
      </div>

    </section>
  );
}
