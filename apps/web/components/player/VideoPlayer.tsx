"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface Props {
  src: string;
  poster?: string;
  title?: string;
  language?: "sub" | "dub";
  initialTime?: number;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function VideoPlayer({ src, poster, title, language, initialTime, onEnded, onTimeUpdate: onTimeUpdate2 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Init HLS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hlsInstance: import("hls.js").default | null = null;

    async function initHls() {
      const Hls = (await import("hls.js")).default;

      if (Hls.isSupported()) {
        hlsInstance = new Hls({ enableWorker: true });
        hlsInstance.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) setError("Stream unavailable. Please try again.");
        });
        hlsInstance.loadSource(src);
        hlsInstance.attachMedia(video!);
      } else if (video!.canPlayType("application/vnd.apple.mpegurl")) {
        // Native HLS (Safari / iOS)
        video!.src = src;
      } else {
        // Fallback: assume direct MP4
        video!.src = src;
      }
    }

    initHls().catch(console.error);

    return () => {
      hlsInstance?.destroy();
    };
  }, [src]);

  // Video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        setBuffered(video.buffered.end(video.buffered.length - 1));
      }
      onTimeUpdate2?.(video.currentTime);
    };
    const onLoadedMetadata = () => {
      if (initialTime && initialTime > 0) {
        video.currentTime = initialTime;
      }
    };
    const onDurationChange = () => setDuration(video.duration);
    const onWaiting = () => setLoading(true);
    const onCanPlay = () => setLoading(false);
    const onEnded2 = () => {
      setPlaying(false);
      onEnded?.();
    };
    const onVolumeChange = () => {
      setVolume(video.volume);
      setMuted(video.muted);
    };
    const onFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    const onVideoError = () => setError("Playback error. Please try again.");

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("durationchange", onDurationChange);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("ended", onEnded2);
    video.addEventListener("volumechange", onVolumeChange);
    video.addEventListener("error", onVideoError);
    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("durationchange", onDurationChange);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("ended", onEnded2);
      video.removeEventListener("volumechange", onVolumeChange);
      video.removeEventListener("error", onVideoError);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [onEnded, initialTime, onTimeUpdate2]);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const video = videoRef.current;
      if (!video) return;
      // Don't intercept if focus is on an input
      if (document.activeElement?.tagName === "INPUT") return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          video.paused ? video.play() : video.pause();
          break;
        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(video.currentTime + 10, video.duration);
          break;
        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - 10, 0);
          break;
        case "ArrowUp":
          e.preventDefault();
          video.volume = Math.min(video.volume + 0.1, 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          video.volume = Math.max(video.volume - 0.1, 0);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "m":
        case "M":
          e.preventDefault();
          video.muted = !video.muted;
          break;
        case "?":
          e.preventDefault();
          setShowShortcuts((v) => !v);
          break;
        case "Escape":
          setShowShortcuts(false);
          break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleFullscreen]);

  const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
    window.location.reload();
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.paused ? video.play() : video.pause();
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const t = parseFloat(e.target.value);
    video.currentTime = t;
    setCurrentTime(t);
  }, []);

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const v = parseFloat(e.target.value);
    video.volume = v;
    video.muted = v === 0;
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  }, []);

  // Auto-hide controls
  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3000);
  }, [playing]);

  useEffect(() => {
    if (!playing) setShowControls(true);
  }, [playing]);

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-2xl bg-black",
        !showControls && playing && "cursor-none",
      )}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={togglePlay}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        poster={poster}
        aria-label={title}
        playsInline
        className="h-full w-full object-contain"
        preload="metadata"
      />

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/90">
          <svg className="h-12 w-12 text-white/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
          <p className="text-[14px] text-white/60">{error}</p>
          <button
            type="button"
            onClick={handleRetry}
            className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-bold text-primary-foreground transition-all hover:-translate-y-px"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading spinner */}
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-primary" />
        </div>
      )}

      {/* Big play button overlay (when paused) */}
      {!playing && !loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm ring-2 ring-white/20 transition-transform hover:scale-105">
            <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Controls overlay */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-4 pb-4 pt-20 transition-opacity duration-200",
          showControls ? "opacity-100" : "opacity-0",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Seek bar */}
        <div className="relative mb-3 h-1 w-full">
          {/* Buffered */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-white/25"
            style={{ width: `${bufferedPct}%` }}
          />
          {/* Progress */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-primary"
            style={{ width: `${progressPct}%` }}
          />
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.5}
            value={currentTime}
            onChange={handleSeek}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0 hover:opacity-100"
            aria-label="Seek"
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3">
          {/* Play/pause */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            {playing ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Volume */}
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              {muted || volume === 0 ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={handleVolume}
              aria-label="Volume"
              className="w-20 accent-primary"
            />
          </div>

          {/* Time */}
          <span className="flex-1 text-[12px] tabular-nums text-white/70">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Language badge */}
          {language && (
            <span className="hidden rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white/70 sm:inline">
              {language}
            </span>
          )}

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
          >
            {fullscreen ? (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Keyboard shortcut overlay */}
      {showShortcuts && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="rounded-2xl border border-white/10 bg-[rgba(10,10,10,0.96)] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-8">
              <h3 className="text-[14px] font-bold text-foreground">Keyboard shortcuts</h3>
              <button
                type="button"
                onClick={() => setShowShortcuts(false)}
                className="text-[14px] text-white/40 transition-colors hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {(
                [
                  ["Space / K", "Play / Pause"],
                  ["← / →", "Seek ±10 seconds"],
                  ["↑ / ↓", "Volume ±10%"],
                  ["M", "Mute / Unmute"],
                  ["F", "Fullscreen"],
                  ["?", "Show shortcuts"],
                ] as [string, string][]
              ).map(([key, desc]) => (
                <div key={key} className="flex items-center gap-3">
                  <kbd className="min-w-[52px] rounded border border-white/20 bg-white/[0.06] px-2 py-1 text-center text-[11px] font-mono text-white/70">
                    {key}
                  </kbd>
                  <span className="text-[12px] text-foreground/60">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
