import { createFileRoute } from "@tanstack/react-router";
import { Pencil, KeyRound, Download, Trash2 } from "lucide-react";
import { AppShell, SectionCard } from "@/components/deepscan/AppShell";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — DEEPSCAN" },
      { name: "description", content: "Manage your DEEPSCAN profile, notifications, detection defaults and security." },
      { property: "og:title", content: "Settings — DEEPSCAN" },
      { property: "og:description", content: "Manage your DEEPSCAN profile, notifications, detection defaults and security." },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-border/60 py-3 last:border-0">
      <span className="text-sm text-foreground/85">{label}</span>
      <span className="relative inline-flex">
        <input type="checkbox" defaultChecked={defaultOn} className="peer sr-only" />
        <span className="h-5 w-9 rounded-full bg-surface-2 ring-1 ring-border transition-colors peer-checked:bg-primary/70" />
        <span className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-foreground/80 transition-transform peer-checked:translate-x-4 peer-checked:bg-primary-foreground" />
      </span>
    </label>
  );
}

function SettingsPage() {
  return (
    <AppShell step="08" title="Settings" subtitle="Account, notifications and detection defaults">
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Profile">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary ring-1 ring-primary/30">
              IS
            </span>
            <div className="flex-1">
              <p className="font-display text-xl text-foreground">Ishika Sinha</p>
              <p className="text-sm text-muted-foreground">ishika.sinha@deepscan.ocean</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-primary/60 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/10">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
          </div>
        </SectionCard>

        <SectionCard title="Notification Preferences">
          <Toggle label="Email alerts on completed scans" defaultOn />
          <Toggle label="High-confidence detection alerts" defaultOn />
          <Toggle label="Weekly mission digest" />
          <Toggle label="Product & model updates" />
        </SectionCard>

        <SectionCard title="Detection Preferences">
          <div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Minimum confidence threshold</span>
              <span className="font-semibold text-primary">70%</span>
            </div>
            <input type="range" min={0} max={100} defaultValue={70} className="mt-3 w-full accent-primary" />
          </div>
          <div className="mt-5">
            <span className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Default sonar frequency
            </span>
            <select
              defaultValue="455"
              className="mt-2 w-full rounded-lg border border-input bg-surface/60 px-3 py-2.5 text-sm text-foreground outline-hidden"
            >
              <option value="455">455 kHz</option>
              <option value="800">800 kHz</option>
              <option value="1200">1200 kHz</option>
            </select>
          </div>
        </SectionCard>

        <SectionCard title="Account & Security">
          <button className="flex w-full items-center gap-3 rounded-xl border border-border bg-surface/50 p-4 text-left transition-colors hover:border-primary/50">
            <KeyRound className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground/85">Change password</span>
          </button>
          <div className="mt-3">
            <Toggle label="Two-factor authentication" defaultOn />
          </div>
        </SectionCard>

        <SectionCard title="Danger Zone" className="xl:col-span-2 border-destructive/40">
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-destructive/60 px-5 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
              <Download className="h-4 w-4" /> Export all data
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-destructive/60 px-5 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10">
              <Trash2 className="h-4 w-4" /> Delete account
            </button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Deleting your account permanently removes all scans, detections and reports.
          </p>
        </SectionCard>
      </div>
    </AppShell>
  );
}
