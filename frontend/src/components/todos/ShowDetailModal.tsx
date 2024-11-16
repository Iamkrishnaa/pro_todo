import React from "react";
import Modal from "../modals/Modal";
import { Todo } from "@/types/todos/todo";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBarsProgress, FaClock } from "react-icons/fa6";
import { format } from "date-fns";

export default function ShowDetailModal({
  isDetailModalOpen,
  closeDetailModal,
  todo,
}: {
  isDetailModalOpen: boolean;
  closeDetailModal: () => void;
  todo: Todo;
}) {
  return (
    <Modal
      open={isDetailModalOpen}
      onClose={closeDetailModal}
      rounded="2xl"
      bgColor="bg-lightSecondary"
      darkBgColor="bg-darkSecondary"
      isDismissable={true}
      enableDismissRestrictAnimation={true}
      enableModalAnimation={true}
      modalAnimation="scale-up"
      modalPadding="p-5"
    >
      <div className="relative flex max-w-[350px] flex-col items-center justify-center rounded-2xl bg-lightSecondary p-4 text-center drop-shadow-sm dark:bg-darkSecondary">
        <div>
          <div className="title-section flex w-full items-center justify-center pb-2">
            <h1 className="text-xl font-bold">{todo.name}</h1>
          </div>

          {/* Todo Description */}
          <p className="text-secondary mt-3 pb-4 text-center text-base">
            {todo.shortDescription}
          </p>

          <div className="meta w-full">
            <table className="text-secondary mt-4 w-full table-auto">
              <tbody>
                {/* Todo Status */}
                <tr>
                  <td className="flex items-center gap-2 py-2">
                    <FaBarsProgress /> Status
                  </td>
                  <td className="text-start dark:text-white">
                    {todo.isDone ? "Done" : "Pending"}
                  </td>
                </tr>
                {/* Todo Date */}
                <tr>
                  <td className="flex items-center gap-2 py-2">
                    <FaCalendarAlt /> Date
                  </td>
                  <td className="text-start dark:text-white">
                    {format(todo.date, "dd MMM yyyy")}
                  </td>
                </tr>

                {/* Todo Time */}
                <tr>
                  <td className="flex items-center gap-2 py-2">
                    <FaClock /> Time
                  </td>
                  <td className="text-start dark:text-white">
                    {format(todo.date, "hh:mm a")}
                  </td>
                </tr>

                {/* Created At */}
                <tr>
                  <td className="flex items-center gap-2 py-2">
                    <FaCalendarAlt /> Created At
                  </td>
                  <td className="text-start dark:text-white">
                    {format(todo.createdAt, "dd MMM yyyy, hh:mm a")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
}
