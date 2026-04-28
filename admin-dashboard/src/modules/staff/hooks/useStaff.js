import { useQuery } from "@tanstack/react-query";
import { getStaff } from "@/modules/staff/api/user.service";

export const useStaff = () => {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getStaff,
  });
};