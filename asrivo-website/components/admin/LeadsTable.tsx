"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ContactLead } from "@/types";
import { updateLeadStatus, deleteLead } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  MoreHorizontal,
  Eye,
  Trash2,
  Mail,
  Phone,
  Building2,
  Globe,
  MessageSquare,
  StickyNote,
} from "lucide-react";

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  new: {
    label: "New",
    className: "bg-emerald-500/15 text-emerald-700 border-emerald-500/20",
  },
  read: {
    label: "Read",
    className: "bg-blue-500/15 text-blue-700 border-blue-500/20",
  },
  contacted: {
    label: "Contacted",
    className: "bg-amber-500/15 text-amber-700 border-amber-500/20",
  },
  closed: {
    label: "Closed",
    className: "bg-gray-500/15 text-gray-600 border-gray-500/20",
  },
};

export default function LeadsTable({ leads }: { leads: ContactLead[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [selectedLead, setSelectedLead] = useState<ContactLead | null>(null);
  const [notes, setNotes] = useState("");

  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "all";

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin/leads?${params.toString()}`);
  }

  function handleStatusChange(id: string, newStatus: string) {
    startTransition(async () => {
      await updateLeadStatus(id, newStatus);
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    startTransition(async () => {
      await deleteLead(id);
      router.refresh();
    });
  }

  function handleSaveNotes() {
    if (!selectedLead) return;
    startTransition(async () => {
      await updateLeadStatus(selectedLead.id, selectedLead.status, notes);
      router.refresh();
    });
  }

  function openDetail(lead: ContactLead) {
    setSelectedLead(lead);
    setNotes((lead as ContactLead & { lead_notes?: string }).lead_notes ?? "");
  }

  return (
    <>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name, email, company..."
            defaultValue={currentSearch}
            onChange={(e) => {
              const timer = setTimeout(
                () => updateFilters("search", e.target.value),
                400
              );
              return () => clearTimeout(timer);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={currentStatus}
          onValueChange={(v) => updateFilters("status", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {leads.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Mail className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No leads found</p>
          <p className="text-xs mt-1">Leads will appear here when submitted via the contact form.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="hidden lg:table-cell">Service Interest</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow
                  key={lead.id}
                  className="cursor-pointer hover:bg-muted/30"
                  onClick={() => openDetail(lead)}
                >
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {lead.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm">
                    {lead.company || "—"}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm">
                    {lead.service_interest || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[11px] capitalize ${
                        statusConfig[lead.status]?.className ?? ""
                      }`}
                    >
                      {statusConfig[lead.status]?.label ?? lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon-sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDetail(lead)}>
                          <Eye className="h-3.5 w-3.5 mr-2" /> View Details
                        </DropdownMenuItem>
                        {["new", "read", "contacted", "closed"].map((s) => (
                          <DropdownMenuItem
                            key={s}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(lead.id, s);
                            }}
                            disabled={lead.status === s}
                          >
                            Mark as {s}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(lead.id);
                          }}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detail Sheet */}
      <Sheet
        open={!!selectedLead}
        onOpenChange={(open) => !open && setSelectedLead(null)}
      >
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="font-[family-name:var(--font-sora)]">
              Lead Details
            </SheetTitle>
          </SheetHeader>
          {selectedLead && (
            <div className="mt-6 space-y-6">
              <div className="space-y-4">
                <InfoRow icon={Mail} label="Name" value={selectedLead.name} />
                <InfoRow icon={Mail} label="Email" value={selectedLead.email} />
                <InfoRow icon={Phone} label="Phone" value={selectedLead.phone} />
                <InfoRow icon={Building2} label="Company" value={selectedLead.company} />
                <InfoRow icon={Globe} label="Country" value={selectedLead.country} />
                <InfoRow icon={MessageSquare} label="Service Interest" value={selectedLead.service_interest} />
              </div>

              {selectedLead.message && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Message
                  </p>
                  <p className="text-sm bg-muted/50 rounded-lg p-4 leading-relaxed">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Status
                </p>
                <Select
                  value={selectedLead.status}
                  onValueChange={(v) => {
                    setSelectedLead({ ...selectedLead, status: v as ContactLead["status"] });
                    handleStatusChange(selectedLead.id, v);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <StickyNote className="h-3.5 w-3.5" /> Internal Notes
                </p>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes..."
                  rows={3}
                />
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={handleSaveNotes}
                  disabled={isPending}
                >
                  Save Notes
                </Button>
              </div>

              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  Submitted on{" "}
                  {new Date(selectedLead.created_at).toLocaleString()}
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
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
}
