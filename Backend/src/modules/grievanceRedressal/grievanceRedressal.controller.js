import {
  createGrievanceService,
  getAllGrievanceService,
  getSingleGrievanceService,
  updateGrievanceService,
  deleteGrievanceService,
} from "./grievanceRedressal.service.js";

import {
  sendSuccess,
  sendError,
} from "../../utils/response/ApiResponse.js";


// CREATE
export const createGrievance = async (req, res) => {
  try {
    const payload = {
      ...req.body,
      UserId: req.user._id,
    };

    const result =
      await createGrievanceService(payload);

    return sendSuccess(
      res,
      "Grievance created successfully",
      result,
      null,
      201
    );
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};


// GET ALL
export const getAllGrievance = async (req, res) => {
  try {
    const result =
      await getAllGrievanceService(
        req.user._id
      );

    return sendSuccess(
      res,
      "Grievances fetched successfully",
      result
    );
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};


// GET SINGLE
export const getSingleGrievance = async (
  req,
  res
) => {
  try {
    const result =
      await getSingleGrievanceService(
        req.params.id,
        req.user._id
      );

    return sendSuccess(
      res,
      "Grievance fetched successfully",
      result
    );
  } catch (error) {
    return sendError(res, error.message, 404);
  }
};


// UPDATE
export const updateGrievance = async (
  req,
  res
) => {
  try {
    const result =
      await updateGrievanceService(
        req.params.id,
        req.user._id,
        req.body
      );

    return sendSuccess(
      res,
      "Grievance updated successfully",
      result
    );
  } catch (error) {
    return sendError(res, error.message, 404);
  }
};


// DELETE
export const deleteGrievance = async (
  req,
  res
) => {
  try {
    await deleteGrievanceService(
      req.params.id,
      req.user._id
    );

    return sendSuccess(
      res,
      "Grievance deleted successfully"
    );
  } catch (error) {
    return sendError(res, error.message, 404);
  }
};