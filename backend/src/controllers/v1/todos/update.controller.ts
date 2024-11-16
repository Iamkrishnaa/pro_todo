import { Todo } from "@/models";
import ApiResponse from "@/utils/apiResponse";
import { Request, Response } from "express";

/**
 * Updates a Todo item.
 *
 * @param {Request} req - The request object, containing the ID of the Todo item to update and the new data in the body.
 * @param {Response} res - The response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves when the Todo item is updated and the response is sent.
 */
const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, shortDescription, date, isDone } = req.body ?? {};

  // Update the Todo item
  await Todo.update(
    {
      name,
      shortDescription,
      date,
      isDone,
    },
    {
      where: {
        id,
      },
    }
  );

  const updatedTodo = await Todo.findByPk(id);

  new ApiResponse({
    status: 200,
    message: "Todo updated successfully",
    data: updatedTodo,
  }).send(res);
};

export default updateTodo;
