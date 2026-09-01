import { createFileRoute } from "@tanstack/react-router";
import { FileText, FileImage, Share2 } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { AppShell, SectionCard } from "@/components/deepscan/AppShell";
import { debrisBreakdown } from "@/lib/mock-data";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Report & Export — NAADI" },
      { name: "description", content: "Preview and export ocean debris analysis reports as PDF or image." },
      { property: "og:title", content: "Report & Export — NAADI" },
      { property: "og:description", content: "Preview and export ocean debris analysis reports as PDF or image." },
    ],
  }),
  component: Reports,
});


function ScanStrip() {
  return (
    <svg viewBox="0 0 200 120" className="h-[120px] w-full rounded-md" aria-hidden="true">
      <rect width="200" height="120" fill="#0a0a0a" />
      {Array.from({ length: 260 }).map((_, i) => {
        const x = (i * 41) % 200;
        const y = (i * 67) % 120;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 6 === 0 ? 1.4 : 0.8}
            fill="var(--amber-scan)"
            opacity={Math.max(0.08, 0.8 - Math.hypot(x - 100, y - 60) / 110)}
          />
        );
      })}
    </svg>
  );
}

const exportOptions = [
  { icon: FileText, title: "Download PDF", desc: "Full report with charts and legends" },
  { icon: FileImage, title: "Download JPEG", desc: "Single-page image snapshot" },
  { icon: Share2, title: "Share Report", desc: "Generate a private view link" },
];

const summary = [
  ["Total Detections", "68"],
  ["Top Class", "Plastic (42%)"],
  ["Avg Confidence", "91.6%"],
  ["Survey Area", "3.2 km²"],
];

function Reports() {
  return (
    <AppShell step="07" title="Report & Export" subtitle="Publish mission findings for stakeholders">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <SectionCard title="Report Preview">
          <div className="rounded-xl bg-white p-7 text-[#0b1622] shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-[#dbe4ec] pb-4">
              <div>
                <p className="text-lg font-semibold tracking-[0.18em]">NAADI</p>
                <p className="text-[10px] tracking-[0.22em] text-[#5b6b7c]">SONAR AI DETECTION</p>
              </div>
              <div className="text-right text-[11px] text-[#5b6b7c]">
                <p>Report ID: RPT-2026-0428</p>
                <p>2026-08-28 · 09:42 UTC</p>
              </div>
            </div>

            <h3 className="mt-5 font-display text-2xl">Ocean Debris Analysis Report</h3>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <ScanStrip />
              <ScanStrip />
            </div>

            <div className="mt-5 flex flex-wrap gap-4">
              {debrisBreakdown.map((d) => (
                <span key={d.name} className="flex items-center gap-2 text-[11px]">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name}
                  <span className="text-[#5b6b7c]">{d.value}% conf.</span>
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-[minmax(0,1fr)_150px]">
              <div className="rounded-lg bg-[#f2f6fa] p-4">
                <p className="text-[10px] font-semibold tracking-[0.16em] text-[#5b6b7c] uppercase">
                  Summary
                </p>
                <dl className="mt-3 space-y-2 text-xs">
                  {summary.map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-[#dbe4ec] pb-1.5 last:border-0">
                      <dt className="text-[#5b6b7c]">{k}</dt>
                      <dd className="font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={debrisBreakdown}
                      dataKey="value"
                      innerRadius={42}
                      outerRadius={70}
                      paddingAngle={3}
                      stroke="none"
                    >
                      {debrisBreakdown.map((d) => (
                        <Cell key={d.name} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Export Options">
          <ul className="space-y-3">
            {exportOptions.map((o) => (
              <li key={o.title}>
                <button className="flex w-full items-center gap-4 rounded-xl border border-border bg-surface/50 p-4 text-left transition-colors hover:border-primary/50">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl badge-ring">
                    <o.icon className="h-5 w-5 text-primary" strokeWidth={1.4} />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">{o.title}</span>
                    <span className="block text-xs text-muted-foreground">{o.desc}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </AppShell>
  );
}
