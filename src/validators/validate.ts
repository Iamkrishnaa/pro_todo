import { validationResult } from "express-validator";
import ApiError from "@/errors/apiError";
import { NextFunction, Request, Response } from "express";

const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors: { [x: string]: any }[] = [];

    errors.array().map((err) => {
      switch (err.type) {
        case "field":
          extractedErrors.push({ [err.path]: err.msg });
          break;
        default:
          extractedErrors.push({
            [err.type]: err.msg,
          });
      }
    });

    throw new ApiError({
      message: errors.array()[0].msg,
      errors: extractedErrors,
      status: 400,
    });
  }

  next();
};

export default validate;
