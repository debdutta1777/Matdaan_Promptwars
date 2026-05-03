import { useEffect, useRef, useState } from "react";
import { MapPin, Check } from "lucide-react";
import { useLocation } from "./location-provider";
import { STATES } from "@/data/statePhases";

export function StateSelector({ compact = true }: { compact?: boolean }) {
  const { stateCode, state, setStateCode } = useLocation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const states = STATES.filter((s) => s.type === "state");
  const uts = STATES.filter((s) => s.type === "ut");

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Choose your state"
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-border bg-card/60 hover:bg-card text-foreground/80 hover:text-foreground transition text-xs font-medium max-w-[180px]"
      >
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        <span className={compact ? "hidden sm:inline truncate" : "truncate"}>
          {state ? state.name : "Your state"}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 max-h-[60vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-lg z-50">
          <div className="px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">States</div>
          {states.map((s) => (
            <Row key={s.code} name={s.name} phases={s.phases} active={s.code === stateCode}
              onClick={() => { setStateCode(s.code); setOpen(false); }} />
          ))}
          <div className="px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-t border-border/50 mt-1">Union Territories</div>
          {uts.map((s) => (
            <Row key={s.code} name={s.name} phases={s.phases} active={s.code === stateCode}
              onClick={() => { setStateCode(s.code); setOpen(false); }} />
          ))}
          {stateCode && (
            <button
              onClick={() => { setStateCode(null); setOpen(false); }}
              className="w-full px-4 py-2.5 text-xs text-left text-muted-foreground hover:bg-background/60 border-t border-border/50"
            >
              Clear selection
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Row({ name, phases, active, onClick }: { name: string; phases?: number[]; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-2 px-4 py-2 text-sm text-left hover:bg-background/60 transition ${active ? "text-foreground font-medium" : "text-foreground/75"}`}
    >
      <span className="truncate">{name}</span>
      <span className="flex items-center gap-2 shrink-0">
        <span className="text-[10px] font-mono text-muted-foreground">{phases?.length ? `P${phases.join(",")}` : "TBA"}</span>
        {active && <Check className="w-3.5 h-3.5 text-primary" />}
      </span>
    </button>
  );
}
