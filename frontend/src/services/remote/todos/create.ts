import handleApiError from "@/errors/handleError";
import axiosInstance from "@/services/apiService";
import { Left, ResultAsync, Right } from "@/types/either";
import { CreateTodo } from "@/types/todos/createTodo";
import { Todo } from "@/types/todos/todo";
import AppApis from "@/utils/appApis";

const createTodo = async (todoData: CreateTodo): ResultAsync<Todo> => {
  const request = axiosInstance.post(AppApis.todos.create, todoData);
  const [error, data] = await handleApiError(request);

  if (error) return Left.create(error);
  return Right.create(data.data.data as Todo);
};

export default createTodo;
