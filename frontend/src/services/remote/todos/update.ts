import handleApiError from "@/errors/handleError";
import axiosInstance from "@/services/apiService";
import { Left, ResultAsync, Right } from "@/types/either";
import { Todo } from "@/types/todos/todo";
import { UpdateTodo } from "@/types/todos/updateTodo";
import AppApis from "@/utils/appApis";

const updateTodo = async ({
  todoId: todoId,
  updateTodo: updateTodo,
}: {
  todoId: string;
  updateTodo: UpdateTodo;
}): ResultAsync<Todo> => {
  const request = axiosInstance.put(AppApis.todos.update(todoId), updateTodo);
  const [error, data] = await handleApiError(request);

  if (error) return Left.create(error);
  return Right.create(data.data.data as Todo);
};

export default updateTodo;
