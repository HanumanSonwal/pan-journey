import { api } from "@/services/axios";

export const createContactApi = (data) => api.post("/create", data);
