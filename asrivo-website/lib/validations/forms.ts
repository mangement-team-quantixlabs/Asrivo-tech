import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  source: z.string().optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

export const applicationFormSchema = z.object({
  job_id: z.string().uuid(),
  applicant_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  linkedin_url: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  cover_letter: z.string().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
