"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Inbox, LayoutGrid, Newspaper, Landmark, Shield, Sparkles, Users, TreePalm, Goal } from "lucide-react";

const NavLink = ({ href, label, icon: Icon, active }: { href: string; label: string; icon?: any; active?: boolean }) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
      active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
    )}
  >
    {Icon ? <Icon className="h-4 w-4" /> : null}
    <span className="line-clamp-1">{label}</span>
  </Link>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const groups = useMemo(
    () => [
      {
        title: "General",
        items: [
          { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
          { href: "/dashboard/inbox", label: "Inbox", icon: Inbox },
        ],
      },
      {
        title: "Informasi",
        items: [
          { href: "/dashboard/informasi/berita", label: "Berita", icon: Newspaper },
          { href: "/dashboard/informasi/pkk", label: "PKK", icon: Users },
          { href: "/dashboard/informasi/puskesmas", label: "Puskesmas", icon: Landmark },
        ],
      },
      {
        title: "Layanan",
        items: [
          { href: "/dashboard/layanan/administrasi", label: "Administrasi", icon: Landmark },
          { href: "/dashboard/layanan/keamanan", label: "Keamanan", icon: Shield },
          { href: "/dashboard/layanan/kebersihan", label: "Kebersihan", icon: Sparkles },
        ],
      },
      {
        title: "Tentang Kami",
        items: [
          { href: "/dashboard/tentang-kami/pengurus-rt", label: "Pengurus RT", icon: Users },
          { href: "/dashboard/tentang-kami/struktur-rw", label: "Struktur RW", icon: TreePalm },
          { href: "/dashboard/tentang-kami/visi-misi", label: "Visi & Misi", icon: Goal },
        ],
      },
    ],
    []
  );

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="border-r bg-card/50">
        <div className="h-14 px-3 flex items-center font-semibold text-sm">Admin Dashboard</div>
        <Separator />
        <nav className="p-3 space-y-6">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="px-3 text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    active={pathname === item.href}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="min-h-screen">
        {/* Top bar (optional) */}
        <div className="h-14 px-4 border-b flex items-center justify-between sticky top-0 bg-background/60 backdrop-blur">
          <div className="font-medium">{groups.flatMap((g) => g.items).find((i) => i.href === pathname)?.label || "Dashboard"}</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/">Lihat Website</Link>
            </Button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto w-full p-4">{children}</div>
      </main>
    </div>
  );
}
