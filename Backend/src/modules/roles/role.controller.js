import { asyncHandler } from "../../middleware/asyncHandler.js";
import { sendSuccess } from "../../utils/ApiResponse.js";
import {
  createRoleService,
  deleteRoleService,
  getRoleByIdService,
  getRolesService,
  updateRoleService,
} from "./role.service.js";

// 🔹 Create
export const createRole = asyncHandler(async (req, res) => {
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

  res.json({
    success: true,
    data: role,
  });
});

// 🔹 Update
export const updateRole = asyncHandler(async (req, res) => {
  const role = await updateRoleService(req.params.id, req.body);
  sendSuccess(res, "Role updated successfully", role);
});

// 🔹 Delete
export const deleteRole = asyncHandler(async (req, res) => {
  await deleteRoleService(req.params.id);
  sendSuccess(res, "Role deleted successfully");
});
