"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { JobApplication } from "@/types";
import { updateApplicationStatus } from "@/app/actions/admin-actions";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Search, Eye, Download, Mail, Phone, FileText, ClipboardList,
} from "lucide-react";

const Linkedin = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface ApplicationWithJob extends JobApplication {
  job_listings?: { title: string } | null;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  received: {
    label: "Received",
    className: "bg-blue-500/15 text-blue-700 border-blue-500/20",
  },
  reviewing: {
    label: "Reviewing",
    className: "bg-amber-500/15 text-amber-700 border-amber-500/20",
  },
  interview: {
    label: "Interview",
    className: "bg-purple-500/15 text-purple-700 border-purple-500/20",
  },
  offer: {
    label: "Offer Extended",
    className: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/15 text-red-700 border-red-500/20",
  },
};

export default function ApplicationsTable({
  applications,
}: {
  applications: any[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [selectedApp, setSelectedApp] = useState<ApplicationWithJob | null>(null);

  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "all";

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    router.push(`/admin/applications?${params.toString()}`);
  }

  function handleStatusChange(id: string, newStatus: string) {
    startTransition(async () => {
      await updateApplicationStatus(id, newStatus);
      router.refresh();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus as any });
      }
    });
  }

  async function handleDownloadResume(path?: string) {
    if (!path) return;
    const supabase = createClient();
    // Path might start with resumes/ or just be the filename
    const cleanPath = path.startsWith("resumes/") ? path.replace("resumes/", "") : path;
    const { data, error } = await supabase.storage
      .from("resumes")
      .createSignedUrl(cleanPath, 60);

    if (error) {
      alert("Failed to generate download link: " + error.message);
      return;
    }

    if (data?.signedUrl) {
      window.open(data.signedUrl, "_blank");
    }
  }

  // Client-side search logic
  const filteredApps = applications.filter((app) => {
    const searchLower = currentSearch.toLowerCase();
    const matchesSearch =
      !currentSearch ||
      app.applicant_name.toLowerCase().includes(searchLower) ||
      app.email.toLowerCase().includes(searchLower) ||
      (app.job_listings?.title && app.job_listings.title.toLowerCase().includes(searchLower));

    const matchesStatus =
      currentStatus === "all" || app.status === currentStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates or job roles..."
            value={currentSearch}
            onChange={(e) => updateFilters("search", e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={currentStatus} onValueChange={(v) => updateFilters("status", v)}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {Object.keys(statusConfig).map((key) => (
              <SelectItem key={key} value={key}>
                {statusConfig[key].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredApps.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No applications found</p>
          <p className="text-xs mt-1">Applications will appear here as candidates apply to open roles.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Candidate</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Job Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Applied Date</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApps.map((app) => (
                <TableRow
                  key={app.id}
                  className="cursor-pointer hover:bg-muted/30"
                  onClick={() => setSelectedApp(app)}
                >
                  <TableCell className="font-medium">{app.applicant_name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{app.email}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {app.job_listings?.title || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[11px] capitalize ${
                        statusConfig[app.status]?.className ?? ""
                      }`}
                    >
                      {statusConfig[app.status]?.label ?? app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {new Date(app.applied_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedApp(app);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Slide-over details sheet */}
      <Sheet open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-[family-name:var(--font-sora)]">
              Application Profile
            </SheetTitle>
          </SheetHeader>
          {selectedApp && (
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <InfoRow icon={Mail} label="Candidate Name" value={selectedApp.applicant_name} />
                <InfoRow icon={Mail} label="Email Address" value={selectedApp.email} />
                <InfoRow icon={Phone} label="Phone Number" value={selectedApp.phone} />
                <InfoRow
                  icon={Linkedin}
                  label="LinkedIn Profile"
                  value={selectedApp.linkedin_url}
                  isLink
                />
                <InfoRow
                  icon={FileText}
                  label="Applied Job Role"
                  value={selectedApp.job_listings?.title || "—"}
                />
              </div>

              {selectedApp.cover_letter && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Cover Letter
                  </p>
                  <p className="text-sm bg-muted/50 rounded-lg p-4 leading-relaxed whitespace-pre-wrap">
                    {selectedApp.cover_letter}
                  </p>
                </div>
              )}

              {selectedApp.resume_path && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Resume / CV
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleDownloadResume(selectedApp.resume_path)}
                  >
                    <Download className="h-4 w-4" /> Download Candidate Resume
                  </Button>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Application Status
                </p>
                <Select
                  value={selectedApp.status}
                  onValueChange={(v) => handleStatusChange(selectedApp.id, v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(statusConfig).map((key) => (
                      <SelectItem key={key} value={key}>
                        {statusConfig[key].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Submitted on {new Date(selectedApp.applied_at).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  isLink,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  isLink?: boolean;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        {isLink ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#1B4FD8] hover:underline break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}
