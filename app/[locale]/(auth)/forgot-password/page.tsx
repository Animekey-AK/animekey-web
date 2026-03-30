import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { AuthShowcaseShell } from "@/components/auth/AuthShowcaseShell";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShowcaseShell
      title="Recover access without losing your rhythm."
      description="We’ll send a reset link so you can get back to your queue, recommendations, and saved profiles."
      artworkSrc="/images/onboarding/forgot-reset-passoword.png"
      artworkAlt="AnimeKey password recovery artwork"
      artworkPosition="left"
      eyebrow="Account recovery"
    >
      <div className="mb-8 space-y-3">
        <h2 className="text-4xl font-black tracking-tight text-foreground">
          Forgot your password?
        </h2>
        <p className="max-w-lg text-sm leading-7 text-foreground/68">
          Enter your email and we&apos;ll send you a secure reset link.
        </p>
      </div>
        <ForgotPasswordForm />
    </AuthShowcaseShell>
  );
}
