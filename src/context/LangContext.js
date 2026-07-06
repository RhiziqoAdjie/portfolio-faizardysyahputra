"use client";

import { createContext, useContext, useEffect, useState } from "react";
import translations from "@/lib/translations";

const LangContext = createContext(undefined);

function getNested(obj, keyPath) {
  return keyPath.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-lang");
    if (stored) setLang(stored);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-lang", lang);
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "id" : "en"));

  const t = (keyPath) => {
    const value = getNested(translations[lang], keyPath);
    return value !== undefined ? value : keyPath;
  };

  // Helper to pick a bilingual content field like { title_en, title_id }
  const pick = (obj, baseKey) => {
    if (!obj) return "";
    return obj[`${baseKey}_${lang}`] ?? obj[`${baseKey}_en`] ?? "";
  };

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t, pick }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
