import { z } from "zod";

// ============================================================
// Shared primitives
// ============================================================

/**
 * Accepts an optional phone number.
 * Allows any string of 7–15 digits, optionally prefixed by "+".
 * Empty string and undefined are both treated as absent.
 */
const phoneSchema = z
  .string()
  .transform((v) => v.trim())
  .pipe(
    z
      .string()
      .regex(
        /^\+?[0-9]{7,15}$/,
        "Phone must be 7–15 digits, optionally starting with +"
      )
      .or(z.literal(""))
  )
  .optional();

/**
 * Accepts an optional LinkedIn URL.
 * Empty strings are coerced to undefined so the field is truly optional —
 * prevents Zod v4 `.url()` from rejecting empty strings before `.optional()` kicks in.
 */
const linkedinUrlSchema = z
  .string()
  .trim()
  .transform((v) => (v === "" ? undefined : v))
  .pipe(z.string().url("Please enter a valid LinkedIn URL").optional())
  .optional();

// ============================================================
// Contact Form
// ============================================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
  phone: phoneSchema,
  company: z.string().trim().optional(),
  country: z.string().trim().optional(),
  service_interest: z.string().trim().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================
// Newsletter
// ============================================================

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
  source: z.string().trim().optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// ============================================================
// Job Application Form
// ============================================================

export const applicationFormSchema = z.object({
  job_id: z.string().uuid("job_id must be a valid UUID"),
  applicant_name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
  phone: phoneSchema,
  linkedin_url: linkedinUrlSchema,
  cover_letter: z.string().trim().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
