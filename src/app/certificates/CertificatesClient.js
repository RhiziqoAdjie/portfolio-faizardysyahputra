"use client";

import { useLang } from "@/context/LangContext";
import SectionTitle from "@/components/SectionTitle";
import CertificateCard from "@/components/CertificateCard";
import useInView from "@/hooks/useInView";

function AnimatedCert({ cert, index }) {
  const [ref, visible] = useInView(0.1);
  const delay = Math.min(index * 0.12, 0.6);
  return (
    <div
      ref={ref}
      className="anim-fade-scale h-full"
      style={visible ? { opacity: 1, transform: "none", transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s` } : {}}
    >
      <CertificateCard cert={cert} />
    </div>
  );
}

export default function CertificatesClient({ certificates }) {
  const { t } = useLang();
  const [refTitle, visTitle] = useInView(0.2);

  return (
    <div>
      <SectionTitle eyebrow="//CERTIFICATES" title={t("certificate.title")} subtitle={t("certificate.subtitle")} />

      {certificates.length === 0 ? (
        <p className="text-inkMuted dark:text-textLightMuted">{t("certificate.empty")}</p>
      ) : (
        <div
          ref={refTitle}
          className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch anim-fade-up ${visTitle ? "anim-visible" : ""}`}
          style={visTitle ? { transition: "opacity 0.8s ease, transform 0.8s ease" } : {}}
        >
          {certificates.map((cert, idx) => (
            <AnimatedCert key={cert.id} cert={cert} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
