import { z } from "zod";
import { email, honeypot, requiredText } from "../../lib/schemas";

const url = (hint: string) => z.string().trim().min(1, "Required").url(hint).max(500);

export const createApplicationSchema = z.object({
  jobSlug: z.string().trim().min(1).max(120).regex(/^[a-z0-9-]+$/, "Invalid job"),
  role: requiredText(200),
  name: requiredText(100),
  email,
  phone: z
    .string()
    .trim()
    .min(1, "Required")
    .regex(/^\+?[0-9\s\-().]{7,20}$/, "Enter a valid phone number, e.g. +1 555 010 0000"),
  location: requiredText(120),
  address: requiredText(300),
  link: url("Enter a full URL, e.g. https://linkedin.com/in/you"),
  resumeUrl: url("Enter a full URL to your resume, e.g. a Google Drive link"),
  introVideoUrl: url("Enter a full URL to your video, e.g. Loom or YouTube"),
  message: requiredText(5000),
  website: honeypot,
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;