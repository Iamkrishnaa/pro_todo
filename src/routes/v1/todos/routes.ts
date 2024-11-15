import { Router } from "express";
const router: Router = Router();
import { createTodoValidator } from "@/validators/v1/todos";
import { createTodo } from "@/controllers/v1/todos";
import validate from "@/validators/validate";

/**
 * @route POST /todos
 * @description Creates a new Todo item.
 * @access Public
 */
router.post("/", createTodoValidator(), validate, createTodo);

export default router;
