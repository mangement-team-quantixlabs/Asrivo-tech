"use client";

import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface AdminShellProps {
  children: React.ReactNode;
  adminName?: string;
  adminRole?: string;
}

export default function AdminShell({
  children,
  adminName,
  adminRole,
}: AdminShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <AdminSidebar
          adminName={adminName}
          adminRole={adminRole}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 shadow-2xl z-10">
            <AdminSidebar
              adminName={adminName}
              adminRole={adminRole}
              mobile
              onClose={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Mobile Header */}
        <header className="flex items-center h-14 px-4 border-b border-border lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#00C6BE] to-[#1B4FD8]">
              <span className="text-xs font-bold text-white">A</span>
            </div>
            <span className="text-sm font-semibold font-[family-name:var(--font-sora)]">
              ASCIRVO Admin
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8 max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
