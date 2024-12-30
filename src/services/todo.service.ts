import { AppDataSource } from "../db/db.setup";
import { TodoEntity } from "../entities/todo.entity";

export class TodoService {
  private static todoRepository = AppDataSource.getRepository(TodoEntity);

  static async create(data: Partial<TodoEntity>, userId: string) {
    console.log(`User ID for creating: ${userId}`);
    const todo = this.todoRepository.create({
      ...data,
      user: { id: userId }, // Associate the todo with the logged-in user
    });
    return await this.todoRepository.save(todo);
  }

  static async findByUser(userId: string) {
    return await this.todoRepository.find({
      where: { user: { id: userId } },
      order: { dueDate: "ASC" },
    });
  }

  static async update(id: string, userId: string, data: Partial<TodoEntity>) {
    // Filter out undefined fields
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error("No fields provided for updating.");
    }

    await this.todoRepository.update(
      { id, user: { id: userId } },
      fieldsToUpdate
    );
    return await this.todoRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  static async delete(id: string, userId: string) {
    console.log(`Todo ID for deleting: ${id}`);
    console.log(`User ID for deleting: ${userId}`);
    return await this.todoRepository.delete({ id, user: { id: userId } });
  }
}
