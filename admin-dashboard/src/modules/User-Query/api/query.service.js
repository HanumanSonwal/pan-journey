import api from "@/services/api";

export const getContactQuery = async (params = {}) => {
  const res = await api.get("/admin/all-contacts", {
    params,
  });

  return res.data;
};
