"use client";

import { useLang } from "@/context/LangContext";
import useInView from "@/hooks/useInView";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parseYearMonth(str) {
  if (!str) return null;
  const trimmed = str.trim();
  if (trimmed.toLowerCase() === "present") return null;
  const parts = trimmed.split("-");
  const year = parseInt(parts[0], 10);
  const month = parts[1] ? parseInt(parts[1], 10) : 1;
  return { year, month };
}

function formatDate(str, presentLabel) {
  if (!str) return "";
  const trimmed = str.trim();
  if (trimmed.toLowerCase() === "present") return presentLabel;
  const parts = trimmed.split("-");
  const year = parts[0];
  const month = parts[1] ? parseInt(parts[1], 10) - 1 : null;
  if (month !== null && MONTHS[month]) return `${MONTHS[month]} ${year}`;
  return year;
}

function calcDuration(start, end, presentLabel) {
  const s = parseYearMonth(start);
  if (!s) return null;
  const now = new Date();
  const endParsed = end?.trim().toLowerCase() === "present"
    ? { year: now.getFullYear(), month: now.getMonth() + 1 }
    : parseYearMonth(end);
  if (!endParsed) return null;
  const months = (endParsed.year - s.year) * 12 + (endParsed.month - s.month) + 1;
  if (months <= 0) return null;
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y > 0 && m > 0) return `${y}y ${m}m`;
  if (y > 0) return `${y}y`;
  return `${m}m`;
}

export default function ExperienceItem({ item, isLast, index = 0 }) {
  const { t, pick } = useLang();
  const [ref, visible] = useInView(0.15);

  const isWork = item.type === "work";
  const duration = calcDuration(item.start_date, item.end_date, t("experience.present"));
  const isPresent = item.end_date?.trim().toLowerCase() === "present";

  const delay = Math.min(index * 0.1, 0.5);

  return (
    <div
      ref={ref}
      className="relative sm:pl-10 pb-8 anim-fade-left"
      style={visible ? { opacity: 1, transform: "none", transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s` } : {}}
    >
      {/* Timeline dot */}
      <div
        className={`hidden sm:flex absolute left-0 top-3 h-[23px] w-[23px] items-center justify-center rounded-full border-2 z-10 ${
          isWork
            ? "border-rust dark:border-amberSafety bg-paper dark:bg-blueprint"
            : "border-steel dark:border-cyanLine bg-paper dark:bg-blueprint"
        }`}
      >
        {isWork ? (
          /* briefcase icon */
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
            className="text-rust dark:text-amberSafety" style={{ width: 10, height: 10 }}>
            <rect x="1" y="5" width="14" height="9" rx="1.5" />
            <path d="M5 5V3.5A1.5 1.5 0 016.5 2h3A1.5 1.5 0 0111 3.5V5" />
            <line x1="1" y1="9" x2="15" y2="9" />
          </svg>
        ) : (
          /* graduation cap icon */
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
            className="text-steel dark:text-cyanLine" style={{ width: 10, height: 10 }}>
            <path d="M1 6l7-3 7 3-7 3-7-3z" />
            <path d="M4 7.5V11c0 1.1 1.8 2 4 2s4-.9 4-2V7.5" />
            <line x1="14" y1="6" x2="14" y2="10" />
          </svg>
        )}
      </div>

      {/* Card */}
      <div className={`rounded-lg border bg-paper dark:bg-blueprint/40 p-5 transition-colors hover:border-steel/40 dark:hover:border-cyanLine/40 ${
        isWork
          ? "border-steel/20 dark:border-cyanLine/15"
          : "border-steel/20 dark:border-cyanLine/15"
      }`}>
        {/* Top row */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Type badge */}
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              isWork
                ? "bg-rust/10 dark:bg-amberSafety/10 text-rust dark:text-amberSafety"
                : "bg-steel/10 dark:bg-cyanLine/10 text-steel dark:text-cyanLine"
            }`}>
              {isWork ? t("experience.work") : t("experience.education")}
            </span>
            {/* Present badge */}
            {isPresent && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t("experience.present")}
              </span>
            )}
          </div>
          {/* Duration chip */}
          {duration && (
            <span className="font-mono text-[11px] text-inkMuted dark:text-textLightMuted border border-steel/20 dark:border-cyanLine/20 rounded px-2 py-0.5">
              {duration}
            </span>
          )}
        </div>

        {/* Title & company */}
        <h3 className="mt-3 font-display text-base font-semibold leading-snug text-ink dark:text-textLight sm:text-lg">
          {pick(item, "position")}
        </h3>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
          <span className={`font-medium ${isWork ? "text-rust dark:text-amberSafety" : "text-steel dark:text-cyanLine"}`}>
            {item.company}
          </span>
          {item.location && (
            <>
              <span className="text-inkMuted/40 dark:text-textLightMuted/40">·</span>
              <span className="flex items-center gap-1 text-inkMuted dark:text-textLightMuted">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 11, height: 11 }}>
                  <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3.25 4 9 4 9s4-5.75 4-9c0-2.21-1.79-3.5-4-3.5z" />
                  <circle cx="8" cy="5.5" r="1.25" fill="currentColor" stroke="none" />
                </svg>
                {item.location}
              </span>
            </>
          )}
        </div>

        {/* Date range */}
        <p className="mt-2 font-mono text-xs text-inkMuted dark:text-textLightMuted">
          {formatDate(item.start_date, t("experience.present"))}
          {" — "}
          {formatDate(item.end_date, t("experience.present"))}
        </p>

        {/* Divider */}
        <div className="my-3 h-px bg-steel/10 dark:bg-cyanLine/10" />

        {/* Description */}
        <p className="text-sm leading-relaxed text-inkMuted dark:text-textLightMuted text-justify">
          {pick(item, "description")}
        </p>
      </div>
    </div>
  );
}
