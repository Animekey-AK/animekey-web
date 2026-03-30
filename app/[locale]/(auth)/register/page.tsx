import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { routes } from "@/constants/routes";

export const metadata: Metadata = { title: "Create Account" };

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* ── Left panel: illustration ───────────────────────────────────── */}
      <div className="relative hidden md:block md:w-1/2">
        <Image
          src="/images/signup/signupLeft.svg"
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

        <h1 className="mb-2 text-3xl font-bold">Welcome to AnimeKey</h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Create your account to start streaming.
        </p>

        <RegisterForm />

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href={routes.login} className="font-semibold text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
