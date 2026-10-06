// Throw these from any route/service; the error middleware turns them into JSON responses.
export class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

export const NotFound = (what = "Resource") => new AppError(404, "NOT_FOUND", `${what} not found`);
export const BadRequest = (message: string, details?: unknown) => new AppError(400, "BAD_REQUEST", message, details);
export const Unauthorized = (message = "Unauthorized") => new AppError(401, "UNAUTHORIZED", message);
export const Forbidden = (message = "Forbidden") => new AppError(403, "FORBIDDEN", message);
export const Conflict = (message: string) => new AppError(409, "CONFLICT", message);
