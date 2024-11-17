import { NextFunction, Request, Response } from "express";
import ApiError from "@/errors/apiError";
import { logger } from "@/logger";
import env from "@/utils/validateEnv";
import { UniqueConstraintError, ValidationError } from "sequelize";

/**
 * Error handling middleware for Express.
 *
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {void}
 */
const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error: ApiError;

  // Check if error is an instance of ApiError
  if (!(err instanceof ApiError)) {
    if (err instanceof ValidationError) {
      // Handle Sequelize validation error
      const errors = err.errors.map((error) => ({
        [error.path ?? "field"]: error.message,
      }));

      error = new ApiError({
        status: 400,
        message: errors[0][Object.keys(errors[0])[0]],
        errors,
        stack: err.stack,
      });
    } else if (err instanceof UniqueConstraintError) {
      const errors = err.errors.map((error) => ({
        [error.path ?? "field"]: error.message,
      }));

      error = new ApiError({
        status: 400,
        message: errors[0][Object.keys(errors[0])[0]],
        errors,
        stack: err.stack,
      });
    } else {
      error = new ApiError({
        status: 500,
        message: "Something went wrong",
        errors: [
          {
            message: err.message,
          },
        ],
        stack: err.stack,
      });
    }
  } else {
    error = new ApiError({
      status: err.status,
      message: err.message,
      errors: err.errors,
      stack: err.stack,
    });
  }

  const response = {
    ...error,
    message: error.message,
    errors: error.errors,
    ...(env.isProd && { stack: error.stack }),
  };

  if (env.isDev) {
    logger.error(err);
  }

  res.status(error.status).json(response);
  next();
  return;
};

export default errorHandlerMiddleware;
