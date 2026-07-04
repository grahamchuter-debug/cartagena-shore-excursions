export interface SiteImage {
  src: string;
  alt: string;
}

const B = "/images";

export const siteImages = {
  hero: {
    src: `${B}/hero-home.jpg`,
    alt: "Cartagena Roman Theatre, harbour and old town from the cruise port, Spain",
  },
  ogDefault: {
    src: `${B}/og-default.jpg`,
    alt: "Cartagena cruise planning — Roman Theatre, harbour and historic old town, Spain",
  },
  logo: {
    src: `${B}/logo-mark.svg`,
    alt: "Cartagena Shore Excursions",
  },
  port: {
    src: `${B}/cruise-port.jpg`,
    alt: "Cruise ships at Cartagena cruise port, Muelle Alfonso XII, Spain",
  },
} as const;

export const subjectImages: Record<string, SiteImage> = {
  cartagena: { src: `${B}/cartagena.jpg`, alt: "Cartagena old town and harbour from the cruise port" },
  "roman-theatre": { src: `${B}/roman-theatre.jpg`, alt: "Roman Theatre of Cartagena, Spain" },
  "roman-forum": { src: `${B}/roman-forum.jpg`, alt: "Roman Forum archaeological quarter in Cartagena" },
  "punic-wall": { src: `${B}/punic-wall.jpg`, alt: "Punic Wall archaeological experience, Cartagena" },
  castle: { src: `${B}/castle.jpg`, alt: "Castle of the Conception overlooking Cartagena harbour" },
  "old-town": { src: `${B}/old-town.jpg`, alt: "Cartagena historic old town lanes near the cruise port" },
  harbour: { src: `${B}/harbour.jpg`, alt: "Cartagena naval harbour and waterfront promenade" },
  murcia: { src: `${B}/murcia.jpg`, alt: "Murcia cathedral and city centre from Cartagena cruise port day trip" },
  tapas: { src: `${B}/tapas.jpg`, alt: "Cartagena tapas and local Spanish food for cruise passengers" },
  market: { src: `${B}/market.jpg`, alt: "Mercado de Santa Florentina and Cartagena market culture" },
  maritime: { src: `${B}/maritime.jpg`, alt: "Cartagena maritime history and naval port heritage" },
  beach: { src: `${B}/beach.jpg`, alt: "Cartagena beaches and Costa Cálida coastline" },
  kayaking: { src: `${B}/kayaking.jpg`, alt: "Coastal kayaking adventures near Cartagena, Spain" },
  family: { src: `${B}/family.jpg`, alt: "Family-friendly Cartagena sights near the cruise port" },
  private: { src: `${B}/private.jpg`, alt: "Private Cartagena experience for cruise passengers" },
  planner: { src: `${B}/cartagena.jpg`, alt: "Planning a Cartagena cruise port day in Spain" },
};

function pick(key: string): SiteImage {
  return subjectImages[key] ?? siteImages.ogDefault;
}

const excursionImageKeys: Record<string, string> = {
  "cartagena-roman-highlights": "roman-theatre",
  "roman-walking-tour": "roman-forum",
  "cartagena-murcia": "murcia",
  "tapas-local-food-experience": "tapas",
  "coastal-kayaking": "kayaking",
  "harbour-panoramic-tour": "harbour",
  "private-cartagena-experience": "private",
  "family-friendly-cartagena": "family",
};

export function getExcursionImage(slug: string): SiteImage {
  return pick(excursionImageKeys[slug] ?? "cartagena");
}

export const excursionsHubImage = pick("roman-theatre");

const guideImageKeys: Record<string, string> = {
  "why-roman-highlights-is-our-editors-choice": "roman-theatre",
  "roman-theatre-cartagena": "roman-theatre",
  "roman-forum-archaeological-quarter": "roman-forum",
  "punic-wall-experience": "punic-wall",
  "castle-of-the-conception": "castle",
  "cartagena-old-town-walking-guide": "old-town",
  "cartagena-harbour-walking-route": "harbour",
  "best-things-to-do-in-cartagena-from-a-cruise-ship": "cartagena",
  "one-day-in-cartagena-from-a-cruise-ship": "cartagena",
  "murcia-from-cartagena-cruise-port": "murcia",
  "cartagena-food-tapas-guide": "tapas",
  "cartagena-market-guide": "market",
  "cartagena-maritime-history": "maritime",
  "cartagena-beaches": "beach",
  "kayaking-coastal-adventures": "kayaking",
  "independent-vs-cruise-line-excursions": "harbour",
  "best-cartagena-excursions-for-first-time-visitors": "roman-theatre",
  "best-cartagena-excursions-for-history-lovers": "roman-forum",
  "best-cartagena-excursions-for-families": "family",
  "best-cartagena-excursions-for-food-lovers": "tapas",
};

export function getGuideImage(slug: string): SiteImage {
  const key = guideImageKeys[slug] ?? "cartagena";
  return pick(key);
}

export function getComparisonImage(_slug: string): SiteImage {
  return pick("cartagena");
}

export function getComparisonOgImage(slug: string): SiteImage {
  return getComparisonImage(slug);
}

/** Hero showcase tiles for homepage */
export const heroShowcaseImages = [
  pick("roman-theatre"),
  pick("harbour"),
  pick("old-town"),
  pick("castle"),
] as const;
