import { getJobListingById } from "@/lib/supabase/admin-queries";
import JobListingForm from "@/components/admin/JobListingForm";
import { notFound } from "next/navigation";
export default async function EditJobListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = await getJobListingById(id);
  if (!job) {
    notFound();
  }
  return <JobListingForm job={job} />;
}