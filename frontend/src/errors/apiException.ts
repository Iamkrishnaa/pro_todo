class ApiException extends Error {
  status: number;
  message: string;
  errors?: Record<string, string>[];
  stack?: string;
  code?: string;

  constructor({
    status,
    message,
    errors,
    stack,
    code,
  }: {
    status: number;
    message: string;
    errors?: Record<string, string>[];
    stack?: string;
    code?: string;
  }) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
    this.stack = stack;
    this.code = code;
  }

  static convertAnyToApiException(error: unknown): ApiException {
    return new ApiException({
      status: 500,
      message: "An unexpected error occurred",
      stack: error as string,
    });
  }

  containsKey(key: string): boolean {
    if (this.errors) {
      return this.errors.some((error) => key in error);
    }
    return false;
  }

  getErrorMessage(key: string): string | undefined {
    if (this.errors) {
      const error = this.errors.find((error) => key in error);
      return error ? error[key].toString() : undefined;
    }
    return undefined;
  }

  getErrorMessageIfExists(key: string): string | undefined {
    if (this.errors) {
      const error = this.errors.find((error) => key in error);
      return error ? error[key].toString() : undefined;
    }
    return this.message;
  }

  getFieldErrors(): Record<string, string> {
    const fieldErrors: Record<string, string> = {};

    if (this.errors) {
      this.errors.forEach((error) => {
        const [key, value] = Object.entries(error)[0];
        fieldErrors[key] = value.toString();
      });
    }

    return fieldErrors;
  }
}

export default ApiException;
