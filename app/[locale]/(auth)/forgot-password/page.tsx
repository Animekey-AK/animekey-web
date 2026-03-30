import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { routes } from "@/constants/routes";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen">
      {/* ── Left panel: illustration ───────────────────────────────────── */}
      <div className="relative hidden md:block md:w-1/2">
        <Image
          src="/images/onboarding/forgot-reset-passoword.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-transparent to-transparent" />
      </div>

      {/* ── Right panel: form ──────────────────────────────────────────── */}
      <div className="flex w-full flex-col justify-center px-6 py-12 md:w-1/2 lg:px-16 xl:px-24">
        <div className="mb-8">
          <Link href={routes.home}>
            <Image src="/images/logo.svg" alt="AnimeKey" width={140} height={40} priority />
          </Link>
        </div>

        <h1 className="mb-2 text-3xl font-bold">Forgot your password?</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>

        <ForgotPasswordForm />
      </div>
    </div>
  );
}
