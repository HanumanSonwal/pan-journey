import mongoose from "mongoose";

export const queryBuilder = async ({
  model,
  query = {},

  searchFields = [],
  filterFields = [],
  sortFields = [],

  defaultSort = { createdAt: -1 },

  defaultPage = 1,
  defaultLimit = 10,
  maxLimit = 100,
}) => {
  const {
    search,
    page = defaultPage,
    limit = defaultLimit,
    sortBy,
    sortOrder,
    startDate,
    endDate,
  } = query;

  const mongoQuery = {};

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  if (search && searchFields.length) {
    mongoQuery.$or = searchFields.map((field) => ({
      [field]: {
        $regex: search,
        $options: "i",
      },
    }));
  }

  /*
  |--------------------------------------------------------------------------
  | FILTER
  |--------------------------------------------------------------------------
  */

  filterFields.forEach((field) => {
    const value = query[field];

    if (value === undefined || value === null || value === "") {
      return;
    }

    let filterValue = value;

    // Boolean
    if (value === "true") {
      filterValue = true;
    }

    if (value === "false") {
      filterValue = false;
    }

    // ObjectId
    if (
      typeof value === "string" &&
      mongoose.Types.ObjectId.isValid(value)
    ) {
      filterValue = new mongoose.Types.ObjectId(value);
    }

    mongoQuery[field] = filterValue;
  });

  /*
  |--------------------------------------------------------------------------
  | DATE FILTER
  |--------------------------------------------------------------------------
  */

  if (startDate || endDate) {
    mongoQuery.createdAt = {};

    if (startDate) {
      mongoQuery.createdAt.$gte = new Date(
        `${startDate}T00:00:00.000Z`
      );
    }

    if (endDate) {
      mongoQuery.createdAt.$lte = new Date(
        `${endDate}T23:59:59.999Z`
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | PAGINATION
  |--------------------------------------------------------------------------
  */

  let currentPage = parseInt(page, 10);

  if (!currentPage || currentPage < 1) {
    currentPage = defaultPage;
  }

  let currentLimit = parseInt(limit, 10);

  if (!currentLimit || currentLimit < 1) {
    currentLimit = defaultLimit;
  }

  currentLimit = Math.min(currentLimit, maxLimit);

  const skip = (currentPage - 1) * currentLimit;

  /*
  |--------------------------------------------------------------------------
  | SORT
  |--------------------------------------------------------------------------
  */

  let sort = defaultSort;

  if (sortBy && sortFields.includes(sortBy)) {
    sort = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };
  }

  /*
  |--------------------------------------------------------------------------
  | QUERY
  |--------------------------------------------------------------------------
  */

  const [data, total] = await Promise.all([
    model
      .find(mongoQuery)
      .sort(sort)
      .skip(skip)
      .limit(currentLimit)
      .lean(),

    model.countDocuments(mongoQuery),
  ]);

  /*
  |--------------------------------------------------------------------------
  | META
  |--------------------------------------------------------------------------
  */

  const totalPages = Math.ceil(total / currentLimit);

  const meta = {
    page: currentPage,
    limit: currentLimit,
    total,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };

  return {
    data,
    meta,
  };
};