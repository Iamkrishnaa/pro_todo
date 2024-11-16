import handleApiError from "@/errors/handleError";
import axiosInstance from "@/services/apiService";
import { Left, ResultAsync, Right } from "@/types/either";
import AppApis from "@/utils/appApis";

const deleteTodo = async (_id: string): ResultAsync<void> => {
  const request = axiosInstance.delete(AppApis.todos.delete(_id));
  const [error] = await handleApiError(request);

  if (error) return Left.create(error);
  return Right.createVoid();
};

export default deleteTodo;
