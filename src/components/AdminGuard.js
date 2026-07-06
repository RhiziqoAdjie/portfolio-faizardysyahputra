"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [status, setStatus] = useState("checking"); // checking | ok | denied

  useEffect(() => {
    let active = true;
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (data.authenticated) {
          setStatus("ok");
        } else {
          setStatus("denied");
          router.replace("/admin");
        }
      })
      .catch(() => {
        setStatus("denied");
        router.replace("/admin");
      });
    return () => {
      active = false;
    };
  }, [router]);

  if (status !== "ok") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="font-mono text-sm text-inkMuted dark:text-textLightMuted">Checking access…</p>
      </div>
    );
  }

  return children;
}
