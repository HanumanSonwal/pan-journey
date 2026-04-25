import ApiError from "../../utils/ApiError.js";
import { validatePermissions } from "../../utils/permissionValidator.js";
import Role from "./role.model.js";

// 🔹 Create Role
export const createRoleService = async ({ name, description, permissions }) => {
  if (!name) throw new ApiError(400, "Role name is required");

  const existing = await Role.findOne({ name });
  if (existing) throw new ApiError(400, "Role already exists");

  // 🔥 validate permissions
  validatePermissions(permissions);

  return await Role.create({
    name,
    description,
    permissions,
  });
};

// 🔹 Get All Roles
export const getRolesService = async () => {
  return await Role.find().sort({ createdAt: -1 });
};

export const getRoleByIdService = async (id) => {
  const role = await Role.findById(id);
  if (!role) throw new ApiError(404, "Role not found");
  return role;
};

// 🔹 Update Role
export const updateRoleService = async (id, data) => {
  const role = await Role.findById(id);
  if (!role) throw new ApiError(404, "Role not found");

  if (data.permissions) {
    validatePermissions(data.permissions); // 🔥 validate on update
  }

  role.name = data.name || role.name;
  role.description = data.description || role.description;
  role.permissions = data.permissions || role.permissions;

  return await role.save();
};

// 🔹 Delete Role
export const deleteRoleService = async (id) => {
  const role = await Role.findById(id);
  if (!role) throw new ApiError(404, "Role not found");

  await role.deleteOne();
};
