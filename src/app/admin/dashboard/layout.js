"use client";

import AdminGuard from "@/components/AdminGuard";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function DashboardLayout({ children }) {
  const { t } = useLang();

  return (
    <AdminGuard>
      <div className="flex flex-col gap-6 md:flex-row">
        <AdminSidebar />
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="font-display text-xl font-bold text-ink dark:text-textLight">{t("admin.dashboard")}</h1>
            <Link href="/" className="text-sm font-medium text-rust dark:text-amberSafety hover:underline">
              {t("admin.back_to_site")}
            </Link>
          </div>
          {children}
        </div>
      </div>
    </AdminGuard>
  );
}
