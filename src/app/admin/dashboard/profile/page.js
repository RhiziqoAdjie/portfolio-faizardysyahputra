"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import ImageUploadField from "@/components/ImageUploadField";

const emptySkill = { name: "", level: 50 };

export default function AdminProfilePage() {
  const { t } = useLang();
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then(setProfile);
  }, []);

  if (!profile) return <p className="text-inkMuted dark:text-textLightMuted">{t("common.loading")}</p>;

  const update = (key, value) => setProfile((p) => ({ ...p, [key]: value }));
  const updateSocial = (key, value) => setProfile((p) => ({ ...p, social: { ...p.social, [key]: value } }));

  const updateSkill = (idx, key, value) => {
    const skills = [...profile.skills];
    skills[idx] = { ...skills[idx], [key]: value };
    update("skills", skills);
  };

  const addSkill = () => update("skills", [...(profile.skills || []), { ...emptySkill }]);
  const removeSkill = (idx) => update("skills", profile.skills.filter((_, i) => i !== idx));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const data = await res.json();
    setSaving(false);
    setMessage(data.success ? t("admin.saved_success") : "Error");
    if (data.success) setTimeout(() => setMessage(""), 3000);
  };

  const inputClass =
    "w-full rounded-md border border-steel/30 dark:border-cyanLine/30 bg-transparent px-3 py-2 text-sm text-ink dark:text-textLight outline-none focus:border-rust dark:focus:border-amberSafety";
  const labelClass = "mb-1.5 block text-sm font-medium text-ink dark:text-textLight";

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-6">
      <ImageUploadField value={profile.photo} onChange={(url) => update("photo", url)} label="Photo (Home)" />
      <ImageUploadField value={profile.photo_about || ""} onChange={(url) => update("photo_about", url)} label="Photo (About)" />

      <div>
        <label className={labelClass}>Name</label>
        <input className={inputClass} value={profile.name} onChange={(e) => update("name", e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Role ({t("admin.field_en")})</label>
          <input className={inputClass} value={profile.role_en} onChange={(e) => update("role_en", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Role ({t("admin.field_id")})</label>
          <input className={inputClass} value={profile.role_id} onChange={(e) => update("role_id", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Tagline ({t("admin.field_en")})</label>
          <input className={inputClass} value={profile.tagline_en} onChange={(e) => update("tagline_en", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Tagline ({t("admin.field_id")})</label>
          <input className={inputClass} value={profile.tagline_id} onChange={(e) => update("tagline_id", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>About ({t("admin.field_en")})</label>
          <textarea rows={4} className={inputClass} value={profile.about_en} onChange={(e) => update("about_en", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>About ({t("admin.field_id")})</label>
          <textarea rows={4} className={inputClass} value={profile.about_id} onChange={(e) => update("about_id", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Email</label>
          <input className={inputClass} value={profile.email} onChange={(e) => update("email", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Phone</label>
          <input className={inputClass} value={profile.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>CV URL</label>
          <input className={inputClass} value={profile.cv_url} onChange={(e) => update("cv_url", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Location ({t("admin.field_en")})</label>
          <input className={inputClass} value={profile.location_en} onChange={(e) => update("location_en", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Location ({t("admin.field_id")})</label>
          <input className={inputClass} value={profile.location_id} onChange={(e) => update("location_id", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>LinkedIn URL</label>
          <input className={inputClass} value={profile.social?.linkedin || ""} onChange={(e) => updateSocial("linkedin", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Instagram URL</label>
          <input className={inputClass} value={profile.social?.instagram || ""} onChange={(e) => updateSocial("instagram", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>GitHub URL</label>
          <input className={inputClass} value={profile.social?.github || ""} onChange={(e) => updateSocial("github", e.target.value)} />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className={labelClass}>Skills</label>
          <button type="button" onClick={addSkill} className="text-sm font-medium text-rust dark:text-amberSafety hover:underline">
            + {t("admin.add_new")}
          </button>
        </div>
        <div className="space-y-2">
          {profile.skills?.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                className={inputClass}
                placeholder="Skill name"
                value={skill.name}
                onChange={(e) => updateSkill(idx, "name", e.target.value)}
              />
              <input
                type="number"
                min={0}
                max={100}
                className={`${inputClass} w-24`}
                value={skill.level}
                onChange={(e) => updateSkill(idx, "level", Number(e.target.value))}
              />
              <button type="button" onClick={() => removeSkill(idx)} className="shrink-0 text-red-500 hover:text-red-600">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-steel dark:bg-cyanLine px-5 py-2.5 text-sm font-semibold text-paper dark:text-blueprint hover:opacity-90 disabled:opacity-60"
        >
          {saving ? t("common.loading") : t("admin.save")}
        </button>
        {message && <span className="text-sm font-medium text-green-600 dark:text-green-400">{message}</span>}
      </div>
    </form>
  );
}
