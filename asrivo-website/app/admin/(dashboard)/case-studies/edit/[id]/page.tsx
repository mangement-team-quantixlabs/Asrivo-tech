import { getCaseStudyById } from "@/lib/supabase/admin-queries";
import CaseStudyForm from "@/components/admin/CaseStudyForm";
import { notFound } from "next/navigation";

export default async function EditCaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseStudy = await getCaseStudyById(id);

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyForm caseStudy={caseStudy} />;
}
