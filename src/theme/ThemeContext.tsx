import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ThemeMode = "system" | "light" | "dark";

type ThemeContextValue = {
  mode: ThemeMode;              
  resolved: "light" | "dark";  
  setMode: (m: ThemeMode) => void;
  toggle: () => void;          
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(mode: ThemeMode): "light" | "dark" {
  return mode === "system" ? getSystemTheme() : mode;
}

const STORAGE_KEY = "theme-mode";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    return saved ?? "system";
  });

  const [resolved, setResolved] = useState<"light" | "dark">(() => resolveTheme(mode));

  useEffect(() => {
    const next = resolveTheme(mode);
    setResolved(next);

    document.documentElement.dataset.theme = next;

    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

useEffect(() => {
    if (mode !== "system") return;

    const mql: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    const onChange = (e: MediaQueryListEvent) => {
        const next = e.matches ? "dark" : "light";
        setResolved(next);
        document.documentElement.dataset.theme = next;
    };

    mql.addEventListener("change", onChange);

    return () => {
        mql.removeEventListener("change", onChange);
    };
}, [mode]);


  useEffect(() => {
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  const value = useMemo<ThemeContextValue>(() => {
    return {
      mode,
      resolved,
      setMode: setModeState,
      toggle: () => {
        if (mode === "system") return setModeState("dark");
        setModeState(mode === "dark" ? "light" : "dark");
      },
    };
  }, [mode, resolved]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
