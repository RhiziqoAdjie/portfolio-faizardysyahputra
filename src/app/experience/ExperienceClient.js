"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import SectionTitle from "@/components/SectionTitle";
import ExperienceItem from "@/components/ExperienceItem";
import useInView from "@/hooks/useInView";

// Ubah "2025-01 " (ada spasi) dll menjadi angka yang bisa dicompare
function toSortKey(dateStr) {
  if (!dateStr) return "0000-00";
  const trimmed = dateStr.trim();
  if (trimmed.toLowerCase() === "present") return "9999-99";
  // pastikan format minimal "YYYY" atau "YYYY-MM"
  const parts = trimmed.split("-");
  const year = parts[0].trim().padStart(4, "0");
  const month = (parts[1] ?? "01").trim().padStart(2, "0");
  return `${year}-${month}`;
}

function sortByStartDesc(list) {
  return [...list].sort((a, b) => toSortKey(b.start_date).localeCompare(toSortKey(a.start_date)));
}

export default function ExperienceClient({ experience }) {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("all");

  const education = sortByStartDesc(experience.filter((i) => i.type === "education"));
  const work      = sortByStartDesc(experience.filter((i) => i.type === "work"));

  const tabs = [
    { key: "all",       label: `${t("experience.work")} & ${t("experience.education")}` },
    { key: "work",      label: t("experience.work") },
    { key: "education", label: t("experience.education") },
  ];

  // Untuk "all": education di atas, work di bawah — masing-masing terbaru ke terlama
  const filtered =
    activeTab === "all"      ? [...education, ...work] :
    activeTab === "work"     ? work :
    /* education */            education;

  return (
    <div>
      <SectionTitle eyebrow="//EXPERIENCE" title={t("experience.title")} subtitle={t("experience.subtitle")} />

      {/* Tab filter */}
      <div className="mb-10 flex gap-2 flex-wrap anim-fade-up anim-visible" style={{ transition: "none" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors border ${
              activeTab === tab.key
                ? "bg-steel dark:bg-cyanLine text-paper dark:text-blueprint border-steel dark:border-cyanLine"
                : "border-steel/30 dark:border-cyanLine/30 text-inkMuted dark:text-textLightMuted hover:border-steel dark:hover:border-cyanLine hover:text-ink dark:hover:text-textLight"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-inkMuted dark:text-textLightMuted">{t("experience.empty")}</p>
      ) : (
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-steel/20 dark:bg-cyanLine/20 hidden sm:block" />
          <div className="space-y-0">
            {filtered.map((item, idx) => (
              <ExperienceItem key={item.id} item={item} isLast={idx === filtered.length - 1} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
