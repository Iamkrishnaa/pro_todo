"use client";
import { Todo } from "@/types/todos/todo";
import React, { useState } from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { format } from "date-fns";
import { MdDelete, MdEditSquare } from "react-icons/md";
import DeleteTodoModal from "./DeleteTodoModal";
import toast from "react-hot-toast";
import { deleteTodo, updateTodo } from "@/services/remote/todos";
import ShowDetailModal from "./ShowDetailModal";

export default function SingleTodo({
  todo,
  removeCurrentTodo,
  toggleTodoStatus,
}: {
  todo: Todo;
  removeCurrentTodo: (todoId: number) => void;
  toggleTodoStatus: (todoId: number) => void;
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
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

  const updateTodoHandler = async () => {
    const response = await updateTodo({
      todoId: todo.id!.toString(),
      updateTodo: {
        isDone: !todo.isDone,
      },
    });

    response.fold(
      (error) => {
        toast.error(error.message, {
          id: "update-todo-error",
        });
      },
      () => {
        toggleTodoStatus(todo.id!);
      }
    );
  };

  return (
    <div
      className="todo-item simple-border-color link-hover mt-4 flex cursor-pointer items-center justify-between rounded-lg border-[1px] p-4 transition-all duration-300"
      onClick={openDetailModal}
    >
      <div className="flex flex-1 items-center justify-start gap-4">
        <input
          type="checkbox"
          className="h-5 w-5"
          checked={todo.isDone}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            e.stopPropagation();
            updateTodoHandler();
          }}
        />
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

      {/* Delete Modal */}
      <DeleteTodoModal
        isDeleting={isDeleting}
        isDeleteModalOpen={isDeleteModalOpen}
        closeDeleteModal={closeDeleteModal}
        deleteTodoHandler={deleteTodoHandler}
      />

      {/* Detail Modal */}
      <ShowDetailModal
        isDetailModalOpen={isDetailModalOpen}
        closeDetailModal={closeDetailModal}
        todo={todo}
      />
    </div>
  );
}
