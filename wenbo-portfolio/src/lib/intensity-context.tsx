"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type IntensityMode = "standard" | "overdrive";

interface IntensityContextType {
  mode: IntensityMode;
  toggle: () => void;
  isOverdrive: boolean;
  /** Multiplier: 1 for standard, ~1.6 for overdrive */
  multiplier: number;
}

const IntensityContext = createContext<IntensityContextType>({
  mode: "standard",
  toggle: () => {},
  isOverdrive: false,
  multiplier: 1,
});

export function IntensityProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<IntensityMode>("standard");

  const toggle = useCallback(() => {
    setMode((prev) => (prev === "standard" ? "overdrive" : "standard"));
  }, []);

  const isOverdrive = mode === "overdrive";
  const multiplier = isOverdrive ? 1.6 : 1;

  return (
    <IntensityContext.Provider value={{ mode, toggle, isOverdrive, multiplier }}>
      {children}
    </IntensityContext.Provider>
  );
}

export const useIntensity = () => useContext(IntensityContext);
