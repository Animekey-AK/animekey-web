import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import {
  AuthInlineLink,
  AuthShowcaseShell,
} from "@/components/auth/AuthShowcaseShell";
import { routes } from "@/constants/routes";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <AuthShowcaseShell
      title="Create an account that feels like your own anime hub."
      description="Build your profile stack, save favorites, and unlock the cleanest way to browse what to watch next."
      artworkSrc="/images/signup/signupLeft.svg"
      artworkAlt="AnimeKey signup screen artwork"
      artworkPosition="left"
      eyebrow="Join AnimeKey"
      highlights={[
        { label: "Profiles", value: "Up to five per household" },
        { label: "Premium", value: "Unlock more titles when ready" },
        { label: "Flow", value: "Fast signup, watch in minutes" },
      ]}
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <AuthInlineLink href={routes.login}>Login here</AuthInlineLink>
        </p>
      }
    >
      <div className="mb-8 space-y-3">
        <h2 className="text-4xl font-black tracking-tight text-foreground">
          Welcome to AnimeKey
        </h2>
        <p className="max-w-lg text-sm leading-7 text-foreground/68">
          Create your account to start streaming with personalized profiles and
          cleaner discovery.
        </p>
      </div>
        <RegisterForm />
    </AuthShowcaseShell>
  );
}
