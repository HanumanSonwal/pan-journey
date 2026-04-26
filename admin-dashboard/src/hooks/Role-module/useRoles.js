// import { useQuery } from "@tanstack/react-query";
// import { getRoles } from "@/services/role.service";

// export const useRoles = (enabled) => {
//   return useQuery({
//     queryKey: ["roles"],
//     queryFn: getRoles,

//     enabled, // 🔥 permission control

//     staleTime: 5 * 60 * 1000, // ✅ 5 min cache
//     refetchOnWindowFocus: false, // ❌ tab switch pe call band
//     refetchOnMount: false, // ❌ page change pe call band
//   });
// };


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRoles,
  createRole,
  updateRole,
  statusUpdateRole, // ⬅️ तुम्हारा नाम यही है
} from "@/services/role.service";

export const useRoles = (enabled = false) => {
  const queryClient = useQueryClient();

  // 🔹 GET
  const { data, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,          // service already res.data return कर रही है
    enabled: !!enabled,         // 🔥 key control
    staleTime: 5 * 60 * 1000,   // 5 min cache
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,               // 🔥 403 पर बार-बार retry बंद
  });

  // 🔹 CREATE
  const createMutation = useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  // 🔹 UPDATE
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  // 🔹 STATUS
  const statusMutation = useMutation({
    mutationFn: ({ id, data }) => statusUpdateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  return {
    roles: data?.data || [],   // तुम्हारी API shape: { data: [...] }
    isLoading,

    createRole: createMutation.mutateAsync,
    updateRole: updateMutation.mutateAsync,
    updateStatus: statusMutation.mutateAsync,
  };
};