import { createFileRoute, Link } from "@tanstack/react-router";
import { UploadCloud, ShieldCheck, ArrowRight, X, FileImage } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppShell, SectionCard } from "@/components/deepscan/AppShell";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Sonar Scan — NAADI" },
      { name: "description", content: "Upload side-scan sonar imagery and set mission parameters for AI analysis." },
      { property: "og:title", content: "Upload Sonar Scan — NAADI" },
      { property: "og:description", content: "Upload side-scan sonar imagery and set mission parameters for AI analysis." },
    ],
  }),
  component: Upload,
});

const field =
  "mt-2 w-full rounded-lg border border-input bg-surface/60 px-3 py-2.5 text-sm text-foreground outline-hidden placeholder:text-muted-foreground focus:ring-3 focus:ring-ring";

function Label({ children }: { children: string }) {
  return (
    <label className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
      {children}
    </label>
  );
}

const ACCEPT = ".png,.jpg,.jpeg,.tiff,.tif";

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function Upload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function clear() {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <AppShell step="02" title="Upload Sonar Scan" subtitle="Prepare your survey data for the detection pipeline">
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const dropped = e.dataTransfer.files?.[0];
              if (dropped) setFile(dropped);
            }}
            className={`flex h-full min-h-[420px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
              dragging
                ? "border-primary bg-primary/10 shadow-[var(--shadow-glow)]"
                : "border-primary/35 bg-primary/[0.03]"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              className="hidden"
              onChange={(e) => {
                const picked = e.target.files?.[0];
                if (picked) setFile(picked);
              }}
            />

            {file ? (
              <>
                <div className="relative w-full max-w-[320px] overflow-hidden rounded-xl border border-primary/30 bg-surface/60">
                  <button
                    type="button"
                    onClick={clear}
                    aria-label="Remove selected file"
                    className="absolute top-2 right-2 z-10 rounded-full border border-border bg-background/80 p-1.5 text-foreground/70 transition-colors hover:border-destructive/60 hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  {previewUrl ? (
                    <img src={previewUrl} alt={file.name} className="h-44 w-full object-cover" />
                  ) : (
                    <div className="flex h-44 w-full items-center justify-center">
                      <FileImage className="h-10 w-10 text-primary" strokeWidth={1.3} />
                    </div>
                  )}
                </div>
                <p className="mt-5 max-w-[320px] truncate font-display text-lg text-foreground">
                  {file.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{formatSize(file.size)}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    className="rounded-full border border-primary/60 px-6 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:shadow-[var(--shadow-glow)]"
                  >
                    Replace File
                  </button>
                  <button
                    type="button"
                    onClick={clear}
                    className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-destructive/60 hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="relative flex h-24 w-24 items-center justify-center rounded-full badge-ring">
                  <span className="absolute inset-0 rounded-full border border-primary/30 sonar-pulse" />
                  <span className="absolute inset-3 rounded-full border border-primary/25" />
                  <UploadCloud className="h-8 w-8 text-primary" strokeWidth={1.3} />
                </span>
                <p className="mt-7 font-display text-xl text-foreground">
                  Drag &amp; Drop your sonar image here
                </p>
                <p className="mt-1 text-sm text-muted-foreground">or browse files</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {["PNG", "JPG", "TIFF", "GeoTIFF"].map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-border px-3 py-1 text-[11px] tracking-wide text-foreground/70"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-7 rounded-full border border-primary/60 px-6 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:shadow-[var(--shadow-glow)]"
                >
                  Browse Files
                </button>
              </>
            )}
            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              Your data is secure and encrypted
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Mission Parameters">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Location</Label>
              <input className={field} placeholder="e.g. Monterey Bay, CA" />
            </div>
            <div>
              <Label>Survey Depth (m)</Label>
              <input className={field} type="number" placeholder="62" />
            </div>
            <div>
              <Label>Capture Date &amp; Time</Label>
              <input className={field} type="datetime-local" />
            </div>
            <div>
              <Label>Water Conditions</Label>
              <select className={field} defaultValue="calm">
                <option value="calm">Calm</option>
                <option value="moderate">Moderate swell</option>
                <option value="turbid">Turbid</option>
                <option value="rough">Rough</option>
              </select>
            </div>
            <div>
              <Label>Sonar Frequency</Label>
              <select className={field} defaultValue="455">
                <option value="455">455 kHz</option>
                <option value="800">800 kHz</option>
                <option value="1200">1200 kHz</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <Label>Mission Notes</Label>
              <textarea className={field} rows={4} placeholder="Observations, vessel, tow speed…" />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-border pt-6">
            <Link
              to="/dashboard"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground/80 transition-colors hover:border-destructive/60 hover:text-destructive"
            >
              Abort Mission
            </Link>
            <Link
              to="/analysis"
              disabled={!file}
              aria-disabled={!file}
              onClick={(e) => {
                if (!file) e.preventDefault();
              }}
              className={`inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all ${
                file ? "hover:shadow-[var(--shadow-glow)]" : "pointer-events-none opacity-40"
              }`}
            >
              Begin Ocean Analysis <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
