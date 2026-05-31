"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import { logoutAction } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  FolderKanban,
  Mail,
  LogOut,
  ChevronLeft,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  adminName?: string;
  adminRole?: string;
  collapsed?: boolean;
  onToggle?: () => void;
  mobile?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/blogs", label: "Blog Posts", icon: FileText },
  { href: "/admin/jobs", label: "Job Listings", icon: Briefcase },
  { href: "/admin/case-studies", label: "Case Studies", icon: FolderKanban },
  { href: "/admin/newsletter", label: "Newsletter", icon: Mail },
];

export default function AdminSidebar({
  adminName = "Admin",
  adminRole = "admin",
  collapsed = false,
  onToggle,
  mobile = false,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside
      className={`flex flex-col h-full bg-[var(--sidebar)] text-[var(--sidebar-foreground)] transition-all duration-300 ${
        collapsed && !mobile ? "w-[68px]" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.08]">
        {(!collapsed || mobile) && (
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00C6BE] to-[#1B4FD8]">
              <span className="text-sm font-bold text-white">A</span>
            </div>
            <span className="text-base font-semibold text-white font-[family-name:var(--font-sora)]">
              ASCIRVO
            </span>
          </Link>
        )}
        {collapsed && !mobile && (
          <Link href="/admin" className="mx-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#00C6BE] to-[#1B4FD8]">
              <span className="text-sm font-bold text-white">A</span>
            </div>
          </Link>
        )}
        {mobile ? (
          <button onClick={onClose} className="p-1 rounded-md hover:bg-white/10 text-slate-400">
            <X className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-white/10 text-slate-400 hidden lg:block"
          >
            <ChevronLeft
              className={`h-4 w-4 transition-transform duration-300 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems
          .filter((item) => {
            if (adminRole === "editor") {
              return !["/admin/leads", "/admin/newsletter"].includes(item.href);
            }
            return true;
          })
          .map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={mobile ? onClose : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[var(--sidebar-accent)] text-white shadow-sm border-l-4 border-l-[#1B4FD8] rounded-r-lg"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-200 border-l-4 border-l-transparent rounded-lg"
                } ${collapsed && !mobile ? "justify-center px-2 border-l-0" : ""}`}
                title={collapsed && !mobile ? item.label : undefined}
              >
                <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-[#00C6BE]" : ""}`} />
                {(!collapsed || mobile) && <span>{item.label}</span>}
              </Link>
            );
          })}
      </nav>

      <Separator className="bg-white/[0.08]" />

      {/* Footer / User */}
      <div className="p-3">
        <div
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
            collapsed && !mobile ? "justify-center px-2" : ""
          }`}
        >
          <Avatar className="h-8 w-8 shrink-0 bg-[var(--sidebar-accent)]">
            <AvatarFallback className="bg-gradient-to-br from-[#1B4FD8] to-[#00C6BE] text-white text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {(!collapsed || mobile) && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{adminName}</p>
              <p className="text-xs text-slate-500 capitalize">{adminRole}</p>
            </div>
          )}
        </div>

        <Button
          variant="ghost"
          onClick={handleLogout}
          disabled={isPending}
          className={`w-full mt-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 ${
            collapsed && !mobile ? "px-2" : ""
          }`}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {(!collapsed || mobile) && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </aside>
  );
}
