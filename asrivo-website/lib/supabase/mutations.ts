import { createClient } from "./server";

// ============================================
// Contact Lead Submission
// ============================================

export async function submitContactLead(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  service_interest?: string;
  message?: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_leads").insert(data);

  if (error) {
    console.error("Error submitting contact lead:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

// ============================================
// Newsletter Subscription
// ============================================

export async function subscribeToNewsletter(email: string, source: string = "footer") {
  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email, source }, { onConflict: "email" });

  if (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}

// ============================================
// Job Application Submission
// ============================================

export async function submitJobApplication(data: {
  job_id: string;
  applicant_name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  resume_path?: string;
  cover_letter?: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.from("job_applications").insert(data);

  if (error) {
    console.error("Error submitting job application:", error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
