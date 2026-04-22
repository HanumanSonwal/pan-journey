import Role from "./role.model.js";
import Permission from "../permissions/permission.model.js";

export const createRoleService = async (data) => {
  const { name, description, permissions } = data;

  const validPermissions = await Permission.find({
    _id: { $in: permissions },
  });

  if (validPermissions.length !== permissions.length) {
    throw new Error("Invalid permissions provided");
  }

  const role = await Role.create({
    name,
    description,
    permissions,
  });

  return role;
};

export const getAllRolesService = async () => {
  return await Role.find().populate("permissions");
};

export const deleteRoleService = async (id) => {
  const role = await Role.findById(id);

  if (!role) throw new Error("Role not found");

  if (role.isSystemRole) {
    throw new Error("System role cannot be deleted");
  }

  await Role.findByIdAndDelete(id);
  return true;
};