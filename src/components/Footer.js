"use client";

import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function Footer({ profile }) {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-steel/15 dark:border-cyanLine/15">
      <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-base font-semibold text-ink dark:text-textLight">
              {profile?.name || "Civil Engineer Portfolio"}
            </p>
            <p className="mt-1 text-sm text-inkMuted dark:text-textLightMuted"></p>
          </div>

          <div className="flex items-center gap-4">
            {profile?.social?.linkedin && (
              <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="text-inkMuted dark:text-textLightMuted hover:text-rust dark:hover:text-amberSafety text-sm">
                LinkedIn
              </a>
            )}
            {profile?.social?.instagram && (
              <a href={profile.social.instagram} target="_blank" rel="noreferrer" className="text-inkMuted dark:text-textLightMuted hover:text-rust dark:hover:text-amberSafety text-sm">
                Instagram
              </a>
            )}
            {profile?.social?.github && (
              <a href={profile.social.github} target="_blank" rel="noreferrer" className="text-inkMuted dark:text-textLightMuted hover:text-rust dark:hover:text-amberSafety text-sm">
                GitHub
              </a>
            )}
            <Link href="/admin" className="text-inkMuted/50 dark:text-textLightMuted/50 hover:text-inkMuted dark:hover:text-textLightMuted text-xs font-mono">
              {t("nav.admin")}
            </Link>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs font-mono text-inkMuted/60 dark:text-textLightMuted/60">
          <span>&copy; {year} {profile?.name || ""}.</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}
