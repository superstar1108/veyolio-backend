import rateLimit from "express-rate-limit";

// Stricter limit for public form submissions: 10 per IP per 10 minutes.
export const formLimiter = rateLimit({
  windowMs: 10 * 60_000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: { code: "RATE_LIMITED", message: "Too many submissions. Please try again later." } },
});
