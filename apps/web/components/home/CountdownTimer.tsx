"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculate(target: string): TimeLeft | null {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface Props {
  targetDate: string;
  /** Renders as compact inline HH:MM:SS string instead of stacked units */
  compact?: boolean;
}

export function CountdownTimer({ targetDate, compact = false }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Intentional: initialise on client only to prevent SSR/hydration mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeLeft(calculate(targetDate));
    const id = setInterval(() => setTimeLeft(calculate(targetDate)), 1_000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!timeLeft) return null;

  if (compact) {
    const hh = pad(timeLeft.days * 24 + timeLeft.hours);
    const mm = pad(timeLeft.minutes);
    const ss = pad(timeLeft.seconds);
    return (
      <span className="font-bold tabular-nums text-white/80">
        {hh}:{mm}:{ss}
      </span>
    );
  }

  const units = [
    { label: "Days",  value: timeLeft.days },
    { label: "Hrs",   value: timeLeft.hours },
    { label: "Min",   value: timeLeft.minutes },
    { label: "Sec",   value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-end gap-1.5">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-end gap-1.5">
          <div className="flex flex-col items-center">
            <span className="tabular-nums text-[22px] font-black leading-none tracking-tight text-white sm:text-[26px]">
              {pad(value)}
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/40">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="mb-5 text-[18px] font-black leading-none text-white/30">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
