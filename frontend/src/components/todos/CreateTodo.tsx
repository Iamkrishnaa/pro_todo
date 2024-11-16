import React from "react";

export default function CreateTodo() {
  return (
    <div>
      <div className="title-section simple-border-color flex w-full items-center justify-between border-b-[1px] pb-2">
        <h1 className="text-xl font-bold">Create New Todo</h1>
      </div>

      <form className="mt-4">
        {/* Fields for name, description, date and time */}
        <div className="form-group my-3 flex flex-col gap-1">
          <label htmlFor="name" className="text-secondary text-sm">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input rounded-lg bg-lightSecondary px-4 py-3 dark:bg-darkSecondary"
            placeholder="Enter Todo Name"
          />
          {
            // Error message
            true && (
              <div className="pl-2 text-sm italic text-red-500">
                Name is required
              </div>
            )
          }
        </div>

        <div className="form-group my-3 flex flex-col gap-1">
          <label htmlFor="description" className="text-secondary text-sm">
            Short Description
          </label>
          <textarea
            id="description"
            name="shortDescription"
            className="input rounded-lg bg-lightSecondary px-4 py-3 dark:bg-darkSecondary"
            placeholder="Enter Todo Description"
          />
          {
            // Error message
            false && (
              <div className="pl-2 text-sm italic text-red-500">
                Description is required
              </div>
            )
          }
        </div>

        <div className="form-group my-3 flex flex-col gap-1">
          <label htmlFor="date" className="text-secondary text-sm">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="input rounded-lg bg-lightSecondary px-4 py-3 dark:bg-darkSecondary"
          />
          {
            // Error message
            false && (
              <div className="pl-2 text-sm italic text-red-500">
                Date is required
              </div>
            )
          }
        </div>

        <div className="form-group my-3 flex flex-col gap-1">
          <label htmlFor="time" className="text-secondary text-sm">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className="input rounded-lg bg-lightSecondary px-4 py-3 dark:bg-darkSecondary"
          />
          {
            // Error message
            false && (
              <div className="pl-2 text-sm italic text-red-500">
                Time is required
              </div>
            )
          }
        </div>

        {/* Button */}
        <button
          type="submit"
          className="btn-primary w-full rounded-lg py-3 text-base font-semibold"
        >
          Create Todo
        </button>
      </form>
    </div>
  );
}
