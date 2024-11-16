import handleApiError from "@/errors/handleError";
import axiosInstance from "@/services/apiService";
import { GetParams } from "@/types/common/getParams";
import { PaginatedData } from "@/types/common/paginatedData";
import { Left, ResultAsync, Right } from "@/types/either";
import { Todo } from "@/types/todos/todo";
import AppApis from "@/utils/appApis";
import { removeUndefined } from "@/utils/helper";

const getTodos = async (
  params: GetParams
): ResultAsync<PaginatedData<Todo>> => {
  const request = axiosInstance.get(AppApis.todos.getTodos, {
    params: removeUndefined(params),
  });
  const [error, data] = await handleApiError(request);

  if (error) return Left.create(error);
  return Right.create(data.data.data as PaginatedData<Todo>);
};

export default getTodos;
