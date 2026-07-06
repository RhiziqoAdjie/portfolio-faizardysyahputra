"use client";

import { useRef, useState } from "react";
import { useLang } from "@/context/LangContext";

export default function ImageUploadField({ value, onChange, label }) {
  const { t } = useLang();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        onChange(data.url);
      } else {
        setError(data.message || "Upload failed");
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const inputId = `upload-${(label || "image").replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      {label && <label className="mb-1.5 block text-sm font-medium text-ink dark:text-textLight">{label}</label>}
      <div className="flex items-center gap-3">
        {value && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={value} alt="preview" className="h-16 w-16 rounded-md border border-steel/25 dark:border-cyanLine/25 object-cover" />
        )}
        <div>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" id={inputId} />
          <label
            htmlFor={inputId}
            className="cursor-pointer rounded-md border border-steel/40 dark:border-cyanLine/40 px-3 py-1.5 text-sm font-medium text-steel dark:text-cyanLine hover:bg-steel/10 dark:hover:bg-cyanLine/10"
          >
            {uploading ? t("admin.uploading") : t("admin.upload_image")}
          </label>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
