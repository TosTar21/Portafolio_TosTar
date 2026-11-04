/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";

/** A value available in both languages */
export type Localized<T = string> = { en: T; es: T };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** pick the current-language value */
  tr: <T>(value: Localized<T>) => T;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "language";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* storage unavailable */
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const tr = useCallback(<T,>(value: Localized<T>) => value[lang], [lang]);

  return <LanguageContext.Provider value={{ lang, setLang, tr }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  return ctx;
}
