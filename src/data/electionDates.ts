// Edit this file to reflect the current election cycle.
// Dates are indicative placeholders — always verify with eci.gov.in.

export type ElectionEvent = {
  id: string;
  title: string;
  date: string; // ISO YYYY-MM-DD
  category: "notification" | "nomination" | "campaign" | "polling" | "counting";
  description: string;
  phaseNumber?: number;
};

export const electionEvents: ElectionEvent[] = [
  {
    id: "notification",
    title: "Election notification issued",
    date: "2029-03-16",
    category: "notification",
    description: "Election Commission of India announces the schedule; Model Code of Conduct comes into effect.",
  },
  {
    id: "nomination-start",
    title: "Nominations open",
    date: "2029-03-20",
    category: "nomination",
    description: "Candidates begin filing their nomination papers.",
  },
  {
    id: "nomination-end",
    title: "Last day for nominations",
    date: "2029-03-27",
    category: "nomination",
    description: "Final date to submit nomination papers for Phase 1.",
  },
  {
    id: "scrutiny",
    title: "Scrutiny of nominations",
    date: "2029-03-28",
    category: "nomination",
    description: "Returning officers verify nomination papers.",
  },
  {
    id: "withdrawal",
    title: "Last day to withdraw",
    date: "2029-03-30",
    category: "nomination",
    description: "Candidates may withdraw their nominations by this date.",
  },
  {
    id: "campaign",
    title: "Campaigning period",
    date: "2029-03-30",
    category: "campaign",
    description: "Official campaigning runs until 48 hours before polling.",
  },
  {
    id: "phase-1",
    title: "Phase 1 — Polling",
    date: "2029-04-19",
    category: "polling",
    description: "First phase of voting across select constituencies.",
    phaseNumber: 1,
  },
  {
    id: "phase-2",
    title: "Phase 2 — Polling",
    date: "2029-04-26",
    category: "polling",
    description: "Second phase of voting.",
    phaseNumber: 2,
  },
  {
    id: "phase-3",
    title: "Phase 3 — Polling",
    date: "2029-05-07",
    category: "polling",
    description: "Third phase of voting.",
    phaseNumber: 3,
  },
  {
    id: "phase-4",
    title: "Phase 4 — Polling",
    date: "2029-05-13",
    category: "polling",
    description: "Fourth phase of voting.",
    phaseNumber: 4,
  },
  {
    id: "phase-5",
    title: "Phase 5 — Polling",
    date: "2029-05-20",
    category: "polling",
    description: "Fifth phase of voting.",
    phaseNumber: 5,
  },
  {
    id: "phase-6",
    title: "Phase 6 — Polling",
    date: "2029-05-25",
    category: "polling",
    description: "Sixth phase of voting.",
    phaseNumber: 6,
  },
  {
    id: "phase-7",
    title: "Phase 7 — Polling",
    date: "2029-06-01",
    category: "polling",
    description: "Final phase of voting.",
    phaseNumber: 7,
  },
  {
    id: "counting",
    title: "Counting & results",
    date: "2029-06-04",
    category: "counting",
    description: "Votes are counted and results declared.",
  },
];

export const categoryLabel: Record<ElectionEvent["category"], string> = {
  notification: "Notification",
  nomination: "Nomination",
  campaign: "Campaign",
  polling: "Polling",
  counting: "Counting",
};
