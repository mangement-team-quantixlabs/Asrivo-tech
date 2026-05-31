import { Suspense } from "react";
import { getAllCaseStudies, getAdminProfile } from "@/lib/supabase/admin-queries";
import CaseStudiesTable from "@/components/admin/CaseStudiesTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminCaseStudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const profile = await getAdminProfile();
  const role = profile?.role ?? "admin";

  const params = await searchParams;
  const cases = await getAllCaseStudies({
    status: params.status,
    search: params.search,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)]">
            Case Studies CMS
          </h1>
          <p className="text-muted-foreground mt-1">
            {cases.length} case stud{cases.length !== 1 ? "ies" : "y"} total
          </p>
        </div>
        <Button asChild className="sm:self-start">
          <Link href="/admin/case-studies/new">
            <Plus className="h-4 w-4 mr-2" /> New Case Study
          </Link>
        </Button>
      </div>

      <Suspense fallback={<CaseStudiesTableSkeleton />}>
        <CaseStudiesTable cases={cases} adminRole={role} />
      </Suspense>
    </div>
  );
}

function CaseStudiesTableSkeleton() {
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
