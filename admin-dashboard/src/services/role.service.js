import api from "./api";

// 🔹 Get All Roles
export const getRoles = async () => {
  const res = await api.get("/roles/all");
  return res.data;
};

// 🔹 Get Single Role
export const getRoleById = async (id) => {
  const res = await api.get(`/roles/${id}`);
  return res.data;
};

// 🔹 Create Role
export const createRole = async (data) => {
  const res = await api.post("/roles/create", data);
  return res.data;
};

// 🔹 Update Role
export const updateRole = async (id, data) => {
  const res = await api.put(`/roles/${id}`, data);
  return res.data;
};

// 🔹 Delete Role
export const deleteRole = async (id) => {
  const res = await api.delete(`/roles/${id}`);
  return res.data;
};