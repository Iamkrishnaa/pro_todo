import { AxiosError } from "axios";
import ApiException from "./apiException";

/**
 * @description Handle API errors
 * @param {Promise<T>} promise
 * @returns {Promise<[undefined, T] | [ApiException]>}
 * @example
 * const [error, data] = await handleApiError(apiService.getUsers());
 * if (error) {
 *  console.error(error.message);
 * } else {
 * console.log(data);
 * }
 */
async function handleApiError<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [ApiException]> {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error) => {
      if (error instanceof AxiosError) {
        if (error.response && error.response.status < 500) {
          const errorData = error.response.data;

          return [
            new ApiException({
              status: errorData.status,
              message: errorData.message,
              errors: errorData.errors,
            }),
          ];
        }
      }
      return [
        new ApiException({
          status: 500,
          message: "An unexpected error occurred",
          stack: error as string,
        }),
      ];
    });
}

async function catchError<T>(
  promise: Promise<T>
): Promise<[undefined, T] | [Error]> {
  return promise
    .then((data) => [undefined, data] as [undefined, T])
    .catch((error) => [error]);
}

export { handleApiError, catchError };
export default handleApiError;
