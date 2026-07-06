export default function SectionTitle({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <div className={`mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      {eyebrow && (
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-rust dark:text-amberSafety">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink dark:text-textLight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-2xl text-inkMuted dark:text-textLightMuted" style={align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-px w-16 bg-steel/40 dark:bg-cyanLine/40 ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}
