"use client";

import { useRef, useState, useTransition } from "react";
import { selectProfile } from "@/actions/selectProfile";

interface ProfilePinModalProps {
  profileId: string;
  profileName: string;
  onClose: () => void;
}

export function ProfilePinModal({ profileId, profileName, onClose }: ProfilePinModalProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([null, null, null, null]);

  function handleDigit(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;
    const next = [...pin];
    next[index] = value;
    setPin(next);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullPin = pin.join("");
    if (fullPin.length < 4) return;
    setError(null);

    startTransition(async () => {
      const result = await selectProfile(profileId, fullPin);
      if (result?.error) {
        setError(result.error);
        setPin(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-2xl">
        <h2 className="mb-1 text-center text-xl font-bold">{profileName}</h2>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          Enter the 4-digit PIN to continue
        </p>

        {error && (
          <p className="mb-4 rounded-md bg-destructive/10 px-4 py-2 text-center text-sm text-destructive">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
          <div className="flex gap-3">
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-14 w-14 rounded-md border border-input bg-input text-center text-2xl font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                autoFocus={i === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={pin.join("").length < 4 || isPending}
            className="w-full rounded-md bg-primary py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Verifying…" : "Continue"}
          </button>
        </form>

        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
