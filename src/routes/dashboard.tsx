import { createFileRoute, Link } from "@tanstack/react-router";
import { Radar, Map as MapIcon, Crosshair, Activity, ArrowRight, UploadCloud } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { AppShell, SectionCard } from "@/components/deepscan/AppShell";
import { debrisBreakdown, scans } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Mission Dashboard — DEEPSCAN" },
      { name: "description", content: "Live overview of sonar surveys, debris detections and AI confidence." },
      { property: "og:title", content: "Mission Dashboard — DEEPSCAN" },
      { property: "og:description", content: "Live overview of sonar surveys, debris detections and AI confidence." },
    ],
  }),
  component: Dashboard,
});

const tiles = [
  { icon: Radar, value: "4,812", label: "Debris Detected" },
  { icon: MapIcon, value: "14.8 km²", label: "Area Surveyed" },
  { icon: Crosshair, value: "93.4%", label: "AI Confidence" },
  { icon: Activity, value: "42", label: "Missions Completed" },
];

function Dashboard() {
  return (
    <AppShell step="01" title="Mission Dashboard" subtitle="Fleet-wide sonar intelligence at a glance">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-2xl glass p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl badge-ring">
              <t.icon className="h-5 w-5 text-primary" strokeWidth={1.4} />
            </span>
            <p className="mt-4 text-2xl font-semibold text-foreground">{t.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <SectionCard
          title="Recent Scans"
          action={
            <Link to="/history" className="text-xs font-medium text-primary hover:underline">
              View history
            </Link>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  <th className="pb-3 font-medium">Scan ID</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Top Class</th>
                  <th className="pb-3 font-medium text-right">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {scans.slice(0, 5).map((s) => (
                  <tr key={s.id} className="border-t border-border/60">
                    <td className="py-3 font-medium text-primary">{s.id}</td>
                    <td className="py-3 text-foreground/80">{s.location}</td>
                    <td className="py-3 text-muted-foreground">{s.date}</td>
                    <td className="py-3 text-foreground/80">{s.topClass}</td>
                    <td className="py-3 text-right font-medium text-success">{s.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl glass p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl badge-ring">
              <UploadCloud className="h-5 w-5 text-primary" strokeWidth={1.4} />
            </span>
            <h3 className="mt-4 font-display text-xl text-foreground">Upload New Scan</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Send fresh side-scan sonar imagery through the detection pipeline.
            </p>
            <Link
              to="/upload"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Upload Scan <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <SectionCard title="Debris Breakdown">
            <div className="flex items-center gap-4">
              <div className="h-[140px] w-[140px] shrink-0">
                <PieChart width={140} height={140}>
                  <Pie
                    data={debrisBreakdown}
                    dataKey="value"
                    cx={70}
                    cy={70}
                    innerRadius={44}
                    outerRadius={66}
                    paddingAngle={3}
                    stroke="none"
                    isAnimationActive={false}
                  >
                    {debrisBreakdown.map((d) => (
                      <Cell key={d.name} fill={d.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>

              <ul className="space-y-2 text-xs">
                {debrisBreakdown.map((d) => (
                  <li key={d.name} className="flex items-center gap-2 text-foreground/80">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: d.color }}
                    />
                    {d.name}
                    <span className="text-muted-foreground">{d.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
