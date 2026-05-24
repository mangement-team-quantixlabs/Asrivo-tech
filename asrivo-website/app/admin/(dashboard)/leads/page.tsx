import { Suspense } from "react";
import { getAllContactLeads } from "@/lib/supabase/admin-queries";
import LeadsTable from "@/components/admin/LeadsTable";
import { Users } from "lucide-react";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const params = await searchParams;
  const leads = await getAllContactLeads({
    status: params.status,
    search: params.search,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)]">
          Leads Manager
        </h1>
        <p className="text-muted-foreground mt-1">
          {leads.length} lead{leads.length !== 1 ? "s" : ""} total
        </p>
      </div>
      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsTable leads={leads} />
      </Suspense>
    </div>
  );
}

function LeadsTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="h-14 bg-muted/50 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}
