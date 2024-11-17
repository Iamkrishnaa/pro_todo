"use client";
import Spinner from "@/components/common/Spinner";
import React from "react";
import Modal from "../modals/Modal";
import { Todo } from "@/types/todos/todo";
import useUpdateTodo from "@/hooks/todos/useUpdateTodo";
import { format } from "date-fns";

export default function UpdateTodoModal({
  isUpdateModalOpen,
  closeUpdateModal,
  todoItem,
}: {
  isUpdateModalOpen: boolean;
  closeUpdateModal: () => void;
  todoItem: Todo;
}) {
  const { form, isUpdatingTodo, fieldErrors, handleChange, handleSubmit } =
    useUpdateTodo({
      todo: todoItem,
      closeUpdatePopup: closeUpdateModal,
    });

  return (
    <Modal
      open={isUpdateModalOpen}
      onClose={closeUpdateModal}
      rounded="2xl"
      bgColor="bg-lightSecondary"
      darkBgColor="bg-darkSecondary"
      enableDismissRestrictAnimation={true}
      enableModalAnimation={true}
      modalAnimation="scale-up"
      modalPadding="py-2"
    >
      <div className="relative flex min-w-[330px] max-w-[300px] flex-col items-center justify-center rounded-2xl bg-lightSecondary px-10 py-6 text-center drop-shadow-sm dark:bg-darkSecondary">
        {/*  Confirmation Text */}
        <div className="my-4 w-full">
          <div className="text-xl font-bold">Update Todo</div>
          <div className="text-secondary mt-2">
            Update the details of the todo.
          </div>
        </div>
        {/* Form */}
        <form className="mt-4 w-full" onSubmit={handleSubmit} method="POST">
          {/* Fields for name, description, date and time */}
          <div className="form-group flex flex-col items-start justify-start gap-1">
            <label htmlFor="name" className="text-secondary text-sm">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={form.name}
              className={`rounded-md bg-light px-3 py-3 dark:bg-dark ${fieldErrors.name ? "border-2 border-red-500" : ""} w-full`}
              placeholder="Enter Todo Name"
            />
            {fieldErrors.name ? (
              <span className="text-xs font-normal italic text-danger">
                {fieldErrors.name}
              </span>
            ) : (
              <span className="invisible text-xs font-normal italic">
                {"-"}
              </span>
            )}
          </div>

          <div className="form-group flex flex-col items-start justify-start gap-1">
            <label htmlFor="description" className="text-secondary text-sm">
              Short Description
            </label>
            <textarea
              id="description"
              name="shortDescription"
              className={`rounded-md bg-light px-3 py-3 dark:bg-dark ${fieldErrors.shortDescription ? "border-2 border-red-500" : ""} w-full`}
              placeholder="Enter Todo Description"
              onChange={handleChange}
              value={form.shortDescription}
            />
            {fieldErrors.shortDescription ? (
              <span className="text-xs font-normal italic text-danger">
                {fieldErrors.shortDescription}
              </span>
            ) : (
              <span className="invisible text-xs font-normal italic">
                {"-"}
              </span>
            )}
          </div>

          <div className="form-group flex flex-col items-start justify-start gap-1">
            <label htmlFor="date" className="text-secondary text-sm">
              Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              className={`rounded-md bg-light px-3 py-3 dark:bg-dark ${fieldErrors.date ? "border-2 border-red-500" : ""} w-full`}
              onChange={handleChange}
              value={
                form.date
                  ? format(new Date(form.date), "yyyy-MM-dd'T'HH:mm")
                  : ""
              }
            />

            {fieldErrors.date ? (
              <span className="text-xs font-normal italic text-danger">
                {fieldErrors.date}
              </span>
            ) : (
              <span className="invisible text-xs font-normal italic">
                {"-"}
              </span>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className={`btn-primary mt-3 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold ${isUpdatingTodo ? "cursor-auto opacity-70" : ""} w-full`}
            disabled={isUpdatingTodo}
          >
            {!isUpdatingTodo ? (
              <>Update Todo</>
            ) : (
              <>
                <Spinner color="text-white" />
                Updating...
              </>
            )}
          </button>
        </form>
      </div>
    </Modal>
  );
}
