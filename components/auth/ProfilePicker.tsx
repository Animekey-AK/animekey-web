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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {profiles.map((profile) => {
          const isLoading = isPending && selecting === profile.id;
          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => handleSelect(profile)}
              disabled={isPending}
              className="group flex flex-col items-center gap-3 rounded-xl p-4 transition-colors hover:bg-accent disabled:pointer-events-none"
            >
              {/* Avatar */}
              <div className="relative h-20 w-20 overflow-hidden rounded-xl border-2 border-transparent ring-2 ring-transparent transition-all group-hover:border-primary group-hover:ring-primary/30">
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

                {/* Kids badge */}
                {profile.isKids && (
                  <span className="absolute bottom-0 left-0 right-0 bg-primary/90 py-0.5 text-center text-[10px] font-bold uppercase text-primary-foreground">
                    Kids
                  </span>
                )}

                {/* PIN lock icon */}
                {profile.pinEnabled && (
                  <div className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5">
                    <Image src="/images/profile/lockIcon.svg" alt="PIN locked" width={12} height={12} />
                  </div>
                )}

                {/* Loading spinner overlay */}
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

        {/* Add profile tile */}
        {canAddMore && (
          <Link
            href="/account/profiles/new"
            className="group flex flex-col items-center gap-3 rounded-xl p-4 transition-colors hover:bg-accent"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-border transition-colors group-hover:border-primary">
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

      {/* Manage profiles */}
      <div className="mt-8 text-center">
        <Link
          href="/account/profiles"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
        >
          Manage profiles
        </Link>
      </div>

      {/* PIN modal */}
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
