import { Todo } from "@/models";
import ApiResponse from "@/utils/apiResponse";
import {
  decodeGetQuery,
  getPagination,
  getPagingData,
} from "@/utils/paginationUtil";
import { Request, Response } from "express";
import { FindAndCountOptions, Op, Order, WhereOptions } from "sequelize";

/**
 * Retrieves a list of Todo items.
 *
 * @param {Request} req - The request object, containing the query parameters for filtering and pagination.
 * @param {Response} res - The response object, used to send the response back to the client.
 * @returns {Promise<void>} - A promise that resolves when the Todo items are retrieved and the response is sent.
 */
const getTodos = async (req: Request, res: Response): Promise<void> => {
  const { filter } = req.query as { filter?: string };
  const { page, size, search, sortBy, orderBy } = decodeGetQuery(req.query);
  const { limit, offset } = getPagination({ page, size });

  const whereCondition: WhereOptions<any> = applyFilterConditions(filter);

  if (search) {
    // search by name or short description
    (whereCondition as any)[Op.or] = [
      {
        name: {
          [Op.like]: `%${search}%`,
        },
      },
      {
        shortDescription: {
          [Op.like]: `%${search}%`,
        },
      },
    ];
  }

  // query options for the findAndCountAll method
  const query: FindAndCountOptions = {
    attributes: [
      "id",
      "name",
      "shortDescription",
      "date",
      "isDone",
      "createdAt",
      "updatedAt",
    ],
  };

  const orderCondition = [[sortBy, orderBy]];
  query.where = whereCondition;
  query.order = orderCondition as Order;
  query.limit = limit;
  query.offset = offset;

  const paginatedData = await Todo.findAndCountAll(query);

  const response = getPagingData({
    paginatedData,
    page,
    limit,
  });

  new ApiResponse({
    status: 200,
    message: "Todos retrieved successfully",
    data: response,
  }).send(res);
};

/**
 * Applies the filter conditions based on the query parameter.
 *
 * @param {string} filter - The filter query parameter.
 * @returns {WhereOptions} - The filter conditions to apply to the query.
 */
export const applyFilterConditions = (
  filter: string | undefined
): WhereOptions<any> => {
  const whereCondition: WhereOptions<any> = {};
  const currentDate = new Date();

  if (filter) {
    switch (filter.toLowerCase()) {
      case "done":
        whereCondition.isDone = true;
        break;
      case "upcoming":
        whereCondition.date = { [Op.gt]: currentDate };
        break;
      case "overdue":
        whereCondition.date = { [Op.lt]: currentDate };
        whereCondition.isDone = false;
        break;
      default:
        break;
    }
  }

  return whereCondition;
};

export default getTodos;
