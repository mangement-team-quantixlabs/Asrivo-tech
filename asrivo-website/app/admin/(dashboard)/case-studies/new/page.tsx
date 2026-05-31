import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { getAdminProfile } from "@/lib/supabase/admin-queries";

export default async function NewCaseStudyPage() {
  const profile = await getAdminProfile();
  const role = profile?.role ?? "admin";
  return <CaseStudyForm adminRole={role} />;
}
