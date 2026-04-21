import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Lang, TKey } from "./translations";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string; toggle: () => void };

const LangContext = createContext<Ctx | null>(null);

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("fr");
  const t = (k: TKey) => translations[lang][k];
  const toggle = () => setLang(lang === "fr" ? "en" : "fr");
  return <LangContext.Provider value={{ lang, setLang, t, toggle }}>{children}</LangContext.Provider>;
};

export const useLang = () => {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang must be inside LangProvider");
  return c;
};
