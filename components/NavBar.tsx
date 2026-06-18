"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import {
  Home,
  SlidersHorizontal,
  History,
  Bookmark,
  Upload,
  Info,
  Settings,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Wheel", icon: Home },
  { href: "/filters", label: "Filters", icon: SlidersHorizontal },
  { href: "/history", label: "History", icon: History },
  { href: "/saved", label: "Saved", icon: Bookmark },
  { href: "/import", label: "Import", icon: Upload },
  { href: "/about", label: "About", icon: Info },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-glass-border bg-void-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4">
        {/* Logo */}
        <Link href="/" className="mr-4 flex items-center gap-2">
          <span className="text-2xl">🌀</span>
          <span className="hidden font-display text-xl font-bold text-gradient-purple sm:block">
            Omniverse
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-neon-purple/20 text-neon-purple-bright"
                    : "text-white/60 hover:bg-glass-white hover:text-white"
                )}
              >
                <Icon size={14} />
                <span className="hidden sm:block">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Link
            href="/settings"
            className="rounded-lg p-2 text-white/60 transition-all hover:bg-glass-white hover:text-white"
            aria-label="Settings"
          >
            <Settings size={16} />
          </Link>
          <Link
            href="/admin"
            className="rounded-lg p-2 text-white/40 transition-all hover:bg-glass-white hover:text-white"
            aria-label="Admin"
          >
            <Shield size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
