import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@/services/role.service";

export const useRoles = (enabled) => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,

    enabled, // 🔥 permission control

    staleTime: 5 * 60 * 1000, // ✅ 5 min cache
    refetchOnWindowFocus: false, // ❌ tab switch pe call band
    refetchOnMount: false, // ❌ page change pe call band
  });
};