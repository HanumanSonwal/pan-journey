import { api } from "@/services/axios";

export const createGrievanceApi = (data) => api.post("/createGrievance", data);
