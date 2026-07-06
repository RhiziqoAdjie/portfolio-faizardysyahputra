"use client";

import { useEffect, useState, useCallback } from "react";
import { useLang } from "@/context/LangContext";

export default function ProjectDetailModal({ project, onClose }) {
  const { t, pick } = useLang();

  // Kumpulkan semua gambar: image utama + images[] jika ada
  const images = [
    ...(project.image ? [project.image] : []),
    ...(Array.isArray(project.images) ? project.images.filter((img) => img && img !== project.image) : []),
  ];

  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  // Tutup modal dengan Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // Cegah scroll body saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Touch swipe untuk gambar di modal
  const [touchStart, setTouchStart] = useState(null);
  function handleTouchStart(e) { setTouchStart(e.touches[0].clientX); }
  function handleTouchEnd(e) {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-blueprint/80 dark:bg-black/80 backdrop-blur-sm" />

      {/* Modal box */}
      <div
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-steel/25 dark:border-cyanLine/25 bg-paper dark:bg-blueprint shadow-blueprint dark:shadow-blueprint-dark"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol tutup */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-steel/25 dark:border-cyanLine/25 bg-paper/90 dark:bg-blueprint/90 text-inkMuted dark:text-textLightMuted hover:text-ink dark:hover:text-textLight transition-colors"
          aria-label={t("project.close")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 14, height: 14 }}>
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>

        {/* Image slider */}
        {images.length > 0 && (
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-t-xl bg-paperMuted dark:bg-blueprintMuted select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current}
              src={images[current]}
              alt={`${pick(project, "title")} ${current + 1}`}
              className="h-full w-full object-cover"
            />

            {/* Navigasi panah — hanya jika ada lebih dari 1 gambar */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-paper/80 dark:bg-blueprint/80 border border-steel/20 dark:border-cyanLine/20 text-ink dark:text-textLight hover:bg-paper dark:hover:bg-blueprint transition-colors"
                  aria-label={t("project.prev")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 14, height: 14 }}>
                    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-paper/80 dark:bg-blueprint/80 border border-steel/20 dark:border-cyanLine/20 text-ink dark:text-textLight hover:bg-paper dark:hover:bg-blueprint transition-colors"
                  aria-label={t("project.next")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 14, height: 14 }}>
                    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Dot indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all ${i === current ? "w-5 bg-paper" : "w-1.5 bg-paper/50"}`}
                      aria-label={`Gambar ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <span className="absolute right-3 bottom-3 rounded bg-black/50 px-2 py-0.5 font-mono text-[11px] text-white">
                  {current + 1} / {images.length}
                </span>
              </>
            )}

            {/* Category badge */}
            <span className="absolute left-3 top-3 rounded bg-steel/90 dark:bg-cyanLine/90 px-2 py-0.5 text-[11px] font-mono font-medium text-paper dark:text-blueprint">
              {project.category}
            </span>
          </div>
        )}

        {/* Konten detail */}
        <div className="p-6">
          <div className="mb-1 flex items-center gap-3 font-mono text-xs text-inkMuted dark:text-textLightMuted">
            <span>{t("project.year")}: {project.year}</span>
            {project.location && <><span>·</span><span>{project.location}</span></>}
          </div>

          <h2 className="font-display text-xl font-bold text-ink dark:text-textLight sm:text-2xl">
            {pick(project, "title")}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-inkMuted dark:text-textLightMuted text-justify">
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

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-steel dark:bg-cyanLine px-4 py-2 text-sm font-semibold text-paper dark:text-blueprint hover:opacity-90 transition-opacity"
            >
              {t("project.view_detail")}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
                <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
