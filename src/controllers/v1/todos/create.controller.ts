import { Todo } from "@/models";
import ApiResponse from "@/utils/apiResponse";
import { Request, Response } from "express";

/**
 * Creates a new Todo item.
 *
 * @param {Request} req - The request object, containing the new Todo data in the body.
 * @param {Response} res - The response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves when the Todo item is created and the response is sent.
 */
const createTodo = async (req: Request, res: Response): Promise<void> => {
  const { name, shortDescription, date } = req.body ?? {};

  const newTodo = await Todo.create({
    name,
    shortDescription,
    date,
  });

  new ApiResponse({
    status: 201,
    message: "Todo created successfully",
    data: newTodo,
  }).send(res);
};

export default createTodo;
