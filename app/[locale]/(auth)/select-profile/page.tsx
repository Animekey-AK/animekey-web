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
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="mb-10">
        <Link href={routes.home}>
          <Image src="/images/logo.svg" alt="AnimeKey" width={140} height={40} priority />
        </Link>
      </div>

      <h1 className="mb-2 text-3xl font-bold">Who&apos;s watching?</h1>
      <p className="mb-10 text-sm text-muted-foreground">Select a profile to continue</p>

      <div className="w-full max-w-2xl">
        <ProfilePicker
          profiles={profiles}
          canAddMore={profiles.length < MAX_PROFILES}
        />
      </div>
    </div>
  );
}
