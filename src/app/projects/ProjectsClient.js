"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/context/LangContext";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import useInView from "@/hooks/useInView";

// Wrapper card dengan stagger animasi saat masuk viewport
function AnimatedCard({ project, index }) {
  const [ref, visible] = useInView(0.1);
  const delays = [0, 0.1, 0.2, 0.3, 0.4, 0.5];
  const delay = delays[index % delays.length];
  return (
    <div
      ref={ref}
      className="anim-fade-up"
      style={visible ? { opacity: 1, transform: "none", transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s` } : {}}
    >
      <ProjectCard project={project} />
    </div>
  );
}

export default function ProjectsClient({ projects }) {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");
  const [refHeader, visHeader] = useInView(0.2);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category).filter(Boolean)));
    return unique;
  }, [projects]);

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <SectionTitle eyebrow="//PROJECTS" title={t("project.title")} subtitle={t("project.subtitle")} />

      {/* Filter tabs — fade up */}
      <div
        ref={refHeader}
        className={`mb-8 flex flex-wrap gap-2 anim-fade-up ${visHeader ? "anim-visible" : ""}`}
      >
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors ${
            filter === "all"
              ? "border-rust bg-rust text-paper dark:border-amberSafety dark:bg-amberSafety dark:text-blueprint"
              : "border-steel/30 text-steel dark:border-cyanLine/30 dark:text-cyanLine"
          }`}
        >
          {t("project.all")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors ${
              filter === cat
                ? "border-rust bg-rust text-paper dark:border-amberSafety dark:bg-amberSafety dark:text-blueprint"
                : "border-steel/30 text-steel dark:border-cyanLine/30 dark:text-cyanLine"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-inkMuted dark:text-textLightMuted">{t("project.empty")}</p>
      ) : (
        <>
          {/* Mobile: horizontal scroll 1 card */}
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 sm:hidden"
            style={{ scrollbarWidth: "none" }}>
            {filtered.map((project) => (
              <div key={project.id} className="w-[85vw] max-w-sm shrink-0 snap-start h-[420px]">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          {/* Desktop: grid dengan stagger animasi */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, idx) => (
              <AnimatedCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
