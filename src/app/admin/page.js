"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";

export default function AdminLoginPage() {
  const { t } = useLang();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) router.replace("/admin/dashboard");
      });
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(t("admin.login_error"));
      }
    } catch {
      setError(t("admin.login_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center py-16">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-steel dark:border-cyanLine text-steel dark:text-cyanLine">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 24, height: 24 }}>
          <rect x="5" y="11" width="14" height="9" rx="1" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </div>
      <h1 className="font-display text-2xl font-bold text-ink dark:text-textLight">{t("admin.login_title")}</h1>
      <p className="mt-1 text-center text-sm text-inkMuted dark:text-textLightMuted">{t("admin.login_subtitle")}</p>

      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink dark:text-textLight">{t("admin.password")}</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-steel/30 dark:border-cyanLine/30 bg-transparent px-3 py-2.5 text-ink dark:text-textLight outline-none focus:border-rust dark:focus:border-amberSafety"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-steel dark:bg-cyanLine px-4 py-2.5 text-sm font-semibold text-paper dark:text-blueprint hover:opacity-90 disabled:opacity-60"
        >
          {loading ? t("common.loading") : t("admin.login_button")}
        </button>
      </form>
    </div>
  );
}
