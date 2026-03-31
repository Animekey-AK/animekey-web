import { catalogItems } from "./catalog.data";

export interface Episode {
  number: number;
  title: string;
  duration: string;
  description: string;
  isFree: boolean;
  imageSrc: string;
}

export interface ShowDetail {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  rating: number;
  year: number;
  studio: string;
  genres: string[];
  episodes: ReadonlyArray<Episode>;
  imageSrc: string;
  backdropSrc: string;
  type: "series" | "movie";
}

const images = [
  "/images/promo.png",
  "/images/placeholder.png",
  "/images/placeholder1.png",
  "/images/card.png",
];

function img(index: number) {
  return images[index % images.length];
}

const showDatabase: Record<string, ShowDetail> = {
  "demon-slayer": {
    slug: "demon-slayer",
    title: "Demon Slayer",
    tagline: "He will become a demon slayer to save his sister.",
    description:
      "Tanjiro Kamado's life is upended when his family is slaughtered by demons and his sister Nezuko is turned into one. He sets off on a dangerous journey to find a cure and join the Demon Slayer Corps.",
    rating: 8.7,
    year: 2019,
    studio: "ufotable",
    genres: ["action", "fantasy"],
    imageSrc: img(0),
    backdropSrc: img(0),
    type: "series",
    episodes: [
      { number: 1, title: "Cruelty", duration: "23 min", description: "Tanjiro returns home to find his family slaughtered. His sister Nezuko has become a demon.", isFree: true, imageSrc: img(0) },
      { number: 2, title: "Trainer Sakonji Urokodaki", duration: "23 min", description: "A demon slayer named Giyuu instructs Tanjiro to seek out Urokodaki to begin his training.", isFree: false, imageSrc: img(1) },
      { number: 3, title: "Sabito and Makomo", duration: "23 min", description: "Tanjiro trains on the mountain and encounters two mysterious children.", isFree: false, imageSrc: img(2) },
      { number: 4, title: "Final Selection", duration: "23 min", description: "Tanjiro enters the Final Selection to become an official Demon Slayer.", isFree: false, imageSrc: img(3) },
      { number: 5, title: "My Own Steel", duration: "23 min", description: "Tanjiro receives his Nichirin Sword and meets the talking crows and boars.", isFree: false, imageSrc: img(0) },
    ],
  },

  "jujutsu-kaisen": {
    slug: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    tagline: "The cursed energy inside him is beyond imagination.",
    description:
      "After swallowing a finger of a legendary curse, high schooler Yuji Itadori becomes a vessel for the demon Ryomen Sukuna and enrolls in Tokyo Jujutsu High to learn how to harness the cursed energy within him.",
    rating: 8.6,
    year: 2020,
    studio: "MAPPA",
    genres: ["action", "psychological"],
    imageSrc: img(1),
    backdropSrc: img(1),
    type: "series",
    episodes: [
      { number: 1, title: "Ryomen Sukuna", duration: "24 min", description: "Yuji Itadori's life changes when he swallows a cursed finger to save his friends.", isFree: true, imageSrc: img(1) },
      { number: 2, title: "For Myself", duration: "24 min", description: "Yuji is captured by Jujutsu sorcerers and given a choice — live and be executed or live as bait.", isFree: false, imageSrc: img(2) },
      { number: 3, title: "Girl of Steel", duration: "24 min", description: "Yuji begins training at Tokyo Jujutsu High alongside Megumi and Nobara.", isFree: false, imageSrc: img(3) },
      { number: 4, title: "Curse Womb Must Die", duration: "24 min", description: "The trio's first real mission takes a dark turn inside a cursed spirit's womb.", isFree: false, imageSrc: img(0) },
      { number: 5, title: "Curse Womb Must Die II", duration: "24 min", description: "Sukuna awakens inside Yuji and the consequences are catastrophic.", isFree: false, imageSrc: img(1) },
    ],
  },

  "frieren-beyond-journeys-end": {
    slug: "frieren-beyond-journeys-end",
    title: "Frieren: Beyond Journey's End",
    tagline: "What does it mean to live, to those who live forever?",
    description:
      "After the demon king is defeated, the elven mage Frieren and her hero party go their separate ways. Decades later, she reflects on the weight of a lifetime — and begins to understand what she missed.",
    rating: 9.1,
    year: 2023,
    studio: "Madhouse",
    genres: ["fantasy", "classic"],
    imageSrc: img(2),
    backdropSrc: img(2),
    type: "series",
    episodes: [
      { number: 1, title: "The Journey's End", duration: "47 min", description: "The hero party returns victorious. Frieren says goodbye not knowing she'll be the last one left.", isFree: true, imageSrc: img(2) },
      { number: 2, title: "Those Who Live On", duration: "24 min", description: "Frieren agrees to travel with a new generation and slowly learns what she missed in those fleeting years.", isFree: false, imageSrc: img(3) },
      { number: 3, title: "The Memories We Didn't Make", duration: "24 min", description: "Frieren searches for a spell to communicate with the dead as a way to say what she never could.", isFree: false, imageSrc: img(0) },
      { number: 4, title: "The Mage of the Village of Birds", duration: "24 min", description: "A detour reveals the lasting impact small kindnesses have across generations.", isFree: false, imageSrc: img(1) },
      { number: 5, title: "Aura the Guillotine", duration: "24 min", description: "Frieren faces off against a powerful demon general with calm, devastating precision.", isFree: false, imageSrc: img(2) },
    ],
  },

  "spy-x-family": {
    slug: "spy-x-family",
    title: "Spy x Family",
    tagline: "A spy. An assassin. A telepath. One family.",
    description:
      "Master spy Loid Forger must build a fake family for a mission — but his adopted daughter is a secret telepath, and his wife is secretly an assassin. None of them know the others' secrets.",
    rating: 8.2,
    year: 2022,
    studio: "Wit Studio / CloverWorks",
    genres: ["comedy", "action"],
    imageSrc: img(3),
    backdropSrc: img(3),
    type: "series",
    episodes: [
      { number: 1, title: "Operation Strix", duration: "24 min", description: "A spy codenamed Twilight must assemble a fake family in just seven days to complete his most difficult mission.", isFree: true, imageSrc: img(3) },
      { number: 2, title: "Secure a Wife", duration: "24 min", description: "Loid needs a wife — fast. He finds one in Yor, who has her own reasons for wanting a fake husband.", isFree: false, imageSrc: img(0) },
      { number: 3, title: "Prepare for the Interview", duration: "24 min", description: "The Forger family begins training for the elite school's intense entrance interview.", isFree: false, imageSrc: img(1) },
      { number: 4, title: "The Prestigious School's Interview", duration: "24 min", description: "The interview day arrives — and Anya's telepathy may save or doom their plan.", isFree: false, imageSrc: img(2) },
    ],
  },

  "solo-leveling": {
    slug: "solo-leveling",
    title: "Solo Leveling",
    tagline: "The world's weakest hunter awakens alone.",
    description:
      "In a world where hunters fight monsters for survival, Sung Jinwoo is the weakest of them all. But after a near-death experience in a hidden dungeon, he alone gains the ability to level up — and becomes unstoppable.",
    rating: 8.4,
    year: 2024,
    studio: "A-1 Pictures",
    genres: ["action", "isekai"],
    imageSrc: img(0),
    backdropSrc: img(0),
    type: "series",
    episodes: [
      { number: 1, title: "I'm Used to This Kind of Thing", duration: "35 min", description: "E-rank hunter Sung Jinwoo barely survives a double dungeon disaster — and wakes up changed forever.", isFree: true, imageSrc: img(0) },
      { number: 2, title: "If I Had One More Chance", duration: "23 min", description: "Jinwoo begins to understand the System that has chosen him and completes his first quest.", isFree: false, imageSrc: img(1) },
      { number: 3, title: "It's Like a Game", duration: "23 min", description: "Jinwoo raids a low-level dungeon with new purpose — but the rewards exceed all expectation.", isFree: false, imageSrc: img(2) },
      { number: 4, title: "I Think I Got the Wrong Door", duration: "23 min", description: "Jinwoo discovers a hidden dungeon unlike anything on record.", isFree: false, imageSrc: img(3) },
      { number: 5, title: "A Pretty Good Deal", duration: "23 min", description: "The guild offers Jinwoo an opportunity that would change his hunter status forever.", isFree: false, imageSrc: img(0) },
    ],
  },

  "attack-on-titan": {
    slug: "attack-on-titan",
    title: "Attack on Titan",
    tagline: "Will you keep moving forward?",
    description:
      "What's left of humanity lives behind three massive walls to protect themselves from the Titans — giant humanoid creatures that eat humans for sport. When the walls are breached, Eren Yeager vows to destroy every last Titan.",
    rating: 9.0,
    year: 2013,
    studio: "Wit Studio / MAPPA",
    genres: ["action", "psychological", "thriller"],
    imageSrc: img(1),
    backdropSrc: img(1),
    type: "series",
    episodes: [
      { number: 1, title: "To You, in 2000 Years", duration: "23 min", description: "Humanity's fragile peace is shattered when a colossal Titan breaches the outer wall.", isFree: true, imageSrc: img(1) },
      { number: 2, title: "That Day", duration: "23 min", description: "Eren, Mikasa, and Armin escape the chaos and vow to join the military to fight back.", isFree: false, imageSrc: img(2) },
      { number: 3, title: "A Dim Light Amid Despair", duration: "23 min", description: "The surviving children begin gruelling military training.", isFree: false, imageSrc: img(3) },
      { number: 4, title: "The Night of the Closing Ceremony", duration: "23 min", description: "The graduation ceremony is interrupted by a terrifying new threat.", isFree: false, imageSrc: img(0) },
      { number: 5, title: "First Battle", duration: "23 min", description: "Eren and his comrades face Titans in their first real combat deployment.", isFree: false, imageSrc: img(1) },
    ],
  },

  "death-note": {
    slug: "death-note",
    title: "Death Note",
    tagline: "I'll take a potato chip... and eat it.",
    description:
      "Genius student Light Yagami discovers a supernatural notebook that kills anyone whose name is written in it. He decides to use it to rid the world of evil — but a legendary detective named L is closing in.",
    rating: 9.0,
    year: 2006,
    studio: "Madhouse",
    genres: ["psychological", "thriller"],
    imageSrc: img(2),
    backdropSrc: img(2),
    type: "series",
    episodes: [
      { number: 1, title: "Rebirth", duration: "23 min", description: "Light Yagami finds the Death Note and begins his experiment — can he become god of a new world?", isFree: true, imageSrc: img(2) },
      { number: 2, title: "Confrontation", duration: "23 min", description: "L makes his first public move against Kira, revealing he is already watching.", isFree: false, imageSrc: img(3) },
      { number: 3, title: "Dealings", duration: "23 min", description: "Light encounters Ryuk's true nature and the terrifying terms of the Death Note.", isFree: false, imageSrc: img(0) },
      { number: 4, title: "Pursuit", duration: "23 min", description: "L narrows his investigation — and Light begins to suspect he's already been identified.", isFree: false, imageSrc: img(1) },
    ],
  },

  "your-lie-in-april": {
    slug: "your-lie-in-april",
    title: "Your Lie in April",
    tagline: "The notes he played reached someone who needed them.",
    description:
      "After his mother's death, piano prodigy Kousei Arima can no longer hear the sound of his own playing. Meeting the free-spirited violinist Kaori Miyazono changes everything.",
    rating: 8.7,
    year: 2014,
    studio: "A-1 Pictures",
    genres: ["romance", "school"],
    imageSrc: img(3),
    backdropSrc: img(3),
    type: "series",
    episodes: [
      { number: 1, title: "Monotone / Coloured", duration: "22 min", description: "Kousei Arima's world is grey since he lost the ability to hear his piano. Until he meets her.", isFree: true, imageSrc: img(3) },
      { number: 2, title: "Friend A", duration: "22 min", description: "Kaori drags Kousei into accompanying her at a competition he never expected to join.", isFree: false, imageSrc: img(0) },
      { number: 3, title: "Inside Spring", duration: "22 min", description: "Their performance shakes the audience — and something shifts inside Kousei.", isFree: false, imageSrc: img(1) },
      { number: 4, title: "The Journey", duration: "22 min", description: "Kousei begins to remember what music meant to him before the silence.", isFree: false, imageSrc: img(2) },
    ],
  },

  "chainsaw-man": {
    slug: "chainsaw-man",
    title: "Chainsaw Man",
    tagline: "The man who became chainsaw.",
    description:
      "Denji works as a devil hunter to pay off his deceased father's debt. After merging with his pet devil dog Pochita, he becomes Chainsaw Man — a hybrid with the power to sprout chainsaws from his body.",
    rating: 8.5,
    year: 2022,
    studio: "MAPPA",
    genres: ["action", "psychological"],
    imageSrc: img(0),
    backdropSrc: img(0),
    type: "series",
    episodes: [
      { number: 1, title: "Dog & Chainsaw", duration: "24 min", description: "Denji and his devil dog Pochita scrape by hunting low-level devils — until everything changes.", isFree: true, imageSrc: img(0) },
      { number: 2, title: "Arrival in Tokyo", duration: "24 min", description: "Denji joins the Public Safety Devil Hunters and meets his volatile new boss Makima.", isFree: false, imageSrc: img(1) },
      { number: 3, title: "Meowy's Whereabouts", duration: "24 min", description: "Denji's first mission with Power reveals both of their secrets.", isFree: false, imageSrc: img(2) },
      { number: 4, title: "Rescue", duration: "24 min", description: "Chainsaw Man takes on the Bat Devil in a brutal showdown.", isFree: false, imageSrc: img(3) },
    ],
  },

  "vinland-saga": {
    slug: "vinland-saga",
    title: "Vinland Saga",
    tagline: "There is no enemy. There is no battle.",
    description:
      "Young Thorfinn grows up dreaming of Vinland — the paradise his father spoke of. But after witnessing his father's murder by mercenaries, he's consumed by a quest for revenge that shapes his brutal journey across medieval Europe.",
    rating: 8.8,
    year: 2019,
    studio: "Wit Studio",
    genres: ["action", "classic"],
    imageSrc: img(1),
    backdropSrc: img(1),
    type: "series",
    episodes: [
      { number: 1, title: "Somewhere Not Here", duration: "47 min", description: "Young Thorfinn lives in Iceland, dreaming of Vinland as his father Thors prepares to be called back to war.", isFree: true, imageSrc: img(1) },
      { number: 2, title: "Sword", duration: "23 min", description: "Thors faces Askeladd's mercenary fleet with no intention of fighting.", isFree: false, imageSrc: img(2) },
      { number: 3, title: "Troll", duration: "23 min", description: "Young Thorfinn joins the mercenaries to survive — living only to challenge Askeladd to a duel.", isFree: false, imageSrc: img(3) },
      { number: 4, title: "A True Warrior", duration: "23 min", description: "The mercenaries join the Danish invasion of England.", isFree: false, imageSrc: img(0) },
    ],
  },

  // Movies
  "suzume": {
    slug: "suzume",
    title: "Suzume",
    tagline: "Doors that must not be opened are everywhere.",
    description:
      "17-year-old Suzume's journey begins when she meets a young man in the mountains near her town who is looking for a door. What follows is a road trip across Japan as she closes ancient doors that release catastrophe.",
    rating: 8.1,
    year: 2022,
    studio: "CoMix Wave Films",
    genres: ["fantasy", "romance"],
    imageSrc: img(2),
    backdropSrc: img(2),
    type: "movie",
    episodes: [
      { number: 1, title: "Suzume", duration: "122 min", description: "A girl chases a mysterious young man across Japan, closing ancient doors that threaten to unleash disaster.", isFree: true, imageSrc: img(2) },
    ],
  },

  "your-name": {
    slug: "your-name",
    title: "Your Name",
    tagline: "Your name... what was it again?",
    description:
      "Two teenagers — one in rural Japan, one in Tokyo — discover they are mysteriously swapping bodies. As they grow closer, a more profound connection begins to form across time and space.",
    rating: 8.9,
    year: 2016,
    studio: "CoMix Wave Films",
    genres: ["romance", "fantasy"],
    imageSrc: img(3),
    backdropSrc: img(3),
    type: "movie",
    episodes: [
      { number: 1, title: "Your Name", duration: "106 min", description: "Two strangers swap bodies and lives — until the impossible truth of their connection is revealed.", isFree: true, imageSrc: img(3) },
    ],
  },

  "spirited-away": {
    slug: "spirited-away",
    title: "Spirited Away",
    tagline: "The greatest animated film ever made.",
    description:
      "10-year-old Chihiro stumbles into the spirit world and must work at a bathhouse to save her parents — who have been turned into pigs. A tale of courage, identity, and finding your own name.",
    rating: 9.3,
    year: 2001,
    studio: "Studio Ghibli",
    genres: ["fantasy", "classic"],
    imageSrc: img(0),
    backdropSrc: img(0),
    type: "movie",
    episodes: [
      { number: 1, title: "Spirited Away", duration: "125 min", description: "Chihiro enters the spirit world, loses her name, and must find her way back to her parents and herself.", isFree: true, imageSrc: img(0) },
    ],
  },

  "akira": {
    slug: "akira",
    title: "Akira",
    tagline: "Neo-Tokyo is about to explode.",
    description:
      "In the dystopian Neo-Tokyo of 2019, biker gang leader Kaneda tries to save his friend Tetsuo from a secret government project involving telekinetic children — before the city tears itself apart.",
    rating: 8.0,
    year: 1988,
    studio: "TMS Entertainment",
    genres: ["action", "thriller", "classic"],
    imageSrc: img(1),
    backdropSrc: img(1),
    type: "movie",
    episodes: [
      { number: 1, title: "Akira", duration: "124 min", description: "Tetsuo gains catastrophic psychic powers and Neo-Tokyo descends into chaos. A landmark of anime cinema.", isFree: true, imageSrc: img(1) },
    ],
  },

  "devil-may-cry": {
    slug: "devil-may-cry",
    title: "Devil May Cry",
    tagline: "Sons of Sparda.",
    description:
      "Half-demon mercenary Dante runs a devil-hunting business — and every job pulls him deeper into the supernatural underworld he was born from. Action doesn't get more stylish.",
    rating: 7.8,
    year: 2024,
    studio: "MAPPA",
    genres: ["action", "fantasy"],
    imageSrc: img(2),
    backdropSrc: img(2),
    type: "movie",
    episodes: [
      { number: 1, title: "Devil May Cry", duration: "95 min", description: "Dante confronts his demonic heritage in a battle that will reshape the world between humans and demons.", isFree: true, imageSrc: img(2) },
    ],
  },

  "solo-leveling-reawakening": {
    slug: "solo-leveling-reawakening",
    title: "Solo Leveling: ReAwakening",
    tagline: "The rise of the Shadow Monarch begins again.",
    description:
      "A theatrical recap of Solo Leveling's first season, followed by an exclusive first look at Season 2. Sung Jinwoo's journey from weakest hunter to the world's strongest — in cinematic scope.",
    rating: 8.0,
    year: 2024,
    studio: "A-1 Pictures",
    genres: ["action", "isekai"],
    imageSrc: img(3),
    backdropSrc: img(3),
    type: "movie",
    episodes: [
      { number: 1, title: "Solo Leveling: ReAwakening", duration: "89 min", description: "Theatrical recap of season 1 followed by the exclusive season 2 preview.", isFree: true, imageSrc: img(3) },
    ],
  },
};

export function getShow(slug: string): ShowDetail {
  if (showDatabase[slug]) {
    return showDatabase[slug];
  }

  // Graceful fallback for unknown slugs — derive from catalog if possible
  const catalogItem = catalogItems.find((i) => i.slug === slug);
  const title = catalogItem?.title ?? slug.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");

  return {
    slug,
    title,
    tagline: "A great story worth watching.",
    description: "Details for this title are coming soon.",
    rating: catalogItem?.rating ?? 8.0,
    year: catalogItem?.year ?? 2024,
    studio: "AnimeKey",
    genres: catalogItem?.genres ?? ["action"],
    imageSrc: img(0),
    backdropSrc: img(0),
    type: catalogItem?.type ?? "series",
    episodes: [
      { number: 1, title: "Episode 1", duration: "24 min", description: "The journey begins.", isFree: true, imageSrc: img(0) },
    ],
  };
}
