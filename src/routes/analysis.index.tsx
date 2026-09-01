import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/deepscan/AppShell";

export const Route = createFileRoute("/analysis/")({
  head: () => ({
    meta: [
      { title: "Processing Pipeline — DEEPSCAN" },
      { name: "description", content: "Track sonar scans through preprocessing, AI analysis and debris classification." },
      { property: "og:title", content: "Processing Pipeline — DEEPSCAN" },
      { property: "og:description", content: "Track sonar scans through preprocessing, AI analysis and debris classification." },
    ],
  }),
  component: Analysis,
});

const steps = [
  { label: "Uploading", state: "done" },
  { label: "Preprocessing", state: "done" },
  { label: "AI Analysis", state: "active" },
  { label: "Classification", state: "pending" },
  { label: "False Positive", state: "pending" },
  { label: "Completed", state: "pending" },
] as const;

function Analysis() {
  return (
    <AppShell step="03" title="Processing Pipeline" subtitle="SCN-4821 · Monterey Bay, CA · 62 m">
      <div className="rounded-2xl glass p-6 lg:p-8">
        {/* stepper */}
        <div className="flex min-w-full items-start gap-2 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex min-w-[140px] flex-1 flex-col items-center">
              <div className="flex w-full items-center">
                <span className={`h-px flex-1 ${i === 0 ? "opacity-0" : ""} ${s.state === "pending" ? "bg-border" : "bg-success/60"}`} />
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold ${
                    s.state === "done"
                      ? "border-success/60 bg-success/15 text-success"
                      : s.state === "active"
                        ? "border-primary bg-primary/15 text-primary shadow-[var(--shadow-glow)]"
                        : "border-border bg-surface/60 text-muted-foreground"
                  }`}
                >
                  {s.state === "done" ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={`h-px flex-1 ${i === steps.length - 1 ? "opacity-0" : ""} ${
                    s.state === "done" ? "bg-success/60" : "bg-border"
                  }`}
                />
              </div>
              <p
                className={`mt-3 text-center text-xs font-medium ${
                  s.state === "pending" ? "text-muted-foreground" : s.state === "active" ? "text-primary" : "text-success"
                }`}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* visual + counter */}
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-background/60">
          <svg viewBox="0 0 900 340" className="h-[320px] w-full text-primary" fill="none" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${300 - i * 14} C 180 ${240 - i * 12}, 320 ${330 - i * 10}, 470 ${250 - i * 13} S 740 ${170 - i * 9}, 900 ${215 - i * 12}`}
                stroke="currentColor"
                strokeWidth="0.7"
                opacity={0.4 - i * 0.02}
              />
            ))}
            {Array.from({ length: 40 }).map((_, i) => (
              <circle
                key={`p${i}`}
                cx={(i * 97) % 900}
                cy={(i * 53) % 320}
                r={(i % 4) + 1}
                fill="currentColor"
                opacity="0.35"
              />
            ))}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/30 text-center">
            <p className="font-display text-6xl text-primary text-glow">68%</p>
            <p className="mt-4 text-sm text-foreground/80">Detecting patterns and objects...</p>
            <p className="mt-1 text-xs text-muted-foreground">This may take a few moments.</p>
            <div className="mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full w-[68%] rounded-full bg-primary" />
            </div>
            <Link
              to="/analysis/$id"
              params={{ id: "DET-01" }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/60 px-5 py-2.5 text-xs font-medium text-primary transition-all hover:bg-primary/10"
            >
              Preview first detection <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
