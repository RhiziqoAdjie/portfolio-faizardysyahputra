"use client";

import { useRef, useState } from "react";
import { useLang } from "@/context/LangContext";

const MAX_PER_BATCH = 5; // max dipilih sekaligus

/**
 * MultiImageUploadField
 * @param {string[]}  images   - array URL gambar saat ini
 * @param {Function}  onChange - dipanggil dengan array URL terbaru
 * @param {string}    label
 */
export default function MultiImageUploadField({ images = [], onChange, label }) {
  const { t } = useLang();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(""); // "2/5"
  const [error, setError] = useState("");

  async function uploadSingle(file) {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Upload failed");
    return data.url;
  }

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (files.length > MAX_PER_BATCH) {
      setError(`Maksimal ${MAX_PER_BATCH} gambar sekaligus.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setUploading(true);
    setError("");
    const newUrls = [];

    for (let i = 0; i < files.length; i++) {
      setUploadProgress(`${i + 1}/${files.length}`);
      try {
        const url = await uploadSingle(files[i]);
        newUrls.push(url);
      } catch (err) {
        setError(`Gagal upload ${files[i].name}: ${err.message}`);
      }
    }

    setUploading(false);
    setUploadProgress("");
    if (inputRef.current) inputRef.current.value = "";
    if (newUrls.length) onChange([...images, ...newUrls]);
  }

  function removeImage(idx) {
    const next = images.filter((_, i) => i !== idx);
    onChange(next);
  }

  function moveLeft(idx) {
    if (idx === 0) return;
    const next = [...images];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  }

  function moveRight(idx) {
    if (idx === images.length - 1) return;
    const next = [...images];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  }

  const inputId = `multi-upload-${(label || "images").replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-ink dark:text-textLight">
          {label}
          <span className="ml-2 font-mono text-[11px] text-inkMuted dark:text-textLightMuted">
            ({images.length} gambar · max {MAX_PER_BATCH} sekaligus)
          </span>
        </label>
      )}

      {/* Grid preview gambar */}
      {images.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {images.map((url, idx) => (
            <div key={url + idx} className="group relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`gambar ${idx + 1}`}
                className="h-20 w-24 rounded-md border border-steel/25 dark:border-cyanLine/25 object-cover"
              />
              {/* Badge urutan */}
              <span className="absolute left-1 top-1 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[10px] text-white">
                {idx + 1}
              </span>
              {/* Overlay tombol aksi */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-md bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Pindah kiri */}
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveLeft(idx)}
                    disabled={idx === 0}
                    className="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-white hover:bg-white/40 disabled:opacity-30"
                    title="Geser kiri"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10 }}>
                      <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {/* Hapus */}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="flex h-6 w-6 items-center justify-center rounded bg-red-500/80 text-white hover:bg-red-500"
                    title="Hapus gambar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10 }}>
                      <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" />
                    </svg>
                  </button>
                  {/* Pindah kanan */}
                  <button
                    type="button"
                    onClick={() => moveRight(idx)}
                    disabled={idx === images.length - 1}
                    className="flex h-6 w-6 items-center justify-center rounded bg-white/20 text-white hover:bg-white/40 disabled:opacity-30"
                    title="Geser kanan"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 10, height: 10 }}>
                      <path d="M6 12l4-4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tombol upload */}
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFiles}
          className="hidden"
          id={inputId}
        />
        <label
          htmlFor={inputId}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
            uploading
              ? "border-steel/20 dark:border-cyanLine/20 text-inkMuted dark:text-textLightMuted cursor-not-allowed"
              : "border-steel/40 dark:border-cyanLine/40 text-steel dark:text-cyanLine hover:bg-steel/10 dark:hover:bg-cyanLine/10"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: 14, height: 14 }}>
            <path d="M10 13V3M6 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" strokeLinecap="round" />
          </svg>
          {uploading
            ? `Mengupload ${uploadProgress}...`
            : `Tambah Gambar (max ${MAX_PER_BATCH} sekaligus)`}
        </label>
        {images.length > 0 && (
          <span className="text-xs text-inkMuted dark:text-textLightMuted">
            Total: {images.length} gambar
          </span>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      <p className="mt-1 text-xs text-inkMuted/70 dark:text-textLightMuted/70">
        Gambar pertama akan tampil sebagai cover. Hover gambar untuk mengatur urutan atau hapus.
      </p>
    </div>
  );
}
