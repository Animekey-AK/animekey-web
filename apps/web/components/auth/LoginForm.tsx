"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/constants/routes";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? routes.home;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    });
  }

  async function handleOAuth(provider: "google" | "facebook") {
    await signIn(provider, { callbackUrl });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">
          Email or phone
        </label>
        <input
          type="text"
          placeholder="Enter Email or Phone Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="relative flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-[2.45rem] text-muted-foreground hover:text-foreground"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      <div className="text-right">
        <Link
          href={routes.forgotPassword}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-full bg-primary py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_20px_50px_rgba(113,199,4,0.24)] transition-all hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? "Signing in…" : "Login"}
      </button>

      <div className="relative my-2 flex items-center gap-3">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          or continue with
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        onClick={() => handleOAuth("google")}
        className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 text-sm font-medium transition-colors hover:bg-white/[0.06]"
      >
        <Image src="/images/google-icon.svg" alt="" width={20} height={20} />
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => handleOAuth("facebook")}
        className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] py-3.5 text-sm font-medium transition-colors hover:bg-white/[0.06]"
      >
        <Image src="/images/facebook-icon.svg" alt="" width={20} height={20} />
        Continue with Facebook
      </button>
    </form>
  );
}
