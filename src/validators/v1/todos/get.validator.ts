import { Todo } from "@/models";
import { query } from "express-validator";

/**
 * Validates the request to get a list of Todo items.
 *
 * @returns {Array<any>} An array of validation rules.
 */
const getTodosValidator = (): Array<any> => {
  return [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer")
      .bail(),
    query("size")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Size must be a positive integer")
      .bail(),
    query("search")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Search query is required")
      .bail()
      .isString()
      .withMessage("Search query must be a string")
      .bail()
      .isLength({ max: 255 })
      .withMessage("Search query must be less than 255 characters")
      .bail()
      .customSanitizer((value) => value.replace(/[^a-zA-Z0-9\s]/g, ""))
      .bail(),
    query("sort")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Sort is required")
      .isString()
      .withMessage("Sort must be a string")
      .bail()
      .custom((value) => {
        // check whether the sort column exists in the model, replace with id if not
        const sortColumn = Object.keys(Todo.getAttributes()).includes(value);
        if (!sortColumn) {
          throw new Error("Invalid sort column");
        }

        return true;
      })
      .bail(),
    query("order")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Order is required")
      .bail()
      .isString()
      .withMessage("Order must be a string")
      .isIn(["asc", "desc", "ASC", "DESC"])
      .withMessage("Invalid order value")
      .bail(),
    query("filter")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Filter is required")
      .isString()
      .withMessage("Filter must be a string")
      .bail()
      .isIn(["done", "upcoming", "overdue"])
      .withMessage("Invalid filter value")
      .bail(),
  ];
};

export default getTodosValidator;
