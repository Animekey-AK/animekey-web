# AnimeKey Homepage Design

## Goal

Rebuild the AnimeKey homepage as a clean, reusable, Figma-aligned experience that helps first-time visitors browse the catalog quickly, builds trust in the product, and increases the likelihood of downstream subscription conversion.

## Product Intent

The homepage should feel premium without becoming a static marketing landing page. Its first job is to help visitors discover content. Its second job is to reinforce why AnimeKey is worth paying for. Conversion should come from catalog confidence, not from forcing subscription prompts too early.

## Design Direction

The selected direction is `Balanced Conversion Browse`.

This direction combines:

- a premium hero that creates immediate brand and content appeal
- early catalog proof so visitors can start browsing quickly
- lightweight subscription and value messaging woven into the page rather than dominating it

Compared with a hero-heavy cinematic landing page, this approach gets users into content faster. Compared with a browse-only grid, it preserves the polished visual identity already implied by the Figma work and the synced design tokens.

## Homepage Information Hierarchy

The homepage should render sections in this order:

1. `HomeHeader`
2. `HeroSpotlight`
3. `ProofStrip`
4. `ContentRail`
5. `PromoBanner`
6. `TopRankedShowcase`
7. Additional `ContentRail` sections
8. `AppDownloadBand`
9. `SiteFooter`

This order supports the intended funnel:

- the header establishes brand, navigation, and account entry points
- the hero makes the page feel premium and editorial
- the proof strip gives immediate reasons to trust the service
- the first rail appears early so browsing starts quickly
- the promo and ranked sections break visual repetition and reinforce value
- subsequent rails deepen catalog proof
- the app/download band and footer support soft conversion after exploration

## Section Definitions

### `HomeHeader`

Responsibilities:

- display the AnimeKey logo prominently
- provide primary browse navigation for `Home`, `Movies`, and `Series`
- keep account actions visible but secondary
- support locale visibility and a mobile-safe layout

Behavior:

- sticky positioning is acceptable if it stays visually lightweight
- navigation should prioritize browsing over sign-up pressure
- mobile and desktop layouts should share the same visual language

### `HeroSpotlight`

Responsibilities:

- present one featured anime or show with strong visual presence
- communicate title, category, rating/metadata, short synopsis, and key actions
- establish the premium tone of the homepage

Behavior:

- primary CTA should support browsing first, such as `Browse now` or `Explore title`
- secondary CTA can support subscription or account creation without overpowering the primary path
- hero layout should feel editorial and cinematic, not like a generic carousel block
- the hero must not push the first browsing section too far down the page

### `ProofStrip`

Responsibilities:

- provide compact trust and value points immediately after the hero
- reinforce why AnimeKey is worth exploring

Example content:

- premium catalog
- Arabic and English support
- watch anywhere
- regularly updated content

Behavior:

- short icon-plus-label items
- high legibility and minimal height
- should feel like support for the hero, not a separate promotion section

### `ContentRail`

Responsibilities:

- act as the core reusable browsing unit for the homepage
- render titled content groups such as `Featured`, `Trending`, `New Episodes`, or genre-specific collections

Behavior:

- title, optional subtitle, and `See all` affordance
- horizontal layout with reusable media cards
- arrows or controls only when needed
- should support both poster-led and landscape-led presentation through a small variant API

Design note:

The homepage should avoid becoming a stack of visually identical rails. Spacing, card treatments, and occasional section variation should keep it readable and premium.

### `PromoBanner`

Responsibilities:

- insert a strong but controlled conversion/value moment between browsing sections
- use the existing homepage assets from `public/images/home/`

Behavior:

- visually distinct from rails
- should feel like part of the experience, not an external ad unit
- can reinforce subscription value, premium access, or platform/app benefits

### `TopRankedShowcase`

Responsibilities:

- create a standout ranked section that feels more distinctive than a standard rail
- use the available `top5` assets in `public/images/home/top5/`

Behavior:

- ranked visual treatment should make the section memorable
- card layout can remain reusable internally, but the section itself should feel special
- should break up the page rhythm and prevent homepage monotony

### `AppDownloadBand`

Responsibilities:

- provide a lower-page soft conversion point after users have seen enough content proof
- support app-install or platform-availability messaging

Behavior:

- cleaner and lighter than the hero or promo banner
- should feel like a logical next step after browsing, not an interruption

### `SiteFooter`

Responsibilities:

- present supporting navigation, social links, and download/store links
- visually align with the rest of the rebuilt homepage

Behavior:

- reuse existing useful destinations
- remove the visual inconsistency and clutter present in the current implementation

## Component System

The homepage should be built from small section components and a few shared content primitives rather than one large page file.

Proposed file-level boundaries:

- `components/home/HomePage.tsx`: page composition only
- `components/home/HomeHeader.tsx`: header shell
- `components/home/HeroSpotlight.tsx`: featured hero section
- `components/home/ProofStrip.tsx`: value point row
- `components/home/ContentRail.tsx`: reusable rail shell
- `components/home/MediaCard.tsx`: shared content card primitive
- `components/home/PromoBanner.tsx`: mid-page conversion/value section
- `components/home/TopRankedShowcase.tsx`: ranked section
- `components/home/AppDownloadBand.tsx`: lower-page soft conversion block
- `components/home/types.ts`: shared homepage data contracts

Boundary rules:

- `HomePage` composes sections and passes typed props only
- `ContentRail` owns rail layout and controls
- `MediaCard` owns the card presentation
- specialized sections like `PromoBanner` and `TopRankedShowcase` can have unique visuals without breaking the shared homepage data model

Composition rule:

- preserve the approved editorial order by default, but represent the page as a typed section list rather than hardcoding every section inline
- use a discriminated union such as `hero`, `proof`, `rail`, `promo`, `topRanked`, and `appDownload`
- do not turn this first slice into a CMS-style renderer; keep dedicated components and a small typed composition layer only

## Core Content Contracts

The homepage needs explicit shared content types before implementation. The most important one is the media entity used by the hero, rails, and ranked sections.

Minimum media contract:

```ts
export interface MediaItem {
  id: string
  title: string
  href: string
  type: "movie" | "series"
  posterSrc: string
  backdropSrc?: string
  logoSrc?: string
  synopsis?: string
  ratingLabel?: string
  maturityLabel?: string
  year?: number
  episodeCountLabel?: string
  genres?: string[]
  isPremium?: boolean
  isDubbed?: boolean
}
```

Supporting contracts should be defined for:

- `HeroData`
- `ProofPoint`
- `RailData`
- `PromoData`
- `TopRankedData`
- `AppDownloadData`

Contract rule:

- every navigable entity must carry its own explicit `href`
- section components should depend on these shared contracts rather than ad hoc local prop shapes

## Data Model And Rendering Strategy

The first homepage version should use local typed mock data rather than fetched API data.

Required homepage data groups:

- `hero`
- `proofStrip`
- `rails`
- optional `promoBanner`
- optional `topRanked`
- optional `appDownload`

Preferred page composition shape:

```ts
type HomeSection =
  | { type: "hero"; data: HeroData }
  | { type: "proof"; data: ProofPoint[] }
  | { type: "rail"; data: RailData }
  | { type: "promo"; data: PromoData }
  | { type: "topRanked"; data: TopRankedData }
  | { type: "appDownload"; data: AppDownloadData }
```

Rendering strategy:

- keep homepage composition server-rendered by default
- move only genuinely interactive pieces, such as carousel behavior, into client components
- define explicit TypeScript interfaces for every section prop
- design section props so real API data can replace mock data in a future integration step without structural rewrites

CTA strategy:

- browsing and content exploration should be primary
- sign-up and subscription should stay visible but secondary
- the page should gently increase purchase intent as users scroll rather than demand commitment immediately

Visitor-state rules:

- the default homepage should be optimized for logged-out visitors who are evaluating the catalog
- logged-in visitors can de-emphasize sign-up messaging and surface resume or continue-browsing content later when personalization exists
- premium or gated titles should be visually labeled without blocking browsing interactions
- conversion pressure should increase only after the visitor has seen catalog proof, not in the first interaction zone

## Section State Model

The homepage must define section states before API integration so the UI does not assume perfect data.

Minimum state model:

```ts
type SectionStatus = "loading" | "ready" | "empty" | "error"
```

Required behaviors:

- `HeroSpotlight` needs `loading`, `ready`, and `error` fallbacks
- `ContentRail` needs `loading`, `ready`, `empty`, and `error` states
- `PromoBanner` and `AppDownloadBand` may be omitted entirely if data is unavailable
- the page must tolerate partial data, for example rendering available rails even if one rail fails
- loading states should use layout-preserving skeletons instead of collapsing the page
- empty states should not show generic error language; they should either omit the section or present a lightweight fallback message

The first mock-data version can keep these states simple, but the prop contracts and component structure must leave room for them.

## Routing And Navigation Behavior

Homepage CTAs need explicit destinations so the UI supports product flow and future SEO work.

Routing rules for this slice:

- header browse navigation should link to stable browse destinations such as `/[locale]/movies` and `/[locale]/series`
- hero primary CTA should go to a browse destination or featured-title destination, depending on the selected campaign content
- hero secondary CTA may point to registration, subscription, or plan-explainer flows
- media cards must link to explicit title destinations carried in data via `href`
- genre or category affordances can use query-based browse URLs such as `/[locale]/series?genre=action`

Implementation guardrail:

- homepage components should consume `href` values from data instead of hardcoding route construction logic into section components
- the first implementation can align title destinations with the current planned route structure, including watch/detail destinations under `/[locale]/watch/[id]`

## Visual Principles

The rebuilt homepage should:

- follow the existing Figma-aligned tokens already present in `tailwind.config.ts` and `app/globals.css`
- preserve the dark premium foundation with AnimeKey green as the main accent
- use the real homepage assets from `public/images/home/` wherever practical
- alternate section rhythms so the page does not read as repeated slider clones
- feel cleaner and more intentional than the current live site, which is overly carousel-heavy and visually noisy

Motion guidance:

- use subtle reveal or hover motion only where it helps hierarchy
- avoid constant motion, autoplay noise, or decorative animation overload

## Performance Strategy

This homepage is media-heavy and must be designed with loading performance in mind.

Required performance decisions:

- use `next/image` for homepage imagery unless a specific asset format makes it impractical
- mark the hero art and any truly above-the-fold supporting images as high priority
- lazy-load lower-page rail imagery by default
- prefer stable aspect-ratio boxes and skeletons to prevent layout shift
- keep first render server-first and lightweight; interactive carousel logic should hydrate only where necessary
- the mock-data version does not need network caching, but the component boundaries must be compatible with future server-side fetching and cache/revalidation policies
- image-heavy sections should avoid eagerly rendering or animating off-screen content when not needed

The performance goal is to protect first content visibility and reduce bounce risk on slower mobile connections.

## Analytics And Tracking

Because the homepage is meant to support conversion, instrumentation must be part of the design rather than an afterthought.

The first implementation should leave clear hooks for at least:

- hero primary CTA clicks
- hero secondary CTA clicks
- rail item clicks
- `See all` clicks
- promo banner clicks
- top-ranked item clicks
- app-download clicks
- meaningful scroll-depth milestones

Tracking rule:

- analytics wiring does not need to ship in the first visual slice if there is no existing event layer yet
- component APIs and naming should make future instrumentation straightforward and consistent

## Accessibility And Responsiveness

The homepage must maintain:

- semantic heading order
- real links and buttons for actions
- meaningful image alt text
- visible focus states
- mobile and desktop layouts that preserve hierarchy rather than simply shrinking the desktop version

The first content rail should remain discoverable quickly on common laptop and mobile viewport sizes.

Mobile-first constraints:

- hero height on mobile should be capped so the first browsing section is discoverable without excessive scrolling
- rails should support horizontal touch scrolling cleanly on mobile
- touch targets for controls and CTAs should remain thumb-friendly
- rail behavior should prefer predictable touch interaction over decorative motion
- sticky header height should stay compact on smaller screens

## Testing And Quality Expectations

This homepage slice should be validated through:

- strict TypeScript typing for all homepage section contracts
- explicit checks for section state handling, especially loading and empty rails
- visual checks for desktop and mobile layouts
- performance sanity checks for above-the-fold media loading and layout stability
- checks that repeated rails do not collapse into identical-looking blocks
- route and CTA verification so homepage actions lead to the intended destinations
- event-hook placement review so future analytics can be added without reworking component boundaries
- accessibility sanity checks for semantics, focus, and CTA clarity
- review of section isolation so the component system stays reusable for future homepage and browse work

## Out Of Scope

This homepage design does not include:

- live API integration
- personalized recommendations
- auth flow implementation
- payment or subscription flow implementation
- browse, detail, or watch page design beyond the homepage system implications

## Success Criteria

The homepage design is successful if it:

- feels clearly more premium and intentional than the current live homepage
- aligns with the synced Figma tokens and overall visual direction
- lets visitors browse content quickly instead of trapping them in marketing
- provides enough value proof to support future subscription conversion
- is implemented as clean, reusable components rather than a one-off page
