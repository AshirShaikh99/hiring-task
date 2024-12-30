import { z } from "zod";
import { Request, Response, NextFunction } from "express";

const todoSchema = z.object({
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    dueDate: z.string().nonempty("Due date is required"),
});

const updateSchema = todoSchema.partial();

export const createValidator = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await todoSchema.parseAsync(req.body);
            next();
        } catch (error) {
            res.status(400).json({ error });
        }
    };
};

export const updateValidator = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await updateSchema.parseAsync(req.body);
            next();
        } catch (error) {
            res.status(400).json({ error });
        }
    };
};
