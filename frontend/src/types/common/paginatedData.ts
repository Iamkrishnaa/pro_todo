export type PaginatedData<T> = {
  totalItems: number;
  data: T[];
  totalPages: number;
  currentPage: number;
};
