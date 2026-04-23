import Role from "./role.model.js";

export const createRoleService = async (data) => {
  const { role_name, permissions } = data;

  if (!role_name) throw new Error("Role name required");

  const role = await Role.create({
    name: role_name,
    permissions, // ⭐ direct store
  });

  return role;
};