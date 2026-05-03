import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categoryLabel, electionEvents, type ElectionEvent } from "@/data/electionDates";
import { type ScheduleEvent } from "@/data/statePhases";
import { cn } from "@/lib/utils";
import { CalendarDays, MapPin, Globe2, Clock3, ExternalLink } from "lucide-react";
import { useLocation } from "@/components/location-provider";
import { StateSelector } from "@/components/state-selector";

export const Route = createFileRoute("/dates")({
  head: () => ({
    meta: [
      { title: "Key dates & deadlines — Matdaan" },
      { name: "description", content: "Visual timeline of Indian elections — personalized to your state. Verified against the official ECI schedule." },
      { property: "og:title", content: "Key dates & deadlines — Matdaan" },
      { property: "og:description", content: "Personalized state-wise election timeline." },
    ],
  }),
  component: DatesPage,
});

const categories: (ElectionEvent["category"] | "all")[] = ["all", "notification", "nomination", "campaign", "polling", "counting"];

const catGradient: Record<ElectionEvent["category"], string> = {
  notification: "var(--gradient-teal)",
  nomination: "var(--gradient-magenta)",
  campaign: "linear-gradient(135deg, oklch(0.6 0.05 280), oklch(0.5 0.06 270))",
  polling: "var(--gradient-saffron)",
  counting: "linear-gradient(135deg, oklch(0.7 0.22 340), oklch(0.78 0.18 60))",
};

function DatesPage() {
  const { state, setStateCode } = useLocation();
  const [filter, setFilter] = useState<ElectionEvent["category"] | "all">("all");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Source of truth: when a state with a schedule is selected, use it.
  // Otherwise fall back to the generic upcoming general-election timeline.
  const sourceEvents: (ElectionEvent | ScheduleEvent)[] = state?.schedule ?? electionEvents;
  const stateAnnounced = !state || !!state.schedule;

  const events = useMemo(() => {
    if (!stateAnnounced) return [];
    return sourceEvents.filter((e) => filter === "all" || e.category === filter);
  }, [filter, sourceEvents, stateAnnounced]);

  const banner = useMemo(() => {
    if (!state || !state.schedule) return null;
    const polls = state.schedule
      .filter((e) => e.category === "polling")
      .map((e) => ({ ...e, d: new Date(e.date) }));
    const counting = state.schedule.find((e) => e.category === "counting");
    const countingDate = counting ? new Date(counting.date) : null;

    const todayPoll = polls.find((e) => e.d.getTime() === today.getTime());
    const upcoming = polls.find((e) => e.d >= today);
    const allPast = polls.length > 0 && polls.every((e) => e.d < today);

    if (todayPoll) {
      return { tone: "live" as const, text: `Polling in ${state.name} is today${todayPoll.phaseNumber ? ` (Phase ${todayPoll.phaseNumber})` : ""}.` };
    }
    if (allPast) {
      if (countingDate && countingDate >= today) {
        const days = Math.round((countingDate.getTime() - today.getTime()) / 86400000);
        const when = days === 0 ? "today" : days === 1 ? "tomorrow" : `in ${days} days`;
        return { tone: "done" as const, text: `Polling in ${state.name} is complete. Counting & results ${when} (${countingDate.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}).` };
      }
      return { tone: "done" as const, text: `Polling in ${state.name} is complete.` };
    }
    if (upcoming) {
      const days = Math.round((upcoming.d.getTime() - today.getTime()) / 86400000);
      const when = days === 1 ? "tomorrow" : `in ${days} days`;
      return { tone: "upcoming" as const, text: `Your next polling day is ${when}${upcoming.phaseNumber ? ` — Phase ${upcoming.phaseNumber}` : ""} on ${upcoming.d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.` };
    }
    return null;
  }, [state, today]);

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="absolute top-10 right-0 -z-10 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-teal)" }} />

      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">/ Timeline</p>
        <h1 className="mt-3 text-5xl sm:text-6xl font-display tracking-tight leading-[0.95]">
          The election <span className="text-gradient-saffron">timeline</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
          A simple visual timeline of the election process. Pick your state to see the dates that actually apply to you.
        </p>
      </div>

      {/* Personalization */}
      {!state ? (
        <div className="glass rounded-3xl p-6 sm:p-7 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-primary/20">
          <div className="flex items-start gap-3">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground shrink-0"
              style={{ background: "var(--gradient-saffron)" }}>
              <MapPin className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-display text-xl">See dates for your state</h2>
              <p className="text-sm text-muted-foreground mt-1">Pick your state or UT to see the official, state-specific schedule.</p>
            </div>
          </div>
          <StateSelector compact={false} />
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-sm">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">{state.name}</span>
            {state.schedule && state.phases && (
              <span className="text-xs font-mono text-muted-foreground">· Phase{state.phases.length > 1 ? "s" : ""} {state.phases.join(", ")}</span>
            )}
          </span>
          <button
            onClick={() => setStateCode(null)}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition"
          >
            <Globe2 className="w-3.5 h-3.5" /> Change state
          </button>
        </div>
      )}

      {banner && (
        <div
          className={cn(
            "rounded-2xl p-5 mb-10 border text-sm sm:text-base",
            banner.tone === "live" && "border-primary/40 bg-primary/10 text-foreground",
            banner.tone === "done" && "border-border bg-card/60 text-foreground/85",
            banner.tone === "upcoming" && "border-secondary/40 bg-secondary/10 text-foreground",
          )}
        >
          {banner.tone === "live" && <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />}
          {banner.text}
        </div>
      )}

      {/* No-schedule state: show only the announcement-pending message */}
      {state && !state.schedule ? (
        <div className="glass rounded-3xl p-8 sm:p-10 border border-border/60 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
            style={{ background: "var(--gradient-teal)" }}>
            <Clock3 className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="font-display text-2xl sm:text-3xl">Dates yet to be announced</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            The Election Commission of India has not yet announced the polling schedule for{" "}
            <span className="text-foreground font-medium">{state.name}</span>. Please check the official ECI website
            for the latest updates.
          </p>
          <a
            href="https://www.eci.gov.in/"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition shadow-[var(--shadow-glow)]"
          >
            Visit eci.gov.in <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      ) : (
        <>
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  filter === c
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "glass hover:bg-card/80",
                )}
              >
                {c === "all" ? "All phases" : categoryLabel[c]}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <ol className="relative ml-4 space-y-5"
            style={{ borderLeft: "2px dashed oklch(0.3 0.025 270 / 0.6)" }}>
            {events.map((e) => {
              const d = new Date(e.date);
              const isPast = d < today;
              const isToday = d.getTime() === today.getTime();
              return (
                <li key={e.id} className="pl-10 relative">
                  <span className={cn(
                    "absolute -left-[13px] top-2 w-6 h-6 rounded-full border-4 border-background shadow-lg",
                    isToday && "animate-pulse",
                  )}
                  style={{ background: isPast ? "oklch(0.3 0.025 270)" : catGradient[e.category] }} />
                  <div className={cn(
                    "rounded-3xl p-6 sm:p-7 transition-all",
                    isPast ? "glass opacity-60" : "glass hover:border-primary/30 hover:-translate-y-0.5",
                  )}>
                    <div className="flex flex-wrap items-center gap-3 justify-between">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-primary-foreground"
                          style={{ background: catGradient[e.category] }}>
                          {categoryLabel[e.category]}
                        </span>
                        {isToday && <span className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">● Today</span>}
                        {isPast && !isToday && <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Past</span>}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-mono text-foreground/90">
                        <CalendarDays className="w-4 h-4 text-muted-foreground" />
                        {d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                    <h3 className="mt-4 text-2xl font-display">{e.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{e.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </div>
  );
}
