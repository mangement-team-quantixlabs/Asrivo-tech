"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { CaseStudy } from "@/types";
import { deleteCaseStudy, toggleCaseStudyPublish } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, FolderKanban,
} from "lucide-react";

export default function CaseStudiesTable({
  cases,
  adminRole = "admin",
}: {
  cases: CaseStudy[];
  adminRole?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "all";

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    router.push(`/admin/case-studies?${params.toString()}`);
  }

  function handleTogglePublish(id: string, current: boolean) {
    if (adminRole === "editor") return;
    startTransition(async () => {
      await toggleCaseStudyPublish(id, !current);
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    if (adminRole === "editor") return;
    if (!confirm("Are you sure you want to delete this case study?")) return;
    startTransition(async () => {
      await deleteCaseStudy(id);
      router.refresh();
    });
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search case studies..."
            defaultValue={currentSearch}
            onChange={(e) => {
              const t = setTimeout(() => updateFilters("search", e.target.value), 400);
              return () => clearTimeout(t);
            }}
            className="pl-9"
          />
        </div>
        <Select value={currentStatus} onValueChange={(v) => updateFilters("status", v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {cases.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FolderKanban className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No case studies found</p>
          <p className="text-xs mt-1">Create your first case study to showcase client results.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Client & Project</TableHead>
                <TableHead className="hidden md:table-cell">Industry</TableHead>
                <TableHead className="hidden md:table-cell">Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Updated</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {cases.map((cs) => (
                <TableRow key={cs.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{cs.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cs.client_name ? `${cs.client_name} · ` : ""} /{cs.slug}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {cs.industry ? (
                      <Badge variant="outline" className="text-[11px]">{cs.industry}</Badge>
                    ) : "—"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {cs.service ? (
                      <Badge variant="outline" className="text-[11px]">{cs.service}</Badge>
                    ) : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[11px] ${
                        cs.is_published
                           ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/20"
                           : "bg-amber-500/15 text-amber-700 border-amber-500/20"
                      }`}
                    >
                      {cs.is_published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {new Date(cs.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/case-studies/edit/${cs.id}`}>
                            <Pencil className="h-3.5 w-3.5 mr-2" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        {adminRole !== "editor" && (
                          <DropdownMenuItem onClick={() => handleTogglePublish(cs.id, cs.is_published)} disabled={isPending}>
                            {cs.is_published ? <><EyeOff className="h-3.5 w-3.5 mr-2" /> Unpublish</> : <><Eye className="h-3.5 w-3.5 mr-2" /> Publish</>}
                          </DropdownMenuItem>
                        )}
                        {adminRole !== "editor" && (
                          <DropdownMenuItem onClick={() => handleDelete(cs.id)} className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
