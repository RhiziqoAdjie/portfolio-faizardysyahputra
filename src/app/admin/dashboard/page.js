"use client";

import Link from "next/link";
import { useLang } from "@/context/LangContext";

export default function DashboardHome() {
  const { t } = useLang();

  const cards = [
    { href: "/admin/dashboard/profile", label: t("admin.manage_profile"), desc_id: "Ubah nama, foto, bio, kontak, dan keahlian.", desc_en: "Edit name, photo, bio, contact, and skills." },
    { href: "/admin/dashboard/projects", label: t("admin.manage_projects"), desc_id: "Tambah, ubah, atau hapus proyek portofolio.", desc_en: "Add, edit, or remove portfolio projects." },
    { href: "/admin/dashboard/experience", label: t("admin.manage_experience"), desc_id: "Kelola riwayat pekerjaan dan pendidikan.", desc_en: "Manage work and education history." },
    { href: "/admin/dashboard/certificates", label: t("admin.manage_certificates"), desc_id: "Kelola daftar sertifikat dan kredensial.", desc_en: "Manage certificates and credentials." },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="rounded-lg border border-steel/20 dark:border-cyanLine/20 p-5 transition-colors hover:border-rust/50 dark:hover:border-amberSafety/50"
        >
          <h3 className="font-display text-lg font-semibold text-ink dark:text-textLight">{card.label}</h3>
          <p className="mt-1 text-sm text-inkMuted dark:text-textLightMuted">{card.desc_id}</p>
        </Link>
      ))}
    </div>
  );
}
