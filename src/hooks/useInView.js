"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mengembalikan [ref, isVisible].
 * Saat elemen masuk viewport, isVisible menjadi true (sekali saja).
 * @param {number} threshold  - 0..1, seberapa banyak elemen harus terlihat (default 0.15)
 * @param {string} rootMargin - CSS margin untuk memperluas/mempersempit trigger (default "0px")
 */
export default function useInView(threshold = 0.15, rootMargin = "0px") {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}
