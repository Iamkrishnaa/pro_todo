import { param } from "express-validator";
import { Todo } from "@/models";

/**
 * Validates the request to delete a Todo item.
 *
 * @returns {Array<any>} An array of validation rules.
 */
const deleteTodoValidator = (): Array<any> => {
  return [
    param("id")
      .exists()
      .isInt({ min: 1 })
      .withMessage("The ID must be a positive integer.")
      .bail()
      .custom(async (id: number) => {
        const todo = await Todo.findByPk(id);

        if (!todo) {
          throw new Error("The Todo item does not exist.");
        }

        return true;
      }),
  ];
};

export default deleteTodoValidator;
