import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1) {
      onPageChange(page);
    }
  };

  const buttonClass = `flex h-10 w-10 items-center justify-center rounded-md border-none bg-lightSecondary text-center shadow-sm focus:outline-none dark:bg-darkSecondary transition-colors duration-300`;

  const hoverClass = `hover:!bg-darkSecondary/20 dark:hover:!bg-lightSecondary/20`;

  return (
    <div className="pagination flex gap-2">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`${buttonClass} ${
          currentPage === 1 ? "text-gray-400" : hoverClass
        }`}
      >
        <FaAnglesLeft />
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonClass} ${
          currentPage === 1 ? "text-gray-400" : hoverClass
        }`}
      >
        <FaAngleLeft />
      </button>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonClass} ${
          currentPage === totalPages ? "text-gray-400" : hoverClass
        }`}
      >
        <FaAngleRight />
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`${buttonClass} ${
          currentPage === totalPages ? "text-gray-400" : hoverClass
        } }`}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
};

export default Pagination;
