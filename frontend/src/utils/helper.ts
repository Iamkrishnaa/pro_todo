import { GetParams } from "@/types/common/getParams";
import { ReadonlyURLSearchParams } from "next/navigation";

/* eslint-disable @typescript-eslint/no-unused-vars */
export const clipText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const removeUndefined = <T extends Record<string, any>>(obj: T): T => {
  // Iterate over the entries of the object
  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => {
        // If the value is an object, recursively clean it
        if (value && typeof value === "object" && !Array.isArray(value)) {
          return [key, removeUndefined(value)];
        }
        // Return the key-value pair if the value is not undefined
        return [key, value];
      })
      // Filter out entries where the value is undefined
      .filter(([_, value]) => value !== undefined)
  ) as T;
};

export const getSearchParamsWithDefaultValue = (
  searchParams: ReadonlyURLSearchParams
): GetParams => {
  const page = parseInt(searchParams.get("page") || "1", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);
  const search = searchParams.get("search") || undefined;
  const sort = searchParams.get("sort") || "createdAt";
  const order =
    searchParams.get("order") !== undefined
      ? searchParams.get("order") === "asc"
        ? "asc"
        : "desc"
      : undefined;
  const filter = searchParams.get("filter") || undefined;

  return {
    page,
    size,
    search,
    sort,
    order,
    filter,
  };
};
