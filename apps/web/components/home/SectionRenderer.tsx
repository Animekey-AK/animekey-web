import { AppDownloadBand } from "./AppDownloadBand";
import { ContentRail } from "./ContentRail";
import { HeroSpotlight } from "./HeroSpotlight";
import { PromoBanner } from "./PromoBanner";
import { ProofStrip } from "./ProofStrip";
import { TopRankedShowcase } from "./TopRankedShowcase";
import type { HomeSection } from "./types";

export function SectionRenderer({ sections }: { sections: HomeSection[] }) {
  return (
    <>
      {sections.map((section, index) => {
        switch (section.type) {
          case "hero":
            return <HeroSpotlight key={`hero-${index}`} hero={section.data} />;
          case "proofStrip":
            return <ProofStrip key={`proof-${index}`} section={section.data} />;
          case "rails":
            return section.data.map((rail) => (
              <ContentRail key={rail.id} rail={rail} />
            ));
          case "promoBanner":
            return <PromoBanner key={`promo-${index}`} promo={section.data} />;
          case "topRanked":
            return (
              <TopRankedShowcase key={`ranked-${index}`} section={section.data} />
            );
          case "appDownload":
            return (
              <AppDownloadBand key={`download-${index}`} section={section.data} />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
