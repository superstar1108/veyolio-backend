import { Router } from "express";
import { prisma } from "../../lib/prisma";

const router = Router();

// GET /api/health — confirms the API is up and the database is reachable.
router.get("/", async (_req, res) => {
  let database = "ok";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    database = "unreachable";
  }
  res.status(database === "ok" ? 200 : 503).json({
    status: database === "ok" ? "ok" : "degraded",
    database,
    uptime: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

export default router;
