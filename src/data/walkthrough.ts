export type WalkthroughStep = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  checklist: string[];
  tip?: string;
};

export const walkthroughSteps: WalkthroughStep[] = [
  {
    id: "eligibility",
    title: "Am I eligible to vote?",
    summary: "Check the basic criteria before anything else.",
    details: [
      "You must be a citizen of India.",
      "You must be at least 18 years old on the qualifying date (1st January of the year).",
      "You must be an ordinary resident of the constituency where you want to register.",
    ],
    checklist: [
      "I am an Indian citizen",
      "I am 18 or older (or will be by the qualifying date)",
      "I live in the constituency where I want to register",
    ],
    tip: "If you just turned 18, you can still register — there's no upper deadline, but earlier is better before the electoral roll closes for the next election.",
  },
  {
    id: "register",
    title: "Register as a voter",
    summary: "Fill Form 6 online or via the Voter Helpline app.",
    details: [
      "Go to voters.eci.gov.in or download the Voter Helpline app.",
      "Sign up, then fill Form 6 — the application for new voters.",
      "Upload a recent passport-size photo, a proof of age, and a proof of address.",
      "Submit and note your reference number to track status.",
    ],
    checklist: [
      "Recent passport photo (soft copy)",
      "Age proof (e.g. Aadhaar, PAN, birth certificate, 10th marksheet)",
      "Address proof (Aadhaar, passport, utility bill, rental agreement)",
      "Working mobile number and email",
    ],
    tip: "Aadhaar linking is voluntary but speeds up verification.",
  },
  {
    id: "epic",
    title: "Get your Voter ID (EPIC)",
    summary: "Track your application and collect your card.",
    details: [
      "After Form 6 is submitted, a Booth Level Officer (BLO) may visit to verify.",
      "You'll receive SMS/email updates on status.",
      "Once approved, download the e-EPIC (digital Voter ID) or collect the physical card from your BLO.",
    ],
    checklist: [
      "Track status at voters.eci.gov.in using your reference number",
      "Respond to BLO verification if contacted",
      "Download e-EPIC once approved",
    ],
    tip: "Your EPIC number is permanent — save it somewhere safe.",
  },
  {
    id: "booth",
    title: "Find your polling booth",
    summary: "Know exactly where to go on election day.",
    details: [
      "Use the 'Know Your Polling Station' tool on voters.eci.gov.in.",
      "Your booth is decided by your registered address, not your preference.",
      "Note the part number and serial number — it makes things quicker at the booth.",
    ],
    checklist: [
      "Confirmed polling booth address",
      "Noted my part number & serial number",
      "Planned how I'll get there on election day",
    ],
  },
  {
    id: "phases",
    title: "Understand phases & code of conduct",
    summary: "India votes in phases — your date depends on your constituency.",
    details: [
      "General elections to the Lok Sabha happen in multiple phases over several weeks.",
      "Once the Model Code of Conduct (MCC) kicks in, campaigning rules apply to all parties.",
      "The last 48 hours before polling — the 'silence period' — ban public campaigning.",
    ],
    checklist: [
      "I know my constituency's polling date",
      "I've checked the official notification on eci.gov.in",
    ],
    tip: "State elections follow a similar process but on a state-specific schedule.",
  },
  {
    id: "voting-day",
    title: "Election day — what to expect",
    summary: "What to bring, how EVMs & VVPAT work.",
    details: [
      "Carry your EPIC or any of the approved alternate IDs (Aadhaar, PAN, passport, driving licence, etc.).",
      "Your finger will be inked — this prevents double voting.",
      "Press the button on the EVM next to your chosen candidate. A VVPAT slip will briefly show your vote before dropping into a sealed box.",
      "You can press NOTA (None of the Above) if you don't want to vote for any candidate.",
    ],
    checklist: [
      "EPIC or alternate photo ID",
      "Voter slip (optional, helps locate your name faster)",
      "Know your part number and serial number",
    ],
    tip: "You don't need a voter slip to vote — your EPIC alone is enough.",
  },
  {
    id: "after",
    title: "Counting & results",
    summary: "What happens after you vote.",
    details: [
      "EVMs are sealed and stored securely until counting day.",
      "Counting typically happens on a single day for all phases together.",
      "A party or alliance with a majority in the Lok Sabha forms the government; the President invites the leader to take oath as Prime Minister.",
    ],
    checklist: [
      "I know when results will be announced",
      "I understand how government formation works",
    ],
  },
];
