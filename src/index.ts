// src/index.ts
import express from "express";
import cors from "cors";
import { dbCreate } from "./db/db.create";
import { AppDataSource } from "./db/db.setup";
import { appRouter } from "./routes";
import { errorHandlerMiddleware, routeMiddleware } from "./middlewares";
import { Env } from "./env";


const ipValidationMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const clientIp = req.ip || req.socket.remoteAddress;
  const allowedIPs = ["::1", "127.0.0.1", "localhost", "::ffff:127.0.0.1"];

  if (allowedIPs.includes(clientIp)) {
    return next();
  }

  const isValidIp = (ip: string | undefined): boolean => {
    if (!ip) return false;
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    return (
      ipv4Pattern.test(ip) &&
      ip.split(".").every((num) => {
        const n = parseInt(num, 10);
        return n >= 0 && n <= 255;
      })
    );
  };

  if (!clientIp || !isValidIp(clientIp)) {
    return res.status(403).json({ error: "Invalid IP address" });
  }
  next();
};

const setupServer = async () => {
  try {
    await dbCreate();
    await AppDataSource.initialize();
    console.log("Database connection established");

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(ipValidationMiddleware);
     // Log all incoming requests for debugging
     app.use((req, res, next) => {
      console.log(`Ashir is here ${req.method} ${req.url}`);
      next();
    });
    app.use(routeMiddleware);

    app.use("/health", (_req, res) => {
      res.json({ msg: "Health" });
    });

    app.use("/api/v1", appRouter);
    
    app.use(errorHandlerMiddleware);

    const { port } = Env;

    app.listen(port, () => {
      console.log(`Server is listening on ${port}.`);
    });
  } catch (error) {
    console.error("Server setup failed:", error);
    process.exit(1);
  }
};

setupServer();
