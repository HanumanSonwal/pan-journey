import { useAuthStore } from "@/modules/auth/store/auth.store";
import {
  createRole,
  getRoles,
  getRolesDropdown,
  statusUpdateRole,
  updateRole,
} from "@/modules/role/api/role.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRoles = (enabled = false, dropdownEnabled = false) => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const rolesKey = ["roles", user?.id];
  const dropdownKey = ["roles-dropdown"];

  const { data, isLoading, isFetching } = useQuery({
    queryKey: rolesKey,
    queryFn: getRoles,
    enabled: !!enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const { data: dropdownData, isLoading: dropdownLoading } = useQuery({
    queryKey: dropdownKey,
    queryFn: getRolesDropdown,
    enabled: !!dropdownEnabled,
    staleTime: Infinity,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: createRole,
    onSuccess: (newRole) => {
      queryClient.setQueryData(rolesKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: [...old.data, newRole],
        };
      });

      queryClient.setQueryData(dropdownKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: [...old.data, newRole],
        };
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateRole(id, data),
    onSuccess: (updatedRole, variables) => {
      queryClient.setQueryData(rolesKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((r) =>
            r._id === variables.id ? { ...r, ...updatedRole } : r,
          ),
        };
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, data }) => statusUpdateRole(id, data),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(rolesKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((r) =>
            r._id === variables.id ? { ...r, ...variables.data } : r,
          ),
        };
      });
    },
  });

  return {
    roles: enabled ? data?.data || [] : [],
    isLoading: enabled ? isLoading : false,
    isFetching,

    roleOptions: dropdownEnabled ? dropdownData?.data || [] : [],
    dropdownLoading,

    createRole: createMutation.mutateAsync,
    updateRole: updateMutation.mutateAsync,
    updateStatus: statusMutation.mutateAsync,
  };
};
