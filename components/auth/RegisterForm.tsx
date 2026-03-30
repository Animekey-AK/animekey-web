"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { routes } from "@/constants/routes";

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: { day: string; month: string; year: string };
  acceptedTerms: boolean;
}

export function RegisterForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [fields, setFields] = useState<RegisterPayload>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: { day: "", month: "", year: "" },
    acceptedTerms: false,
  });

  function update<K extends keyof RegisterPayload>(key: K, value: RegisterPayload[K]) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (fields.password !== fields.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!fields.acceptedTerms) {
      setError("Please accept the terms & conditions.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fields),
        });

        if (!res.ok) {
          const data = (await res.json()) as { message?: string };
          setError(data.message ?? "Registration failed. Please try again.");
          return;
        }

        // Auto sign-in after registration
        const result = await signIn("credentials", {
          email: fields.email,
          password: fields.password,
          redirect: false,
        });

        if (result?.error) {
          router.push(routes.login);
          return;
        }

        router.push(routes.home);
        router.refresh();
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  }

  const EyeIcon = ({ open }: { open: boolean }) => open ? (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  const inputClass =
    "w-full rounded-md border border-input bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text" placeholder="First Name" required autoComplete="given-name"
          value={fields.firstName} onChange={(e) => update("firstName", e.target.value)}
          className={inputClass}
        />
        <input
          type="text" placeholder="Last Name" required autoComplete="family-name"
          value={fields.lastName} onChange={(e) => update("lastName", e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <input
        type="text" placeholder="Enter Email or Phone Number" required autoComplete="email"
        value={fields.email} onChange={(e) => update("email", e.target.value)}
        className={inputClass}
      />

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"} placeholder="Password" required
          autoComplete="new-password" minLength={8}
          value={fields.password} onChange={(e) => update("password", e.target.value)}
          className={`${inputClass} pr-12`}
        />
        <button type="button" onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          aria-label="Toggle password visibility">
          <EyeIcon open={showPassword} />
        </button>
      </div>

      {/* Confirm password */}
      <input
        type="password" placeholder="Confirm Password" required autoComplete="new-password"
        value={fields.confirmPassword}
        onChange={(e) => update("confirmPassword", e.target.value)}
        className={inputClass}
      />

      {/* Date of birth */}
      <div className="grid grid-cols-3 gap-3">
        <input type="text" placeholder="DD" maxLength={2}
          value={fields.dateOfBirth.day}
          onChange={(e) => update("dateOfBirth", { ...fields.dateOfBirth, day: e.target.value })}
          className={inputClass} />
        <input type="text" placeholder="MM" maxLength={2}
          value={fields.dateOfBirth.month}
          onChange={(e) => update("dateOfBirth", { ...fields.dateOfBirth, month: e.target.value })}
          className={inputClass} />
        <input type="text" placeholder="YYYY" maxLength={4}
          value={fields.dateOfBirth.year}
          onChange={(e) => update("dateOfBirth", { ...fields.dateOfBirth, year: e.target.value })}
          className={inputClass} />
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" required
          checked={fields.acceptedTerms}
          onChange={(e) => update("acceptedTerms", e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-primary"
        />
        <span className="text-muted-foreground">
          I&apos;ve read and accept{" "}
          <Link href="/terms" className="text-primary hover:underline">
            terms &amp; conditions
          </Link>
        </span>
      </label>

      {/* Submit */}
      <button type="submit" disabled={isPending}
        className="mt-2 rounded-md bg-primary py-3 text-sm font-bold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50">
        {isPending ? "Creating account…" : "Create Account"}
      </button>

      {/* Divider */}
      <div className="relative my-1 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* OAuth */}
      <button type="button" onClick={() => signIn("google", { callbackUrl: routes.home })}
        className="flex items-center justify-center gap-3 rounded-md border border-input bg-transparent py-3 text-sm font-medium transition-colors hover:bg-accent">
        <Image src="/images/google-icon.svg" alt="" width={20} height={20} />
        Continue with Google
      </button>

      <button type="button" onClick={() => signIn("facebook", { callbackUrl: routes.home })}
        className="flex items-center justify-center gap-3 rounded-md border border-input bg-transparent py-3 text-sm font-medium transition-colors hover:bg-accent">
        <Image src="/images/facebook-icon.svg" alt="" width={20} height={20} />
        Continue with Facebook
      </button>
    </form>
  );
}
