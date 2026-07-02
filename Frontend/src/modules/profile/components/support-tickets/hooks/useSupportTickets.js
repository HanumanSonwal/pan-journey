import { useQuery } from "@tanstack/react-query";
import { getMySupportTickets } from "../service/support.service";

export const useSupportTickets = () => {
  return useQuery({
    queryKey: ["support-tickets"],
    queryFn: getMySupportTickets,
    staleTime: 0,
    refetchOnMount: true,
  });
};
