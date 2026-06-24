import { api } from "@/services/axios";

export const getMySupportTickets = async () => {
  const { data } = await api.get("/getAllContacts");

  return data;
};
