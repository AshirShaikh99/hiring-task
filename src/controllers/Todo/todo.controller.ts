import { Request, Response } from "express";
import { TodoService } from "../../services/todo.service";

export class TodoController {
  static async createTodo(req: Request, res: Response) {
    try {
      const userId = req.user.id; // Extract logged-in user's ID
      const todo = await TodoService.create(req.body, userId);
      return res.status(201).json(todo);
    } catch (error) {
      return res.status(400).json({ error: (error as any).message });
    }
  }

  static async getTodos(req: Request, res: Response) {
    try {
      const userId = req.user.id; // Extract logged-in user's ID
      const todos = await TodoService.findByUser(userId);
      return res.json(todos);
    } catch (error) {
      return res.status(400).json({ error: (error as any).message });
    }
  }

  static async updateTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Extract logged-in user's ID
      const todo = await TodoService.update(id, userId, req.body);
      if (!todo) return res.status(404).json({ error: "Todo not found" });
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error: (error as any).message });
    }
  }

  static async deleteTodo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user.id; // Extract logged-in user's ID
      await TodoService.delete(id, userId);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: (error as any).message });
    }
  }
}
