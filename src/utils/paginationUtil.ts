/**
 * Decodes query parameters for pagination and sorting.
 *
 * @param {object} query - The query object containing pagination and sorting parameters.
 * @param {string|number} [query.page] - The page number (defaults to 1 if invalid or not provided).
 * @param {string|number} [query.size] - The page size (defaults to 10 if invalid or not provided).
 * @param {string} [query.search] - The search term (defaults to an empty string).
 * @param {string} [query.sort] - The field to sort by (defaults to "createdAt").
 * @param {string} [query.order] - The sort order, either "asc" or "desc" (defaults to "desc").
 * @returns {object} An object containing pagination and sorting information:
 * - `page` (number): The page number.
 * - `size` (number): The page size.
 * - `search` (string): The search term.
 * - `sortBy` (string): The field to sort by.
 * - `orderBy` (string): The sort order.
 */
export const decodeGetQuery = (query: any) => {
  const page: number = Math.abs(parseInt(query.page as string, 10)) || 1;
  const size: number = Math.abs(parseInt(query.size as string, 10)) || 10;
  const search: string = query.search || "";
  const sortBy: string = query.sort || "createdAt";
  const orderBy: string = query.order || "desc";

  return { page, size, search, sortBy, orderBy };
};

/**
 * Calculates pagination details based on page and size.
 *
 * @param {object} params - The pagination parameters.
 * @param {number} [params.page=1] - The current page number (defaults to 1).
 * @param {number} [params.size=10] - The number of items per page (defaults to 10).
 * @returns {object} An object containing:
 * - `limit` (number): The maximum number of items per page.
 * - `offset` (number): The starting index for the items.
 */
export const getPagination = ({
  page = 1,
  size = 10,
}: {
  page?: number;
  size?: number;
}): {
  limit: number;
  offset: number;
} => {
  const limit: number = Math.max(+size, 1);
  const offset: number = (Math.max(+page, 1) - 1) * limit;

  return { limit, offset };
};

/**
 * Formats paginated data into a standardized structure.
 *
 * @param {object} params - The paginated data and parameters.
 * @param {object} params.paginatedData - The paginated result containing count and rows.
 * @param {number} params.paginatedData.count - The total number of items.
 * @param {any[]} params.paginatedData.rows - The data rows for the current page.
 * @param {number} [params.page=1] - The current page number (defaults to 1).
 * @param {number} [params.limit=10] - The number of items per page (defaults to 10).
 * @returns {object} An object containing:
 * - `totalItems` (number): The total number of items.
 * - `data` (any[]): The data rows for the current page.
 * - `totalPages` (number): The total number of pages.
 * - `currentPage` (number): The current page number.
 */
export const getPagingData = ({
  paginatedData,
  page = 1,
  limit = 10,
}: {
  paginatedData: { count: number; rows: any[] };
  page?: number;
  limit?: number;
}): {
  totalItems: number;
  data: any[];
  totalPages: number;
  currentPage: number;
} => {
  const currentPage = Math.max(+page, 1);
  const itemsPerPage = Math.max(+limit, 1);

  if (!paginatedData) {
    return {
      totalItems: 0,
      data: [],
      totalPages: 0,
      currentPage: 1,
    };
  }

  const { count: totalItems, rows: data } = paginatedData;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    totalItems,
    data,
    totalPages,
    currentPage,
  };
};
