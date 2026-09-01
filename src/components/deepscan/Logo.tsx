import { Link } from "@tanstack/react-router";

export function SonarMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full badge-ring ${className}`}
    >
      <span className="absolute inset-0 rounded-full border border-primary/40 sonar-pulse" />
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="none" strokeWidth="1.6">
        <path
          d="M2 9c2.2-2.4 4.4-2.4 6.6 0S15.2 11.4 17.4 9 22 6.6 22 6.6"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M2 14c2.2-2.4 4.4-2.4 6.6 0s6.6 2.4 8.8 0 4.6-2.4 4.6-2.4"
          stroke="currentColor"
          strokeLinecap="round"
          opacity="0.75"
        />
        <path
          d="M2 19c2.2-2.4 4.4-2.4 6.6 0s6.6 2.4 8.8 0"
          stroke="currentColor"
          strokeLinecap="round"
          opacity="0.45"
        />
      </svg>
    </span>
  );
}

export function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-3">
      <SonarMark />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-semibold tracking-[0.18em] text-foreground">NAADI</span>
        <span className="mt-1 text-[9px] font-medium tracking-[0.24em] whitespace-nowrap text-muted-foreground">
          SONAR AI DETECTION
        </span>

      </span>
    </Link>
  );
}
