// import { asyncHandler } from "../../middleware/asyncHandler.js";
// import {
//   createRoleService,
//   getAllRolesService,
//   deleteRoleService,
// } from "./role.service.js";

// // CREATE ROLE
// export const createRole = asyncHandler(async (req, res) => {
//   const role = await createRoleService(req.body);

//   res.status(201).json({
//     success: true,
//     data: role,
//   });
// });

// // GET ALL ROLES
// export const getRoles = asyncHandler(async (req, res) => {
//   const roles = await getAllRolesService();

//   res.json({
//     success: true,
//     data: roles,
//   });
// });

// // DELETE ROLE
// export const deleteRole = asyncHandler(async (req, res) => {
//   await deleteRoleService(req.params.id);

//   res.json({
//     success: true,
//     message: "Role deleted successfully",
//   });
// });


import { asyncHandler } from "../../middleware/asyncHandler.js";
import Role from "./role.model.js";
import ApiError from "../../utils/ApiError.js";
export const createRole = asyncHandler(async (req, res) => {
  const { name, description, permissions } = req.body;

  if (!name) {
    throw new ApiError(400, "Role name is required");
  }

  const existingRole = await Role.findOne({ name });

  if (existingRole) {
    throw new ApiError(400, "Role already exists");
  }

  const role = await Role.create({
    name,
    description,
    permissions, // ⭐ your matrix object
  });

  res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: role,
  });
});
export const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find().sort({ createdAt: -1 });

  res.json({
    success: true,
    data: roles,
  });
});

export const getRoleById = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  res.json({
    success: true,
    data: role,
  });
});

export const updateRole = asyncHandler(async (req, res) => {
  const { name, description, permissions } = req.body;

  const role = await Role.findById(req.params.id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  role.name = name || role.name;
  role.description = description || role.description;
  role.permissions = permissions || role.permissions;

  await role.save();

  res.json({
    success: true,
    message: "Role updated successfully",
    data: role,
  });
});
export const deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    throw new ApiError(404, "Role not found");
  }

  await role.deleteOne();

  res.json({
    success: true,
    message: "Role deleted successfully",
  });
});