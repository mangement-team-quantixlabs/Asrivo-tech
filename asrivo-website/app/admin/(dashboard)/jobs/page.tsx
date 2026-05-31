import { Suspense } from "react";
import { getAllJobListings, getAdminProfile } from "@/lib/supabase/admin-queries";
import JobListingsTable from "@/components/admin/JobListingsTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const profile = await getAdminProfile();
  const role = profile?.role ?? "admin";

  const params = await searchParams;
  const jobs = await getAllJobListings({
    status: params.status,
    search: params.search,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)]">
            Job Listings Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            {jobs.length} position{jobs.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <Button asChild className="sm:self-start">
          <Link href="/admin/jobs/new">
            <Plus className="h-4 w-4 mr-2" /> Post New Job
          </Link>
        </Button>
      </div>

      <Suspense fallback={<JobListingsTableSkeleton />}>
        <JobListingsTable jobs={jobs} adminRole={role} />
      </Suspense>
    </div>
  );
}

function JobListingsTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-16 bg-muted/50 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}
