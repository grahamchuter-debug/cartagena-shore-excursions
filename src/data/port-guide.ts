import type { FAQ } from "./types";

export interface Terminal {
  name: string;
  quay: string;
  usedBy: string;
  cityAccess: string;
}

export const terminals: Terminal[] = [
  {
    name: "Muelle Alfonso XII — Cruise Terminal",
    quay: "Main cruise berth on the naval port waterfront",
    usedBy: "Most Mediterranean cruise ships calling at Cartagena",
    cityAccess: "10–15 min walk to Calle Mayor and the Roman Theatre district",
  },
  {
    name: "Muelle de la Curra",
    quay: "Secondary berths on the port",
    usedBy: "Occasional assignments and smaller vessels",
    cityAccess: "Similar walking distance to the old town — confirm your berth on arrival",
  },
  {
    name: "Tender operations",
    quay: "Anchorage in the Bay of Cartagena",
    usedBy: "Rare — when berths are full or for specific vessel types",
    cityAccess: "Tender to the waterfront — add 20–30 min each way versus a direct berth",
  },
];

export interface PortGuideSection {
  heading: string;
  paragraphs: string[];
}

export const portGuideSections: PortGuideSection[] = [
  {
    heading: "Why Cartagena is one of the Mediterranean's easiest cruise ports",
    paragraphs: [
      "Cartagena, Spain is a revelation for cruise passengers who expect a long shuttle ride and a generic resort town. The cruise terminal at Muelle Alfonso XII sits on the naval port waterfront, roughly 10–15 minutes on foot from Calle Mayor, the Roman Theatre and the compact old town. That walkability — combined with 3,000 years of layered history — makes Cartagena one of the most rewarding short port calls in the Western Mediterranean.",
      "Founded as Qart Hadasht by the Carthaginians and rebuilt as Carthago Nova by the Romans, the city served as Hannibal's base and later one of Rome's most important Spanish ports. Today you can walk from your ship to a first-century Roman theatre, Punic walls, Bourbon fortifications and a lively Spanish tapas culture without hiring a coach for the essentials.",
    ],
  },
  {
    heading: "Cruise terminal and passenger facilities",
    paragraphs: [
      "The Cartagena cruise terminal is functional rather than lavish — a working Spanish naval port adapted for passenger traffic. Expect basic services: toilets, some seating, taxi ranks outside and shore-excursion meeting points on the waterfront. Signage leads you toward the old town via the port promenade and Calle Real.",
      "On busy multi-ship days, allow an extra 15–20 minutes for immigration and terminal exit before your excursion departure time. Wi‑Fi is available in the terminal area; ATMs and cafés line the route toward the city centre within a few minutes' walk.",
    ],
  },
  {
    heading: "Walking distances and vertical geography",
    paragraphs: [
      "From the terminal, Calle Mayor and the Roman Theatre district are 10–15 minutes on foot along mostly flat promenades. The Roman Forum archaeological quarter and Punic Wall sit on the slopes above — lifts and tunnels connect levels, but expect some inclines. The Castle of the Conception crowns the hill with panoramic harbour views, reachable on foot (20–25 min uphill) or by lift from Gisbert Street.",
      "Murcia lies inland — approximately 45–60 minutes by road each way. It is a full-day excursion, not a morning add-on. Coastal kayaking and the outlying beaches at La Manga require transfers; the historic core does not.",
    ],
  },
  {
    heading: "Return-to-ship timing from Cartagena",
    paragraphs: [
      "Confirm your all-aboard time — usually 30–60 minutes before departure — and work backwards. Old-town walking and Roman Theatre visits need 45 minutes return buffer. Murcia excursions need 60–75 minutes because motorway traffic can slow afternoon returns. Kayaking and coastal tours need 60 minutes.",
      "Ship-run excursions guarantee the vessel waits if you are delayed on an official tour. Independent and small-group passengers must respect all-aboard times themselves. Reputable local operators track your ship's published departure; DIY walkers should head back via the port promenade with a comfortable margin.",
    ],
  },
];

export const portGuideFaqs: FAQ[] = [
  {
    question: "How far is the Roman Theatre from the Cartagena cruise port?",
    answer: "About 10–15 minutes on foot from Muelle Alfonso XII through the old town to the Roman Theatre. It is one of the closest major sights to the terminal in any Mediterranean port.",
  },
  {
    question: "Can I walk from the cruise ship to Cartagena old town?",
    answer: "Yes — the terminal is on the waterfront and the historic centre is compact and walkable. Wear comfortable shoes for cobbles and some uphill sections toward the castle.",
  },
  {
    question: "How long does it take to reach Murcia from Cartagena cruise port?",
    answer: "Approximately 45–60 minutes by road each way. Budget a full day for Murcia — it does not pair comfortably with a thorough Roman Cartagena visit on a standard port call.",
  },
  {
    question: "What facilities are at the Cartagena cruise terminal?",
    answer: "Basic terminal services — toilets, seating, taxi rank and excursion meeting points. Shops, ATMs and cafés are on the waterfront walk toward the city centre.",
  },
];
