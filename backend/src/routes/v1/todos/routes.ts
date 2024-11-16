import { Router } from "express";
const router: Router = Router();
import {
  createTodoValidator,
  updateTodoValidator,
  deleteTodoValidator,
  getTodosValidator,
} from "@/validators/v1/todos";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
} from "@/controllers/v1/todos";
import validate from "@/validators/validate";

/**
 * @route POST /todos
 * @description Creates a new Todo item.
 * @access Public
 */
router.post("/", createTodoValidator(), validate, createTodo);

/**
 * @route PUT /todos/:id
 * @description Updates a Todo item.
 * @access Public
 */
router.put("/:id", updateTodoValidator(), validate, updateTodo);

/**
 * @route DELETE /todos/:id
 * @description Deletes a Todo item.
 * @access Public
 */
router.delete("/:id", deleteTodoValidator(), validate, deleteTodo);

/**
 * @route GET /todos
 * @description Gets all Todo items.
 * @access Public
 */
router.get("/", getTodosValidator(), validate, getTodos);

export default router;
