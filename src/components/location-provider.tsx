import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getState, type StateEntry } from "@/data/statePhases";

const STORAGE_KEY = "matdaan.state";

type Ctx = {
  stateCode: string | null;
  state: StateEntry | null;
  setStateCode: (code: string | null) => void;
};

const LocationContext = createContext<Ctx | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [stateCode, setCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCode(stored);
    } catch {}
  }, []);

  const setStateCode = (code: string | null) => {
    setCode(code);
    try {
      if (code) localStorage.setItem(STORAGE_KEY, code);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <LocationContext.Provider value={{ stateCode, state: getState(stateCode), setStateCode }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used inside LocationProvider");
  return ctx;
}
