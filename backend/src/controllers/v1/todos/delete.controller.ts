import { Todo } from "@/models";
import ApiResponse from "@/utils/apiResponse";
import { Request, Response } from "express";

/**
 * Deletes a Todo item.
 *
 * @param {Request} req - The request object, containing the ID of the Todo item to delete.
 * @param {Response} res - The response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves when the Todo item is deleted and the response is sent.
 */
const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  await Todo.destroy({
    where: {
      id,
    },
    force: true,
  });

  new ApiResponse({
    status: 204,
    message: "Todo deleted successfully",
  }).send(res);
};

export default deleteTodo;
