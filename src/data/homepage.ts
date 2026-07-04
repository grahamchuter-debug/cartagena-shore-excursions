import type { FAQ, VisitorType } from "./types";

export const visitorTypes: VisitorType[] = [
  {
    id: "first-time",
    label: "First time in Cartagena",
    shortLabel: "First visit",
    description: "Roman Theatre, old town and harbour — we help you choose the right first Cartagena experience for your port hours.",
    href: "/best-cartagena-excursions-for-first-time-visitors",
    cta: "See first-timer picks",
  },
  {
    id: "roman",
    label: "Here for Roman history",
    shortLabel: "Roman ruins",
    description: "Theatre, Forum, Punic Wall and archaeology — compare Roman Highlights, the walking tour and DIY routes.",
    href: "/why-roman-highlights-is-our-editors-choice",
    cta: "Roman guides",
  },
  {
    id: "food",
    label: "Food and tapas",
    shortLabel: "Tapas",
    description: "Markets, tapas bars and authentic Murcian cuisine — the tastiest way to spend a Cartagena port day.",
    href: "/cartagena-food-tapas-guide",
    cta: "Food guides",
  },
  {
    id: "diy",
    label: "DIY walker",
    shortLabel: "Walk it",
    description: "Cartagena's compact old town rewards independent exploration — harbour routes, castle lifts and Roman lanes on foot.",
    href: "/cartagena-old-town-walking-guide",
    cta: "Walking guides",
  },
];

export interface HomeSection {
  slug: string;
  number: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export const coreSections: HomeSection[] = [
  { slug: "shore-excursions", number: "01", title: "Shore Excursions", description: "Roman Highlights, walking tours, tapas, Murcia, kayaking and private experiences — with honest Editor's Choice guidance.", href: "/shore-excursions", cta: "Browse excursions" },
  { slug: "cruise-port-guide", number: "02", title: "Cartagena Cruise Port Guide", description: "Muelle Alfonso XII terminal, walking distances, Roman sights from the ship and return-to-ship timing.", href: "/cruise-port-guide", cta: "Read the guide" },
  { slug: "roman", number: "03", title: "Roman Cartagena", description: "Theatre, Forum, Punic Wall and why Roman Highlights is our Editor's Choice for first-time visitors.", href: "/roman-theatre-cartagena", cta: "Roman guides" },
  { slug: "planner", number: "04", title: "Cartagena Cruise Planner", description: "Enter ship times, interests and mobility — get tailored itineraries with return-to-ship confidence.", href: "/cruise-planner", cta: "Start planning" },
  { slug: "one-day", number: "05", title: "One Day in Cartagena", description: "Roman Cartagena, tapas afternoons, Murcia excursions and easy walking days matched to your port window.", href: "/one-day-in-cartagena-from-a-cruise-ship", cta: "See day plans" },
  { slug: "schedules", number: "06", title: "Cruise Ship Schedules", description: "Year and month schedule views ready for CSV imports — see which ships share your port day.", href: "/ship-schedules", cta: "Check schedules" },
  { slug: "guides", number: "07", title: "Cartagena Authority Guides", description: "Murcia, tapas, beaches, kayaking, maritime history and independent vs ship excursions — practical cruise passenger advice.", href: "/best-things-to-do-in-cartagena-from-a-cruise-ship", cta: "Read guides" },
  { slug: "faq", number: "08", title: "FAQ", description: "Common Cartagena cruise questions — walking distances, Roman tickets, Murcia timing and return buffers.", href: "/faq", cta: "View FAQ" },
];

export function getHomepageFaqs(): FAQ[] {
  return [
    {
      question: "Where do cruise ships dock in Cartagena, Spain?",
      answer:
        "Most ships berth at Muelle Alfonso XII on the naval port waterfront, within walking distance of the old town and Roman Theatre. See our Cartagena Cruise Port Guide for terminal details and walking times.",
    },
    {
      question: "What is the best thing to do in Cartagena on a cruise port day?",
      answer:
        "For most first-timers it is the Roman Theatre and Forum district — book timed entry or take Roman Highlights, our Editor's Choice. Food lovers should add a tapas stop; confident walkers can follow our Old Town Walking Guide. Our Cruise Planner tailors this to your hours ashore.",
    },
    {
      question: "What is Roman Highlights and why is it your Editor's Choice?",
      answer:
        "Cartagena Roman Highlights is our flagship small-group excursion covering the Roman Theatre, Forum area and harbour views. We recommend it after comparing ship tours, DIY routes and independent operators — not marketing, but the experience we would genuinely suggest for first-time visitors.",
    },
    {
      question: "How much time do I need to get back to my ship?",
      answer:
        "Allow 45 minutes buffer for old-town walking and Roman sights. Murcia and coastal kayaking need 60–75 minutes. Cartagena's compact layout makes return timing easier than most Mediterranean ports.",
    },
    {
      question: "Can I do Murcia and Cartagena Roman sights on the same port day?",
      answer:
        "Not comfortably on a standard call. Murcia is 45–60 minutes each way — choose Murcia for a full inland day or stay in Cartagena for Roman archaeology and tapas. See our Murcia from Cartagena guide.",
    },
  ];
}
