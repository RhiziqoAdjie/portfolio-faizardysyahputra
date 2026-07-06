export default function BlueprintBg({ children }) {
  return (
    <div className="relative min-h-screen blueprint-bg overflow-x-hidden">
      {/* Decorative truss line motif, very subtle, fixed to viewport */}
      <svg
        className="pointer-events-none fixed inset-0 h-full w-full opacity-[0.05] dark:opacity-[0.08]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" className="text-steel dark:text-cyanLine" strokeWidth="1" fill="none">
          <polyline points="0,900 120,700 240,900 360,700 480,900 600,700 720,900 840,700 960,900 1080,700 1200,900 1320,700 1440,900" />
          <polyline points="0,700 120,500 240,700 360,500 480,700 600,500 720,700 840,500 960,700 1080,500 1200,700 1320,500 1440,700" />
          <line x1="0" y1="900" x2="1440" y2="500" />
          <line x1="0" y1="500" x2="1440" y2="900" />
        </g>
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
