"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import MultiImageUploadField from "@/components/MultiImageUploadField";

const emptyProject = {
  title_en: "",
  title_id: "",
  description_en: "",
  description_id: "",
  category: "",
  year: "",
  location: "",
  image: "",
  images: [],
  tags: [],
  link: "",
};

export default function AdminProjectsPage() {
  const { t } = useLang();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, object = form data
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const openNew = () => {
    setEditing({ ...emptyProject });
    setTagsInput("");
  };

  const openEdit = (project) => {
    setEditing({ ...project });
    setTagsInput((project.tags || []).join(", "));
  };

  const closeForm = () => setEditing(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const imgs = editing.images || [];
    const payload = {
      ...editing,
      // gambar pertama dari array jadi cover (field image)
      image: imgs[0] || editing.image || "",
      images: imgs,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const isNew = !editing.id;
    const url = isNew ? "/api/projects" : `/api/projects/${editing.id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data.success) {
        setMessage(t("admin.saved_success"));
        closeForm();
        load();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.message || "Error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t("admin.confirm_delete"))) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setMessage(t("admin.deleted_success"));
    load();
    setTimeout(() => setMessage(""), 3000);
  };

  const inputClass =
    "w-full rounded-md border border-steel/30 dark:border-cyanLine/30 bg-transparent px-3 py-2 text-sm text-ink dark:text-textLight outline-none focus:border-rust dark:focus:border-amberSafety";
  const labelClass = "mb-1.5 block text-sm font-medium text-ink dark:text-textLight";

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-inkMuted dark:text-textLightMuted">{projects.length} item(s)</p>
        <div className="flex items-center gap-3">
          {message && <span className="text-sm font-medium text-green-600 dark:text-green-400">{message}</span>}
          <button
            onClick={openNew}
            className="rounded-md bg-steel dark:bg-cyanLine px-4 py-2 text-sm font-semibold text-paper dark:text-blueprint hover:opacity-90"
          >
            + {t("admin.add_new")}
          </button>
        </div>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="mb-6 space-y-4 rounded-lg border border-rust/30 dark:border-amberSafety/30 p-5">
          <MultiImageUploadField
            images={editing.images?.length ? editing.images : (editing.image ? [editing.image] : [])}
            onChange={(urls) => setEditing((p) => ({ ...p, images: urls, image: urls[0] || "" }))}
            label="Gambar Proyek"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Title ({t("admin.field_en")})</label>
              <input className={inputClass} required value={editing.title_en} onChange={(e) => setEditing((p) => ({ ...p, title_en: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Title ({t("admin.field_id")})</label>
              <input className={inputClass} required value={editing.title_id} onChange={(e) => setEditing((p) => ({ ...p, title_id: e.target.value }))} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Description ({t("admin.field_en")})</label>
              <textarea rows={3} className={inputClass} required value={editing.description_en} onChange={(e) => setEditing((p) => ({ ...p, description_en: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Description ({t("admin.field_id")})</label>
              <textarea rows={3} className={inputClass} required value={editing.description_id} onChange={(e) => setEditing((p) => ({ ...p, description_id: e.target.value }))} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Category</label>
              <input className={inputClass} required value={editing.category} onChange={(e) => setEditing((p) => ({ ...p, category: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Year</label>
              <input className={inputClass} required value={editing.year} onChange={(e) => setEditing((p) => ({ ...p, year: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input className={inputClass} value={editing.location} onChange={(e) => setEditing((p) => ({ ...p, location: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input className={inputClass} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="AutoCAD, SAP2000" />
          </div>

          <div>
            <label className={labelClass}>External Link (optional)</label>
            <input className={inputClass} value={editing.link} onChange={(e) => setEditing((p) => ({ ...p, link: e.target.value }))} />
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="rounded-md bg-steel dark:bg-cyanLine px-5 py-2 text-sm font-semibold text-paper dark:text-blueprint hover:opacity-90 disabled:opacity-60">
              {saving ? t("common.loading") : t("admin.save")}
            </button>
            <button type="button" onClick={closeForm} className="rounded-md border border-steel/30 dark:border-cyanLine/30 px-5 py-2 text-sm font-medium text-inkMuted dark:text-textLightMuted">
              {t("admin.cancel")}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-inkMuted dark:text-textLightMuted">{t("common.loading")}</p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="flex items-center justify-between gap-4 rounded-lg border border-steel/20 dark:border-cyanLine/20 p-4">
              <div className="flex items-center gap-3 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt="" className="h-12 w-16 shrink-0 rounded object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink dark:text-textLight">{project.title_id}</p>
                  <p className="truncate text-xs text-inkMuted dark:text-textLightMuted">{project.category} · {project.year}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openEdit(project)} className="rounded-md border border-steel/30 dark:border-cyanLine/30 px-3 py-1.5 text-xs font-medium text-steel dark:text-cyanLine">
                  {t("admin.edit")}
                </button>
                <button onClick={() => handleDelete(project.id)} className="rounded-md border border-red-400/40 px-3 py-1.5 text-xs font-medium text-red-500">
                  {t("admin.delete")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
