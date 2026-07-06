"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/context/LangContext";

export default function AdminSidebar() {
  const { t } = useLang();
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    { href: "/admin/dashboard", label: t("admin.dashboard"), icon: "grid" },
    { href: "/admin/dashboard/profile", label: t("admin.manage_profile"), icon: "user" },
    { href: "/admin/dashboard/projects", label: t("admin.manage_projects"), icon: "layers" },
    { href: "/admin/dashboard/experience", label: t("admin.manage_experience"), icon: "briefcase" },
    { href: "/admin/dashboard/certificates", label: t("admin.manage_certificates"), icon: "award" },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin");
  };

  return (
    <aside className="w-full shrink-0 md:w-56">
      <nav className="flex flex-row gap-1 overflow-x-auto rounded-lg border border-steel/20 dark:border-cyanLine/20 p-2 md:flex-col md:overflow-visible">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-steel text-paper dark:bg-cyanLine dark:text-blueprint"
                  : "text-inkMuted dark:text-textLightMuted hover:bg-steel/10 dark:hover:bg-cyanLine/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="mt-0 rounded-md px-3 py-2 text-left text-sm font-medium text-rust dark:text-amberSafety hover:bg-rust/10 dark:hover:bg-amberSafety/10 md:mt-2"
        >
          {t("admin.logout")}
        </button>
      </nav>
    </aside>
  );
}
