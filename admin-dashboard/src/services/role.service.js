import api from "./api";

export const getRoles = async () => {
  const res = await api.get("/api/v1/roles");
  return res.data;
};

export const createRole = async (data) => {
  const res = await api.post("/api/v1/roles", data);
  return res.data;
};