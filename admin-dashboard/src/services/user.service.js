import api from "./api";

export const getStaff = async () => {
  const res = await api.get("/user");
  return res.data;
};

export const createStaff = async (data) => {
  const res = await api.post("/user", data);
  return res.data;
};

export const updateStaff = async (id, data) => {
  const res = await api.put(`/user/${id}`, data);
  return res.data;
};

export const deleteStaff = async (id) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};