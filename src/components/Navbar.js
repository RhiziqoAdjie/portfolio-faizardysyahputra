"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLang } from "@/context/LangContext";
import ThemeToggle from "./ThemeToggle";
import LangToggle from "./LangToggle";

export default function Navbar() {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/projects", label: t("nav.project") },
    { href: "/experience", label: t("nav.experience") },
    { href: "/certificates", label: t("nav.certificate") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-steel/15 dark:border-cyanLine/15 bg-paper/85 dark:bg-blueprint/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight text-ink dark:text-textLight">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style={{ width: 26, height: 26 }} className="text-rust dark:text-amberSafety">
            <path d="M4 26h24M6 26V14l10-8 10 8v12M11 26V18h10v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
          <span>
            FAS<span className="text-steel dark:text-cyanLine">.Faiz</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-rust dark:text-amberSafety"
                    : "text-inkMuted dark:text-textLightMuted hover:text-ink dark:hover:text-textLight"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-rust dark:bg-amberSafety" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <button
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-md border border-steel/30 dark:border-cyanLine/30 text-steel dark:text-cyanLine md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ width: 18, height: 18 }}>
              {open ? <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-steel/15 dark:border-cyanLine/15 bg-paper dark:bg-blueprint md:hidden">
          <div className="flex flex-col px-5 py-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-2 py-3 text-sm font-medium border-b border-steel/10 dark:border-cyanLine/10 last:border-none ${
                    active ? "text-rust dark:text-amberSafety" : "text-inkMuted dark:text-textLightMuted"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
