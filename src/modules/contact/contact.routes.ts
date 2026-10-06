import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { validate } from "../../middleware/validate";
import { formLimiter } from "../../middleware/rateLimits";
import { createContactSchema, type CreateContactInput } from "./contact.schema";

const router = Router();

// POST /api/contact — website contact form
router.post("/", formLimiter, validate({ body: createContactSchema }), async (req, res) => {
  const { website, ...input } = res.locals.body as CreateContactInput;

  // Bot filled the hidden field: pretend success, store nothing.
  if (website) {
    res.status(201).json({ data: { id: "ok" } });
    return;
  }

  const saved = await prisma.contactMessage.create({
    data: { ...input, ip: req.ip ?? null },
    select: { id: true, createdAt: true },
  });
  console.log(`[contact] new message from ${input.email}`);
  res.status(201).json({ data: saved });
});

export default router;
