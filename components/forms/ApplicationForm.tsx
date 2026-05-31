"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { submitApplication } from "@/app/actions/careers";

interface ApplicationFormProps {
  jobId: string;
}

export default function ApplicationForm({ jobId }: ApplicationFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const result = await submitApplication(formData);
      if (result.success) {
        setStatus("success");
        form.reset();
        setFileName("");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit your application.");
        setTimeout(() => setStatus("idle"), 6000);
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const inputClass = "h-11 w-full rounded-lg border border-border bg-brand-off-white px-4 text-sm focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20 text-brand-gray-700";

  return (
    <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm">
      {status === "success" ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-success/10">
            <CheckCircle className="h-8 w-8 text-brand-success" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-brand-navy font-[var(--font-sora)]">
            Application Received!
          </h3>
          <p className="mt-2 text-sm text-brand-gray-400 max-w-sm">
            Thank you for applying. Our recruiting team will review your profile and contact you soon.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 text-sm font-medium text-brand-electric hover:underline"
          >
            Submit another application
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className="text-xl font-bold text-brand-navy font-[var(--font-sora)]">
            Apply for this position
          </h3>
          
          {status === "error" && errorMessage && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errorMessage}
            </div>
          )}

          <input type="hidden" name="job_id" value={jobId} />

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="applicant_name" className="mb-1.5 block text-sm font-medium text-brand-gray-700">
                Full Name *
              </label>
              <input
                id="applicant_name"
                name="applicant_name"
                type="text"
                required
                className={inputClass}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-gray-700">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-brand-gray-700">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className={inputClass}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label htmlFor="linkedin_url" className="mb-1.5 block text-sm font-medium text-brand-gray-700">
                LinkedIn Profile URL
              </label>
              <input
                id="linkedin_url"
                name="linkedin_url"
                type="url"
                className={inputClass}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-gray-700">
              Resume/CV (PDF, DOCX) *
            </label>
            <div className="relative flex min-h-[80px] w-full items-center justify-center rounded-lg border border-dashed border-border bg-brand-off-white px-6 py-4 text-center cursor-pointer hover:border-brand-electric/50 transition-colors">
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.docx,.doc"
                required
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-1">
                <FileText className="h-6 w-6 text-brand-gray-400" />
                <span className="text-sm font-medium text-brand-gray-700">
                  {fileName || "Drag & drop or click to upload your resume"}
                </span>
                <span className="text-xs text-brand-gray-400">PDF, DOCX up to 5MB</span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="cover_letter" className="mb-1.5 block text-sm font-medium text-brand-gray-700">
              Cover Letter / Message
            </label>
            <textarea
              id="cover_letter"
              name="cover_letter"
              rows={4}
              className="w-full rounded-lg border border-border bg-brand-off-white px-4 py-3 text-sm text-brand-gray-700 resize-none focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20"
              placeholder="Why are you a good fit for this role?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-orange px-8 text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-50"
          >
            {status === "loading" ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Send className="h-4 w-4" /> Submit Application
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
