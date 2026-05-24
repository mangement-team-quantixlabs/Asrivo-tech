import { Suspense } from "react";
import { getJobApplications } from "@/lib/supabase/admin-queries";
import ApplicationsTable from "@/components/admin/ApplicationsTable";

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ job_id?: string; status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const applications = await getJobApplications({
    job_id: params.job_id,
    status: params.status,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)]">
          Job Applications Inbox
        </h1>
        <p className="text-muted-foreground mt-1">
          {applications.length} application{applications.length !== 1 ? "s" : ""} received
        </p>
      </div>

      <Suspense fallback={<ApplicationsTableSkeleton />}>
        <ApplicationsTable applications={applications} />
      </Suspense>
    </div>
  );
}

function ApplicationsTableSkeleton() {
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
