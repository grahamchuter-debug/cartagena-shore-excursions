import { excursions } from "./excursions";

export interface PlannerInput {
  arrivalTime: string;
  departureTime: string;
  adults: number;
  children: number;
  interests: string[];
  mobility: "full" | "some" | "limited";
  budget: "budget" | "mid" | "premium";
  style: "guided" | "mix" | "diy";
}

export interface PlannerLink {
  label: string;
  href: string;
  why: string;
}

export interface PlannerResult {
  headline: string;
  summary: string;
  excursions: PlannerLink[];
  guides: PlannerLink[];
  logistics: PlannerLink[];
  dayPlan: { time: string; text: string }[];
  returnConfidence: "high" | "medium" | "low";
  itineraryTheme: string;
}

export const INTEREST_OPTIONS = [
  { id: "roman", label: "Roman history" },
  { id: "walking", label: "Walking & old town" },
  { id: "food", label: "Food & tapas" },
  { id: "murcia", label: "Murcia day trip" },
  { id: "coastal", label: "Harbour & coast" },
  { id: "family", label: "Family-friendly" },
  { id: "kayak", label: "Kayaking & adventure" },
  { id: "castle", label: "Castle & views" },
];

const INTEREST_TO_EXCURSION: Record<string, string[]> = {
  roman: ["cartagena-roman-highlights", "roman-walking-tour", "harbour-panoramic-tour"],
  walking: ["roman-walking-tour", "harbour-panoramic-tour", "cartagena-roman-highlights"],
  food: ["tapas-local-food-experience", "cartagena-roman-highlights"],
  murcia: ["cartagena-murcia"],
  coastal: ["harbour-panoramic-tour", "coastal-kayaking", "cartagena-roman-highlights"],
  family: ["family-friendly-cartagena", "cartagena-roman-highlights", "harbour-panoramic-tour"],
  kayak: ["coastal-kayaking", "harbour-panoramic-tour"],
  castle: ["harbour-panoramic-tour", "cartagena-roman-highlights"],
};

function parseTime(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

function hoursAshore(arrival: string, departure: string): number {
  const diff = parseTime(departure) - parseTime(arrival);
  return Math.max(0, diff / 60);
}

function excursionLink(slug: string, why: string): PlannerLink | null {
  const e = excursions.find((x) => x.slug === slug);
  if (!e) return null;
  const prefix = e.editorsChoice ? "Editor's Choice — " : "";
  return { label: `${prefix}${e.title}`, href: `/shore-excursions/${slug}`, why };
}

function pickItineraryTheme(
  input: PlannerInput,
  hours: number,
  shortDay: boolean,
  longDay: boolean,
): string {
  const { interests, style, children } = input;
  const active = interests.length ? interests : ["roman", "walking"];

  if (children > 0) return "Family Day";
  if (active.includes("murcia") && longDay) return "Murcia Excursion";
  if (style === "diy") return "Easy Walking Day";
  if (shortDay) return "Easy Walking Day";
  if (active.includes("food") && active.includes("roman")) return "Roman + Tapas";
  if (active.includes("food")) return "Roman + Tapas";
  if (active.includes("kayak") || active.includes("coastal")) return "Harbour & Coastal Experience";
  if (active.includes("roman") && active.includes("walking")) return "Historic Walking Day";
  if (active.includes("roman")) return "Roman Cartagena";
  if (active.includes("walking")) return "Historic Walking Day";
  return "Roman Cartagena";
}

export function generateCartagenaPlan(input: PlannerInput): PlannerResult {
  const { arrivalTime, departureTime, adults, children, interests, mobility, budget, style } = input;
  const party = adults + children;
  const hasKids = children > 0;
  const hours = hoursAshore(arrivalTime, departureTime);
  const shortDay = hours < 6;
  const standardDay = hours >= 6 && hours < 9;
  const longDay = hours >= 9;

  const excSlugs: string[] = [];
  const pushSlug = (s: string) => {
    if (s && !excSlugs.includes(s)) excSlugs.push(s);
  };

  const activeInterests = interests.length ? interests : ["roman", "walking"];
  for (const interest of activeInterests) {
    for (const s of INTEREST_TO_EXCURSION[interest] ?? []) pushSlug(s);
  }

  if (hasKids) pushSlug("family-friendly-cartagena");
  if (mobility === "limited") pushSlug("private-cartagena-experience");
  if (style === "diy") {
    // DIY recommendation is a guide, but still surface walking-friendly excursions
    pushSlug("harbour-panoramic-tour");
  }

  if (shortDay) {
    pushSlug("cartagena-roman-highlights");
    ["cartagena-murcia", "coastal-kayaking"].forEach((s) => {
      const idx = excSlugs.indexOf(s);
      if (idx >= 0) excSlugs.splice(idx, 1);
    });
  } else if (standardDay) {
    if (activeInterests.includes("roman")) pushSlug("cartagena-roman-highlights");
    if (activeInterests.includes("food")) pushSlug("tapas-local-food-experience");
    if (activeInterests.includes("murcia") && hours >= 8) pushSlug("cartagena-murcia");
    if (activeInterests.includes("kayak")) pushSlug("coastal-kayaking");
  } else if (longDay) {
    if (activeInterests.includes("murcia")) pushSlug("cartagena-murcia");
    if (activeInterests.includes("roman")) pushSlug("roman-walking-tour");
    if (budget === "premium") pushSlug("private-cartagena-experience");
  }

  if (style === "guided" && party >= 2) pushSlug("cartagena-roman-highlights");
  if (budget === "premium") pushSlug("private-cartagena-experience");
  if (budget === "budget" && style === "diy") pushSlug("harbour-panoramic-tour");

  if (activeInterests.includes("roman") && !shortDay) {
    const idx = excSlugs.indexOf("cartagena-roman-highlights");
    if (idx > 0) {
      excSlugs.splice(idx, 1);
      excSlugs.unshift("cartagena-roman-highlights");
    }
  }

  const reasonMap: Record<string, string> = {
    "cartagena-roman-highlights": "Editor's Choice — Roman Theatre, Forum and harbour views with small-group pacing.",
    "roman-walking-tour": "Maximum archaeological depth on foot for history lovers.",
    "cartagena-murcia": "Murcia cathedral and city centre — only on longer port days.",
    "tapas-local-food-experience": "Authentic tapas and market culture near the old town.",
    "coastal-kayaking": "Active coastal adventure with harbour panoramas.",
    "harbour-panoramic-tour": "Castle of the Conception and harbour — strong for views and limited mobility.",
    "private-cartagena-experience": mobility === "limited" ? "Flexible vehicle and pacing for your group." : "Custom Roman and tapas routing on long port days.",
    "family-friendly-cartagena": "Kid-paced Roman sights and harbour time close to the ship.",
  };

  const excursionLinks = excSlugs
    .slice(0, 5)
    .map((s) => excursionLink(s, reasonMap[s] ?? "A strong match for your interests."))
    .filter((x): x is PlannerLink => x !== null);

  const itineraryTheme = pickItineraryTheme(input, hours, shortDay, longDay);

  const guides: PlannerLink[] = [
    { label: "Cartagena Cruise Port Guide", href: "/cruise-port-guide", why: "Muelle Alfonso XII layout, walking distances and return timing." },
    { label: "One Day in Cartagena", href: "/one-day-in-cartagena-from-a-cruise-ship", why: "Itineraries matched to your hours ashore." },
    { label: "Best Things to Do", href: "/best-things-to-do-in-cartagena-from-a-cruise-ship", why: "Compare Roman, tapas, Murcia and coastal options." },
  ];
  if (activeInterests.includes("roman")) guides.push({ label: "Why Roman Highlights is Editor's Choice", href: "/why-roman-highlights-is-our-editors-choice", why: "Our editorial reasoning after comparing all Roman options." });
  if (activeInterests.includes("roman")) guides.push({ label: "Roman Theatre Guide", href: "/roman-theatre-cartagena", why: "Tickets, timing and walking distance from the terminal." });
  if (style === "diy") guides.push({ label: "Old Town Walking Guide", href: "/cartagena-old-town-walking-guide", why: "Self-guided route — our pick for confident DIY travellers." });
  if (activeInterests.includes("food")) guides.push({ label: "Food & Tapas Guide", href: "/cartagena-food-tapas-guide", why: "Where to eat on a port day near Calle Mayor." });
  if (activeInterests.includes("murcia")) guides.push({ label: "Murcia from Cartagena", href: "/murcia-from-cartagena-cruise-port", why: "Drive times and what fits your port window." });
  if (hasKids) guides.push({ label: "Best for Families", href: "/best-cartagena-excursions-for-families", why: "Family-paced Cartagena options." });
  if (activeInterests.includes("kayak")) guides.push({ label: "Kayaking & Coastal Adventures", href: "/kayaking-coastal-adventures", why: "Coastal timing and return buffers." });

  const logistics: PlannerLink[] = [
    { label: "Ship Schedules", href: "/ship-schedules", why: "See if other ships share your port day." },
    { label: "Independent vs Ship Excursions", href: "/independent-vs-cruise-line-excursions", why: "Compare flexibility and return-to-ship guarantees." },
    { label: "FAQ", href: "/faq", why: "Common Cartagena cruise passenger questions." },
  ];

  const dayPlan: { time: string; text: string }[] = [];
  const topExc = excursionLinks[0]?.label ?? "your chosen experience";

  dayPlan.push({ time: "On arrival", text: "Disembark at Muelle Alfonso XII. Allow 20–30 minutes for immigration and terminal exit before your excursion departs." });

  if (itineraryTheme === "Easy Walking Day" || shortDay) {
    dayPlan.push({ time: "Morning", text: style === "diy" ? "Self-guided Old Town Walking Route — Calle Mayor, Roman Theatre exterior and harbour promenade." : `Easy walking focus: ${topExc}.` });
    dayPlan.push({ time: "Midday", text: activeInterests.includes("food") ? "Tapas lunch on Calle Mayor or at Mercado de Santa Florentina." : "Café stop in the old town before afternoon sights." });
    dayPlan.push({ time: "Return", text: "Head back 45 minutes before all-aboard. Short port days cannot fit Murcia honestly." });
  } else if (itineraryTheme === "Murcia Excursion") {
    dayPlan.push({ time: "Early start", text: `Murcia day trip: ${topExc} — allow 45–60 minutes each way.` });
    dayPlan.push({ time: "Midday", text: "Murcia cathedral, Plaza Cardinal Belluga and city-centre tapas." });
    dayPlan.push({ time: "Return buffer", text: "Allow 60–75 minutes before all-aboard — afternoon motorway traffic can build." });
  } else if (itineraryTheme === "Roman + Tapas") {
    dayPlan.push({ time: "Morning", text: `Roman Cartagena first: ${topExc} — Theatre and Forum while energy is high.` });
    dayPlan.push({ time: "Midday", text: "Tapas experience or self-guided lunch near Calle Mayor and the market." });
    dayPlan.push({ time: "Afternoon", text: "Castle lift for harbour views or relaxed promenade walk back toward the terminal." });
    dayPlan.push({ time: "Return buffer", text: "Allow 45–60 minutes — old-town lanes are close to the ship." });
  } else if (itineraryTheme === "Harbour & Coastal Experience") {
    dayPlan.push({ time: "Morning", text: `Harbour & coastal: ${topExc} — castle viewpoints or kayaking depending on your booking.` });
    dayPlan.push({ time: "Afternoon", text: "Naval museum exterior, waterfront stroll and optional beach time if time allows." });
    dayPlan.push({ time: "Return buffer", text: "Allow 60 minutes for kayaking; 45 minutes for harbour-only tours." });
  } else if (itineraryTheme === "Family Day") {
    dayPlan.push({ time: "Morning", text: `Family Day: ${topExc} — Roman Theatre at kid-friendly pace plus harbour space to move.` });
    dayPlan.push({ time: "Afternoon", text: "Ice cream on the promenade, lift to Castle viewpoints and easy walk back." });
    dayPlan.push({ time: "Return buffer", text: "Allow 45 minutes — families benefit from Cartagena's compact layout." });
  } else if (itineraryTheme === "Historic Walking Day") {
    dayPlan.push({ time: "Morning", text: `Historic walking: ${topExc} — Roman Walking Tour or self-guided Forum and Punic Wall lanes.` });
    dayPlan.push({ time: "Afternoon", text: "Castle of the Conception lift and harbour panoramas before descending to the port." });
    dayPlan.push({ time: "Return buffer", text: "Allow 45–60 minutes for walking-heavy days." });
  } else {
    dayPlan.push({ time: "Morning", text: `Roman Cartagena: ${topExc} — Theatre, Forum district and museum levels first.` });
    dayPlan.push({ time: "Afternoon", text: activeInterests.includes("castle") ? "Castle viewpoints and naval harbour panoramas." : "Old-town lanes and return via the port promenade." });
    dayPlan.push({ time: "Return buffer", text: "Allow 45–60 minutes — Cartagena's walkable core keeps margins comfortable." });
  }

  let returnConfidence: PlannerResult["returnConfidence"] = "high";
  if (excSlugs.includes("cartagena-murcia") && !longDay) returnConfidence = "low";
  else if (excSlugs.includes("cartagena-murcia")) returnConfidence = "medium";
  else if (excSlugs.includes("coastal-kayaking")) returnConfidence = "medium";
  else if (shortDay) returnConfidence = "medium";

  const interestLabels = activeInterests.map((i) => INTEREST_OPTIONS.find((o) => o.id === i)?.label ?? i).join(", ");

  return {
    headline: `${itineraryTheme} (${hours.toFixed(1)} hours ashore)`,
    summary: `A ${shortDay ? "short" : standardDay ? "standard" : "long"} port day for ${party} guest${party === 1 ? "" : "s"} focused on ${interestLabels.toLowerCase()}. ${style === "guided" ? "Guided tours recommended for Roman Theatre timing and Forum context." : style === "diy" ? "DIY works brilliantly in Cartagena — follow our Old Town Walking Guide." : "A mix of guided Roman sights and independent tapas suits most Cartagena calls."}`,
    excursions: excursionLinks,
    guides,
    logistics,
    dayPlan,
    returnConfidence,
    itineraryTheme,
  };
}
