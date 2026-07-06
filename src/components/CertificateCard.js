"use client";

import { useLang } from "@/context/LangContext";

export default function CertificateCard({ cert }) {
  const { t, pick } = useLang();

  return (
    <div className="blueprint-corner group relative overflow-hidden rounded-lg border border-steel/20 dark:border-cyanLine/20 bg-paper/60 dark:bg-blueprintMuted/60 shadow-blueprint dark:shadow-blueprint-dark transition-transform duration-300 hover:-translate-y-1 flex flex-col h-full">
        <div className="relative aspect-[16/11] shrink-0 overflow-hidden border-b border-steel/15 dark:border-cyanLine/15 bg-paperMuted dark:bg-blueprint">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cert.image || "/uploads/certificate-placeholder-1.svg"}
          alt={pick(cert, "title")}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold leading-snug text-ink dark:text-textLight">
          {pick(cert, "title")}
        </h3>
        <p className="mt-1.5 text-sm text-inkMuted dark:text-textLightMuted">
          {t("certificate.issued_by")}: <span className="font-medium text-steel dark:text-cyanLine">{cert.issuer}</span>
        </p>
        <p className="mt-1 text-xs font-mono text-inkMuted/80 dark:text-textLightMuted/80">{cert.date}</p>
        {cert.credential_id && (
          <p className="mt-1 text-xs font-mono text-inkMuted/70 dark:text-textLightMuted/70">
            {t("certificate.credential_id")}: {cert.credential_id}
          </p>
        )}
        {cert.url && (
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-rust dark:text-amberSafety hover:underline"
          >
            {t("certificate.view_credential")}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 13, height: 13 }}>
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
