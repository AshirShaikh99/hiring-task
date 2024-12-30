// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../types/error";

export const errorHandlerMiddleware = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  return res.status(status).json({
    error: message,
  });
};
