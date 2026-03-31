import { homepageData, homeSections } from "./homepage.data";
import { HeroSpotlight } from "./HeroSpotlight";
import { ProofStrip } from "./ProofStrip";
import { SectionRenderer } from "./SectionRenderer";

export function HomePage() {
  const belowFold = homeSections.filter(
    (s) => s.type !== "hero" && s.type !== "proofStrip",
  );
  const proofSection = homepageData.proofStrip;

  return (
    <>
      {/* Hero: full-width, bleeds behind fixed header */}
      <div className="-mt-16">
        <HeroSpotlight hero={homepageData.hero} />
      </div>

      {/* ProofStrip: full-bleed stat band directly below hero */}
      <ProofStrip section={proofSection} />

      {/* Remaining sections: constrained container */}
      <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-12 px-4 py-10 md:px-8 md:py-12">
        <SectionRenderer sections={belowFold} />
      </div>
    </>
  );
}
