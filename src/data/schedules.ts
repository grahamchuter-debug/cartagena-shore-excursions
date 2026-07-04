import type { ScheduleEntry, ShipSchedulePort } from "./types";
import {
  filterEntriesByMonth,
  filterEntriesByYear,
  getMonthsWithEntries,
  type ScheduleYear,
} from "@/lib/schedule-utils";
import cartagenaSchedule from "./imported-schedules/cartagena.json";

const SCHEDULE_FAQS = [
  {
    question: "How accurate are the Cartagena cruise ship schedules?",
    answer:
      "Schedules are compiled from published cruise timetables and updated periodically. Times, terminals and dates can change, so always confirm your arrival and departure with your cruise line before booking shore excursions.",
  },
  {
    question: "Where do cruise ships dock in Cartagena, Spain?",
    answer:
      "Most ships berth at Muelle Alfonso XII on the naval port waterfront, within walking distance of the old town and Roman Theatre. Your cruise documents confirm the exact berth.",
  },
  {
    question: "Why check ship schedules before booking Cartagena excursions?",
    answer:
      "Multi-ship days increase queues at the Roman Theatre and popular restaurants. Knowing how many vessels share your port day helps you choose between a guided tour, an early DIY start or a relaxed walking day.",
  },
];

const SCHEDULE_TIPS = [
  "Check how many ships are in port before booking Roman Theatre tickets",
  "Confirm your berth at Muelle Alfonso XII or secondary quays",
  "Book Murcia excursions only on longer port days (8+ hours ashore)",
  "Compare your time in port before choosing kayaking or coastal tours",
];

export const schedulePorts: ShipSchedulePort[] = [
  {
    slug: "cartagena",
    name: "Cartagena",
    country: "Spain",
    seoTitle: "Cartagena Cruise Ship Schedule 2026 & 2027",
    metaDescription:
      "Cartagena cruise ship schedule hub. See which ships are in port and plan Roman Theatre visits, old-town walks and Murcia excursions around published arrival and departure times.",
    intro:
      "Cartagena is a major Western Mediterranean port of call with year-round cruise traffic. Check which ships are scheduled before you book Roman archaeology tours, tapas experiences or Murcia day trips.",
    description: "Walkable Roman port on Spain's Costa Cálida — one of the Mediterranean's easiest cruise calls.",
    scheduleOverview:
      "Cartagena sees peak cruise traffic from March through November, with winter calls from repositioning and Mediterranean itineraries.",
    planningTips: SCHEDULE_TIPS,
    faqs: SCHEDULE_FAQS,
  },
];

const scheduleData: Record<string, ScheduleEntry[]> = {
  cartagena: cartagenaSchedule as ScheduleEntry[],
};

export function getSchedulePortBySlug(slug: string): ShipSchedulePort | undefined {
  return schedulePorts.find((p) => p.slug === slug);
}

export function getAllSchedulePortSlugs(): string[] {
  return schedulePorts.map((p) => p.slug);
}

export function getScheduleEntries(slug: string): ScheduleEntry[] {
  return scheduleData[slug] ?? [];
}

export function getScheduleEntryCount(slug: string): number {
  return getScheduleEntries(slug).length;
}

export function getScheduleEntriesForYear(slug: string, year: ScheduleYear): ScheduleEntry[] {
  return filterEntriesByYear(getScheduleEntries(slug), year);
}

export function getScheduleEntriesForMonth(slug: string, monthKey: string): ScheduleEntry[] {
  return filterEntriesByMonth(getScheduleEntries(slug), monthKey);
}

export function getVerifiedMonthKeys(slug: string): string[] {
  return getMonthsWithEntries(getScheduleEntries(slug));
}

export function searchSchedulesByShip(query: string): { portSlug: string; entries: ScheduleEntry[] }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: { portSlug: string; entries: ScheduleEntry[] }[] = [];
  for (const port of schedulePorts) {
    const matches = getScheduleEntries(port.slug).filter(
      (e) => e.ship.toLowerCase().includes(q) || e.cruiseLine.toLowerCase().includes(q),
    );
    if (matches.length) results.push({ portSlug: port.slug, entries: matches });
  }
  return results;
}

export function getTodayTomorrowEntries(slug: string): { today: ScheduleEntry[]; tomorrow: ScheduleEntry[] } {
  const entries = getScheduleEntries(slug);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return {
    today: entries.filter((e) => e.date === fmt(today)),
    tomorrow: entries.filter((e) => e.date === fmt(tomorrow)),
  };
}
