import { useQuery } from "@tanstack/react-query";
import { getTheme } from "../api/theme.service";

export const useTheme = () => {
  const query = useQuery({
    queryKey: ["website-theme"],
    queryFn: getTheme,
  });

  console.log("QUERY =>", query);

  return {
    theme: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
};
