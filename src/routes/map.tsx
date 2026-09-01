import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Minus, LocateFixed, ArrowRight, Trash, Fish, Wrench, Waves } from "lucide-react";
import { AppShell, SectionCard } from "@/components/deepscan/AppShell";
import { detections, kindColor } from "@/lib/mock-data";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map Tracker — DEEPSCAN" },
      { name: "description", content: "Geospatial tracker of debris detections along survey routes." },
      { property: "og:title", content: "Map Tracker — DEEPSCAN" },
      { property: "og:description", content: "Geospatial tracker of debris detections along survey routes." },
    ],
  }),
  component: MapTracker,
});

const kindIcon = { plastic: Trash, ghostnet: Waves, metal: Wrench, fishing: Fish } as const;

const legend = [
  { label: "Plastic", kind: "plastic" as const },
  { label: "Ghost Net", kind: "ghostnet" as const },
  { label: "Metal", kind: "metal" as const },
  { label: "Fishing Debris", kind: "fishing" as const },
];

function MapTracker() {
  const route = detections.slice(0, 8);

  return (
    <AppShell step="05" title="Map Tracker" subtitle="Detections plotted across the active survey corridor">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <SectionCard>
          <div className="relative overflow-hidden rounded-xl border border-border bg-background">
            <svg viewBox="0 0 800 520" className="h-[500px] w-full" aria-hidden="true">
              <rect width="800" height="520" fill="oklch(0.17 0.024 248)" />
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 42} y1="0" x2={i * 42} y2="520" stroke="var(--primary)" strokeWidth="0.4" opacity="0.08" />
              ))}
              {Array.from({ length: 13 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 42} x2="800" y2={i * 42} stroke="var(--primary)" strokeWidth="0.4" opacity="0.08" />
              ))}
              {/* coastline landmass */}
              <path
                d="M0 40 C 120 90, 90 190, 180 240 C 260 285, 220 380, 300 440 C 340 470, 300 520, 250 520 L0 520 Z"
                fill="oklch(0.22 0.03 245)"
                stroke="var(--primary)"
                strokeWidth="1"
                strokeOpacity="0.35"
              />
              <path
                d="M720 0 C 690 80, 780 140, 800 210 L800 0 Z"
                fill="oklch(0.22 0.03 245)"
                stroke="var(--primary)"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              {/* dashed route */}
              <polyline
                points={route.map((d) => `${(d.x / 100) * 800},${(d.y / 100) * 520}`).join(" ")}
                fill="none"
                stroke="var(--primary)"
                strokeWidth="1.6"
                strokeDasharray="8 6"
                opacity="0.8"
              />
              {route.map((d) => (
                <circle
                  key={`w${d.id}`}
                  cx={(d.x / 100) * 800}
                  cy={(d.y / 100) * 520}
                  r="3.5"
                  fill="var(--primary)"
                  opacity="0.9"
                />
              ))}
              {/* pins */}
              {detections.map((d) => {
                const cx = (d.x / 100) * 800;
                const cy = (d.y / 100) * 520;
                return (
                  <g key={d.id}>
                    <circle cx={cx} cy={cy} r="12" fill={kindColor[d.kind]} opacity="0.18" />
                    <path
                      d={`M${cx} ${cy - 16} c -6 0 -10 4.6 -10 10.4 C ${cx - 10} ${cy - 1} ${cx} ${cy + 4} ${cx} ${cy + 4} s 10 -5 10 -9.6 C ${cx + 10} ${cy - 11.4} ${cx + 6} ${cy - 16} ${cx} ${cy - 16} z`}
                      fill={kindColor[d.kind]}
                    />
                  </g>
                );
              })}
            </svg>

            <div className="absolute right-3 top-3 flex flex-col gap-2">
              {[Plus, Minus, LocateFixed].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label="Map control"
                  className="flex h-9 w-9 items-center justify-center rounded-lg glass-soft text-primary transition-colors hover:bg-primary/15"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>

            <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-xl glass-soft px-3 py-2">
              {legend.map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 text-[11px] text-foreground/80">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: kindColor[l.kind] }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          {/* filter bar */}
          <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface/50 p-4">
            {["All Types", "All Missions", "All Time"].map((f) => (
              <select
                key={f}
                className="rounded-lg border border-input bg-background/60 px-3 py-2 text-xs text-foreground/80 outline-hidden"
                defaultValue={f}
              >
                <option>{f}</option>
                <option>Custom…</option>
              </select>
            ))}
            <div className="flex min-w-[220px] flex-1 items-center gap-3">
              <span className="text-xs whitespace-nowrap text-muted-foreground">Confidence Threshold</span>
              <input type="range" min={0} max={100} defaultValue={70} className="flex-1 accent-primary" />
              <span className="text-xs font-semibold text-primary">70%</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title={`Detections (${detections.length})`}
          action={
            <Link to="/history" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View All Detections <ArrowRight className="h-3 w-3" />
            </Link>
          }
        >
          <ul className="space-y-2">
            {detections.map((d) => {
              const Icon = kindIcon[d.kind];
              return (
                <li key={d.id}>
                  <Link
                    to="/analysis/$id"
                    params={{ id: d.id }}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 px-3 py-3 transition-colors hover:border-primary/50"
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `color-mix(in oklab, ${kindColor[d.kind]} 18%, transparent)` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: kindColor[d.kind] }} strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{d.type}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {d.date} · {d.depth}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-success">{d.confidence}%</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}
