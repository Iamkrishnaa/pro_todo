import { body } from "express-validator";

/**
 * Validator for creating a Todo item.
 *
 * This validator checks the following fields:
 * - `name`: Must exist, be a string, and have a length between 3 and 255 characters.
 * - `shortDescription`: Must exist, be a string, and have a minimum length of 5 characters.
 *
 * @returns {Array<any>} An array of validation chains for express-validator.
 */
const createTodoValidator = (): Array<any> => {
  return [
    body("name")
      .exists()
      .withMessage("name is required")
      .bail()
      .isString()
      .withMessage("name must be a string")
      .bail()
      .isLength({ min: 3, max: 255 })
      .withMessage("name must be between 3 and 255 characters"),
    body("shortDescription")
      .exists()
      .withMessage("shortDescription is required")
      .bail()
      .isString()
      .withMessage("shortDescription must be a string")
      .bail()
      .isLength({ min: 5 })
      .withMessage("shortDescription must be at least 5 characters"),
  ];
};

export default createTodoValidator;
