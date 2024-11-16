"use client";
import React, { useEffect, useState } from "react";
import PaginationGroup from "../pagination/PaginationGroup";
import useQueryHelper from "@/hooks/common/useQueryHelper";
import { PaginatedData } from "@/types/common/paginatedData";
import { getSearchParamsWithDefaultValue } from "@/utils/helper";
import { debounce } from "lodash";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Todo } from "@/types/todos/todo";
import { getTodos } from "@/services/remote/todos";
import PopupMessage from "../common/PopupMessage";
import Spinner from "../common/Spinner";
import SingleTodo from "./Todo";
import SearchField from "../common/SearchField";

export default function TodosSection() {
  const { addQueryParamInURL, removeQueryParamFromURL } = useQueryHelper();

  const [isTodosFetching, setIsTodosFetching] = useState<boolean>(false);
  const [paginatedTodos, setPaginatedTodos] = useState<PaginatedData<Todo>>();
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const params = getSearchParamsWithDefaultValue(searchParams);

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(params.page!);
  const [rowsPerPage, setRowsPerPage] = useState<number>(params.size!);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(
    params.search
  );
  const [filter, setFilter] = useState<string | undefined>(params.filter);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsTodosFetching(true);

      const response = await getTodos({
        page: currentPage,
        size: rowsPerPage,
        search: searchQuery,
        filter,
      });

      response.fold(
        (error) => {
          setError(error.message);
        },
        (todos) => {
          setPaginatedTodos(todos);
        }
      );

      setIsTodosFetching(false);
    };

    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, rowsPerPage, searchQuery, filter]);

  const handleSearch = debounce((value: string) => {
    if (value.trim() === "") {
      setSearchQuery(undefined);
    } else {
      setSearchQuery(value);
    }

    addQueryParamInURL({
      param: "search",
      value,
    });
  }, 800);

  const handleSearchChange = (value: string) => {
    handleSearch(value);
  };

  const handleClearSearch = () => {
    setSearchQuery(undefined);
    removeQueryParamFromURL("search");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
  };

  const handleFilter = (filter: string) => {
    setFilter(filter);
    addQueryParamInURL({
      param: "filter",
      value: filter,
    });
  };

  const removeTodoById = (todoId: number) => {
    setPaginatedTodos({
      ...paginatedTodos!,
      data: paginatedTodos!.data.filter((todo) => todo.id !== todoId),
    });
  };

  const filterOptions = ["upcoming", "done", "overdue"];

  return (
    <div>
      {/* Top Section */}
      <div className="top-section simple-border-color flex flex-row items-center justify-between border-b-[1px] pb-4">
        <div className="title text-2xl font-bold">Todos</div>
        <button className="btn-primary rounded-lg px-4 py-2 text-base font-semibold">
          Create Todo
        </button>
      </div>

      {/* Filter and Search Section */}
      <div className="my-3 flex flex-col justify-between gap-3 sm:flex-row md:items-center">
        <div className="filter-tabs">
          <button
            className={`btn-secondary rounded-lg px-2 py-2 text-base font-semibold capitalize ${
              filter === undefined ? "active" : ""
            }`}
            onClick={(e) => {
              // remove filter
              setFilter(undefined);
            }}
          >
            All
          </button>
          {filterOptions.map((filterOption) => (
            <button
              key={filterOption}
              className={`btn-secondary rounded-lg px-2 py-2 text-base font-semibold capitalize ${
                filter === filterOption ? "active" : ""
              }`}
              onClick={(e) => {
                handleFilter(filterOption);
              }}
            >
              {filterOption}
            </button>
          ))}
        </div>
        <div className="search">
          <div className="my-5 flex items-center justify-between">
            <SearchField
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={"Search Todos" + "..."}
              onClear={handleClearSearch}
              disabled={isTodosFetching}
            />
          </div>
        </div>
      </div>

      {/* Popup message */}
      {error && (
        <PopupMessage
          type="error"
          message={error}
          onClose={() => {
            setError(null);
            toast.dismiss("roles-fetch-error");
          }}
          isAutoClose={true}
        />
      )}

      {/* Todos Data */}
      {!error && (
        <div className="todos-section hide-scrollbar h-auto max-h-[50vh] overflow-x-hidden overflow-y-scroll md:max-h-[60vh]">
          {isTodosFetching ? (
            <>
              <div className="flex h-32 w-full items-center justify-center">
                {" "}
                <Spinner className="text-darkSecondary dark:text-lightSecondary" />
              </div>
            </>
          ) : (
            <>
              {paginatedTodos?.data.map((todo) => (
                <div key={todo.id}>
                  <SingleTodo todo={todo} removeCurrentTodo={removeTodoById} />
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* Pagination Section */}
      {paginatedTodos && paginatedTodos.totalItems && paginatedTodos && (
        <PaginationGroup
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          totalPages={paginatedTodos.totalPages}
          handleRowsPerPageChange={handleRowsPerPageChange}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}
