import { useEffect, useMemo, useState } from "react";
import { MapPin, Search, X, Check } from "lucide-react";
import { useLocation } from "./location-provider";
import { STATES } from "@/data/statePhases";

const DISMISS_KEY = "matdaan.locationPrompt.dismissed";

export function LocationPrompt() {
  const { stateCode, setStateCode } = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Show only when no state is selected and the user hasn't dismissed before
    try {
      const dismissed = localStorage.getItem(DISMISS_KEY) === "1";
      if (!stateCode && !dismissed) {
        // Small delay so it doesn't flash during hydration
        const t = setTimeout(() => setOpen(true), 400);
        return () => clearTimeout(t);
      }
    } catch {}
  }, [stateCode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STATES;
    return STATES.filter((s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
  }, [query]);

  const states = filtered.filter((s) => s.type === "state");
  const uts = filtered.filter((s) => s.type === "ut");

  const close = (dismiss = true) => {
    setOpen(false);
    if (dismiss) {
      try { localStorage.setItem(DISMISS_KEY, "1"); } catch {}
    }
  };

  const choose = (code: string) => {
    setStateCode(code);
    close();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-background/70 backdrop-blur-md"
        onClick={() => close()}
        aria-hidden
      />
      <div className="relative w-full sm:max-w-lg bg-card border border-border rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="p-6 sm:p-7 border-b border-border/60">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-primary-foreground shrink-0"
                style={{ background: "var(--gradient-saffron)" }}
              >
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-secondary">/ Welcome</p>
                <h2 className="mt-1 font-display text-2xl leading-tight">Where do you vote?</h2>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  India votes in up to 7 phases on different dates. Pick your state so we show the polling day, deadlines and results that actually apply to you.
                </p>
              </div>
            </div>
            <button
              onClick={() => close()}
              aria-label="Close"
              className="text-muted-foreground hover:text-foreground transition shrink-0 -mr-1 -mt-1 p-1 rounded-full hover:bg-background/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 60))}
              placeholder="Search your state or UT…"
              className="w-full h-11 pl-10 pr-4 rounded-full border border-border bg-background/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition"
            />
          </div>
        </div>

        <div className="max-h-[45vh] overflow-y-auto px-2 py-2">
          {states.length > 0 && (
            <>
              <div className="px-4 pt-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">States</div>
              {states.map((s) => (
                <Row key={s.code} name={s.name} phases={s.phases} active={s.code === stateCode} onClick={() => choose(s.code)} />
              ))}
            </>
          )}
          {uts.length > 0 && (
            <>
              <div className="px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-t border-border/50 mt-1">Union Territories</div>
              {uts.map((s) => (
                <Row key={s.code} name={s.name} phases={s.phases} active={s.code === stateCode} onClick={() => choose(s.code)} />
              ))}
            </>
          )}
          {states.length === 0 && uts.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">No matches for "{query}".</div>
          )}
        </div>

        <div className="p-4 sm:p-5 border-t border-border/60 flex items-center justify-between gap-3 bg-background/40">
          <p className="text-xs text-muted-foreground">You can change this later in the header.</p>
          <button
            onClick={() => close()}
            className="text-xs font-medium text-foreground/70 hover:text-foreground transition px-3 py-2 rounded-full hover:bg-card"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ name, phases, active, onClick }: { name: string; phases?: number[]; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left rounded-xl hover:bg-background/60 transition ${active ? "text-foreground font-medium bg-background/40" : "text-foreground/80"}`}
    >
      <span className="truncate">{name}</span>
      <span className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] font-mono text-muted-foreground">{phases?.length ? `P${phases.join(",")}` : "TBA"}</span>
        {active && <Check className="w-3.5 h-3.5 text-primary" />}
      </span>
    </button>
  );
}
