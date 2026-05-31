import JobListingForm from "@/components/admin/JobListingForm";
import { getAdminProfile } from "@/lib/supabase/admin-queries";

export default async function NewJobListingPage() {
  const profile = await getAdminProfile();
  const role = profile?.role ?? "admin";
  return <JobListingForm adminRole={role} />;
}
