import { homeSections } from "./homepage.data";
import { SectionRenderer } from "./SectionRenderer";

export function HomePage() {
  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-8 px-4 py-6 md:px-8 md:py-8">
      <SectionRenderer sections={homeSections} />
    </section>
  );
}
