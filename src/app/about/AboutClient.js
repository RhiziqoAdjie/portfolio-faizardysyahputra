"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LangContext";
import SectionTitle from "@/components/SectionTitle";
import useInView from "@/hooks/useInView";

// Skill bar dengan animasi width saat masuk viewport
function SkillBar({ skill }) {
  const [ref, visible] = useInView(0.3);
  return (
    <div ref={ref} className="rounded-lg border border-steel/20 dark:border-cyanLine/20 p-4 anim-fade-up" style={visible ? { opacity: 1, transform: "none", transition: "opacity 0.85s ease, transform 0.85s ease" } : {}}>
      <div className="mb-2 flex items-center justify-between text-sm font-medium text-ink dark:text-textLight">
        <span>{skill.name}</span>
        <span className="font-mono text-xs text-inkMuted dark:text-textLightMuted">{skill.level}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-steel/15 dark:bg-cyanLine/15">
        <div
          className={`h-full rounded-full bg-gradient-to-r from-steel to-rust dark:from-cyanLine dark:to-amberSafety anim-bar-fill ${visible ? "bar-animate" : ""}`}
          style={{ width: visible ? `${skill.level}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default function AboutClient({ profile }) {
  const { t, pick } = useLang();

  const [refPhoto, visPhoto] = useInView(0.2);
  const [refInfo, visInfo]   = useInView(0.2);
  const [refSkills, visSkills] = useInView(0.1);

  return (
    <div>
      <SectionTitle eyebrow="//ABOUT" title={t("about.title")} subtitle={t("about.subtitle")} />

      <div className="grid gap-10 md:grid-cols-[0.9fr,1.1fr]">
        {/* Foto — slide dari kiri */}
        <div
          ref={refPhoto}
          className={`blueprint-corner relative mx-auto w-full max-w-xs overflow-hidden rounded-lg border border-steel/25 dark:border-cyanLine/25 shadow-blueprint dark:shadow-blueprint-dark md:mx-0 anim-fade-left ${visPhoto ? "anim-visible" : ""}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={profile.photo_about || profile.photo} alt={profile.name} className="w-full object-cover object-top" style={{ height: "340px" }} />
        </div>

        {/* Info — slide dari kanan */}
        <div
          ref={refInfo}
          className={`anim-fade-right ${visInfo ? "anim-visible" : ""}`}
        >
          <p className="text-inkMuted dark:text-textLightMuted leading-relaxed text-justify">{pick(profile, "about")}</p>

          <div className="mt-8 rounded-lg border border-steel/20 dark:border-cyanLine/20 p-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-rust dark:text-amberSafety">
              {t("about.contact_title")}
            </h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-inkMuted dark:text-textLightMuted">Email</dt>
                <dd className="text-ink dark:text-textLight">{profile.email}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-inkMuted dark:text-textLightMuted">Phone</dt>
                <dd className="text-ink dark:text-textLight">{profile.phone}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 shrink-0 text-inkMuted dark:text-textLightMuted">Location</dt>
                <dd className="text-ink dark:text-textLight">{pick(profile, "location")}</dd>
              </div>
            </dl>
            {profile.cv && (
              <a
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-steel dark:bg-cyanLine px-4 py-2 text-sm font-semibold text-paper dark:text-blueprint hover:opacity-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 15, height: 15 }}>
                  <path d="M10 13V3M6 9l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" strokeLinecap="round" />
                </svg>
                {t("about.download_cv")}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Skills — bar fill animasi */}
      <section
        ref={refSkills}
        className={`mt-14 anim-fade-up ${visSkills ? "anim-visible" : ""}`}
      >
        <SectionTitle eyebrow="//SKILLS" title={t("about.skills_title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills?.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </div>
      </section>
    </div>
  );
}
