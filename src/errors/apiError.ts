/**
 * Interface for ApiError options.
 */
interface ApiErrorOptions {
  /**
   * HTTP status code.
   */
  status?: number;

  /**
   * Error message.
   */
  message?: string;

  /**
   * Additional data related to the error.
   */
  data?: any;

  /**
   * Specific errors related to the error.
   */
  errors?: any;

  /**
   * Stack trace of the error.
   */
  stack?: string;
}

/**
 * Class representing an API error.
 * @extends Error
 */
class ApiError extends Error {
  public status: number;
  public message: string;
  public data?: any;
  public errors?: any;

  /**
   * Creates an instance of ApiError.
   * @param {ApiErrorOptions} options - The options for the API error.
   */
  constructor(options: ApiErrorOptions) {
    super(options.message);
    this.status = options.status || 500;
    this.message = options.message || "Something went wrong";
    this.data = options.data;
    this.errors = options.errors;

    Error.captureStackTrace(this, this.constructor);

    if (options.stack) {
      this.stack = options.stack;
    }
  }
}

export default ApiError;
