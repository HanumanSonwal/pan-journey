import { asyncHandler } from "../../middleware/asyncHandler.js";
import { sendSuccess } from "../../utils/ApiResponse.js";
import {
  createRoleService,
  updateRoleStatus,
  getRoleByIdService,
  getRolesService,
  updateRoleService,
} from "./role.service.js";

// 🔹 Create
export const createRole = asyncHandler(async (req, res) => {
  const { name, type } = req.body;

  if (!name) throw new Error("Role name is required");
  if (!type) throw new Error("Role type is required");

  const role = await createRoleService(req.body);

  sendSuccess(res, "Role created successfully", role, null, 201);
});

// 🔹 Get All
export const getRoles = asyncHandler(async (req, res) => {
  const roles = await getRolesService();

  sendSuccess(res, "Get All Roles", roles);
});

export const getRoleById = asyncHandler(async (req, res) => {
  const role = await getRoleByIdService(req.params.id);
  sendSuccess(res, "Role fetched", role);
});

// 🔹 Update
export const updateRole = asyncHandler(async (req, res) => {
  const { type } = req.body;

  if (type && !["admin", "staff", "customer"].includes(type)) {
    throw new Error("Invalid role type");
  }

  const role = await updateRoleService(req.params.id, req.body);

  sendSuccess(res, "Role updated successfully", role);
});

export const updateRoleStatusController = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const role = await updateRoleStatus(req.params.id, isActive);

  sendSuccess(res, "Role status updated", role);
});
