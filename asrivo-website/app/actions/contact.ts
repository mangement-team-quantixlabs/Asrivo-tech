"use server";

import { contactFormSchema } from "@/lib/validations/forms";
import { submitContactLead } from "@/lib/supabase/mutations";

export async function submitContactForm(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: (formData.get("phone") as string) || undefined,
    company: (formData.get("company") as string) || undefined,
    country: (formData.get("country") as string) || undefined,
    service_interest: (formData.get("service_interest") as string) || undefined,
    message: formData.get("message") as string,
  };

  const result = contactFormSchema.safeParse(raw);

  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Invalid form data" };
  }

  return await submitContactLead(result.data);
}
