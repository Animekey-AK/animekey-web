import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ProfilePicker } from "@/components/auth/ProfilePicker";
import { routes } from "@/constants/routes";
import type { Profile } from "@/types/profile";

export const metadata: Metadata = { title: "Who's watching?" };

const MAX_PROFILES = 5;

async function getProfiles(accessToken: string): Promise<Profile[]> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/profiles`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-api-key": process.env.API_KEY ?? "",
      },
      next: { revalidate: 0 }, // always fresh on profile selection
    });

    if (!res.ok) return [];
    return (await res.json()) as Profile[];
  } catch {
    return [];
  }
}

export default async function SelectProfilePage() {
  const session = await auth();

  if (!session?.user.accessToken) {
    redirect(routes.login);
  }

  const profiles = await getProfiles(session.user.accessToken);

  // Single profile — skip the picker and select it automatically
  if (profiles.length === 1 && !profiles[0].pinEnabled) {
    redirect(`${routes.home}`);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(113,199,4,0.16),_transparent_30%),linear-gradient(180deg,_#050505_0%,_#090909_100%)] px-6 py-12">
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/profile/profiles.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl rounded-[2rem] border border-white/10 bg-card/[0.86] px-6 py-10 shadow-[0_36px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-8 md:px-10">
        <div className="mb-10">
        <Link href={routes.home}>
          <Image
            src="/images/logo.svg"
            alt="AnimeKey"
            width={140}
            height={40}
            priority
            className="h-auto w-36"
          />
        </Link>
        </div>

        <div className="mb-10 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Profiles
          </p>
          <h1 className="text-4xl font-black tracking-tight text-foreground">
            Who&apos;s watching?
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-foreground/68">
            Pick a profile to continue where you left off, or manage the
            household setup before you jump back into the catalog.
          </p>
        </div>

        <div className="w-full">
          <ProfilePicker
            profiles={profiles}
            canAddMore={profiles.length < MAX_PROFILES}
          />
        </div>
      </div>
    </div>
  );
}
