import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Radar,
  Map as MapIcon,
  Crosshair,
  Activity,
  ChevronDown,
  Waves,
  BrainCircuit,
  ScanSearch,
  Filter,
  Fish,
  Mouse,
} from "lucide-react";
import whaleHero from "@/assets/whale-hero.jpg";
import { Logo } from "@/components/deepscan/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NAADI — Exploring the Ocean. Protecting our Future." },
      {
        name: "description",
        content:
          "Advanced sonar imaging and AI classification that detects ocean debris and helps protect vulnerable marine ecosystems.",
      },
      { property: "og:title", content: "NAADI — Sonar AI Ocean Debris Detection" },
      {
        property: "og:description",
        content:
          "Advanced sonar imaging and AI classification that detects ocean debris and helps protect vulnerable marine ecosystems.",
      },
    ],
  }),
  component: Landing,
});

const navLinks = ["Home", "Mission", "Technology"] as const;

const stats = [
  { icon: Radar, value: "4,812", label: "Debris Detected" },
  { icon: MapIcon, value: "14.8 km²", label: "Area Surveyed" },
  { icon: Crosshair, value: "93.4%", label: "AI Confidence" },
  { icon: Activity, value: "42", label: "Missions Completed" },
];

const features = [
  {
    icon: Waves,
    title: "Advanced Sonar Imaging",
    desc: "High-resolution side-scan sonar data capture",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Detection",
    desc: "Deep learning models trained for marine debris",
  },
  {
    icon: ScanSearch,
    title: "Accurate Classification",
    desc: "Multi-class debris classification system",
  },
  {
    icon: Filter,
    title: "False Positive Reduction",
    desc: "Intelligent filtering for cleaner results",
  },
  {
    icon: Fish,
    title: "Marine Ecosystem Protection",
    desc: "Data-driven insights for a cleaner ocean",
  },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen">
        {/* whale photo, right side full-bleed */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[68%]">
          <img
            src={whaleHero}
            alt="Humpback whale swimming through sunlit deep ocean water"
            width={1408}
            height={1104}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/40" />
        </div>

        {/* bottom-left particle wave graphic */}
        <svg
          viewBox="0 0 600 300"
          className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[600px] max-w-[70vw] text-primary opacity-60"
          fill="none"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <path
              key={i}
              d={`M-20 ${300 - i * 12} C 120 ${250 - i * 16}, 220 ${300 - i * 6}, 340 ${230 - i * 14} S 500 ${180 - i * 10}, 620 ${210 - i * 12}`}
              stroke="currentColor"
              strokeWidth="0.6"
              opacity={0.55 - i * 0.03}
            />
          ))}
          {[
            [120, 250, 6],
            [200, 275, 4],
            [60, 288, 3],
            [268, 262, 8],
            [330, 285, 5],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill="currentColor" opacity="0.45" />
          ))}
        </svg>

        {/* NAV */}
        <header className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-8 py-7">
          <Logo />
          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((l, i) => (
              <a
                key={l}
                href="#features"
                className={`text-sm transition-colors hover:text-primary ${
                  i === 0 ? "text-primary" : "text-foreground/80"
                }`}
              >
                {l}
              </a>
            ))}
            <Link to="/dashboard" className="text-sm text-foreground/80 transition-colors hover:text-primary">
              Dashboard
            </Link>
            <Link to="/settings" className="text-sm text-foreground/80 transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-primary/60 px-6 py-3 text-sm font-medium text-primary transition-all hover:bg-primary/10 hover:shadow-[var(--shadow-glow)]"
          >
            Launch App <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        {/* HERO CONTENT */}
        <div className="relative z-10 mx-auto grid max-w-[1500px] gap-10 px-8 pb-28 pt-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:pt-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Sonar AI Detection</p>
            <span className="mt-3 block h-px w-9 bg-primary/70" />
            <h1 className="mt-8 font-display text-5xl leading-[1.08] text-foreground sm:text-6xl lg:text-7xl">
              Exploring the Ocean.
              <br />
              Protecting our <span className="text-primary text-glow">Future.</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-foreground/70">
              NAADI uses advanced sonar imaging and AI classification to detect ocean debris and
              help protect vulnerable marine ecosystems.
            </p>
            <Link
              to="/upload"
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-primary/60 bg-primary/5 px-7 py-4 text-sm font-medium text-primary transition-all hover:bg-primary/12 hover:shadow-[var(--shadow-glow)]"
            >
              <Radar className="h-4 w-4" />
              Begin Mission
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* floating stat cards */}
          <div className="flex flex-col gap-4 lg:items-end">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl badge-ring">
                  <s.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </span>
                <div className="w-[132px] shrink-0">
                  <p className="text-xl font-semibold text-foreground">{s.value}</p>
                  <p className="text-xs text-foreground/60">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
          <div className="flex items-center gap-3 text-sm text-foreground/70">
            <Mouse className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Scroll to explore
          </div>
          <ChevronDown className="h-6 w-6 animate-bounce text-foreground/70" strokeWidth={1.5} />
        </div>
      </section>

      {/* FEATURES STRIP */}
      <section id="features" className="mx-auto max-w-[1500px] px-8 pb-24">
        <div className="grid gap-10 rounded-3xl glass p-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] lg:p-10">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-5">
            {features.map((f) => (
              <div key={f.title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full badge-ring">
                  <f.icon className="h-5 w-5 text-primary" strokeWidth={1.4} />
                </span>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/60">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center gap-6 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="font-display text-2xl leading-snug text-foreground">
              Every scan tells a story.
              <br />
              Every detection makes a difference.
            </p>
            <Link
              to="/upload"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[var(--shadow-glow)]"
            >
              Start Your Mission <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
