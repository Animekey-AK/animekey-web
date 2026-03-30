"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { routes } from "@/constants/routes";

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!res.ok) {
          const data = (await res.json()) as { message?: string };
          setError(data.message ?? "Something went wrong. Please try again.");
          return;
        }

        setSent(true);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring";

  if (sent) {
      return (
      <div className="rounded-[1.75rem] border border-primary/20 bg-primary/10 px-5 py-6 text-center text-sm text-primary">
        <p className="font-semibold">Check your email</p>
        <p className="mt-1 text-muted-foreground">
          If <span className="text-foreground">{email}</span> is registered, a reset link is on its way.
        </p>
        <Link href={routes.login} className="mt-4 inline-block font-semibold text-primary hover:underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <input
        type="email"
        placeholder="Enter your email address"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-full bg-primary py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_20px_50px_rgba(113,199,4,0.24)] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Sending…" : "Send Reset Link"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href={routes.login} className="font-semibold text-primary hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
}
