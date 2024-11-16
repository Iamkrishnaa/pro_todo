import ApiException from "@/errors/apiException";
import { createTodo } from "@/services/remote/todos";
import { CreateTodo } from "@/types/todos/createTodo";
import { useState } from "react";
import toast from "react-hot-toast";

const useCreateTodo = () => {
  const [isCreatingTodo, setIsCreatingTodo] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<CreateTodo>({
    name: "",
    shortDescription: "",
  });

  const clearErrors = () => {
    setError(null);
    setFieldErrors({});
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      errors.shortDescription = "Short description is required";
    }

    if (!form.date) {
      errors.date = "Date is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isCreatingTodo) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsCreatingTodo(true);

    const response = await createTodo(form);

    response.fold(
      (error: ApiException) => {
        const fErrors = error.getFieldErrors();
        setFieldErrors(fErrors);

        if (Object.keys(fErrors).length === 0) {
          setError(error.message);
        }

        setIsCreatingTodo(false);
      },
      () => {
        setIsCreatingTodo(false);
        toast.success("Todo Created Successfully", {
          id: "create-todo-success",
        });
      }
    );
  };

  return {
    isCreatingTodo,
    error,
    fieldErrors,
    form,
    handleFieldChange,
    handleSubmit,
  };
};

export default useCreateTodo;
