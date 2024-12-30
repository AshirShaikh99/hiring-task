// src/middlewares/route.middleware.ts
import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils";
import { Env } from "../env";

export const routeMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.path !== "/health") {
    Logger.group({
      title: "New Request",
      descriptions: [
        {
          description: "URL",
          info: `${req.protocol}://${req.hostname}:${Env.port}${req.url}`,
        },
        {
          description: "PARAMS",
          info: req.params,
        },
        {
          description: "QUERY",
          info: req.query,
        },
        {
          description: "BODY",
          info: JSON.stringify(req.body, null, 2),
        },
        {
          description: "CLIENTINFO",
          info: JSON.stringify(
            {
              ip: req.ip,
              userAgent: req.headers["user-agent"],
              timestamp: new Date().toISOString(),
            },
            null,
            2
          ),
        },
      ],
    });
  }
  next();
};
