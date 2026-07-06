"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import ProjectDetailModal from "./ProjectDetailModal";

export default function ProjectCard({ project }) {
  const { t, pick } = useLang();
  const [showModal, setShowModal] = useState(false);

  // Kumpulkan semua gambar
  const images = [
    ...(project.image ? [project.image] : []),
    ...(Array.isArray(project.images) ? project.images.filter((img) => img && img !== project.image) : []),
  ];
  const [imgIdx, setImgIdx] = useState(0);

  function imgPrev(e) { e.stopPropagation(); setImgIdx((i) => (i - 1 + images.length) % images.length); }
  function imgNext(e) { e.stopPropagation(); setImgIdx((i) => (i + 1) % images.length); }

  // Touch swipe pada gambar card
  const [touchStart, setTouchStart] = useState(null);
  function handleTouchStart(e) { setTouchStart(e.touches[0].clientX); }
  function handleTouchEnd(e) {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? imgNext(e) : imgPrev(e);
    setTouchStart(null);
  }

  return (
    <>
      <div className="blueprint-corner group relative overflow-hidden rounded-lg border border-steel/20 dark:border-cyanLine/20 bg-paper/60 dark:bg-blueprintMuted/60 shadow-blueprint dark:shadow-blueprint-dark flex flex-col h-full">

        {/* Gambar dengan swipe */}
        <div
          className="relative aspect-[16/10] overflow-hidden border-b border-steel/15 dark:border-cyanLine/15 bg-paperMuted dark:bg-blueprint select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={imgIdx}
            src={images[imgIdx] || "/uploads/project-placeholder-1.svg"}
            alt={pick(project, "title")}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Navigasi gambar — hanya jika > 1 */}
          {images.length > 1 && (
            <>
              <button
                onClick={imgPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-paper/80 dark:bg-blueprint/80 border border-steel/20 dark:border-cyanLine/20 text-ink dark:text-textLight opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={t("project.prev")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 12, height: 12 }}>
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={imgNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-paper/80 dark:bg-blueprint/80 border border-steel/20 dark:border-cyanLine/20 text-ink dark:text-textLight opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={t("project.next")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 12, height: 12 }}>
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dot indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, i) => (
                  <span key={i} className={`h-1 rounded-full transition-all ${i === imgIdx ? "w-4 bg-paper" : "w-1 bg-paper/50"}`} />
                ))}
              </div>
            </>
          )}

          <span className="absolute left-3 top-3 rounded bg-steel/90 dark:bg-cyanLine/90 px-2 py-0.5 text-[11px] font-mono font-medium text-paper dark:text-blueprint">
            {project.category}
          </span>
        </div>

        {/* Konten card */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center justify-between text-xs font-mono text-inkMuted dark:text-textLightMuted">
            <span>{t("project.year")}: {project.year}</span>
            <span>{project.location}</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-ink dark:text-textLight">
            {pick(project, "title")}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-inkMuted dark:text-textLightMuted line-clamp-3 text-justify">
            {pick(project, "description")}
          </p>

          {project.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-steel/25 dark:border-cyanLine/25 px-2 py-0.5 text-[11px] font-mono text-steel dark:text-cyanLine"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Tombol Detail */}
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-steel/30 dark:border-cyanLine/30 px-4 py-2 text-sm font-semibold text-steel dark:text-cyanLine hover:bg-steel/10 dark:hover:bg-cyanLine/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 15, height: 15 }}>
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            {t("project.detail")}
          </button>
        </div>
      </div>

      {/* Modal detail */}
      {showModal && (
        <ProjectDetailModal project={project} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
