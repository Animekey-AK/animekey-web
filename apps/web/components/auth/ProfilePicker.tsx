"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { selectProfile } from "@/actions/selectProfile";
import { ProfilePinModal } from "./ProfilePinModal";
import type { Profile } from "@/types/profile";

interface ProfilePickerProps {
  profiles: Profile[];
  canAddMore: boolean;
}

export function ProfilePicker({ profiles, canAddMore }: ProfilePickerProps) {
  const [pendingPin, setPendingPin] = useState<Profile | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selecting, setSelecting] = useState<string | null>(null);

  function handleSelect(profile: Profile) {
    if (profile.pinEnabled) {
      setPendingPin(profile);
      return;
    }

    setSelecting(profile.id);
    startTransition(async () => {
      await selectProfile(profile.id);
    });
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {profiles.map((profile) => {
          const isLoading = isPending && selecting === profile.id;
          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => handleSelect(profile)}
              disabled={isPending}
              className="group flex flex-col items-center gap-4 rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-4 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.04] disabled:pointer-events-none"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-[1.3rem] border border-white/10 transition-all group-hover:border-primary/60 group-hover:shadow-[0_16px_40px_rgba(113,199,4,0.16)]">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Image
                      src="/images/profile/userProfile.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {profile.isKids && (
                  <span className="absolute bottom-0 left-0 right-0 bg-primary/90 py-0.5 text-center text-[10px] font-bold uppercase text-primary-foreground">
                    Kids
                  </span>
                )}

                {profile.pinEnabled && (
                  <div className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5">
                    <Image src="/images/profile/lockIcon.svg" alt="PIN locked" width={12} height={12} />
                  </div>
                )}

                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                )}
              </div>

              <span className="text-sm font-medium text-foreground group-hover:text-primary">
                {profile.name}
              </span>
            </button>
          );
        })}

        {canAddMore && (
          <Link
            href="/account/profiles/new"
            className="group flex flex-col items-center gap-4 rounded-[1.5rem] border border-dashed border-white/12 bg-white/[0.02] p-4 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[0.04]"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-[1.3rem] border border-dashed border-white/12 transition-colors group-hover:border-primary/60">
              <svg className="h-8 w-8 text-muted-foreground group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary">
              Add Profile
            </span>
          </Link>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/account/profiles"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          Manage profiles
        </Link>
      </div>

      {pendingPin && (
        <ProfilePinModal
          profileId={pendingPin.id}
          profileName={pendingPin.name}
          onClose={() => setPendingPin(null)}
        />
      )}
    </>
  );
}
