"use client";
import useCreateTodo from "@/hooks/todos/useCreateTodo";
import React from "react";
import Spinner from "../common/Spinner";
import { IoAddCircleOutline } from "react-icons/io5";
import { format } from "date-fns";

export default function CreateTodo() {
  const { form, isCreatingTodo, fieldErrors, handleFieldChange, handleSubmit } =
    useCreateTodo();

  return (
    <div>
      <div className="title-section simple-border-color flex w-full items-center justify-between border-b-[1px] pb-2">
        <h1 className="text-xl font-bold">Create New Todo</h1>
      </div>

      <form className="mt-4" onSubmit={handleSubmit} method="POST">
        {/* Fields for name, description, date and time */}
        <div className="form-group flex flex-col gap-1">
          <label htmlFor="name" className="text-secondary text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleFieldChange}
            value={form.name}
            className={`rounded-md bg-lightSecondary px-3 py-3 dark:bg-darkSecondary ${fieldErrors.name ? "border-2 border-red-500" : ""} `}
            placeholder="Enter Todo Name"
          />
          {fieldErrors.name ? (
            <span className="text-xs font-normal italic text-danger">
              {fieldErrors.name}
            </span>
          ) : (
            <span className="invisible text-xs font-normal italic">{"-"}</span>
          )}
        </div>

        <div className="form-group flex flex-col gap-1">
          <label htmlFor="description" className="text-secondary text-sm">
            Short Description
          </label>
          <textarea
            id="description"
            name="shortDescription"
            className={`rounded-md bg-lightSecondary px-3 py-3 dark:bg-darkSecondary ${fieldErrors.shortDescription ? "border-2 border-red-500" : ""} `}
            placeholder="Enter Todo Description"
            onChange={handleFieldChange}
            value={form.shortDescription}
          />
          {fieldErrors.shortDescription ? (
            <span className="text-xs font-normal italic text-danger">
              {fieldErrors.shortDescription}
            </span>
          ) : (
            <span className="invisible text-xs font-normal italic">{"-"}</span>
          )}
        </div>

        <div className="form-group flex flex-col gap-1">
          <label htmlFor="date" className="text-secondary text-sm">
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            className={`rounded-md bg-lightSecondary px-3 py-3 dark:bg-darkSecondary ${fieldErrors.date ? "border-2 border-red-500" : ""} `}
            onChange={handleFieldChange}
            value={
              form.date ? format(new Date(form.date), "yyyy-MM-dd'T'HH:mm") : ""
            }
          />

          {fieldErrors.date ? (
            <span className="text-xs font-normal italic text-danger">
              {fieldErrors.date}
            </span>
          ) : (
            <span className="invisible text-xs font-normal italic">{"-"}</span>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className={`btn-primary mt-3 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold ${isCreatingTodo ? "cursor-auto opacity-70" : ""} w-full`}
          disabled={isCreatingTodo}
        >
          {!isCreatingTodo ? (
            <>
              <IoAddCircleOutline size={17} />
              Create Todo
            </>
          ) : (
            <>
              <Spinner color="text-white" />
              Creating...
            </>
          )}
        </button>
      </form>
    </div>
  );
}
