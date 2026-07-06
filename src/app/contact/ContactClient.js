"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import SectionTitle from "@/components/SectionTitle";
import useInView from "@/hooks/useInView";

export default function ContactClient({ profile }) {
  const { t, pick } = useLang();
  const [refLeft, visLeft]   = useInView(0.15);
  const [refRight, visRight] = useInView(0.15);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )}`;
      window.location.href = mailto;
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <SectionTitle eyebrow="//CONTACT" title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <div className="grid gap-10 md:grid-cols-[0.85fr,1.15fr]">
        {/* LEFT — info kontak, slide dari kiri */}
        <div
          ref={refLeft}
          className={`space-y-6 anim-fade-left ${visLeft ? "anim-visible" : ""}`}
        >
          <div className="rounded-lg border border-steel/20 dark:border-cyanLine/20 p-6">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-rust dark:text-amberSafety mb-4">
              {t("contact.info_title")}
            </h3>
            <dl className="space-y-4 text-sm">
              {/* Email */}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-steel/20 dark:border-cyanLine/20 text-steel dark:text-cyanLine">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 15, height: 15 }}>
                    <rect x="2" y="5" width="16" height="11" rx="1.5" />
                    <polyline points="2,5 10,12 18,5" />
                  </svg>
                </span>
                <div>
                  <dt className="text-xs text-inkMuted dark:text-textLightMuted uppercase tracking-wide">Email</dt>
                  <dd>
                    <a href={`mailto:${profile.email}`} className="text-ink dark:text-textLight hover:text-rust dark:hover:text-amberSafety transition-colors">
                      {profile.email}
                    </a>
                  </dd>
                </div>
              </div>

              {/* Phone */}
              {profile.phone && (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-steel/20 dark:border-cyanLine/20 text-steel dark:text-cyanLine">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 15, height: 15 }}>
                      <rect x="5" y="1" width="10" height="18" rx="2" />
                      <circle cx="10" cy="16" r="0.75" fill="currentColor" />
                    </svg>
                  </span>
                  <div>
                    <dt className="text-xs text-inkMuted dark:text-textLightMuted uppercase tracking-wide">Phone</dt>
                    <dd>
                      <a href={`tel:${profile.phone}`} className="text-ink dark:text-textLight hover:text-rust dark:hover:text-amberSafety transition-colors">
                        {profile.phone}
                      </a>
                    </dd>
                  </div>
                </div>
              )}

              {/* Location */}
              {profile.location && (
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-steel/20 dark:border-cyanLine/20 text-steel dark:text-cyanLine">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 15, height: 15 }}>
                      <path d="M10 1.5C7.24 1.5 5 3.74 5 6.5c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z" />
                      <circle cx="10" cy="6.5" r="1.75" />
                    </svg>
                  </span>
                  <div>
                    <dt className="text-xs text-inkMuted dark:text-textLightMuted uppercase tracking-wide">Location</dt>
                    <dd className="text-ink dark:text-textLight">{pick(profile, "location")}</dd>
                  </div>
                </div>
              )}
            </dl>
          </div>

          {/* Social / CV / LinkedIn */}
          {(profile.social?.linkedin || profile.cv) && (
            <div className="rounded-lg border border-steel/20 dark:border-cyanLine/20 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-inkMuted dark:text-textLightMuted">
                {t("contact.or_direct")}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.social?.linkedin && (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-steel/30 dark:border-cyanLine/30 px-4 py-2 text-sm font-medium text-steel dark:text-cyanLine hover:bg-steel/10 dark:hover:bg-cyanLine/10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
                      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57A1.46 1.46 0 0 1 14.38 12.11A1.46 1.46 0 0 1 15.84 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                    </svg>
                    LinkedIn
                  </a>
                )}
                {profile.cv && (
                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-steel/30 dark:border-cyanLine/30 px-4 py-2 text-sm font-medium text-steel dark:text-cyanLine hover:bg-steel/10 dark:hover:bg-cyanLine/10 transition-colors"
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
          )}
        </div>

        {/* RIGHT — form, slide dari kanan */}
        <div
          ref={refRight}
          className={`rounded-lg border border-steel/20 dark:border-cyanLine/20 p-6 anim-fade-right ${visRight ? "anim-visible" : ""}`}
        >
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-rust dark:text-amberSafety mb-5">
            {t("contact.form_title")}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-inkMuted dark:text-textLightMuted">
                  {t("contact.name_label")}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact.name_placeholder")}
                  className="w-full rounded-md border border-steel/30 dark:border-cyanLine/30 bg-paper dark:bg-blueprint px-3 py-2.5 text-sm text-ink dark:text-textLight placeholder:text-inkMuted/50 dark:placeholder:text-textLightMuted/50 focus:border-steel dark:focus:border-cyanLine focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-inkMuted dark:text-textLightMuted">
                  {t("contact.email_label")}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("contact.email_placeholder")}
                  className="w-full rounded-md border border-steel/30 dark:border-cyanLine/30 bg-paper dark:bg-blueprint px-3 py-2.5 text-sm text-ink dark:text-textLight placeholder:text-inkMuted/50 dark:placeholder:text-textLightMuted/50 focus:border-steel dark:focus:border-cyanLine focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-inkMuted dark:text-textLightMuted">
                {t("contact.subject_label")}
              </label>
              <input
                type="text"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                placeholder={t("contact.subject_placeholder")}
                className="w-full rounded-md border border-steel/30 dark:border-cyanLine/30 bg-paper dark:bg-blueprint px-3 py-2.5 text-sm text-ink dark:text-textLight placeholder:text-inkMuted/50 dark:placeholder:text-textLightMuted/50 focus:border-steel dark:focus:border-cyanLine focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-inkMuted dark:text-textLightMuted">
                {t("contact.message_label")}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder={t("contact.message_placeholder")}
                className="w-full resize-none rounded-md border border-steel/30 dark:border-cyanLine/30 bg-paper dark:bg-blueprint px-3 py-2.5 text-sm text-ink dark:text-textLight placeholder:text-inkMuted/50 dark:placeholder:text-textLightMuted/50 focus:border-steel dark:focus:border-cyanLine focus:outline-none transition-colors"
              />
            </div>

            {status === "success" && (
              <p className="rounded-md border border-steel/20 dark:border-cyanLine/20 bg-steel/5 dark:bg-cyanLine/5 px-4 py-3 text-sm text-steel dark:text-cyanLine">
                {t("contact.send_success")}
              </p>
            )}
            {status === "error" && (
              <p className="rounded-md border border-rust/20 dark:border-amberSafety/20 bg-rust/5 dark:bg-amberSafety/5 px-4 py-3 text-sm text-rust dark:text-amberSafety">
                {t("contact.send_error")}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="rounded-md bg-steel dark:bg-cyanLine px-6 py-2.5 text-sm font-semibold text-paper dark:text-blueprint shadow-blueprint dark:shadow-blueprint-dark hover:opacity-90 disabled:opacity-60 transition-opacity"
            >
              {sending ? "..." : t("contact.send_button")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
