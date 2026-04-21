"use client";

import { ThemeProviderCustom } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AuthProvider } from "./authProvider";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProviderCustom>
      <QueryClientProvider client={queryClient}>
        {/* <AuthProvider>{children}</AuthProvider> */}
        {children}
      </QueryClientProvider>
    </ThemeProviderCustom>
  );
}
