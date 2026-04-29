import api from "@/services/api";

export const getStaff = async () => {
  const res = await api.get("/users");
  return res.data;
};

export const createStaff = async (data) => {
  const res = await api.post("/users/staff", data);
  return res.data;
};

export const updateStaff = async (id, data) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const updateStaffStatus = async (id, data) => {
  console.log("DATA api call fucntion:",id, data);
  const res = await api.patch(`/users/${id}/status`, data);
  return res.data;
};
