import * as service from "./station.service.js";
import { sendSuccess } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";

export const getPublicStations = asyncHandler(async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;

  const result = await service.getStations({
    search,
    page:Math.max(1, Number(page)),
    limit: Math.min(50, Number(limit)),
    adminView: false,
  });

  return sendSuccess(
    res,
    "Stations fetched successfully",
    result.data,
    result.meta,
  );
});

export const getSingleStation = asyncHandler(async (req, res) => {
  const isAdminView =
  ["admin", "sub-admin"].includes(req.user?.role) ||
  req.user?.permissions?.station?.read;

  const station = await service.getStationById(req.params.id, isAdminView);

  return sendSuccess(res, "Station fetched successfully", station);
});

// 🔹 GET ADMIN (UPDATED)
export const getAdminStations = asyncHandler(async (req, res) => {
  const {
    search = "",
    status,
    page = 1,
    limit = 10,
    sortBy = "name",
    order = "asc",
  } = req.query;

  const result = await service.getStations({
    search,
    status,
    page: Math.max(1, Number(page)),
    limit: Math.min(50, Number(limit)),
    sortBy,
    order,
    adminView: true,
  });

  return sendSuccess(res, "Admin stations fetched", result.data, result.meta);
});

// 🔥 BULK DELETE
export const bulkDeleteStations = asyncHandler(async (req, res) => {
  await service.bulkDeleteStations(req.body.ids);

  return sendSuccess(res, "Stations deleted successfully");
});

// 🔥 BULK STATUS UPDATE
export const bulkUpdateStatus = asyncHandler(async (req, res) => {
  const { ids, status } = req.body;

  await service.bulkUpdateStatus(ids, status);

  return sendSuccess(res, "Stations updated successfully");
});

export const createStation = asyncHandler(async (req, res) => {
  const station = await service.createStation(req.body);

  return sendSuccess(res, "Station created successfully", station, null, 201);
});

export const updateStation = asyncHandler(async (req, res) => {
  const station = await service.updateStation(req.params.id, req.body);

  return sendSuccess(res, "Station updated successfully", station);
});

export const deleteStation = asyncHandler(async (req, res) => {
  await service.deleteStation(req.params.id);

  return sendSuccess(res, "Station deactivated successfully");
});
