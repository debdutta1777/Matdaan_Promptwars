import { useEffect, useRef, useState } from "react";
import { Languages, Check } from "lucide-react";
import { useLang, LANGUAGES } from "./language-provider";

export function LanguageSelector() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full border border-border bg-card/60 hover:bg-card text-foreground/80 hover:text-foreground transition text-xs font-medium"
      >
        <Languages className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{current.native}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-border bg-card shadow-lg overflow-hidden z-50">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left hover:bg-background/60 transition ${l.code === lang ? "text-foreground font-medium" : "text-foreground/70"}`}
            >
              <span><span className="font-medium">{l.native}</span> <span className="text-muted-foreground text-xs">· {l.label}</span></span>
              {l.code === lang && <Check className="w-3.5 h-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
