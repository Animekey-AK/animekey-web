import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        Watch Anime, Movies & Series
      </h1>
      <p className="max-w-md text-muted-foreground">
        Thousands of titles, ad-free, in HD — on any device.
      </p>
    </section>
  );
}
