"use client";

import { useLang } from "@/context/LangContext";

export default function LangToggle() {
  const { lang, toggleLang } = useLang();

  return (
    <button
      onClick={toggleLang}
      aria-label="Switch language"
      title="Switch language / Ganti bahasa"
      className="flex h-9 items-center gap-1.5 rounded-md border border-steel/30 dark:border-cyanLine/30 px-2.5 text-xs font-mono font-medium text-steel dark:text-cyanLine hover:bg-steel/10 dark:hover:bg-cyanLine/10 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 14, height: 14 }}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9Z" />
      </svg>
      <span className={lang === "id" ? "opacity-100" : "opacity-40"}>ID</span>
      <span className="opacity-40">/</span>
      <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
    </button>
  );
}
