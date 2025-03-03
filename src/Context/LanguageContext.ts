import { createContext } from "react";

export type Language = "es" | "en";

export interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);
