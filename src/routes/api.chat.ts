import { createFileRoute } from "@tanstack/react-router";
import { STATES } from "@/data/statePhases";

const BASE_PROMPT = `You are Matdaan, a friendly, patient assistant helping first-time voters in India understand the election process.

Guidelines:
- Focus on India's elections (Lok Sabha, Rajya Sabha, Vidhan Sabha, local bodies). If asked about other countries, briefly redirect to India.
- Speak simply and warmly. Assume the user is a first-time voter and may not know Indian election jargon. Explain acronyms (ECI, EPIC, MCC, EVM, VVPAT, NVSP, NOTA, etc.) the first time you use them.
- Be accurate. When a process has changed recently or depends on the state, say "check the official source" and point to eci.gov.in or voters.eci.gov.in.
- Never recommend who to vote for. Never express political opinions or favor any party, candidate, ideology, religion, or community. If asked, politely decline and redirect to factual process information.
- Never share misinformation. If unsure, say so.
- Use short paragraphs, bullet points, and bold important terms. Keep answers concise (under ~250 words) unless the user asks for more detail.
- When relevant, suggest the user's next step (e.g. "You can register on voters.eci.gov.in").

LIVE VOTING PHASES — use the SCHEDULE CONTEXT below as the source of truth when the user asks about polling dates, phases, counting, or "when does X vote". Compare against TODAY's date (also given below) to say whether a phase is upcoming, today, or already over. If a state isn't listed in the schedule, tell the user the ECI hasn't announced its dates yet and link to eci.gov.in. Never invent dates.`;

function buildScheduleContext(userStateCode?: string | null) {
  const today = new Date().toISOString().slice(0, 10);
  const announced = STATES.filter((s) => s.schedule);
  const lines: string[] = [];
  lines.push(`TODAY: ${today}`);
  if (userStateCode) {
    const s = STATES.find((x) => x.code === userStateCode);
    if (s) lines.push(`USER'S SELECTED STATE: ${s.name} (${s.code})${s.schedule ? "" : " — schedule not yet announced"}`);
  }
  lines.push("\nANNOUNCED 2026 ASSEMBLY ELECTION SCHEDULE (source: ECI announcement 15 Mar 2026):");
  for (const s of announced) {
    lines.push(`\n• ${s.name} (${s.code}):`);
    for (const e of s.schedule!) {
      lines.push(`   - ${e.date} — ${e.title}: ${e.description}`);
    }
  }
  const tba = STATES.filter((s) => !s.schedule).map((s) => `${s.name} (${s.code})`);
  lines.push(`\nSTATES/UTs WITH NO ANNOUNCED SCHEDULE YET: ${tba.join(", ")}`);
  return `\n\n=== SCHEDULE CONTEXT ===\n${lines.join("\n")}\n=== END SCHEDULE CONTEXT ===`;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages, stateCode } = (await request.json()) as {
            messages: { role: "user" | "assistant"; content: string }[];
            stateCode?: string | null;
          };

          const AI_API_KEY = process.env.AI_API_KEY;
          if (!AI_API_KEY) {
            return new Response(
              JSON.stringify({ error: "AI service is not configured." }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          const systemPrompt = BASE_PROMPT + buildScheduleContext(stateCode);

          const gatewayUrl = process.env.AI_GATEWAY_URL || "https://api.openai.com/v1/chat/completions";
          const upstream = await fetch(gatewayUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${AI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gemini-2.5-flash",
              messages: [
                { role: "system", content: systemPrompt },
                ...messages,
              ],
              stream: true,
            }),
          });

          if (!upstream.ok) {
            if (upstream.status === 429) {
              return new Response(
                JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
                { status: 429, headers: { "Content-Type": "application/json" } },
              );
            }
            if (upstream.status === 402) {
              return new Response(
                JSON.stringify({ error: "AI credits exhausted. Please check your API key and billing." }),
                { status: 402, headers: { "Content-Type": "application/json" } },
              );
            }
            const text = await upstream.text();
            console.error("AI gateway error:", upstream.status, text);
            return new Response(
              JSON.stringify({ error: "AI service error. Please try again." }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          return new Response(upstream.body, {
            headers: { "Content-Type": "text/event-stream" },
          });
        } catch (e) {
          console.error("/api/chat error:", e);
          return new Response(
            JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});
