"use client";

import { ThemeProviderCustom } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProviderCustom>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProviderCustom>
  );
}
