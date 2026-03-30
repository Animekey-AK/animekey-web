"use client";

import { useEffect } from "react";

/**
 * Global error boundary — catches errors in the root layout itself.
 * Must include its own <html> and <body> tags.
 * https://nextjs.org/docs/app/api-reference/file-conventions/error#global-errorjs
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with Sentry.captureException in Sprint 7 (ANI-138)
    console.error("[global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#0f0f13] text-white">
        <div className="flex flex-col items-center gap-4 px-4 text-center">
          <h1 className="text-3xl font-bold">AnimeKey</h1>
          <p className="text-lg font-semibold">Something went wrong</p>
          <p className="max-w-sm text-sm text-neutral-400">
            {error.message ?? "A critical error occurred."}
          </p>
          <button
            onClick={reset}
            className="mt-2 rounded-md bg-red-600 px-5 py-2 text-sm font-semibold"
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
