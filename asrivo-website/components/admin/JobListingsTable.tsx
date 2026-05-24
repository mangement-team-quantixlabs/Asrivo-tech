"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { JobListing } from "@/types";
import { deleteJobListing, toggleJobActive } from "@/app/actions/admin-actions";
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
  Search, MoreHorizontal, Pencil, Trash2, CheckCircle, XCircle, Briefcase,
} from "lucide-react";

export default function JobListingsTable({ jobs }: { jobs: JobListing[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("search") ?? "";
  const currentStatus = searchParams.get("status") ?? "all";

  function updateFilters(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") params.set(key, value);
    else params.delete(key);
    router.push(`/admin/jobs?${params.toString()}`);
  }

  function handleToggleActive(id: string, current: boolean) {
    startTransition(async () => {
      await toggleJobActive(id, !current);
      router.refresh();
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    startTransition(async () => {
      await deleteJobListing(id);
      router.refresh();
    });
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search job listings by title, department, location..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-medium">No job listings found</p>
          <p className="text-xs mt-1">Add your first job opening to attract top talent.</p>
        </div>
      ) : (
        <div className="rounded-lg border border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead>Role & Details</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden sm:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Posted Date</TableHead>
                <TableHead className="w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{job.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {job.employment_type} · {job.experience_level}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline" className="text-[11px]">{job.department}</Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {job.location}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[11px] ${
                        job.is_active
                          ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/20"
                          : "bg-gray-500/15 text-gray-600 border-gray-500/20"
                      }`}
                    >
                      {job.is_active ? "Active" : "Closed"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">
                    {new Date(job.posted_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/jobs/edit/${job.id}`}>
                            <Pencil className="h-3.5 w-3.5 mr-2" /> Edit Role
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(job.id, job.is_active)} disabled={isPending}>
                          {job.is_active ? <><XCircle className="h-3.5 w-3.5 mr-2 text-amber-500" /> Close Role</> : <><CheckCircle className="h-3.5 w-3.5 mr-2 text-emerald-500" /> Open Role</>}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(job.id)} className="text-red-600 focus:text-red-600">
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
    </>
  );
}
