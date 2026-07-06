"use client";

import Link from "next/link";
import { useLang } from "@/context/LangContext";
import ProjectCard from "@/components/ProjectCard";
import SectionTitle from "@/components/SectionTitle";

export default function HomeClient({ profile, projects }) {
  const { t, pick } = useLang();

  return (
    <div>
      {/* HERO */}
      <section className="relative grid gap-10 py-10 md:grid-cols-[1.2fr,0.8fr] md:items-center md:py-16">
        <div className="animate-fadeUp">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-rust/40 dark:border-amberSafety/40 px-3 py-1 font-mono text-xs uppercase tracking-widest text-rust dark:text-amberSafety">
            <span className="h-1.5 w-1.5 rounded-full bg-rust dark:bg-amberSafety" />
            {t("home.badge")}
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink dark:text-textLight sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-lg font-medium text-steel dark:text-cyanLine">{pick(profile, "role")}</p>
          <p className="mt-5 max-w-xl text-inkMuted dark:text-textLightMuted">{pick(profile, "tagline")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-md bg-steel dark:bg-cyanLine px-5 py-2.5 text-sm font-semibold text-paper dark:text-blueprint shadow-blueprint dark:shadow-blueprint-dark hover:opacity-90 transition-opacity"
            >
              {t("home.cta_projects")}
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-steel/40 dark:border-cyanLine/40 px-5 py-2.5 text-sm font-semibold text-steel dark:text-cyanLine hover:bg-steel/10 dark:hover:bg-cyanLine/10 transition-colors"
            >
              {t("home.cta_contact")}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs animate-fadeUp" style={{ animationDelay: "0.15s" }}>
          <div className="blueprint-corner relative overflow-hidden rounded-lg border border-steel/25 dark:border-cyanLine/25 shadow-blueprint dark:shadow-blueprint-dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.photo} alt={profile.name} className="aspect-square w-full object-cover" />
          </div>
          <svg
            className="absolute -bottom-6 -right-6 -z-10 h-28 w-28 text-rust/30 dark:text-amberSafety/30"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="50" cy="50" r="45" strokeDasharray="4 4" />
          </svg>
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-10">
        <SectionTitle eyebrow="//01" title={t("home.skills_title")} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills?.map((skill) => (
            <div key={skill.name} className="rounded-lg border border-steel/20 dark:border-cyanLine/20 p-4">
              <div className="mb-2 flex items-center justify-between text-sm font-medium text-ink dark:text-textLight">
                <span>{skill.name}</span>
                <span className="font-mono text-xs text-inkMuted dark:text-textLightMuted">{skill.level}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-steel/15 dark:bg-cyanLine/15">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-steel to-rust dark:from-cyanLine dark:to-amberSafety"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-10">
        <SectionTitle eyebrow="//02" title={t("home.highlight_title")} />
        {/* Mobile: horizontal scroll 1 card */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 sm:hidden"
          style={{ scrollbarWidth: "none" }}>
          {projects.map((project) => (
            <div key={project.id} className="w-[85vw] max-w-sm shrink-0 snap-start h-[420px]">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        {/* Desktop: grid normal */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/projects" className="text-sm font-medium text-rust dark:text-amberSafety hover:underline">
            {t("home.highlight_more")} →
          </Link>
        </div>
      </section>
    </div>
  );
}
