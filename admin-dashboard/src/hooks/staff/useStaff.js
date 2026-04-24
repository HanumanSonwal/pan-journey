import { useQuery } from "@tanstack/react-query";
import { getStaff } from "@/services/user.service";

export const useStaff = () => {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getStaff,
  });
};