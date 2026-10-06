import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { validate } from "../../middleware/validate";
import { formLimiter } from "../../middleware/rateLimits";
import { createApplicationSchema, type CreateApplicationInput } from "./applications.schema";

const router = Router();

// POST /api/applications — job application form on /careers/[slug]
router.post("/", formLimiter, validate({ body: createApplicationSchema }), async (req, res) => {
  const { website, ...input } = res.locals.body as CreateApplicationInput;

  if (website) {
    res.status(201).json({ data: { id: "ok" } });
    return;
  }

  const saved = await prisma.jobApplication.create({
    data: { ...input, ip: req.ip ?? null },
    select: { id: true, createdAt: true },
  });
  console.log(`[applications] ${input.email} applied for ${input.jobSlug}`);
  res.status(201).json({ data: saved });
});

export default router;
