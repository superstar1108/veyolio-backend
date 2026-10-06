import { z } from "zod";
import { email, honeypot, optionalText, requiredText } from "../../lib/schemas";

export const createContactSchema = z.object({
  name: requiredText(100),
  email,
  company: optionalText(150),
  budget: optionalText(50),
  message: requiredText(5000),
  website: honeypot,
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
