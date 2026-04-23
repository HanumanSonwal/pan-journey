import { asyncHandler } from "../../middleware/asyncHandler.js";
import {
  createRoleService,
  getRolesService,
  getRoleByIdService,
  updateRoleService,
  deleteRoleService,
} from "./role.service.js";

// 🔹 Create
export const createRole = asyncHandler(async (req, res) => {
  const role = await createRoleService(req.body);

  res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: role,
  });
});

// 🔹 Get All
export const getRoles = asyncHandler(async (req, res) => {
  const roles = await getRolesService();

  res.json({
    success: true,
    data: roles,
  });
});

// 🔹 Get By ID
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

  res.json({
    success: true,
    message: "Role updated successfully",
    data: role,
  });
});

// 🔹 Delete
export const deleteRole = asyncHandler(async (req, res) => {
  await deleteRoleService(req.params.id);

  res.json({
    success: true,
    message: "Role deleted successfully",
  });
});