import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { routes } from "@/constants/routes";

export const metadata: Metadata = { title: "Login" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* ── Left panel: form ───────────────────────────────────────────── */}
      <div className="flex w-full flex-col justify-center px-6 py-12 md:w-1/2 lg:px-16 xl:px-24">
        {/* Logo */}
        <div className="mb-10">
          <Link href={routes.home}>
            <Image
              src="/images/logo.svg"
              alt="AnimeKey"
              width={140}
              height={40}
              priority
            />
          </Link>
        </div>

        {/* Heading */}
        <h1 className="mb-8 text-3xl font-bold">Welcome Back</h1>

        {/* Form */}
        <LoginForm />

        {/* Footer links */}
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href={routes.register}
            className="font-semibold text-primary hover:underline"
          >
            Create a new account
          </Link>
        </p>
      </div>

      {/* ── Right panel: illustration (hidden on mobile) ───────────────── */}
      <div className="relative hidden md:block md:w-1/2">
        <Image
          src="/images/login/login-right.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay so the edge blends into the dark bg */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
      </div>
    </div>
  );
}
