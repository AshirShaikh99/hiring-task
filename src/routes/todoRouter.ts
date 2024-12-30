import { Router } from "express";
import { TodoController } from "../controllers/Todo/todo.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createValidator,
  updateValidator,
} from "../validators/todo/todo.validator";

export const todoRouter = Router();

// Apply authentication middleware to all routes
todoRouter.use(authMiddleware);

// POST /api/v1/todos - Create a new todo
todoRouter.post("/", createValidator(), TodoController.createTodo);

// GET /api/v1/todos - Get all todos for the authenticated user
todoRouter.get("/", TodoController.getTodos);

// PUT /api/v1/todos/:id - Update an existing todo
todoRouter.put("/:id", updateValidator(), TodoController.updateTodo);

// DELETE /api/v1/todos/:id - Delete a todo
todoRouter.delete("/:id", TodoController.deleteTodo);
