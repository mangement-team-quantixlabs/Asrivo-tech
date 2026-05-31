"use server";

import { newsletterSchema } from "@/lib/validations/forms";
import { subscribeToNewsletter } from "@/lib/supabase/mutations";

export async function subscribeNewsletter(email: string, source: string = "footer") {
  const result = newsletterSchema.safeParse({ email, source });

  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message ?? "Invalid email" };
  }

  return await subscribeToNewsletter(result.data.email, source ?? "footer");
}
