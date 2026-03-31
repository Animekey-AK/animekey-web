"use server";

import { auth, unstable_update } from "@/lib/auth";
import { redirect } from "next/navigation";
import { routes } from "@/constants/routes";

export async function selectProfile(profileId: string, pin?: string): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user.accessToken) {
    redirect(routes.login);
  }

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/profiles/${profileId}/select`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.accessToken}`,
        "x-api-key": process.env.API_KEY ?? "",
      },
      body: pin ? JSON.stringify({ pin }) : undefined,
    });

    if (res.status === 401 && pin !== undefined) {
      return { error: "Incorrect PIN. Please try again." };
    }

    if (!res.ok) {
      return { error: "Failed to select profile. Please try again." };
    }
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  // Persist profileId into the JWT so session.user.profileId is available everywhere
  await unstable_update({ user: { profileId } });

  redirect(routes.home);
}
