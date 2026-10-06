import { z } from "zod";

// Shared field rules. Empty optional strings from HTML forms become null.
export const requiredText = (max: number) => z.string().trim().min(1, "Required").max(max);
export const optionalText = (max: number) =>
  z.string().trim().max(max).optional().transform((v) => (v ? v : null));
export const email = z.string().trim().toLowerCase().email("Enter a valid email").max(200);
// Hidden "website" field on forms — real users leave it empty, bots fill it in.
export const honeypot = z.string().optional();
