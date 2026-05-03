import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { TRANSLATIONS, LANGUAGES, type LangCode, type Translation } from "@/data/translations";

const STORAGE_KEY = "matdaan.lang";

type Ctx = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: Translation;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LangCode | null;
      if (stored && TRANSLATIONS[stored]) setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

export { LANGUAGES };
