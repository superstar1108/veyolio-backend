import type { RequestHandler } from "express";
import type { ZodTypeAny, z } from "zod";

type Schemas = { body?: ZodTypeAny; query?: ZodTypeAny; params?: ZodTypeAny };

/**
 * Validates req.body / req.query / req.params with Zod.
 * Parsed, typed values are stored on res.locals.body / .query / .params
 * (Express 5 makes req.query read-only, so we don't overwrite it).
 * ZodErrors are formatted by the error middleware as 422 responses.
 */
export const validate =
  (schemas: Schemas): RequestHandler =>
  (req, res, next) => {
    if (schemas.body) res.locals.body = schemas.body.parse(req.body);
    if (schemas.query) res.locals.query = schemas.query.parse(req.query);
    if (schemas.params) res.locals.params = schemas.params.parse(req.params);
    next();
  };

export type Infer<T extends ZodTypeAny> = z.infer<T>;
