import { Router } from "express";
import { authRouter } from "./authRouter";
import { todoRouter } from "./todoRouter"; // Import todoRouter

export const appRouter = Router();

// Mount routers
appRouter.use("/auth", authRouter); // Auth routes
appRouter.use("/todos", todoRouter); // Todo routes
