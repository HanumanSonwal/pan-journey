import { sendError, sendSuccess } from "../../../utils/response/ApiResponse.js";
import Markup from "./markup.model.js";

export const createMarkup = async (req, res) => {
  try {
    const markup = await Markup.create(req.body);

    return sendSuccess(res, "Markup created successfully", markup, null, 201);
  } catch (err) {
    return sendError(res, "Failed to create markup", 500, err.message);
  }
};
export const getAllMarkups = async (req, res) => {
  try {
    const markups = await Markup.find().sort({ createdAt: -1 });

    return sendSuccess(res, "Markup list fetched", markups);
  } catch (err) {
    return sendError(res, "Failed to fetch markups", 500, err.message);
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
