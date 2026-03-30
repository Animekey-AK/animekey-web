import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import {
  AuthInlineLink,
  AuthShowcaseShell,
} from "@/components/auth/AuthShowcaseShell";
import { routes } from "@/constants/routes";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <AuthShowcaseShell
      title="Welcome back to your anime night."
      description="Pick up where you left off, jump into fresh releases, and move between profiles without friction."
      artworkSrc="/images/login/login-right.svg"
      artworkAlt="AnimeKey login collage"
      artworkPosition="right"
      eyebrow="Sign in"
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <AuthInlineLink href={routes.register}>
            Create a new account
          </AuthInlineLink>
        </p>
      }
    >
      <div className="mb-8 space-y-3">
        <h2 className="text-4xl font-black tracking-tight text-foreground">
          Welcome Back
        </h2>
        <p className="max-w-lg text-sm leading-7 text-foreground/68">
          Sign in to continue your watchlist, profile picks, and premium access.
        </p>
      </div>
        <LoginForm />
    </AuthShowcaseShell>
  );
}
