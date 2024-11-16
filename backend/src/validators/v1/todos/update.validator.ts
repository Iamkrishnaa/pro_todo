import { body, param } from "express-validator";
import { Todo } from "@/models";

/**
 * Validates the request to update a Todo item.
 *
 * @returns {Array<any>} An array of validation rules.
 */
const updateTodoValidator = (): Array<any> => {
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
    body("name")
      .optional()
      .isString()
      .withMessage("The name must be a string.")
      .bail()
      .isLength({ min: 3, max: 255 })
      .withMessage("The name must be between 3 and 255 characters."),
    body("shortDescription")
      .optional()
      .isString()
      .withMessage("The shortDescription must be a string.")
      .bail()
      .isLength({ min: 5 })
      .withMessage("The shortDescription must be at least 5 characters."),
    body("date")
      .optional()
      .isISO8601({
        strict: true,
      })
      .withMessage("The date must be a valid date.")
      .bail(),
    body("isDone")
      .optional()
      .isBoolean()
      .withMessage("The isDone field must be a boolean."),
  ];
};

export default updateTodoValidator;
