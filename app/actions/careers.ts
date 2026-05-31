"use server";

import { applicationFormSchema } from "@/lib/validations/forms";
import { submitJobApplication } from "@/lib/supabase/mutations";
import { createClient } from "@/lib/supabase/server";

export async function submitApplication(formData: FormData) {
  const supabase = await createClient();

  const jobId = formData.get("job_id") as string;
  const applicantName = formData.get("applicant_name") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || undefined;
  const linkedinUrl = (formData.get("linkedin_url") as string) || undefined;
  const coverLetter = (formData.get("cover_letter") as string) || undefined;
  const resumeFile = formData.get("resume") as File;

  // Validate standard fields
  const parseResult = applicationFormSchema.safeParse({
    job_id: jobId,
    applicant_name: applicantName,
    email,
    phone,
    linkedin_url: linkedinUrl || "",
    cover_letter: coverLetter,
  });

  if (!parseResult.success) {
    return {
      success: false,
      error: parseResult.error.issues[0]?.message ?? "Invalid application data",
    };
  }

  if (!resumeFile || resumeFile.size === 0) {
    return {
      success: false,
      error: "Resume file is required",
    };
  }

  // Upload resume to private 'resumes' bucket
  let resumePath = "";
  try {
    const fileExt = resumeFile.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${jobId}/${fileName}`;

    const buffer = Buffer.from(await resumeFile.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, buffer, {
        contentType: resumeFile.type,
        duplex: "half",
      });

    if (uploadError) {
      console.error("Resume upload error:", uploadError);
      return {
        success: false,
        error: "Failed to upload resume. Please try again.",
      };
    }

    resumePath = filePath;
  } catch (err) {
    console.error("File processing exception:", err);
    return {
      success: false,
      error: "Error processing resume file.",
    };
  }

  // Save job application details
  const saveResult = await submitJobApplication({
    job_id: jobId,
    applicant_name: applicantName,
    email,
    phone,
    linkedin_url: linkedinUrl || undefined,
    cover_letter: coverLetter,
    resume_path: resumePath,
  });

  return saveResult;
}
