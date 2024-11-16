import Spinner from "@/components/common/Spinner";
import React from "react";
import { IoIosWarning } from "react-icons/io";
import Modal from "../modals/Modal";

export default function DeleteTodoModal({
  isDeleteModalOpen,
  closeDeleteModal,
  isDeleting,
  deleteTodoHandler,
}: {
  isDeleteModalOpen: boolean;
  closeDeleteModal: () => void;
  isDeleting: boolean;
  deleteTodoHandler: () => void;
}) {
  return (
    <Modal
      open={isDeleteModalOpen}
      onClose={closeDeleteModal}
      rounded="2xl"
      bgColor="bg-lightSecondary"
      darkBgColor="bg-darkSecondary"
      isDismissable={false}
      enableDismissRestrictAnimation={true}
      enableModalAnimation={true}
      modalAnimation="scale-up"
      modalPadding="py-2"
    >
      <div className="relative flex max-w-[300px] flex-col items-center justify-center rounded-2xl bg-lightSecondary p-4 text-center drop-shadow-sm dark:bg-darkSecondary">
        {/* Icon */}
        <div className="rounded-full bg-danger/15 p-4">
          <IoIosWarning className="text-2xl text-danger" />
        </div>
        {/*  Confirmation Text */}
        <div className="my-4">
          <div className="text-xl font-bold">Delete Todo?</div>
          <div className="text-secondary mt-2">
            Are you sure, you want to delete this todo?
          </div>
        </div>
        {/* Buttons */}
        <div className="mt-2 flex w-full items-center justify-between gap-3 font-semibold">
          <button
            className={`w-full rounded-full border-[1px] border-gray-800/15 p-3 transition-colors duration-300 hover:bg-gray-600/15 dark:border-gray-200/60 dark:hover:bg-gray-200/20 ${isDeleting ? "!bg-gray-600/30" : "bg-transparent"} `}
            onClick={closeDeleteModal}
            disabled={isDeleting}
          >
            No, Keep It.
          </button>
          <button
            className={`flex w-full items-center justify-center gap-2 rounded-full bg-danger p-3 text-white transition-colors duration-300 hover:bg-danger/90 ${isDeleting ? "cursor-auto !bg-danger/60" : ""} `}
            onClick={deleteTodoHandler}
          >
            {!isDeleting ? (
              "Yes, Delete It."
            ) : (
              <>
                <Spinner color="text-white" />
                <span>Deleting...</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
