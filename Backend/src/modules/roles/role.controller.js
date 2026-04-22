import { asyncHandler } from "../../middleware/asyncHandler.js";
import {
  createRoleService,
  getAllRolesService,
  deleteRoleService,
} from "./role.service.js";

// CREATE ROLE
export const createRole = asyncHandler(async (req, res) => {
  const role = await createRoleService(req.body);

  res.status(201).json({
    success: true,
    data: role,
  });
});

// GET ALL ROLES
export const getRoles = asyncHandler(async (req, res) => {
  const roles = await getAllRolesService();

  res.json({
    success: true,
    data: roles,
  });
});

// DELETE ROLE
export const deleteRole = asyncHandler(async (req, res) => {
  await deleteRoleService(req.params.id);

  res.json({
    success: true,
    message: "Role deleted successfully",
  });
});