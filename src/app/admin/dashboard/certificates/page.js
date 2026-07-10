"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import ImageUploadField from "@/components/ImageUploadField";

const emptyCert = {
  title_en: "",
  title_id: "",
  issuer: "",
  date: "",
  credential_id: "",
  image: "",
  url: "",
};

export default function AdminCertificatesPage() {
  const { t } = useLang();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const load = () => {
    setLoading(true);
    fetch("/api/certificates")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const openNew = () => setEditing({ ...emptyCert });
  const openEdit = (item) => setEditing({ ...item });
  const closeForm = () => setEditing(null);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const isNew = !editing.id;
    const url = isNew ? "/api/certificates" : `/api/certificates/${editing.id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
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
    await fetch(`/api/certificates/${id}`, { method: "DELETE" });
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
        <p className="text-sm text-inkMuted dark:text-textLightMuted">{items.length} item(s)</p>
        <div className="flex items-center gap-3">
          {message && <span className="text-sm font-medium text-green-600 dark:text-green-400">{message}</span>}
          <button onClick={openNew} className="rounded-md bg-steel dark:bg-cyanLine px-4 py-2 text-sm font-semibold text-paper dark:text-blueprint hover:opacity-90">
            + {t("admin.add_new")}
          </button>
        </div>
      </div>

      {editing && (
        <form onSubmit={handleSave} className="mb-6 space-y-4 rounded-lg border border-rust/30 dark:border-amberSafety/30 p-5">
          <ImageUploadField value={editing.image} onChange={(url) => setEditing((p) => ({ ...p, image: url }))} label="Image" />

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

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Issuer</label>
              <input className={inputClass} required value={editing.issuer} onChange={(e) => setEditing((p) => ({ ...p, issuer: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Date (YYYY-MM)</label>
              <input className={inputClass} required placeholder="2024-01" value={editing.date} onChange={(e) => setEditing((p) => ({ ...p, date: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Credential ID</label>
              <input className={inputClass} value={editing.credential_id} onChange={(e) => setEditing((p) => ({ ...p, credential_id: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Credential URL (optional)</label>
            <input className={inputClass} value={editing.url} onChange={(e) => setEditing((p) => ({ ...p, url: e.target.value }))} />
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
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg border border-steel/20 dark:border-cyanLine/20 p-4">
              <div className="flex items-center gap-3 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" className="h-12 w-16 shrink-0 rounded object-cover" />
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink dark:text-textLight">{item.title_id}</p>
                  <p className="truncate text-xs text-inkMuted dark:text-textLightMuted">{item.issuer} · {item.date}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openEdit(item)} className="rounded-md border border-steel/30 dark:border-cyanLine/30 px-3 py-1.5 text-xs font-medium text-steel dark:text-cyanLine">
                  {t("admin.edit")}
                </button>
                <button onClick={() => handleDelete(item.id)} className="rounded-md border border-red-400/40 px-3 py-1.5 text-xs font-medium text-red-500">
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
