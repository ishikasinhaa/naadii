import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ZoomIn, ZoomOut, Maximize2, Download, FilePlus2, Share2, Trash } from "lucide-react";
import { AppShell, SectionCard } from "@/components/deepscan/AppShell";
import { detections } from "@/lib/mock-data";

export const Route = createFileRoute("/analysis/$id")({
  head: () => ({
    meta: [
      { title: "Detection Detail — DEEPSCAN" },
      { name: "description", content: "Inspect a single sonar detection with classification, confidence and geolocation." },
      { property: "og:title", content: "Detection Detail — DEEPSCAN" },
      { property: "og:description", content: "Inspect a single sonar detection with classification, confidence and geolocation." },
    ],
  }),
  component: DetectionDetail,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-3 text-sm last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function DetectionDetail() {
  const { id } = Route.useParams();
  const det = detections.find((d) => d.id === id) ?? detections[0];

  return (
    <AppShell step="04" title="Detection Detail" subtitle={`${det.id} · ${det.type}`}>
      <Link
        to="/analysis"
        className="inline-flex items-center gap-2 text-sm text-primary transition-opacity hover:opacity-80"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Analysis
      </Link>

      <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <SectionCard title="Sonar Crop">
          <div className="relative overflow-hidden rounded-xl border border-border bg-black">
            <svg viewBox="0 0 800 520" className="h-[460px] w-full" aria-hidden="true">
              <defs>
                <radialGradient id="scanGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="var(--amber-scan)" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="800" height="520" fill="#000" />
              <ellipse cx="400" cy="260" rx="300" ry="190" fill="url(#scanGlow)" />
              {Array.from({ length: 900 }).map((_, i) => {
                const x = (i * 173) % 800;
                const y = (i * 271) % 520;
                const d = Math.hypot(x - 400, y - 260);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={i % 5 === 0 ? 1.6 : 0.9}
                    fill="var(--amber-scan)"
                    opacity={Math.max(0.05, 0.85 - d / 340)}
                  />
                );
              })}
              <rect
                x="300"
                y="190"
                width="200"
                height="140"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1.5"
                strokeDasharray="6 5"
              />
            </svg>
            <div className="absolute right-3 top-3 flex flex-col gap-2">
              {[ZoomIn, ZoomOut, Maximize2].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label="Zoom control"
                  className="flex h-9 w-9 items-center justify-center rounded-lg glass-soft text-primary transition-colors hover:bg-primary/15"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <span className="absolute bottom-3 left-3 rounded-full glass-soft px-3 py-1 text-[11px] text-foreground/80">
              Zoom 1.0x
            </span>
          </div>
        </SectionCard>

        <div className="flex flex-col gap-6">
          <SectionCard title="Object Information">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl badge-ring">
                <Trash className="h-5 w-5 text-primary" strokeWidth={1.4} />
              </span>
              <div>
                <p className="font-display text-xl text-foreground">{det.type}</p>
                <p className="text-xs text-muted-foreground">Classification: Marine Debris</p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confidence Score</span>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">91%</span>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
                    High
                  </span>
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div className="h-full w-[91%] rounded-full bg-primary" />
              </div>
            </div>

            <div className="mt-5">
              <Row label="Estimated Size" value="1.8 m²" />
              <Row label="Estimated Length" value="2.4 m" />
              <Row label="Location" value="36.6021° N, 121.8947° W" />
              <Row label="Timestamp" value="2026-08-28 09:14 UTC" />
              <Row label="Depth" value={det.depth} />
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Object Detection Probability</span>
                <span className="font-semibold text-foreground">{det.confidence}%</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-primary" style={{ width: `${det.confidence}%` }} />
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-surface/50 p-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Notes
              </p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                Dense acoustic shadow consistent with entangled synthetic material. Flagged for
                recovery vessel tasking; no false-positive markers triggered.
              </p>
            </div>
          </SectionCard>

          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)]">
              <Download className="h-4 w-4" /> Download Crop
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-primary/60 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10">
              <FilePlus2 className="h-4 w-4" /> Add to Report
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary">
              <Share2 className="h-4 w-4" /> Share Result
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
