import ApiException from "@/errors/apiException";
import { updateTodo } from "@/services/remote/todos";
import { Todo } from "@/types/todos/todo";
import { UpdateTodo } from "@/types/todos/updateTodo";
import { useState } from "react";
import toast from "react-hot-toast";

const useUpdateTodo = ({
  todo,
  closeUpdatePopup,
}: {
  todo: Todo;
  closeUpdatePopup: () => void;
}) => {
  const [isUpdatingTodo, setIsUpdatingTodo] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<UpdateTodo>({
    name: todo.name,
    shortDescription: todo.shortDescription,
    date: todo.date,
    isDone: todo.isDone,
  });

  const clearErrors = () => {
    setError(null);
    setFieldErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being updated
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    clearErrors();
    const errors: Record<string, string> = {};

    if (!form.name) {
      errors.name = "Name is required";
    }

    if (!form.shortDescription) {
      errors.shortDescription = "Short Description is required";
    }

    if (!form.date) {
      errors.date = "Date is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setForm({
      name: "",
      shortDescription: "",
      date: new Date(),
      isDone: false,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUpdatingTodo) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsUpdatingTodo(true);

    const updateTodoRequest: UpdateTodo = {
      name: form.name,
      shortDescription: form.shortDescription,
      date: form.date,
      isDone: form.isDone,
    };

    const response = await updateTodo({
      todoId: todo.id.toString(),
      updateTodo: updateTodoRequest,
    });

    response.fold(
      (error: ApiException) => {
        const fErrors = error.getFieldErrors();
        setFieldErrors(fErrors);

        if (Object.keys(fErrors).length === 0) {
          setError(error.message);
        }
      },
      async () => {
        toast.success("Todo Update Success", {
          id: "update-todo-success",
        });
        closeUpdatePopup();
        resetForm();
      }
    );

    setIsUpdatingTodo(false);
  };

  return {
    form,
    isUpdatingTodo,
    error,
    fieldErrors,
    todo,
    handleChange,
    handleSubmit,
  };
};

export default useUpdateTodo;
