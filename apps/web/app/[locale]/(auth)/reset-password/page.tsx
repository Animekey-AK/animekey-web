import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { AuthShowcaseShell } from "@/components/auth/AuthShowcaseShell";

export const metadata: Metadata = { title: "Reset Password" };

export default function ResetPasswordPage() {
  return (
    <AuthShowcaseShell
      title="Set a stronger password and get right back in."
      description="Keep your account safe, your profiles intact, and your next watch session one click away."
      artworkSrc="/images/onboarding/forgot-reset-passoword.png"
      artworkAlt="AnimeKey reset password artwork"
      artworkPosition="left"
      eyebrow="Reset access"
    >
      <div className="mb-8 space-y-3">
        <h2 className="text-4xl font-black tracking-tight text-foreground">
          Set a new password
        </h2>
        <p className="max-w-lg text-sm leading-7 text-foreground/68">
          Choose a strong password with at least 8 characters.
        </p>
      </div>

        <Suspense>
          <ResetPasswordForm />
        </Suspense>
    </AuthShowcaseShell>
  );
}
