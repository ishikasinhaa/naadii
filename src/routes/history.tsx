import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Eye, Share2, Trash2, Trash, Fish, Wrench, Waves } from "lucide-react";
import { AppShell, SectionCard } from "@/components/deepscan/AppShell";
import { scans } from "@/lib/mock-data";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Scan History — DEEPSCAN" },
      { name: "description", content: "Searchable archive of completed sonar scans and their top debris classes." },
      { property: "og:title", content: "Scan History — DEEPSCAN" },
      { property: "og:description", content: "Searchable archive of completed sonar scans and their top debris classes." },
    ],
  }),
  component: HistoryPage,
});

const classIcon: Record<string, typeof Trash> = {
  Plastic: Trash,
  "Ghost Net": Waves,
  Metal: Wrench,
  "Fishing Debris": Fish,
};

function HistoryPage() {
  return (
    <AppShell step="06" title="Scan History" subtitle="Every survey processed by the DEEPSCAN pipeline">
      <SectionCard>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search scan ID or location…"
              className="w-full rounded-lg border border-input bg-surface/60 py-2.5 pl-9 pr-3 text-sm outline-hidden placeholder:text-muted-foreground focus:ring-3 focus:ring-ring"
            />
          </div>
          {["All Uploads", "All Depths", "All Zones"].map((f) => (
            <select
              key={f}
              defaultValue={f}
              className="rounded-lg border border-input bg-surface/60 px-3 py-2.5 text-xs text-foreground/80 outline-hidden"
            >
              <option>{f}</option>
              <option>Custom…</option>
            </select>
          ))}
          <button
            type="button"
            aria-label="More filters"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-input text-primary transition-colors hover:bg-primary/10"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="text-left text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                <th className="pb-3 font-medium">Scan ID</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Date &amp; Time</th>
                <th className="pb-3 font-medium">Depth</th>
                <th className="pb-3 font-medium">Top Class</th>
                <th className="pb-3 font-medium">Confidence</th>
                <th className="pb-3 font-medium">Objects</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((s) => {
                const Icon = classIcon[s.topClass] ?? Trash;
                return (
                  <tr key={s.id} className="border-t border-border/60">
                    <td className="py-3.5 font-medium text-primary">{s.id}</td>
                    <td className="py-3.5 text-foreground/80">{s.location}</td>
                    <td className="py-3.5 text-muted-foreground">{s.date}</td>
                    <td className="py-3.5 text-foreground/80">{s.depth}</td>
                    <td className="py-3.5">
                      <span className="flex items-center gap-2 text-foreground/80">
                        <Icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                        {s.topClass}
                      </span>
                    </td>
                    <td className="py-3.5 font-medium text-success">{s.confidence}%</td>
                    <td className="py-3.5 text-foreground/80">{s.objects}</td>
                    <td className="py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to="/analysis/$id"
                          params={{ id: "DET-01" }}
                          aria-label={`View ${s.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:bg-primary/10"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          aria-label={`Share ${s.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:text-primary"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          aria-label={`Delete ${s.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground/70 transition-colors hover:border-destructive/60 hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
          <p className="text-xs text-muted-foreground">Showing 1 to 8 of 47 scans</p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground/70 transition-colors hover:text-primary">
              Previous
            </button>
            {[1, 2, 3, 4, 5, 6].map((p) => (
              <button
                key={p}
                className={`h-8 w-8 rounded-lg text-xs ${
                  p === 1
                    ? "bg-primary/15 text-primary ring-1 ring-primary/40"
                    : "border border-border text-foreground/70 hover:text-primary"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs text-foreground/70 transition-colors hover:text-primary">
              Next
            </button>
          </div>
        </div>
      </SectionCard>
    </AppShell>
  );
}
