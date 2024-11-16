import React from "react";
import Pagination from "./Pagination";
import useQueryHelper from "@/hooks/common/useQueryHelper";

export default function PaginationGroup({
  rowsPerPage,
  currentPage,
  totalPages,
  handleRowsPerPageChange,
  handlePageChange,
}: {
  rowsPerPage: number;
  currentPage: number;
  totalPages: number;
  handleRowsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePageChange: (page: number) => void;
}) {
  const { addQueryParamInURL } = useQueryHelper();

  const onPageChange = (page: number) => {
    addQueryParamInURL({
      param: "page",
      value: page.toString(),
    });

    handlePageChange(page);
  };

  const onRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    addQueryParamInURL({
      param: "size",
      value: e.target.value,
    });
    handleRowsPerPageChange(e);
  };

  return (
    <div className="flex w-full items-center justify-end gap-8 py-4">
      <div className="rows-per-page flex items-center justify-center gap-1">
        <span className="hidden sm:inline-block">Records Per Page: </span>
        <select
          className="inline-block h-10 w-16 rounded-md border border-none bg-transparent text-center focus:outline-none"
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
        </select>
      </div>
      <div className="page-info hidden sm:inline-block">
        Page {currentPage} of {totalPages}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
