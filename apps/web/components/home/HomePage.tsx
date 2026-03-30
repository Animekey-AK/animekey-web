import { homepageData, homeSections } from "./homepage.data";
import { HeroSpotlight } from "./HeroSpotlight";
import { SectionRenderer } from "./SectionRenderer";

export function HomePage() {
  return (
    <>
      {/* Hero: full-width, breaks out of the pt-16 added by the main layout */}
      <div className="-mt-16">
        <HeroSpotlight hero={homepageData.hero} />
      </div>

      {/* Remaining sections: constrained container */}
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-10 px-4 py-8 md:px-8 md:py-10">
        <SectionRenderer sections={homeSections.filter((s) => s.type !== "hero")} />
      </div>
    </>
  );
}
