import { Suspense } from "react";
import { getAllNewsletterSubscribers } from "@/lib/supabase/admin-queries";
import SubscribersTable from "@/components/admin/SubscribersTable";

export default async function AdminNewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; source?: string }>;
}) {
  const params = await searchParams;
  const subscribers = await getAllNewsletterSubscribers({
    search: params.search,
    source: params.source,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-sora)]">
          Newsletter Subscribers
        </h1>
        <p className="text-muted-foreground mt-1">
          {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""} total
        </p>
      </div>

      <Suspense fallback={<SubscribersTableSkeleton />}>
        <SubscribersTable subscribers={subscribers} />
      </Suspense>
    </div>
  );
}

function SubscribersTableSkeleton() {
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
