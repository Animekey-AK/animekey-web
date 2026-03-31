import { AnimatedSection } from "./AnimatedSection";
import { AppDownloadBand } from "./AppDownloadBand";
import { ContentRail } from "./ContentRail";
import { FooterCta } from "./FooterCta";
import { FrictionKiller } from "./FrictionKiller";
import { GenreChips } from "./GenreChips";
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
            return (
              <HeroSpotlight key={`hero-${index}`} hero={section.data} />
            );

          case "proofStrip":
            return <ProofStrip key={`proof-${index}`} section={section.data} />;

          case "frictionKiller":
            return (
              <AnimatedSection key={`friction-${index}`} delay={0}>
                <FrictionKiller section={section.data} />
              </AnimatedSection>
            );

          case "genreChips":
            return (
              <AnimatedSection key={`genre-${index}`} delay={0.05}>
                <GenreChips section={section.data} />
              </AnimatedSection>
            );

          case "rails":
            return section.data.map((rail, ri) => (
              <AnimatedSection key={rail.id} delay={ri * 0.08}>
                <ContentRail rail={rail} />
              </AnimatedSection>
            ));

          case "promoBanner":
            return (
              <AnimatedSection key={`promo-${index}`} delay={0}>
                <PromoBanner promo={section.data} />
              </AnimatedSection>
            );

          case "topRanked":
            return (
              <AnimatedSection key={`ranked-${index}`} delay={0}>
                <TopRankedShowcase section={section.data} />
              </AnimatedSection>
            );

          case "appDownload":
            return (
              <AnimatedSection key={`download-${index}`} delay={0}>
                <AppDownloadBand section={section.data} />
              </AnimatedSection>
            );

          case "footerCta":
            return (
              <AnimatedSection key={`footer-cta-${index}`} delay={0}>
                <FooterCta section={section.data} />
              </AnimatedSection>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
