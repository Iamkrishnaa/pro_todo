"use client";
import { Todo } from "@/types/todos/todo";
import React, { useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { format } from "date-fns";
import { MdDelete, MdEditSquare } from "react-icons/md";
import DeleteTodoModal from "./DeleteTodoModal";
import toast from "react-hot-toast";
import { deleteTodo } from "@/services/remote/todos";

export default function SingleTodo({
  todo,
  removeCurrentTodo,
}: {
  todo: Todo;
  removeCurrentTodo: (todoId: number) => void;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const deleteTodoHandler = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    const response = await deleteTodo(todo.id!.toString());

    response.fold(
      (error) => {
        toast.error(error.message, {
          id: "delete-todo-error",
        });
      },
      () => {
        toast.success("Todo Deleted Successfully", {
          id: "delete-todo-success",
        });
        setIsDeleting(false);
        setIsDeleteModalOpen(false);
        removeCurrentTodo(todo.id!);
      }
    );

    setIsDeleting(false);
  };

  return (
    <div className="todo-item simple-border-color link-hover mt-4 flex cursor-pointer items-center justify-between rounded-lg border-[1px] p-4 transition-all duration-300">
      <div className="flex flex-1 items-center justify-start gap-4">
        <input type="checkbox" className="h-5 w-5" />
        <div className="details flex flex-col gap-1">
          <div className="title text-base">{todo.name}</div>
          {/* Date and time */}
          <div className="meta text-secondary flex items-center gap-3 text-sm">
            <FaCalendarAlt />
            <span>{format(todo.date, "dd MMM yyyy")}</span>
            <FaClock />
            <span>{format(todo.date, "hh:mm a")}</span>
          </div>
        </div>
      </div>
      <div className="actions flex gap-2">
        <button className="link-hover flex h-8 w-8 items-center justify-center rounded-full bg-primary/30 text-primary">
          <MdEditSquare size={18} />
        </button>
        <button
          className="link-hover flex h-8 w-8 items-center justify-center rounded-full bg-danger/30 text-danger"
          onClick={openDeleteModal}
        >
          <MdDelete size={18} />
        </button>
      </div>

      <DeleteTodoModal
        isDeleting={isDeleting}
        isDeleteModalOpen={isDeleteModalOpen}
        closeDeleteModal={closeDeleteModal}
        deleteTodoHandler={deleteTodoHandler}
      />
    </div>
  );
}
