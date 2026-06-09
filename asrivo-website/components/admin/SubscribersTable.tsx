"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { NewsletterSubscriber } from "@/types";
import { deleteSubscriber, exportSubscribersCSV } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, Trash2, Download, Mail, Filter, Loader2,
} from "lucide-react";

export default function SubscribersTable({
  subscribers,
}: {
  subscribers: NewsletterSubscriber[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isExporting, setIsExporting] = useState(false);

  const currentSearch = searchParams.get("search") ?? "";
  const currentSource = searchParams.get("source") ?? "all";

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    router.push(`/admin/newsletter?${params.toString()}`);
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    startTransition(async () => {
      await deleteSubscriber(id);
      router.refresh();
    });
  }

  async function handleExportCSV() {
    setIsExporting(true);
    try {
      const res = await exportSubscribersCSV();
      if (res.success && res.csv) {
        const blob = new Blob([res.csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Export failed: " + res.error);
      }
    } catch (err: any) {
      alert("Failed to export: " + err.message);
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search email addresses..."
            defaultValue={currentSearch}
            onChange={(e) => {
              const t = setTimeout(() => updateFilters("search", e.target.value), 400);
              return () => clearTimeout(t);
            }}
            className="pl-9"
          />
        </div>
        <Select value={currentSource} onValueChange={(v) => updateFilters("source", v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Sources" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="home">Home Page</SelectItem>
            <SelectItem value="blog">Insights Page</SelectItem>
            <SelectItem value="footer">Footer</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={handleExportCSV}
          disabled={isExporting}
          className="sm:self-start flex items-center gap-1.5"
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          Export CSV
        </Button>
      </div>

      {subscribers.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Mail className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No subscribers found</p>
          <p className="text-xs mt-1">Newsletter signups will show up here.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Email</TableHead>
                <TableHead className="hidden sm:table-cell">Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Subscribed Date</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((sub) => (
                <TableRow key={sub.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-sm">{sub.email}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {sub.source || "Unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[11px] ${
                        sub.is_active
                          ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/20"
                          : "bg-red-500/15 text-red-700 border-red-500/20"
                      }`}
                    >
                      {sub.is_active ? "Active" : "Unsubscribed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                    {new Date(sub.subscribed_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(sub.id)}
                      disabled={isPending}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}
