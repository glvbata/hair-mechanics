/**
 * Live open/closed status for the shop.
 *
 * Why this exists: GSC shows ~10 queries in the "open now" family ranking at
 * positions 2–5 — `barbershops open now`, `haircut near me open now`,
 * `barber shops open near me`. `haircuts open near me` sits at 2.6 with a 20%
 * CTR, the best-converting non-brand query on the site. Those searchers want one
 * fact: are you open right now? The site previously only listed hours and made
 * them do the arithmetic.
 *
 * Everything derives from HOURS in constants/business.ts — change hours there
 * and this follows, along with the JSON-LD openingHoursSpecification.
 *
 * Timezone: hours are shop-local (Pacific). A visitor in another timezone — or a
 * prerender running on a UTC build box — must still see Auburn's clock, so all
 * arithmetic happens in America/Los_Angeles rather than the runtime's zone.
 */

import { HOURS } from '../constants/business';

const TZ = 'America/Los_Angeles';

/** "10:00" -> 600 (minutes past midnight). */
const toMinutes = (hhmm: string): number => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const WEEKDAY_OPEN = toMinutes(HOURS.weekdayOpen);
const WEEKEND_OPEN = toMinutes(HOURS.weekendOpen);
const CLOSE = toMinutes(HOURS.close);

/** Sunday = 0 … Saturday = 6, matching Date.getDay(). */
const DAY_INDEX: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

/** Sat/Sun open earlier than Mon–Fri. */
const openingFor = (day: number): number =>
  day === 0 || day === 6 ? WEEKEND_OPEN : WEEKDAY_OPEN;

/** 600 -> "10 AM", 1230 -> "8:30 PM". Drops ":00" for the common case. */
export const formatTime = (minutes: number): string => {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
};

/** The shop's own wall clock, regardless of where the visitor or build box is. */
const shopClock = (now: Date): { day: number; minutes: number } => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TZ,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';

  // hourCycle h23 can report midnight as "24" — normalise so 24:15 isn't
  // treated as later than closing time.
  const hour = Number(get('hour')) % 24;

  return {
    day: DAY_INDEX[get('weekday')] ?? 0,
    minutes: hour * 60 + Number(get('minute')),
  };
};

export interface OpenStatus {
  isOpen: boolean;
  /** Short human label, e.g. "Open now — until 8 PM" / "Closed — opens 10 AM". */
  label: string;
  /** Set while open: closing time, e.g. "8 PM". */
  closesAt?: string;
  /** Set while closed: next opening, e.g. "10 AM" or "8 AM tomorrow". */
  opensAt?: string;
}

export const getOpenStatus = (now: Date = new Date()): OpenStatus => {
  const { day, minutes } = shopClock(now);
  const opensToday = openingFor(day);

  if (minutes >= opensToday && minutes < CLOSE) {
    const closesAt = formatTime(CLOSE);
    return { isOpen: true, closesAt, label: `Open now — until ${closesAt}` };
  }

  // Before opening: today. After closing: tomorrow.
  const beforeOpen = minutes < opensToday;
  const nextDay = beforeOpen ? day : (day + 1) % 7;
  const nextOpen = formatTime(openingFor(nextDay));
  const opensAt = beforeOpen ? nextOpen : `${nextOpen} tomorrow`;

  return { isOpen: false, opensAt, label: `Closed — opens ${opensAt}` };
};
