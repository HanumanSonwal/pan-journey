import { sendError, sendSuccess } from "../../../utils/response/ApiResponse.js";
import Markup from "./markup.model.js";

import { paginateHotels } from "../../hotel/hotelPagination.js";

export const getAllMarkups = async (req, res) => {
  try {
    const {
      level,
      search,
      isActive,
      page = 1,
      limit = 10
    } = req.query;

    const pipeline = [];

    // 1️⃣ Level filter
    if (level) {
      pipeline.push({
        $match: { level }
      });
    }

    // 2️⃣ isActive filter
    if (isActive !== undefined) {
      pipeline.push({
        $match: {
          isActive: isActive === "true"
        }
      });
    }

    // 3️⃣ Join countries collection
    pipeline.push(
      {
        $lookup: {
          from: "countries",
          localField: "countryCode",
          foreignField: "countryCode",
          as: "countryData"
        }
      },
      {
        $unwind: {
          path: "$countryData",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          countryName: "$countryData.countryName"
        }
      }
    );

    // 4️⃣ Dynamic SEARCH based on level
    if (search) {
      const regex = new RegExp(search, "i");

      let searchMatch = {};

      if (level === "country") {
        searchMatch = { countryName: regex };
      }

      if (level === "state") {
        searchMatch = { stateName: regex };
      }

      if (level === "city") {
        searchMatch = { cityName: regex };
      }

      if (level === "hotel") {
        searchMatch = {
          $or: [
            { hotelName: regex },
            { hotelId: regex }
          ]
        };
      }

      if (Object.keys(searchMatch).length > 0) {
        pipeline.push({
          $match: searchMatch
        });
      }
    }

    // 5️⃣ Remove extra join data
    pipeline.push({
      $project: {
        countryData: 0
      }
    });

    // 6️⃣ Sort latest first
    pipeline.push({
      $sort: {
        createdAt: -1
      }
    });

    // 🔥 Fetch all records
    const allMarkups = await Markup.aggregate(pipeline);

    // 🔥 Apply pagination
    const paginatedData = paginateHotels(allMarkups, {
      page: Number(page),
      limit: Number(limit)
    });

    return sendSuccess(
      res,
      "Markups fetched successfully",
      paginatedData.hotels,
      {
        page: paginatedData.page,
        limit: paginatedData.limit,
        totalPages: paginatedData.totalPages,
        totalRecords: paginatedData.totalHotels
      }
    );

  } catch (err) {
    console.error(err);

    return sendError(
      res,
      "Failed to fetch markups",
      500,
      err.message
    );
  }
};

// export const getAllMarkups = async (req, res) => {
//   try {
//     const { level, search, isActive } = req.query;

//     const pipeline = [];

//     // 1️⃣ Level filter
//     if (level) {
//       pipeline.push({
//         $match: { level }
//       });
//     }

//     // 2️⃣ isActive filter (NEW)
//     if (isActive !== undefined) {
//       pipeline.push({
//         $match: { isActive: isActive === "true" }
//       });
//     }

//     // 3️⃣ Join countries collection
//     pipeline.push(
//       {
//         $lookup: {
//           from: "countries",
//           localField: "countryCode",
//           foreignField: "countryCode",
//           as: "countryData"
//         }
//       },
//       {
//         $unwind: {
//           path: "$countryData",
//           preserveNullAndEmptyArrays: true
//         }
//       },
//       {
//         $addFields: {
//           countryName: "$countryData.countryName"
//         }
//       }
//     );

//     // 4️⃣ Dynamic SEARCH based on level
//     if (search) {
//       const regex = new RegExp(search, "i");
//       let searchMatch = {};

//       if (level === "country") {
//         searchMatch = { countryName: regex };
//       }

//       if (level === "state") {
//         searchMatch = { stateName: regex };
//       }

//       if (level === "city") {
//         searchMatch = { cityName: regex };
//       }

//       if (level === "hotel") {
//         searchMatch = {
//           $or: [
//             { hotelName: regex },
//             { hotelId: regex }
//           ]
//         };
//       }

//       if (Object.keys(searchMatch).length > 0) {
//         pipeline.push({ $match: searchMatch });
//       }
//     }

//     // 5️⃣ Remove extra join data
//     pipeline.push({
//       $project: {
//         countryData: 0
//       }
//     });

//     // 6️⃣ Sort latest first
//     pipeline.push({
//       $sort: { createdAt: -1 }
//     });

//     const markups = await Markup.aggregate(pipeline);

//     return sendSuccess(res, "Markups fetched successfully", markups);

//   } catch (err) {
//     console.error(err);
//     return sendError(res, "Failed to fetch markups", 500, err.message);
//   }
// };
export const createMarkup = async (req, res) => {
  try {
    const { level, countryCode, stateName, cityId, hotelId } = req.body;

    // 🔎 Build uniqueness filter based on level
    let filter = { level };

    if (level === "country") filter.countryCode = countryCode;
    if (level === "state") {
      filter.countryCode = countryCode;
      filter.stateName = stateName;
    }
    if (level === "city") filter.cityId = cityId;
    if (level === "hotel") filter.hotelId = hotelId;

    // 🔴 Check if markup already exists
    const existing = await Markup.findOne(filter);

    if (existing) {
      return sendError(
        res,
        "Markup already exists. Please update the existing markup.",
        400
      );
    }

    // ✅ Create new markup
    const markup = await Markup.create(req.body);

    return sendSuccess(
      res,
      "Markup created successfully",
      markup,
      null,
      201
    );

  } catch (err) {
    return sendError(res, "Failed to create markup", 500, err.message);
  }
};

// PUT /markups/:id
export const updateMarkup = async (req, res) => {
  try {
    const { level, markupType, markupValue, isActive } = req.body;

    // full payload required
    if (!level || !markupType || markupValue === undefined) {
      return sendError(res, "All fields are required for PUT", 400);
    }

    const markup = await Markup.findByIdAndUpdate(
      req.params.id,
      {
        level,
        markupType,
        markupValue,
        isActive,
      },
      { new: true, runValidators: true },
    );

    if (!markup) return sendError(res, "Markup not found", 404);

    return sendSuccess(res, "Markup fully updated", markup);
  } catch (err) {
    return sendError(res, "Failed to update markup", 500, err.message);
  }
};
// PATCH /markups/:id/status
export const toggleMarkupStatus = async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return sendError(res, "isActive must be true/false", 400);
    }

    const markup = await Markup.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true },
    );

    if (!markup) return sendError(res, "Markup not found", 404);

    return sendSuccess(res, "Status updated successfully", markup);
  } catch (err) {
    return sendError(res, "Failed to update status", 500, err.message);
  }
};
export const deleteMarkup = async (req, res) => {
  try {
    const markup = await Markup.findByIdAndDelete(req.params.id);

    if (!markup) {
      return sendError(res, "Markup not found", 404);
    }

    return sendSuccess(res, "Markup deleted successfully");
  } catch (err) {
    return sendError(res, "Failed to delete markup", 500, err.message);
  }
};
