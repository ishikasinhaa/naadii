import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UploadCloud,
  Radar,
  Map,
  History,
  FileText,
  Settings,
} from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload Scan", icon: UploadCloud },
  { to: "/analysis", label: "Analysis", icon: Radar },
  { to: "/map", label: "Map Tracker", icon: Map },
  { to: "/history", label: "History", icon: History },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[250px] flex-col border-r border-sidebar-border bg-sidebar/90 backdrop-blur-xl lg:flex">
      <div className="px-6 py-6">
        <Logo />
      </div>

      <nav className="mt-2 flex flex-1 flex-col gap-1 px-3">
        {nav.map((item) => {
          const active =
            item.to === "/analysis"
              ? pathname.startsWith("/analysis")
              : pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <span
                className={`absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 rounded-full bg-primary transition-opacity ${
                  active ? "opacity-100" : "opacity-0"
                }`}
              />
              <item.icon className="h-4 w-4" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="m-4 rounded-xl glass p-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-success opacity-60 sonar-pulse" />
            <span className="h-2 w-2 rounded-full bg-success" />
          </span>
          <p className="text-xs font-semibold tracking-wide text-foreground">System Status</p>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">All systems operational</p>
        <svg viewBox="0 0 120 28" className="mt-3 h-7 w-full text-primary" fill="none">
          <path
            d="M0 20 L12 14 L22 22 L34 8 L46 17 L58 6 L70 15 L82 10 L94 19 L106 12 L120 16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </aside>
  );
}
