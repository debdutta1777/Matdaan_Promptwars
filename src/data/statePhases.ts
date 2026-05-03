// State / UT election schedules.
// Reference: ECI announcement dated March 15, 2026 for the 2026 Assembly
// Elections in Assam, Kerala, Puducherry, Tamil Nadu and West Bengal.
// Always re-verify with eci.gov.in.

export type ScheduleEvent = {
  id: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  category: "notification" | "nomination" | "campaign" | "polling" | "counting";
  description: string;
  phaseNumber?: number;
};

export type StateEntry = {
  code: string;
  name: string;
  type: "state" | "ut";
  /** Announced polling phase numbers (omit when not announced). */
  phases?: number[];
  /** Full schedule for this election cycle. Undefined when ECI hasn't announced it. */
  schedule?: ScheduleEvent[];
};

// Common counting day for the 2026 cycle
const COUNTING_DATE = "2026-05-04";

function buildSchedule(opts: {
  notification?: string;
  pollingDates: { phase?: number; date: string; label?: string }[];
}): ScheduleEvent[] {
  const events: ScheduleEvent[] = [];
  if (opts.notification) {
    events.push({
      id: "notification",
      title: "Election schedule announced",
      date: opts.notification,
      category: "notification",
      description: "Election Commission of India announces the schedule and the Model Code of Conduct comes into effect.",
    });
  }
  opts.pollingDates.forEach((p, i) => {
    const suffix = p.phase ? ` — Phase ${p.phase}` : "";
    events.push({
      id: `polling-${i + 1}`,
      title: `Polling${suffix}`,
      date: p.date,
      category: "polling",
      phaseNumber: p.phase,
      description: p.label ?? (p.phase ? `Phase ${p.phase} of voting.` : "Single-phase polling day."),
    });
  });
  events.push({
    id: "counting",
    title: "Counting & results",
    date: COUNTING_DATE,
    category: "counting",
    description: "Votes counted and results declared.",
  });
  return events;
}

const ANNOUNCEMENT = "2026-03-15";

export const STATES: StateEntry[] = [
  // ── Announced for 2026 ─────────────────────────────────────────────
  {
    code: "AS", name: "Assam", type: "state", phases: [1],
    schedule: buildSchedule({
      notification: ANNOUNCEMENT,
      pollingDates: [{ date: "2026-04-09", label: "Single-phase polling for all 126 Assembly constituencies." }],
    }),
  },
  {
    code: "KL", name: "Kerala", type: "state", phases: [1],
    schedule: buildSchedule({
      notification: ANNOUNCEMENT,
      pollingDates: [{ date: "2026-04-09", label: "Single-phase polling for all 140 Assembly constituencies." }],
    }),
  },
  {
    code: "TN", name: "Tamil Nadu", type: "state", phases: [1],
    schedule: buildSchedule({
      notification: ANNOUNCEMENT,
      pollingDates: [{ date: "2026-04-23", label: "Single-phase polling for all 234 Assembly constituencies." }],
    }),
  },
  {
    code: "WB", name: "West Bengal", type: "state", phases: [1, 2],
    schedule: buildSchedule({
      notification: ANNOUNCEMENT,
      pollingDates: [
        { phase: 1, date: "2026-04-23", label: "Phase 1 — 152 of 294 Assembly constituencies." },
        { phase: 2, date: "2026-04-29", label: "Phase 2 — remaining 142 Assembly constituencies." },
      ],
    }),
  },
  {
    code: "PY", name: "Puducherry", type: "ut", phases: [1],
    schedule: buildSchedule({
      notification: ANNOUNCEMENT,
      pollingDates: [{ date: "2026-04-09", label: "Single-phase polling for all 30 Assembly constituencies." }],
    }),
  },

  // ── Not yet announced ──────────────────────────────────────────────
  { code: "AP", name: "Andhra Pradesh", type: "state" },
  { code: "AR", name: "Arunachal Pradesh", type: "state" },
  { code: "BR", name: "Bihar", type: "state" },
  { code: "CG", name: "Chhattisgarh", type: "state" },
  { code: "GA", name: "Goa", type: "state" },
  { code: "GJ", name: "Gujarat", type: "state" },
  { code: "HR", name: "Haryana", type: "state" },
  { code: "HP", name: "Himachal Pradesh", type: "state" },
  { code: "JH", name: "Jharkhand", type: "state" },
  { code: "KA", name: "Karnataka", type: "state" },
  { code: "MP", name: "Madhya Pradesh", type: "state" },
  { code: "MH", name: "Maharashtra", type: "state" },
  { code: "MN", name: "Manipur", type: "state" },
  { code: "ML", name: "Meghalaya", type: "state" },
  { code: "MZ", name: "Mizoram", type: "state" },
  { code: "NL", name: "Nagaland", type: "state" },
  { code: "OD", name: "Odisha", type: "state" },
  { code: "PB", name: "Punjab", type: "state" },
  { code: "RJ", name: "Rajasthan", type: "state" },
  { code: "SK", name: "Sikkim", type: "state" },
  { code: "TS", name: "Telangana", type: "state" },
  { code: "TR", name: "Tripura", type: "state" },
  { code: "UP", name: "Uttar Pradesh", type: "state" },
  { code: "UK", name: "Uttarakhand", type: "state" },
  { code: "AN", name: "Andaman & Nicobar Islands", type: "ut" },
  { code: "CH", name: "Chandigarh", type: "ut" },
  { code: "DN", name: "Dadra & Nagar Haveli and Daman & Diu", type: "ut" },
  { code: "DL", name: "Delhi", type: "ut" },
  { code: "JK", name: "Jammu & Kashmir", type: "ut" },
  { code: "LA", name: "Ladakh", type: "ut" },
  { code: "LD", name: "Lakshadweep", type: "ut" },
];

export function getState(code: string | null): StateEntry | null {
  if (!code) return null;
  return STATES.find((s) => s.code === code) ?? null;
}
