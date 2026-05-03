import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { walkthroughSteps } from "@/data/walkthrough";
import { CheckCircle2, Circle, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/walkthrough")({
  head: () => ({
    meta: [
      { title: "Guided walkthrough — Matdaan" },
      { name: "description", content: "A seven-step walkthrough of India's election process for first-time voters. Track your progress as you go." },
      { property: "og:title", content: "Guided walkthrough — Matdaan" },
      { property: "og:description", content: "Seven friendly steps through India's election process." },
    ],
  }),
  component: WalkthroughPage,
});

const STORAGE_KEY = "matdaan.walkthrough.done.v1";

function WalkthroughPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [active, setActive] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {}
  }, [done]);

  const step = walkthroughSteps[active];
  const completedCount = useMemo(
    () => walkthroughSteps.filter((s) => done[s.id]).length,
    [done],
  );
  const pct = Math.round((completedCount / walkthroughSteps.length) * 100);

  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  return (
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      {/* Ambient orb */}
      <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-saffron)" }} />

      <div className="mb-10">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary">/ Walkthrough</p>
        <h1 className="mt-3 text-5xl sm:text-6xl font-display tracking-tight leading-[0.95]">
          Seven steps to your <span className="text-gradient-saffron">first vote</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl text-lg">Go at your own pace. Tick off each step as you complete it — your progress is saved on this device.</p>
      </div>

      {/* Progress */}
      <div className="rounded-3xl glass p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold flex items-center gap-2">
            <span className="font-mono text-xs text-secondary">PROGRESS</span>
          </p>
          <p className="text-sm font-mono text-muted-foreground">{completedCount} / {walkthroughSteps.length}</p>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700 relative overflow-hidden" style={{ width: `${pct}%`, background: "var(--gradient-saffron)" }}>
            <div className="absolute inset-0 animate-shimmer" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Step list */}
        <ol className="space-y-2">
          {walkthroughSteps.map((s, i) => {
            const isDone = !!done[s.id];
            const isActive = i === active;
            return (
              <li key={s.id}>
                <button
                  onClick={() => setActive(i)}
                  className={cn(
                    "w-full text-left rounded-2xl px-4 py-3.5 flex items-start gap-3 transition-all",
                    isActive ? "glass border-primary/40 shadow-[var(--shadow-glow)]" : "hover:bg-card/40 border border-transparent",
                  )}
                >
                  <span className={cn(
                    "shrink-0 mt-0.5 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-mono font-semibold",
                    isDone ? "text-primary-foreground" : isActive ? "bg-primary/20 text-primary" : "bg-muted text-foreground/70",
                  )} style={isDone ? { background: "var(--gradient-saffron)" } : undefined}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : `0${i + 1}`}
                  </span>
                  <span className="text-sm font-medium leading-snug pt-1">{s.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Step detail */}
        <article className="rounded-3xl glass p-7 sm:p-9">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-secondary">
            Step {String(active + 1).padStart(2, "0")} / {String(walkthroughSteps.length).padStart(2, "0")}
          </div>
          <h2 className="mt-3 text-4xl font-display tracking-tight">{step.title}</h2>
          <p className="mt-3 text-muted-foreground text-lg leading-relaxed">{step.summary}</p>

          <div className="mt-8">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.15em] text-secondary">What to know</h3>
            <ul className="mt-4 space-y-3 text-[0.95rem]">
              {step.details.map((d, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-foreground/90">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-[0.15em] text-secondary">Checklist</h3>
            <ul className="mt-4 space-y-2.5">
              {step.checklist.map((c, i) => (
                <li key={i} className="flex gap-2.5 items-start text-[0.95rem]">
                  <Circle className="w-4 h-4 mt-1 text-muted-foreground shrink-0" />
                  <span className="text-foreground/90">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {step.tip && (
            <div className="mt-8 rounded-2xl bg-secondary/10 border border-secondary/30 p-5 flex gap-3">
              <Lightbulb className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <p className="text-sm leading-relaxed"><span className="font-semibold text-secondary">Tip — </span>{step.tip}</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-3 justify-between">
            <button
              onClick={() => toggle(step.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all",
                done[step.id]
                  ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                  : "glass hover:bg-card/80",
              )}
            >
              <CheckCircle2 className="w-4 h-4" />
              {done[step.id] ? "Marked as done" : "Mark as done"}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
                className="inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-sm glass disabled:opacity-30 hover:bg-card/80 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                onClick={() => setActive((a) => Math.min(walkthroughSteps.length - 1, a + 1))}
                disabled={active === walkthroughSteps.length - 1}
                className="inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-sm bg-primary text-primary-foreground disabled:opacity-30 hover:opacity-90 transition"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
